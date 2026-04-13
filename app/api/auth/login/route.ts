import { NextRequest, NextResponse } from "next/server";
import {
  assertAuthEnvForLogin,
  createSession,
  validateCredentials,
} from "@/lib/auth";

function loginFailureDelay(): Promise<void> {
  const ms = 600 + Math.floor(Math.random() * 900);
  return new Promise((r) => setTimeout(r, ms));
}

export async function POST(request: NextRequest) {
  const envCheck = assertAuthEnvForLogin();
  if (!envCheck.ok) {
    return NextResponse.json({ error: envCheck.error }, { status: 500 });
  }

  let body: { username?: string; password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { username, password } = body;

  if (
    typeof username !== "string" ||
    typeof password !== "string" ||
    !username ||
    !password
  ) {
    return NextResponse.json(
      { error: "Username and password are required" },
      { status: 400 },
    );
  }

  if (username.length > 128 || password.length > 256) {
    await loginFailureDelay();
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const ok = await validateCredentials(username, password);
  if (!ok) {
    await loginFailureDelay();
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  await createSession(username);
  return NextResponse.json({ success: true });
}
