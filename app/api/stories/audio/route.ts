import { NextRequest, NextResponse } from "next/server";
import { LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda";
import {
  S3Client,
  DeleteObjectCommand,
  HeadObjectCommand,
} from "@aws-sdk/client-s3";
import { GetCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { docClient } from "@/lib/dynamo";
import { TABLE_STORIES, AUDIO_LAMBDA_NAME, AUDIO_S3_BUCKET } from "@/lib/constants";
import type { StoryRecord, StoryParagraph } from "@/lib/types";

const lambda = new LambdaClient({
  region: process.env.AWS_REGION ?? "eu-north-1",
});

const s3 = new S3Client({
  region: process.env.AWS_REGION ?? "eu-north-1",
});

function storyKey(siteId: string, storyId: string, lang: string = "en") {
  return { siteId, langStoryId: `${lang}#${storyId}` };
}

// POST /api/stories/audio — generate audio for a paragraph via Lambda
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { storyId, siteId, lang, paragraphIndex, provider, text } = body as {
      storyId: string;
      siteId: string;
      lang: string;
      paragraphIndex: number;
      provider: string;
      /** When set (admin panel), paragraph text is synced to Dynamo before TTS so Lambda uses current copy. */
      text?: string;
    };

    if (!storyId || !siteId || !lang || paragraphIndex == null || !provider) {
      return NextResponse.json(
        { error: "storyId, siteId, lang, paragraphIndex, and provider are required" },
        { status: 400 }
      );
    }

    // Admin sends draft paragraph text; Lambda reads from Dynamo. The audio Lambda also returns
    // cached audio from audioProviders or S3 HeadObject without comparing paragraph text — so when
    // the editor invokes us (always with `text`), we must bypass those caches every time.
    let adminAudio = false;
    if (typeof text === "string") {
      adminAudio = true;
      const storyGet = await docClient.send(
        new GetCommand({
          TableName: TABLE_STORIES,
          Key: storyKey(siteId, storyId, lang),
          ProjectionExpression: "paragraphs",
        })
      );
      const paragraphs = (storyGet.Item?.paragraphs ?? []) as StoryParagraph[];
      if (paragraphIndex < 0 || paragraphIndex >= paragraphs.length) {
        return NextResponse.json(
          { error: "Invalid paragraph index" },
          { status: 400 }
        );
      }
      const dbText = paragraphs[paragraphIndex]?.text ?? "";
      if (text.trim() !== dbText.trim()) {
        await docClient.send(
          new UpdateCommand({
            TableName: TABLE_STORIES,
            Key: storyKey(siteId, storyId, lang),
            UpdateExpression: `SET paragraphs[${paragraphIndex}].#txt = :text`,
            ExpressionAttributeNames: { "#txt": "text" },
            ExpressionAttributeValues: { ":text": text },
          })
        );
      }

      // Remove stale object so regeneration is not short-circuited by S3; same keys as DELETE handler.
      if (AUDIO_S3_BUCKET) {
        const keys = [
          `audio/${provider}/${lang}/${siteId}/${storyId}/p${paragraphIndex}.mp3`,
        ];
        if (provider === "polly") {
          keys.push(
            `audio/polly/${lang}/${siteId}/${storyId}/paragraph_${paragraphIndex}.mp3`,
            `audio/${lang}/${siteId}/${storyId}/p${paragraphIndex}.mp3`
          );
        }
        for (const key of keys) {
          try {
            await s3.send(
              new DeleteObjectCommand({ Bucket: AUDIO_S3_BUCKET, Key: key })
            );
          } catch {
            // ignore
          }
        }
      }
    }

    // Build an API-Gateway-proxy-style event for the Lambda
    const lambdaEvent = {
      httpMethod: "POST",
      path: `/stories/${storyId}/audio`,
      pathParameters: { storyId },
      queryStringParameters: {
        lang,
        siteId,
        p: String(paragraphIndex),
        provider,
        ...(adminAudio ? { force: "true" } : {}),
      },
      headers: { "Content-Type": "application/json" },
      requestContext: { authorizer: { claims: { sub: "admin-panel" } } },
    };

    const result = await lambda.send(
      new InvokeCommand({
        FunctionName: AUDIO_LAMBDA_NAME,
        InvocationType: "RequestResponse",
        Payload: new TextEncoder().encode(JSON.stringify(lambdaEvent)),
      })
    );

    if (result.FunctionError) {
      const errorPayload = result.Payload
        ? JSON.parse(new TextDecoder().decode(result.Payload))
        : {};
      console.error("Lambda function error:", errorPayload);
      return NextResponse.json(
        { error: errorPayload.errorMessage ?? "Lambda invocation failed" },
        { status: 500 }
      );
    }

    const lambdaResponse = result.Payload
      ? JSON.parse(new TextDecoder().decode(result.Payload))
      : {};

    // Lambda returns API-Gateway-proxy-style response: { statusCode, body }
    const statusCode = lambdaResponse.statusCode ?? 200;
    const responseBody =
      typeof lambdaResponse.body === "string"
        ? JSON.parse(lambdaResponse.body)
        : lambdaResponse.body ?? lambdaResponse;

    if (statusCode >= 400) {
      return NextResponse.json(
        { error: responseBody.error ?? "Audio generation failed" },
        { status: statusCode }
      );
    }

    return NextResponse.json(responseBody);
  } catch (error) {
    console.error("Audio POST error:", error);
    return NextResponse.json(
      { error: "Failed to generate audio" },
      { status: 500 }
    );
  }
}

// DELETE /api/stories/audio — delete audio for a paragraph
export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { storyId, siteId, lang, paragraphIndex, provider } = body as {
      storyId: string;
      siteId: string;
      lang: string;
      paragraphIndex: number;
      provider: string;
    };

    if (!storyId || !siteId || !lang || paragraphIndex == null || !provider) {
      return NextResponse.json(
        { error: "storyId, siteId, lang, paragraphIndex, and provider are required" },
        { status: 400 }
      );
    }

    // Fetch the existing story
    const existing = await docClient.send(
      new GetCommand({
        TableName: TABLE_STORIES,
        Key: storyKey(siteId, storyId, lang),
      })
    );

    if (!existing.Item) {
      return NextResponse.json({ error: "Story not found" }, { status: 404 });
    }

    const story = existing.Item as unknown as StoryRecord;
    const paragraphs: StoryParagraph[] = story.paragraphs ?? [];

    if (paragraphIndex < 0 || paragraphIndex >= paragraphs.length) {
      return NextResponse.json(
        { error: "Invalid paragraph index" },
        { status: 400 }
      );
    }

    // Remove audio provider from paragraph
    const paragraph = paragraphs[paragraphIndex];
    if (paragraph.audioProviders) {
      delete paragraph.audioProviders[provider];
      if (Object.keys(paragraph.audioProviders).length === 0) {
        delete paragraph.audioProviders;
      }
    }

    // If the deleted provider was the active audio, clear it
    if (paragraph.audio) {
      // Check if the audio URL contains the provider name — or just clear it
      // since we should pick a new default or clear
      const remainingProviders = paragraph.audioProviders
        ? Object.keys(paragraph.audioProviders)
        : [];
      if (remainingProviders.length > 0) {
        const fallback = paragraph.audioProviders![remainingProviders[0]];
        paragraph.audio = {
          url: fallback.url,
          durationSeconds: fallback.durationSeconds,
        };
      } else {
        delete paragraph.audio;
      }
    }

    // Check if any paragraph still has audio
    const hasAudio = paragraphs.some(
      (p) => p.audio || (p.audioProviders && Object.keys(p.audioProviders).length > 0)
    );

    // Update DynamoDB
    await docClient.send(
      new UpdateCommand({
        TableName: TABLE_STORIES,
        Key: storyKey(siteId, storyId, lang),
        UpdateExpression: "SET paragraphs = :paragraphs, hasAudio = :hasAudio",
        ExpressionAttributeValues: {
          ":paragraphs": paragraphs,
          ":hasAudio": hasAudio,
        },
      })
    );

    // Delete S3 audio file(s) — best effort
    if (AUDIO_S3_BUCKET) {
      const s3Keys = [
        `audio/${provider}/${lang}/${siteId}/${storyId}/p${paragraphIndex}.mp3`,
      ];
      // Legacy polly path
      if (provider === "polly") {
        s3Keys.push(
          `audio/polly/${lang}/${siteId}/${storyId}/paragraph_${paragraphIndex}.mp3`
        );
      }

      for (const key of s3Keys) {
        try {
          // Check if exists before deleting
          await s3.send(
            new HeadObjectCommand({ Bucket: AUDIO_S3_BUCKET, Key: key })
          );
          await s3.send(
            new DeleteObjectCommand({ Bucket: AUDIO_S3_BUCKET, Key: key })
          );
        } catch {
          // Object doesn't exist or already deleted
        }
      }
    }

    return NextResponse.json({
      success: true,
      hasAudio,
      paragraph: paragraphs[paragraphIndex],
    });
  } catch (error) {
    console.error("Audio DELETE error:", error);
    return NextResponse.json(
      { error: "Failed to delete audio" },
      { status: 500 }
    );
  }
}
