import { NextRequest, NextResponse } from "next/server";
import { PutCommand, DeleteCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { docClient } from "@/lib/dynamo";
import { TABLE_DEVICE_TOKENS } from "@/lib/constants";
import { verifyCognitoToken } from "@/lib/verify-cognito";
import type { DevicePlatform } from "@/lib/types";

// POST — register a device token
export async function POST(request: NextRequest) {
  const userId = await verifyCognitoToken(request.headers.get("authorization"));
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { token, platform, appVersion } = (await request.json()) as {
    token: string;
    platform: DevicePlatform;
    appVersion?: string;
  };

  if (!token || !platform) {
    return NextResponse.json(
      { error: "token and platform are required" },
      { status: 400 }
    );
  }

  const now = Math.floor(Date.now() / 1000);
  const ttl = now + 90 * 24 * 60 * 60; // 90 days

  await docClient.send(
    new PutCommand({
      TableName: TABLE_DEVICE_TOKENS,
      Item: { userId, token, platform, appVersion, updatedAt: now, ttl },
    })
  );

  return NextResponse.json({ success: true });
}

// DELETE — unregister a device token
export async function DELETE(request: NextRequest) {
  const userId = await verifyCognitoToken(request.headers.get("authorization"));
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { token } = (await request.json()) as { token: string };
  if (!token) {
    return NextResponse.json({ error: "token is required" }, { status: 400 });
  }

  await docClient.send(
    new DeleteCommand({
      TableName: TABLE_DEVICE_TOKENS,
      Key: { userId, token },
    })
  );

  return NextResponse.json({ success: true });
}

// GET — admin lookup: /api/device-tokens?userId=xxx
export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get("userId");
  if (!userId) {
    return NextResponse.json({ error: "userId required" }, { status: 400 });
  }

  const result = await docClient.send(
    new QueryCommand({
      TableName: TABLE_DEVICE_TOKENS,
      KeyConditionExpression: "userId = :uid",
      ExpressionAttributeValues: { ":uid": userId },
    })
  );

  return NextResponse.json(result.Items ?? []);
}
