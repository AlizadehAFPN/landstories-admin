import type { NextConfig } from "next";

// Avoid `turbopack.root: __dirname` with Next 16 Turbopack — it can break `@import "tailwindcss"` (parent-dir resolution).

const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const nextConfig: NextConfig = {
  async headers() {
    // Do not attach these HTML-oriented headers to `/_next/static/*`.
    // Some networks / security tools mishandle nosniff (or other flags) on
    // long-lived CSS/JS chunks, which can leave the page unstyled in Chrome.
    return [
      { source: "/", headers: securityHeaders },
      { source: "/login", headers: securityHeaders },
      { source: "/dashboard/:path*", headers: securityHeaders },
    ];
  },
};

export default nextConfig;
