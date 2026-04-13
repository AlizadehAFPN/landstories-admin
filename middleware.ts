import { NextRequest, NextResponse } from "next/server";
import { verifyAdminSessionToken } from "@/lib/jwt-session";

const CORS_PATHS = ["/api/device-tokens", "/api/analytics/events"] as const;

function isCorsPublicPath(pathname: string): boolean {
  return CORS_PATHS.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );
}

function applyCors(response: NextResponse): NextResponse {
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization",
  );
  return response;
}

function corsPreflightResponse(): NextResponse {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

function isAuthPublicPath(pathname: string, method: string): boolean {
  if (pathname === "/api/auth/login" && method === "POST") return true;
  if (pathname === "/api/auth/logout" && method === "POST") return true;
  return false;
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const method = request.method;

  if (isCorsPublicPath(pathname)) {
    if (method === "OPTIONS") {
      return corsPreflightResponse();
    }
    return applyCors(NextResponse.next());
  }

  if (pathname.startsWith("/api/") && isAuthPublicPath(pathname, method)) {
    return NextResponse.next();
  }

  const needsSession =
    pathname.startsWith("/dashboard") || pathname.startsWith("/api/");

  if (!needsSession) {
    return NextResponse.next();
  }

  const token = request.cookies.get("admin_session")?.value;
  if (!token) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const username = await verifyAdminSessionToken(token);
  if (!username) {
    if (pathname.startsWith("/api/")) {
      const res = NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      res.cookies.delete("admin_session");
      return res;
    }
    const res = NextResponse.redirect(new URL("/login", request.url));
    res.cookies.delete("admin_session");
    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/api/:path*"],
};
