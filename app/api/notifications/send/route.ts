import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { PutCommand, QueryCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { docClient } from "@/lib/dynamo";
import { TABLE_DEVICE_TOKENS, TABLE_NOTIFICATION_LOG } from "@/lib/constants";
import { getAdminMessaging } from "@/lib/firebase-admin";
import type { NotificationPayload, NotificationTarget } from "@/lib/types";

// POST /api/notifications/send
export async function POST(request: NextRequest) {
  try {
    const { payload, target } = (await request.json()) as {
      payload: NotificationPayload;
      target: NotificationTarget;
    };

    if (!payload?.title || !payload?.body) {
      return NextResponse.json(
        { error: "title and body are required" },
        { status: 400 }
      );
    }

    const messaging = getAdminMessaging();

    const notification: { title: string; body: string; imageUrl?: string } = {
      title: payload.title,
      body: payload.body,
    };
    if (payload.imageUrl) notification.imageUrl = payload.imageUrl;

    const data: Record<string, string> = {};
    if (payload.type) data.type = payload.type;
    if (payload.storyId) data.storyId = payload.storyId;
    if (payload.siteId) data.siteId = payload.siteId;
    if (payload.categoryId) data.categoryId = payload.categoryId;

    let successCount = 0;
    let failureCount = 0;

    if (target.mode === "topic") {
      // Send to a topic (e.g., "all", "new_stories")
      const topicName = target.topic ?? "all";
      await messaging.send({
        topic: topicName,
        notification,
        data,
        android: { priority: "high" },
        apns: { payload: { aps: { sound: "default" } } },
      });
      successCount = 1;
    } else if (target.mode === "broadcast") {
      // Scan all device tokens and multicast
      const allTokens: string[] = [];
      let lastKey: Record<string, unknown> | undefined;

      do {
        const result = await docClient.send(
          new ScanCommand({
            TableName: TABLE_DEVICE_TOKENS,
            ProjectionExpression: "#tk",
            ExpressionAttributeNames: { "#tk": "token" },
            ExclusiveStartKey: lastKey,
          })
        );
        if (result.Items) {
          allTokens.push(...result.Items.map((i) => i.token as string));
        }
        lastKey = result.LastEvaluatedKey as
          | Record<string, unknown>
          | undefined;
      } while (lastKey);

      if (allTokens.length === 0) {
        // Fallback: send to "all" topic if no tokens registered
        await messaging.send({
          topic: "all",
          notification,
          data,
          android: { priority: "high" },
          apns: { payload: { aps: { sound: "default" } } },
        });
        successCount = 1;
      } else {
        // Send in batches of 500 (FCM multicast limit)
        for (let i = 0; i < allTokens.length; i += 500) {
          const batch = allTokens.slice(i, i + 500);
          const result = await messaging.sendEachForMulticast({
            tokens: batch,
            notification,
            data,
            android: { priority: "high" },
            apns: { payload: { aps: { sound: "default" } } },
          });
          successCount += result.successCount;
          failureCount += result.failureCount;
        }
      }
    } else if (target.mode === "users" && target.userIds?.length) {
      // Targeted: look up tokens for each userId
      const tokens: string[] = [];
      for (const userId of target.userIds) {
        const result = await docClient.send(
          new QueryCommand({
            TableName: TABLE_DEVICE_TOKENS,
            KeyConditionExpression: "userId = :uid",
            ExpressionAttributeValues: { ":uid": userId },
          })
        );
        if (result.Items) {
          tokens.push(...result.Items.map((i) => i.token as string));
        }
      }

      if (tokens.length === 0) {
        return NextResponse.json(
          { error: "No device tokens found for selected users" },
          { status: 404 }
        );
      }

      for (let i = 0; i < tokens.length; i += 500) {
        const batch = tokens.slice(i, i + 500);
        const result = await messaging.sendEachForMulticast({
          tokens: batch,
          notification,
          data,
          android: { priority: "high" },
          apns: { payload: { aps: { sound: "default" } } },
        });
        successCount += result.successCount;
        failureCount += result.failureCount;
      }
    } else {
      return NextResponse.json(
        { error: "Invalid target mode" },
        { status: 400 }
      );
    }

    // Log to NotificationLog table
    const logId = randomUUID();
    const sentAt = Math.floor(Date.now() / 1000);
    await docClient.send(
      new PutCommand({
        TableName: TABLE_NOTIFICATION_LOG,
        Item: {
          id: logId,
          sentAt,
          title: payload.title,
          body: payload.body,
          ...(payload.imageUrl ? { imageUrl: payload.imageUrl } : {}),
          ...(payload.type ? { type: payload.type } : {}),
          targetMode: target.mode,
          ...(target.topic ? { topic: target.topic } : {}),
          ...(target.userIds?.length ? { targetUserIds: target.userIds } : {}),
          successCount,
          failureCount,
          ...(payload.storyId ? { storyId: payload.storyId } : {}),
          ...(payload.siteId ? { siteId: payload.siteId } : {}),
          ...(payload.categoryId ? { categoryId: payload.categoryId } : {}),
        },
      })
    );

    return NextResponse.json({ successCount, failureCount });
  } catch (error) {
    console.error("Notification send error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to send notification";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
