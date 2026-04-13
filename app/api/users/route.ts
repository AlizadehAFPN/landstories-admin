import { NextRequest, NextResponse } from "next/server";
import {
  ListUsersCommand,
  type AttributeType,
} from "@aws-sdk/client-cognito-identity-provider";
import { cognitoClient, USER_POOL_ID } from "@/lib/cognito";
import type { CognitoUser } from "@/lib/types";

function getAttr(
  attrs: AttributeType[] | undefined,
  name: string
): string | undefined {
  return attrs?.find((a) => a.Name === name)?.Value;
}

function detectProvider(
  attrs: AttributeType[] | undefined,
  username?: string
): string {
  const identities = getAttr(attrs, "identities");
  if (identities) {
    try {
      const parsed = JSON.parse(identities);
      if (parsed[0]?.providerName === "Google") return "Google";
      if (parsed[0]?.providerName === "SignInWithApple") return "Apple";
    } catch {
      /* ignore */
    }
  }
  if (username?.startsWith("google_")) return "Google";
  if (username?.startsWith("signinwithapple_")) return "Apple";
  if (getAttr(attrs, "phone_number")) return "Phone";
  return "Email";
}

// GET /api/users?limit=60&token=xxx&filter=xxx
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const limit = Math.min(Number(searchParams.get("limit") ?? "60"), 60);
    const paginationToken = searchParams.get("token") || undefined;
    const filter = searchParams.get("filter") || undefined;

    const command = new ListUsersCommand({
      UserPoolId: USER_POOL_ID,
      Limit: limit,
      PaginationToken: paginationToken,
      ...(filter ? { Filter: `email ^= "${filter}"` } : {}),
    });

    const result = await cognitoClient.send(command);

    const users: CognitoUser[] = (result.Users ?? []).map((u) => {
      const givenName = getAttr(u.Attributes, "given_name");
      const familyName = getAttr(u.Attributes, "family_name");
      const fullName = getAttr(u.Attributes, "name") ??
        (givenName || familyName
          ? [givenName, familyName].filter(Boolean).join(" ")
          : undefined);

      return {
      userId: getAttr(u.Attributes, "sub") ?? u.Username ?? "",
      email: getAttr(u.Attributes, "email"),
      name: fullName,
      phoneNumber: getAttr(u.Attributes, "phone_number"),
      picture: getAttr(u.Attributes, "picture"),
      locale: getAttr(u.Attributes, "locale"),
      provider: detectProvider(u.Attributes, u.Username),
      enabled: u.Enabled ?? true,
      createdAt: u.UserCreateDate?.toISOString(),
      status: u.UserStatus,
    };
    });

    return NextResponse.json({
      users,
      nextToken: result.PaginationToken ?? null,
    });
  } catch (error) {
    console.error("Users GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
