import { SignJWT, jwtVerify } from "jose";

const MIN_SECRET_LENGTH = 32;

/** Throws if ADMIN_SESSION_SECRET is not usable (used to validate env at login). */
export function getJwtSecretKey(): Uint8Array {
  const s = process.env.ADMIN_SESSION_SECRET;
  if (!s || s.length < MIN_SECRET_LENGTH) {
    throw new Error(
      `ADMIN_SESSION_SECRET is missing or shorter than ${MIN_SECRET_LENGTH} characters`,
    );
  }
  return new TextEncoder().encode(s);
}

export async function signAdminSession(username: string): Promise<string> {
  const key = getJwtSecretKey();
  return new SignJWT({})
    .setSubject(username)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(key);
}

export async function verifyAdminSessionToken(
  token: string,
): Promise<string | null> {
  try {
    const key = getJwtSecretKey();
    const { payload } = await jwtVerify(token, key, {
      algorithms: ["HS256"],
    });
    return payload.sub ?? null;
  } catch {
    return null;
  }
}
