import { NextRequest, NextResponse } from "next/server";
import { GetCommand } from "@aws-sdk/lib-dynamodb";
import { docClient } from "@/lib/dynamo";
import { TABLE_STORIES, TABLE_SITES } from "@/lib/constants";
import type { StoryRecord, LanguageCode } from "@/lib/types";

// GET /api/stories/detail?siteId=xxx&storyId=yyy&lang=en
// Returns a single full story with paragraphs
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const siteId = searchParams.get("siteId");
  const storyId = searchParams.get("storyId");
  const lang = (searchParams.get("lang") || "en") as LanguageCode;

  if (!siteId || !storyId) {
    return NextResponse.json(
      { error: "siteId and storyId are required" },
      { status: 400 },
    );
  }

  try {
    const result = await docClient.send(
      new GetCommand({
        TableName: TABLE_STORIES,
        Key: { siteId, langStoryId: `${lang}#${storyId}` },
      }),
    );

    if (!result.Item) {
      return NextResponse.json({ error: "Story not found" }, { status: 404 });
    }

    const s = result.Item as unknown as StoryRecord;

    // Get site title
    const siteResult = await docClient.send(
      new GetCommand({
        TableName: TABLE_SITES,
        Key: { PK: `SITE#${siteId}`, SK: "LANG#en" },
      }),
    );
    const siteTitle = (siteResult.Item?.title as string) ?? siteId;

    return NextResponse.json({
      ...s,
      characters: s.characters ?? [],
      paragraphs: s.paragraphs ?? [],
      source: s.source ?? "",
      disabled: s.disabled ?? false,
      siteTitle,
    });
  } catch (error) {
    console.error("Story detail error:", error);
    return NextResponse.json(
      { error: "Failed to fetch story" },
      { status: 500 },
    );
  }
}
