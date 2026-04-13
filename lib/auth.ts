import { cookies } from "next/headers";
import { timingSafeEqual } from "crypto";
import bcrypt from "bcryptjs";
import {
  getJwtSecretKey,
  signAdminSession,
  verifyAdminSessionToken,
} from "@/lib/jwt-session";

const COOKIE_NAME = "admin_session";
const SESSION_DURATION_SEC = 24 * 60 * 60;

function secureCookie(): boolean {
  return (
    process.env.NODE_ENV === "production" || Boolean(process.env.VERCEL)
  );
}

export async function createSession(username: string) {
  const token = await signAdminSession(username);
  const jar = await cookies();
  jar.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: secureCookie(),
    sameSite: "strict",
    path: "/",
    maxAge: SESSION_DURATION_SEC,
  });
}

export async function validateSession(): Promise<string | null> {
  const jar = await cookies();
  const token = jar.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyAdminSessionToken(token);
}

export async function destroySession() {
  const jar = await cookies();
  jar.delete(COOKIE_NAME);
}

function safeEqualString(a: string, b: string): boolean {
  const ba = Buffer.from(a, "utf8");
  const bb = Buffer.from(b, "utf8");
  if (ba.length !== bb.length) return false;
  return timingSafeEqual(ba, bb);
}

/**
 * Prefer ADMIN_PASSWORD_HASH (bcrypt). ADMIN_PASSWORD is supported only for local dev.
 */
export async function validateCredentials(
  username: string,
  password: string,
): Promise<boolean> {
  const expectedUser = process.env.ADMIN_USERNAME ?? "admin";
  if (!safeEqualString(username, expectedUser)) {
    return false;
  }

  const hash = process.env.ADMIN_PASSWORD_HASH?.trim();
  if (hash) {
    try {
      return await bcrypt.compare(password, hash);
    } catch {
      return false;
    }
  }

  if (process.env.NODE_ENV === "production") {
    return false;
  }

  const plain = process.env.ADMIN_PASSWORD;
  if (!plain) return false;
  return safeEqualString(password, plain);
}

export function assertAuthEnvForLogin(): { ok: true } | { ok: false; error: string } {
  try {
    getJwtSecretKey();
  } catch {
    return {
      ok: false,
      error: "Server misconfiguration: set ADMIN_SESSION_SECRET (32+ characters).",
    };
  }

  if (
    process.env.NODE_ENV === "production" &&
    !process.env.ADMIN_PASSWORD_HASH?.trim()
  ) {
    return {
      ok: false,
      error:
        "Server misconfiguration: set ADMIN_PASSWORD_HASH in production (bcrypt).",
    };
  }

  if (
    process.env.NODE_ENV !== "production" &&
    !process.env.ADMIN_PASSWORD_HASH?.trim() &&
    !process.env.ADMIN_PASSWORD
  ) {
    return {
      ok: false,
      error:
        "Set ADMIN_PASSWORD_HASH or, for local dev only, ADMIN_PASSWORD.",
    };
  }

  return { ok: true };
}
