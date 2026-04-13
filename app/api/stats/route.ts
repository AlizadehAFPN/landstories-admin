import { NextResponse } from "next/server";
import { ScanCommand } from "@aws-sdk/lib-dynamodb";
import { docClient } from "@/lib/dynamo";
import { TABLE_SITES, TABLE_STORIES } from "@/lib/constants";
import type { DashboardStats, Tier } from "@/lib/types";

export async function GET() {
  try {
    // Scan all site records (English only)
    const siteItems: Record<string, unknown>[] = [];
    let lastKey: Record<string, unknown> | undefined;

    do {
      const result = await docClient.send(
        new ScanCommand({
          TableName: TABLE_SITES,
          FilterExpression: "lang = :lang AND begins_with(PK, :prefix)",
          ExpressionAttributeValues: { ":lang": "en", ":prefix": "SITE#" },
          ExclusiveStartKey: lastKey,
        })
      );
      if (result.Items) {
        siteItems.push(...result.Items);
      }
      lastKey = result.LastEvaluatedKey as Record<string, unknown> | undefined;
    } while (lastKey);

    // Scan all story records (English only)
    const storyItems: Record<string, unknown>[] = [];
    let storyLastKey: Record<string, unknown> | undefined;

    do {
      const result = await docClient.send(
        new ScanCommand({
          TableName: TABLE_STORIES,
          FilterExpression: "lang = :lang",
          ExpressionAttributeValues: { ":lang": "en" },
          ExclusiveStartKey: storyLastKey,
        })
      );
      if (result.Items) {
        storyItems.push(...result.Items);
      }
      storyLastKey = result.LastEvaluatedKey as Record<string, unknown> | undefined;
    } while (storyLastKey);

    // Compute stats from sites
    const countryIds = new Set<string>();
    const exploreCategories = new Set<string>();

    for (const site of siteItems) {
      countryIds.add(site.countryId as string);
      exploreCategories.add(site.category as string);
    }

    // Compute stats from stories
    const storyCategories = new Set<string>();
    const tiers: Record<Tier, number> = { S: 0, A: 0, B: 0, C: 0 };

    for (const story of storyItems) {
      storyCategories.add(story.storyCategory as string);
      const tier = story.tier as Tier;
      if (tier in tiers) {
        tiers[tier]++;
      }
    }

    // Count languages by scanning sites without filter (just count unique langs)
    const langResult = await docClient.send(
      new ScanCommand({
        TableName: TABLE_SITES,
        ProjectionExpression: "lang",
        FilterExpression: "begins_with(PK, :prefix)",
        ExpressionAttributeValues: { ":prefix": "SITE#" },
      })
    );
    const languages = new Set(
      langResult.Items?.map((i) => i.lang as string) ?? []
    );

    const stats: DashboardStats = {
      totalSites: siteItems.length,
      totalStories: storyItems.length,
      languages: languages.size,
      categories: {
        explore: exploreCategories.size,
        story: storyCategories.size,
      },
      countryIds: Array.from(countryIds).sort(),
      tiers,
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error("Stats error:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
