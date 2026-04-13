import { NextRequest, NextResponse } from "next/server";
import {
  ScanCommand,
  PutCommand,
  GetCommand,
  DeleteCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import { docClient } from "@/lib/dynamo";
import { TABLE_STORIES, TABLE_SITES } from "@/lib/constants";
import type { StoryRecord, StoryParagraph, LanguageCode } from "@/lib/types";

function storyKey(siteId: string, storyId: string, lang: LanguageCode = "en") {
  return { siteId, langStoryId: `${lang}#${storyId}` };
}

// GET /api/stories — list stories from the Story table
// Optional ?lang=xx query param to filter by language; omit to get all languages
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const langParam = searchParams.get("lang") as LanguageCode | null;

    const allItems: Record<string, unknown>[] = [];
    let lastKey: Record<string, unknown> | undefined;

    do {
      const result = await docClient.send(
        new ScanCommand({
          TableName: TABLE_STORIES,
          ...(langParam
            ? { FilterExpression: "lang = :lang", ExpressionAttributeValues: { ":lang": langParam } }
            : {}),
          ExclusiveStartKey: lastKey,
        })
      );
      if (result.Items) {
        allItems.push(...result.Items);
      }
      lastKey = result.LastEvaluatedKey as Record<string, unknown> | undefined;
    } while (lastKey);

    // Build a site title lookup (scan sites for English)
    const siteTitles: Record<string, string> = {};
    let siteLastKey: Record<string, unknown> | undefined;
    do {
      const result = await docClient.send(
        new ScanCommand({
          TableName: TABLE_SITES,
          FilterExpression: "lang = :lang AND begins_with(PK, :prefix)",
          ExpressionAttributeValues: { ":lang": "en", ":prefix": "SITE#" },
          ProjectionExpression: "siteId, title",
          ExclusiveStartKey: siteLastKey,
        })
      );
      if (result.Items) {
        for (const item of result.Items) {
          siteTitles[item.siteId as string] = item.title as string;
        }
      }
      siteLastKey = result.LastEvaluatedKey as Record<string, unknown> | undefined;
    } while (siteLastKey);

    // Strip paragraphs from list response for performance (use /api/stories/detail for full data)
    const stories = allItems.map((item) => {
      const s = item as unknown as StoryRecord;
      const { paragraphs, ...rest } = s;
      return {
        ...rest,
        paragraphCount: (paragraphs ?? []).length,
        characters: s.characters ?? [],
        source: s.source ?? "",
        disabled: s.disabled ?? false,
        isFeatured: s.isFeatured ?? false,
        siteTitle: siteTitles[s.siteId] ?? s.siteId,
      };
    });

    stories.sort((a, b) => a.title.localeCompare(b.title));
    return NextResponse.json(stories);
  } catch (error) {
    console.error("Stories GET error:", error);
    return NextResponse.json({ error: "Failed to fetch stories" }, { status: 500 });
  }
}

// POST /api/stories — create or update a story in the Story table
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { story, previousSiteId } = body as {
    story: StoryRecord;
    previousSiteId: string | null;
  };

  if (!story?.storyId || !story?.siteId || !story?.title || !story?.storyCategory || !story?.tier) {
    return NextResponse.json(
      { error: "storyId, siteId, title, storyCategory, and tier are required" },
      { status: 400 }
    );
  }

  // Verify the site exists
  const siteResult = await docClient.send(
    new GetCommand({
      TableName: TABLE_SITES,
      Key: { PK: `SITE#${story.siteId}`, SK: `LANG#en` },
    })
  );
  if (!siteResult.Item) {
    return NextResponse.json({ error: `Site "${story.siteId}" not found` }, { status: 404 });
  }

  const now = Math.floor(Date.now() / 1000);

  try {
    const lang: LanguageCode = story.lang || "en";

    // If the story moved from a different site, delete from the old location
    if (previousSiteId && previousSiteId !== story.siteId) {
      await docClient
        .send(
          new DeleteCommand({
            TableName: TABLE_STORIES,
            Key: storyKey(previousSiteId, story.storyId, lang),
          })
        )
        .catch(() => {}); // Ignore if didn't exist
    }

    // Fetch existing story to preserve audio data on unchanged paragraphs
    const existingResult = await docClient.send(
      new GetCommand({
        TableName: TABLE_STORIES,
        Key: storyKey(story.siteId, story.storyId, lang),
      })
    );
    const existingParagraphs: StoryParagraph[] =
      (existingResult.Item?.paragraphs as StoryParagraph[] | undefined) ?? [];
    const existingDisabled = existingResult.Item?.disabled as boolean | undefined;

    // Merge audio data: carry over audio/audioProviders for paragraphs whose text is unchanged
    const incomingParagraphs: StoryParagraph[] = story.paragraphs ?? [];
    const mergedParagraphs: StoryParagraph[] = incomingParagraphs.map(
      (incoming, i) => {
        const existing = existingParagraphs[i];
        if (existing && existing.text === incoming.text) {
          // Text unchanged — preserve existing audio metadata
          return {
            ...incoming,
            ...(existing.audio ? { audio: existing.audio } : {}),
            ...(existing.audioProviders
              ? { audioProviders: existing.audioProviders }
              : {}),
          };
        }
        // Text changed or new paragraph — discard stale audio
        return { text: incoming.text };
      }
    );

    // Compute hasAudio from merged paragraphs
    const hasAudio = mergedParagraphs.some(
      (p) =>
        p.audio ||
        (p.audioProviders && Object.keys(p.audioProviders).length > 0)
    );

    await docClient.send(
      new PutCommand({
        TableName: TABLE_STORIES,
        Item: {
          siteId: story.siteId,
          langStoryId: `${lang}#${story.storyId}`,
          storyId: story.storyId,
          lang,
          title: story.title,
          subtitle: story.subtitle ?? "",
          excerpt: story.excerpt ?? "",
          icon: story.icon ?? "",
          storyCategory: story.storyCategory,
          era: story.era ?? "",
          tier: story.tier,
          isFree: story.isFree ?? false,
          isFeatured: story.isFeatured ?? false,
          hasAudio,
          characters: story.characters ?? [],
          moralOrLesson: story.moralOrLesson ?? "",
          ...(story.coordinates ? { coordinates: story.coordinates } : {}),
          thumbnail: story.thumbnail ?? "",
          image: story.image ?? "",
          readingTimeMinutes: story.readingTimeMinutes ?? 1,
          paragraphs: mergedParagraphs,
          source: story.source ?? "",
          updatedAt: now,
          disabled: existingDisabled ?? true,
        },
      })
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Stories POST error:", error);
    return NextResponse.json({ error: "Failed to save story" }, { status: 500 });
  }
}

// PATCH /api/stories — toggle disabled, isFree, or isFeatured
export async function PATCH(request: NextRequest) {
  const body = await request.json();
  const { storyId, siteId, lang, disabled, isFree, isFeatured } = body as {
    storyId: string;
    siteId: string;
    lang?: LanguageCode;
    disabled?: boolean;
    isFree?: boolean;
    isFeatured?: boolean;
  };

  if (!storyId || !siteId) {
    return NextResponse.json(
      { error: "storyId and siteId are required" },
      { status: 400 },
    );
  }
  if (typeof disabled !== "boolean" && typeof isFree !== "boolean" && typeof isFeatured !== "boolean") {
    return NextResponse.json(
      { error: "At least one of disabled, isFree, or isFeatured (boolean) is required" },
      { status: 400 },
    );
  }

  try {
    const now = Math.floor(Date.now() / 1000);
    const parts: string[] = ["updatedAt = :u"];
    const values: Record<string, unknown> = { ":u": now };

    if (typeof disabled === "boolean") {
      parts.push("disabled = :d");
      values[":d"] = disabled;
    }
    if (typeof isFree === "boolean") {
      parts.push("isFree = :f");
      values[":f"] = isFree;
    }
    if (typeof isFeatured === "boolean") {
      parts.push("isFeatured = :ft");
      values[":ft"] = isFeatured;
    }

    await docClient.send(
      new UpdateCommand({
        TableName: TABLE_STORIES,
        Key: storyKey(siteId, storyId, lang || "en"),
        UpdateExpression: `SET ${parts.join(", ")}`,
        ExpressionAttributeValues: values,
      }),
    );
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Stories PATCH error:", error);
    return NextResponse.json({ error: "Failed to update story" }, { status: 500 });
  }
}

// DELETE /api/stories — delete a story from the Story table
export async function DELETE(request: NextRequest) {
  const { storyId, siteId, lang } = await request.json();
  if (!storyId || !siteId) {
    return NextResponse.json(
      { error: "storyId and siteId are required" },
      { status: 400 }
    );
  }

  try {
    await docClient.send(
      new DeleteCommand({
        TableName: TABLE_STORIES,
        Key: storyKey(siteId, storyId, lang || "en"),
      })
    );
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Stories DELETE error:", error);
    return NextResponse.json({ error: "Failed to delete story" }, { status: 500 });
  }
}
