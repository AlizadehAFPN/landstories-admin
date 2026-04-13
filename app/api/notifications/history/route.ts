import { NextRequest, NextResponse } from "next/server";
import { ScanCommand } from "@aws-sdk/lib-dynamodb";
import { docClient } from "@/lib/dynamo";
import { TABLE_NOTIFICATION_LOG } from "@/lib/constants";
import type { NotificationLogRecord } from "@/lib/types";

// GET /api/notifications/history?limit=20
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = Math.min(
      parseInt(searchParams.get("limit") ?? "50", 10),
      100
    );

    // Scan all and sort client-side (table is small)
    const items: NotificationLogRecord[] = [];
    let lastKey: Record<string, unknown> | undefined;

    do {
      const result = await docClient.send(
        new ScanCommand({
          TableName: TABLE_NOTIFICATION_LOG,
          ExclusiveStartKey: lastKey,
        })
      );
      if (result.Items) {
        items.push(...(result.Items as NotificationLogRecord[]));
      }
      lastKey = result.LastEvaluatedKey as
        | Record<string, unknown>
        | undefined;
    } while (lastKey);

    // Sort by sentAt descending (most recent first)
    items.sort((a, b) => b.sentAt - a.sentAt);

    // Apply limit
    const limited = items.slice(0, limit);

    return NextResponse.json({ notifications: limited, total: items.length });
  } catch (error) {
    console.error("Notification history error:", error);
    return NextResponse.json(
      { error: "Failed to fetch notification history" },
      { status: 500 }
    );
  }
}
