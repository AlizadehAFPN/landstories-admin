import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import {
  BatchWriteCommand,
  QueryCommand,
} from "@aws-sdk/lib-dynamodb";
import { docClient } from "@/lib/dynamo";
import { TABLE_ANALYTICS_EVENTS } from "@/lib/constants";
import { verifyCognitoToken } from "@/lib/verify-cognito";
import type { AnalyticsEventInput, AnalyticsEventType } from "@/lib/types";

const EVENT_TYPES: AnalyticsEventType[] = [
  "story_click",
  "site_click",
  "audio_play",
];

const TTL_DAYS = 180;

// ─── POST: ingest events from mobile app ────────────────────

export async function POST(request: NextRequest) {
  const userId = await verifyCognitoToken(
    request.headers.get("authorization")
  );
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { events?: AnalyticsEventInput[] };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const events = body.events;
  if (!Array.isArray(events) || events.length === 0 || events.length > 25) {
    return NextResponse.json(
      { error: "events array required (1-25 items)" },
      { status: 400 }
    );
  }

  const now = Math.floor(Date.now() / 1000);
  const ttl = now + TTL_DAYS * 86400;

  const putRequests = events
    .filter((e) => EVENT_TYPES.includes(e.eventType))
    .map((e) => {
      const ts = e.timestamp ?? now;
      const isoDate = new Date(ts * 1000).toISOString();
      const dateStr = isoDate.slice(0, 10); // YYYY-MM-DD
      const sk = `${isoDate}#${randomUUID()}`;
      const targetId = e.storyId ?? e.siteId ?? "unknown";

      return {
        PutRequest: {
          Item: {
            PK: `EVENT#${e.eventType}`,
            SK: sk,
            "GSI1-PK": `TARGET#${targetId}`,
            "GSI1-SK": sk,
            "GSI2-PK": `DATE#${dateStr}`,
            "GSI2-SK": sk,
            userId,
            eventType: e.eventType,
            timestamp: ts,
            date: dateStr,
            ...(e.storyId ? { storyId: e.storyId } : {}),
            ...(e.siteId ? { siteId: e.siteId } : {}),
            ...(e.storyTitle ? { storyTitle: e.storyTitle } : {}),
            ...(e.siteTitle ? { siteTitle: e.siteTitle } : {}),
            ...(e.lang ? { lang: e.lang } : {}),
            ...(e.audioProvider ? { audioProvider: e.audioProvider } : {}),
            ...(e.platform ? { platform: e.platform } : {}),
            ttl,
          },
        },
      };
    });

  if (putRequests.length === 0) {
    return NextResponse.json({ error: "No valid events" }, { status: 400 });
  }

  // BatchWrite supports max 25 items
  await docClient.send(
    new BatchWriteCommand({
      RequestItems: { [TABLE_ANALYTICS_EVENTS]: putRequests },
    })
  );

  return NextResponse.json({ accepted: putRequests.length });
}

// ─── GET: query events for dashboard ────────────────────────

export async function GET(request: NextRequest) {
  const report = request.nextUrl.searchParams.get("report") ?? "summary";
  const days = Number(request.nextUrl.searchParams.get("days") ?? "30");

  const now = new Date();
  const startDate = new Date(now);
  startDate.setDate(startDate.getDate() - days);
  const startISO = startDate.toISOString();

  try {
    switch (report) {
      case "summary":
        return NextResponse.json(await getSummary(startISO));

      case "timeseries":
        return NextResponse.json(await getTimeSeries(startISO, days));

      case "top-stories":
        return NextResponse.json(
          await getTopContent("story_click", "storyId", "storyTitle", startISO)
        );

      case "top-sites":
        return NextResponse.json(
          await getTopContent("site_click", "siteId", "siteTitle", startISO)
        );

      case "recent":
        return NextResponse.json(await getRecent());

      default:
        return NextResponse.json(
          { error: "Invalid report type" },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error("Analytics events error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to fetch analytics";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// ─── Query helpers ──────────────────────────────────────────

async function countByType(
  eventType: string,
  startISO: string
): Promise<number> {
  const result = await docClient.send(
    new QueryCommand({
      TableName: TABLE_ANALYTICS_EVENTS,
      KeyConditionExpression: "PK = :pk AND SK >= :start",
      ExpressionAttributeValues: {
        ":pk": `EVENT#${eventType}`,
        ":start": startISO,
      },
      Select: "COUNT",
    })
  );
  return result.Count ?? 0;
}

async function getSummary(startISO: string) {
  const [storyClicks, siteClicks, audioPlays] = await Promise.all([
    countByType("story_click", startISO),
    countByType("site_click", startISO),
    countByType("audio_play", startISO),
  ]);
  return { storyClicks, siteClicks, audioPlays };
}

async function getTimeSeries(startISO: string, days: number) {
  // Query all events for each type in the range, then bucket by date
  const fetchEvents = async (eventType: string) => {
    const items: { date: string }[] = [];
    let lastKey: Record<string, unknown> | undefined;

    do {
      const result = await docClient.send(
        new QueryCommand({
          TableName: TABLE_ANALYTICS_EVENTS,
          KeyConditionExpression: "PK = :pk AND SK >= :start",
          ExpressionAttributeValues: {
            ":pk": `EVENT#${eventType}`,
            ":start": startISO,
          },
          ProjectionExpression: "#d",
          ExpressionAttributeNames: { "#d": "date" },
          ExclusiveStartKey: lastKey,
        })
      );
      if (result.Items) {
        items.push(...(result.Items as { date: string }[]));
      }
      lastKey = result.LastEvaluatedKey as
        | Record<string, unknown>
        | undefined;
    } while (lastKey);

    return items;
  };

  const [storyItems, siteItems, audioItems] = await Promise.all([
    fetchEvents("story_click"),
    fetchEvents("site_click"),
    fetchEvents("audio_play"),
  ]);

  // Build date buckets
  const buckets: Record<
    string,
    { storyClicks: number; siteClicks: number; audioPlays: number }
  > = {};

  // Initialize all dates in range
  for (let i = 0; i <= days; i++) {
    const d = new Date();
    d.setDate(d.getDate() - (days - i));
    const key = d.toISOString().slice(0, 10);
    buckets[key] = { storyClicks: 0, siteClicks: 0, audioPlays: 0 };
  }

  for (const item of storyItems)
    if (buckets[item.date]) buckets[item.date].storyClicks++;
  for (const item of siteItems)
    if (buckets[item.date]) buckets[item.date].siteClicks++;
  for (const item of audioItems)
    if (buckets[item.date]) buckets[item.date].audioPlays++;

  const rows = Object.entries(buckets)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, counts]) => ({ date, ...counts }));

  return { rows };
}

async function getTopContent(
  eventType: string,
  idField: string,
  titleField: string,
  startISO: string
) {
  const items: Record<string, unknown>[] = [];
  let lastKey: Record<string, unknown> | undefined;

  do {
    const result = await docClient.send(
      new QueryCommand({
        TableName: TABLE_ANALYTICS_EVENTS,
        KeyConditionExpression: "PK = :pk AND SK >= :start",
        ExpressionAttributeValues: {
          ":pk": `EVENT#${eventType}`,
          ":start": startISO,
        },
        ProjectionExpression: `${idField}, ${titleField}`,
        ExclusiveStartKey: lastKey,
      })
    );
    if (result.Items) {
      items.push(...result.Items);
    }
    lastKey = result.LastEvaluatedKey as
      | Record<string, unknown>
      | undefined;
  } while (lastKey);

  // Aggregate by id
  const counts: Record<string, { title: string; clicks: number }> = {};
  for (const item of items) {
    const id = item[idField] as string;
    if (!id) continue;
    if (!counts[id]) {
      counts[id] = {
        title: (item[titleField] as string) ?? id,
        clicks: 0,
      };
    }
    counts[id].clicks++;
  }

  const rows = Object.entries(counts)
    .map(([id, data]) => ({ id, ...data }))
    .sort((a, b) => b.clicks - a.clicks)
    .slice(0, 10);

  return { rows };
}

async function getRecent() {
  // Query today and yesterday from GSI2 to get recent events
  const today = new Date().toISOString().slice(0, 10);
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);

  const queryDay = async (dateStr: string) => {
    const result = await docClient.send(
      new QueryCommand({
        TableName: TABLE_ANALYTICS_EVENTS,
        IndexName: "GSI2",
        KeyConditionExpression: "#pk = :pk",
        ExpressionAttributeNames: { "#pk": "GSI2-PK" },
        ExpressionAttributeValues: { ":pk": `DATE#${dateStr}` },
        ScanIndexForward: false,
        Limit: 20,
      })
    );
    return result.Items ?? [];
  };

  const [todayItems, yesterdayItems] = await Promise.all([
    queryDay(today),
    queryDay(yesterday),
  ]);

  const all = [...todayItems, ...yesterdayItems]
    .sort(
      (a, b) =>
        (b.timestamp as number) - (a.timestamp as number)
    )
    .slice(0, 20)
    .map((item) => ({
      eventType: item.eventType as string,
      storyTitle: item.storyTitle as string | undefined,
      siteTitle: item.siteTitle as string | undefined,
      userId: item.userId as string,
      timestamp: item.timestamp as number,
      lang: item.lang as string | undefined,
      audioProvider: item.audioProvider as string | undefined,
    }));

  return { rows: all };
}
