import { createRemoteJWKSet, jwtVerify } from "jose";
import { USER_POOL_ID } from "@/lib/cognito";

const REGION = process.env.AWS_REGION ?? "eu-north-1";
const JWKS_URL = `https://cognito-idp.${REGION}.amazonaws.com/${USER_POOL_ID}/.well-known/jwks.json`;
const jwks = createRemoteJWKSet(new URL(JWKS_URL));

/**
 * Verify a Cognito access token using JWKS signature verification
 * and return the `sub` claim (userId).
 */
export async function verifyCognitoToken(
  authHeader: string | null
): Promise<string | null> {
  if (!authHeader) return null;
  const token = authHeader.replace("Bearer ", "");
  try {
    const { payload } = await jwtVerify(token, jwks, {
      issuer: `https://cognito-idp.${REGION}.amazonaws.com/${USER_POOL_ID}`,
    });
    if (payload.token_use !== "access") return null;
    return (payload.sub as string) ?? null;
  } catch {
    return null;
  }
}
