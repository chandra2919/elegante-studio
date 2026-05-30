/** @type {import('next').NextConfig} */
const nextConfig = {
  // ── Image optimization ─────────────────────────────────────
  images: {
    formats: ["image/avif", "image/webp"], // serve AVIF first, then WebP
    deviceSizes: [640, 750, 828, 1080, 1200, 1920], // standard breakpoints
    imageSizes:  [16, 32, 48, 64, 96, 128, 256, 384], // icon/thumbnail sizes
    minimumCacheTTL: 31536000, // 1 year cache for optimised images
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // ── Headers for caching & security ─────────────────────────
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options",    value: "nosniff"       },
          { key: "X-Frame-Options",           value: "DENY"          },
          { key: "X-XSS-Protection",          value: "1; mode=block" },
          { key: "Referrer-Policy",           value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy",        value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
      {
        // Long-lived cache for static assets
        source: "/images/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/_next/static/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },

  // ── Compression ─────────────────────────────────────────────
  compress: true,

  // ── Reduce build output noise ───────────────────────────────
  poweredByHeader: false,

  // ── TypeScript & ESLint ─────────────────────────────────────
  typescript: { ignoreBuildErrors: false },
  eslint:     { ignoreDuringBuilds: false },
};

export default nextConfig;
