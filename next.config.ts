import type { NextConfig } from "next";

/**
 * Baseline security headers for every response.
 *
 * No Content-Security-Policy here on purpose: the site relies on inline
 * JSON-LD, Next.js inline bootstrap scripts and WebGL (three.js), and a CSP
 * needs nonces wired through the proxy before it can be enforced safely.
 * Add it via src/proxy.ts (report-only first) when that work is scheduled.
 */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

/**
 * public/media (video, frame sequences, stills) and public/data (globe data)
 * are cached for a year and treated as immutable in production. When a file's
 * content changes, publish it under a new name (see docs/DEPLOYMENT.md).
 * Development keeps Next.js defaults so regenerated media shows up at once.
 */
const immutable = [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }];
const isProduction = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  /** Consolidated pages keep their old URLs working. */
  async redirects() {
    return [
      { source: "/:locale(en|pl|nl|fr)/businesses", destination: "/:locale/trade", permanent: true },
      { source: "/:locale(en|pl|nl|fr)/leadership", destination: "/:locale/about#leadership", permanent: true },
      { source: "/:locale(en|pl|nl|fr)/sectors", destination: "/:locale/trade", permanent: true },
    ];
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      ...(isProduction
        ? [
            { source: "/media/:path*", headers: immutable },
            { source: "/data/:path*", headers: immutable },
          ]
        : []),
    ];
  },
};

export default nextConfig;
