/** @type {import('next').NextConfig} */
const nextConfig = {
  // ── Image optimization ─────────────────────────────────────────
  images: {
    formats: ["image/avif", "image/webp"],
    // Since all images are now WebP, Next.js re-encodes to AVIF/WebP on request
    deviceSizes: [640, 750, 828, 1080, 1200, 1440, 1920],
    imageSizes:  [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year
    dangerouslyAllowSVG: false,
    contentDispositionType: "attachment",
  },

  // ── HTTP Headers ───────────────────────────────────────────────
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options",    value: "nosniff"                        },
          { key: "X-Frame-Options",           value: "DENY"                           },
          { key: "X-XSS-Protection",          value: "1; mode=block"                  },
          { key: "Referrer-Policy",           value: "strict-origin-when-cross-origin"},
          { key: "Permissions-Policy",        value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
      {
        // Immutable cache for all static assets
        source: "/_next/static/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        // Immutable cache for public images (they are content-addressed after deploy)
        source: "/images/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },

  // ── Compression (gzip + brotli via Node HTTP server) ──────────
  compress: true,

  // ── Misc ───────────────────────────────────────────────────────
  poweredByHeader: false,
  reactStrictMode: true,

  // ── Tree-shake heavy packages ──────────────────────────────────
  experimental: {
    optimizePackageImports: ["framer-motion", "gsap"],
  },

  // ── TypeScript & ESLint ────────────────────────────────────────
  typescript: { ignoreBuildErrors: false },
  eslint:     { ignoreDuringBuilds: false },
};

export default nextConfig;
