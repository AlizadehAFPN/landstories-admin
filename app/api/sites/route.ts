import { NextRequest, NextResponse } from "next/server";
import {
  ScanCommand,
  PutCommand,
  DeleteCommand,
  GetCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import { docClient } from "@/lib/dynamo";
import { TABLE_SITES, TABLE_STORIES } from "@/lib/constants";
import type { AdminSite, SiteRecord, ExploreCategory, LanguageCode } from "@/lib/types";

function siteKey(siteId: string, lang: LanguageCode = "en") {
  return { PK: `SITE#${siteId}`, SK: `LANG#${lang}` };
}

// GET /api/sites — list all sites, optionally filtered by ?lang=xx (returns all langs if omitted)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const langParam = searchParams.get("lang") as LanguageCode | null;

    const items: SiteRecord[] = [];
    let lastKey: Record<string, unknown> | undefined;

    do {
      const result = await docClient.send(
        new ScanCommand({
          TableName: TABLE_SITES,
          FilterExpression: langParam
            ? "lang = :lang AND begins_with(PK, :prefix)"
            : "begins_with(PK, :prefix)",
          ExpressionAttributeValues: {
            ...(langParam ? { ":lang": langParam } : {}),
            ":prefix": "SITE#",
          },
          ExclusiveStartKey: lastKey,
        })
      );
      if (result.Items) {
        items.push(...(result.Items as SiteRecord[]));
      }
      lastKey = result.LastEvaluatedKey as Record<string, unknown> | undefined;
    } while (lastKey);

    // Count enabled stories per site from the Story table (English, non-disabled only)
    const storyCounts: Record<string, number> = {};
    let storyLastKey: Record<string, unknown> | undefined;
    do {
      const result = await docClient.send(
        new ScanCommand({
          TableName: TABLE_STORIES,
          FilterExpression: "lang = :lang AND (attribute_not_exists(disabled) OR disabled = :false)",
          ExpressionAttributeValues: { ":lang": "en", ":false": false },
          ProjectionExpression: "siteId",
          ExclusiveStartKey: storyLastKey,
        })
      );
      if (result.Items) {
        for (const item of result.Items) {
          const sid = item.siteId as string;
          storyCounts[sid] = (storyCounts[sid] ?? 0) + 1;
        }
      }
      storyLastKey = result.LastEvaluatedKey as Record<string, unknown> | undefined;
    } while (storyLastKey);

    const sites: AdminSite[] = items
      .map((item) => ({
        siteId: item.siteId,
        lang: (item.lang ?? "en") as LanguageCode,
        title: item.title,
        shortDescription: item.shortDescription,
        thumbnail: item.thumbnail,
        images: item.images ?? [],
        lat: item.lat,
        lng: item.lng,
        category: item.category,
        countryId: item.countryId ?? "",
        cityId: item.cityId ?? "",
        unesco: item.unesco ?? false,
        updatedAt: item.updatedAt,
        disabled: item.disabled ?? false,
        storyCount: storyCounts[item.siteId] ?? 0,
        description: item.description ?? "",
        nameLocal: item.nameLocal ?? "",
        constructionYear: item.constructionYear ?? "",
        builder: item.builder ?? "",
        historicalPeriod: item.historicalPeriod ?? "",
        historicalSignificance: item.historicalSignificance ?? "",
        timeline: item.timeline ?? [],
        funFacts: item.funFacts ?? [],
        tags: item.tags ?? [],
      }))
      .sort((a, b) => b.updatedAt - a.updatedAt);

    return NextResponse.json(sites);
  } catch (error) {
    console.error("Sites GET error:", error);
    return NextResponse.json({ error: "Failed to fetch sites" }, { status: 500 });
  }
}

// POST /api/sites — create a new site (English) or add a translation
export async function POST(request: NextRequest) {
  const body = await request.json();
  const {
    siteId, lang: bodyLang, title, shortDescription, thumbnail,
    images,
    lat, lng, category, countryId, cityId, unesco,
    description, nameLocal, constructionYear, builder,
    historicalPeriod, historicalSignificance, timeline, funFacts, tags,
  } = body as {
    siteId: string; lang?: LanguageCode;
    title: string; shortDescription: string; thumbnail: string;
    images?: string[];
    lat: number; lng: number; category: ExploreCategory;
    countryId: string; cityId: string; unesco: boolean;
    description: string; nameLocal: string; constructionYear: string; builder: string;
    historicalPeriod: string; historicalSignificance: string;
    timeline: string[]; funFacts: string[]; tags: string[];
  };

  const lang: LanguageCode = bodyLang || "en";

  if (!siteId || !title) {
    return NextResponse.json(
      { error: "siteId and title are required" },
      { status: 400 },
    );
  }

  if (lang === "en") {
    // For English: require category & countryId, check no duplicate
    if (!category || !countryId) {
      return NextResponse.json(
        { error: "category and countryId are required for English sites" },
        { status: 400 },
      );
    }
    const existing = await docClient.send(
      new GetCommand({ TableName: TABLE_SITES, Key: siteKey(siteId, "en") }),
    );
    if (existing.Item) {
      return NextResponse.json(
        { error: "A site with this ID already exists" },
        { status: 409 },
      );
    }
  } else {
    // For translations: English version must exist
    const enVersion = await docClient.send(
      new GetCommand({ TableName: TABLE_SITES, Key: siteKey(siteId, "en") }),
    );
    if (!enVersion.Item) {
      return NextResponse.json(
        { error: "English version of this site must exist first" },
        { status: 400 },
      );
    }
    // Check translation doesn't already exist
    const existing = await docClient.send(
      new GetCommand({ TableName: TABLE_SITES, Key: siteKey(siteId, lang) }),
    );
    if (existing.Item) {
      return NextResponse.json(
        { error: `${lang} version already exists` },
        { status: 409 },
      );
    }
  }

  const now = Math.floor(Date.now() / 1000);
  try {
    await docClient.send(
      new PutCommand({
        TableName: TABLE_SITES,
        Item: {
          PK: `SITE#${siteId}`,
          SK: `LANG#${lang}`,
          "GSI1-PK": `CAT#${category}`,
          "GSI1-SK": now,
          "GSI2-PK": `LANG#${lang}`,
          "GSI2-SK": now,
          siteId,
          lang,
          title,
          shortDescription: shortDescription ?? "",
          thumbnail: thumbnail ?? "",
          ...(images && images.length > 0 ? { images } : {}),
          lat: lat ?? 0,
          lng: lng ?? 0,
          category,
          countryId: countryId ?? "",
          cityId: cityId ?? "",
          unesco: unesco ?? false,
          updatedAt: now,
          description: description ?? "",
          ...(nameLocal ? { nameLocal } : {}),
          ...(constructionYear ? { constructionYear } : {}),
          ...(builder ? { builder } : {}),
          ...(historicalPeriod ? { historicalPeriod } : {}),
          ...(historicalSignificance ? { historicalSignificance } : {}),
          ...(timeline && timeline.length > 0 ? { timeline } : {}),
          ...(funFacts && funFacts.length > 0 ? { funFacts } : {}),
          ...(tags && tags.length > 0 ? { tags } : {}),
          disabled: true,
        },
      }),
    );
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Sites POST error:", error);
    return NextResponse.json({ error: "Failed to create site" }, { status: 500 });
  }
}

// PUT /api/sites — update a site
export async function PUT(request: NextRequest) {
  const body = await request.json();
  const {
    siteId, lang: bodyLang, title, shortDescription, thumbnail,
    images,
    lat, lng, category, countryId, cityId, unesco,
    description, nameLocal, constructionYear, builder,
    historicalPeriod, historicalSignificance, timeline, funFacts, tags,
  } = body as {
    siteId: string; lang?: LanguageCode;
    title: string; shortDescription: string; thumbnail: string;
    images?: string[];
    lat: number; lng: number; category: ExploreCategory;
    countryId: string; cityId: string; unesco: boolean;
    description: string; nameLocal: string; constructionYear: string; builder: string;
    historicalPeriod: string; historicalSignificance: string;
    timeline: string[]; funFacts: string[]; tags: string[];
  };

  const lang: LanguageCode = bodyLang || "en";

  if (!siteId || !title || !category || !countryId) {
    return NextResponse.json(
      { error: "siteId, title, category, and countryId are required" },
      { status: 400 },
    );
  }

  const existing = await docClient.send(
    new GetCommand({ TableName: TABLE_SITES, Key: siteKey(siteId, lang) }),
  );
  if (!existing.Item) {
    return NextResponse.json({ error: "Site not found" }, { status: 404 });
  }

  const now = Math.floor(Date.now() / 1000);
  try {
    await docClient.send(
      new PutCommand({
        TableName: TABLE_SITES,
        Item: {
          ...existing.Item,
          title,
          shortDescription: shortDescription ?? "",
          thumbnail: thumbnail ?? "",
          images: images && images.length > 0 ? images : undefined,
          lat: lat ?? 0,
          lng: lng ?? 0,
          category,
          "GSI1-PK": `CAT#${category}`,
          "GSI1-SK": now,
          countryId,
          cityId: cityId ?? "",
          unesco: unesco ?? false,
          updatedAt: now,
          "GSI2-SK": now,
          description: description ?? "",
          nameLocal: nameLocal || undefined,
          constructionYear: constructionYear || undefined,
          builder: builder || undefined,
          historicalPeriod: historicalPeriod || undefined,
          historicalSignificance: historicalSignificance || undefined,
          timeline: timeline && timeline.length > 0 ? timeline : undefined,
          funFacts: funFacts && funFacts.length > 0 ? funFacts : undefined,
          tags: tags && tags.length > 0 ? tags : undefined,
        },
      }),
    );
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Sites PUT error:", error);
    return NextResponse.json({ error: "Failed to update site" }, { status: 500 });
  }
}

// PATCH /api/sites — toggle disabled status
export async function PATCH(request: NextRequest) {
  const { siteId, lang: bodyLang, disabled } = await request.json();
  if (!siteId || typeof disabled !== "boolean") {
    return NextResponse.json(
      { error: "siteId and disabled (boolean) are required" },
      { status: 400 },
    );
  }

  const lang: LanguageCode = bodyLang || "en";

  try {
    const now = Math.floor(Date.now() / 1000);
    await docClient.send(
      new UpdateCommand({
        TableName: TABLE_SITES,
        Key: siteKey(siteId, lang),
        UpdateExpression: "SET disabled = :d, updatedAt = :u, #gsi2sk = :u",
        ExpressionAttributeNames: { "#gsi2sk": "GSI2-SK" },
        ExpressionAttributeValues: { ":d": disabled, ":u": now },
      }),
    );
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Sites PATCH error:", error);
    return NextResponse.json({ error: "Failed to update site status" }, { status: 500 });
  }
}

// DELETE /api/sites — delete a site language version
export async function DELETE(request: NextRequest) {
  const { siteId, lang: bodyLang } = await request.json();
  if (!siteId) {
    return NextResponse.json({ error: "siteId is required" }, { status: 400 });
  }

  const lang: LanguageCode = bodyLang || "en";

  try {
    await docClient.send(
      new DeleteCommand({ TableName: TABLE_SITES, Key: siteKey(siteId, lang) }),
    );
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Sites DELETE error:", error);
    return NextResponse.json({ error: "Failed to delete site" }, { status: 500 });
  }
}
