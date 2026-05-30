import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar }               from "@/components/layout/Navbar";
import { Footer }               from "@/components/layout/Footer";
import { SmoothScrollProvider }  from "@/components/providers/SmoothScrollProvider";
import { CustomCursor }          from "@/components/ui/CustomCursor";
import { ScrollProgress }        from "@/components/ui/ScrollProgress";
import { PageLoader }            from "@/components/ui/PageLoader";
import { MouseGlow }             from "@/components/ui/MouseGlow";
import { LocalBusinessJsonLd, WebSiteJsonLd } from "@/components/seo/JsonLd";

/* ── Viewport export (Next.js 14 — separate from metadata) ───────── */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FAF8F4",
};

/* ── Metadata ─────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  metadataBase: new URL("https://www.elegante-studio.com"),
  title: {
    default: "Eleganté Interiors & Events | Luxury Design Studio",
    template: "%s | Eleganté Design Studio",
  },
  description:
    "Michigan's premier luxury interior design studio. Bespoke residential design, event styling, furniture curation, and floral installations. Est. 2004. Dare to have flair.",
  keywords: [
    "luxury interior design Michigan",
    "interior design studio Pontiac",
    "event styling Michigan",
    "luxury furniture curation",
    "floral installations",
    "Eleganté interiors",
    "bespoke interior design",
    "high-end interior designer",
  ],
  authors: [{ name: "Eleganté Interiors & Events" }],
  creator: "Eleganté Design Studio",
  publisher: "Eleganté Interiors & Events",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Eleganté Interiors & Events | Luxury Design Studio",
    description: "Dare to have flair. Michigan's premier luxury interior design studio.",
    url: "https://www.elegante-studio.com",
    siteName: "Eleganté Design Studio",
    images: [
      {
        url: "/images/BW8A3410.jpg",
        width: 1200,
        height: 630,
        alt: "Eleganté Luxury Interior Design Studio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Eleganté Interiors & Events",
    description: "Dare to have flair. Michigan's premier luxury interior design studio.",
    images: ["/images/BW8A3410.jpg"],
  },
  alternates: {
    canonical: "https://www.elegante-studio.com",
  },
};

/* ── Root Layout ──────────────────────────────────────────────────── */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* JSON-LD structured data */}
        <LocalBusinessJsonLd />
        <WebSiteJsonLd />
      </head>
      <body>
        {/* Skip to main content — keyboard navigation accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[99999] focus:px-6 focus:py-3 focus:bg-luxury-gold focus:text-white focus:font-inter focus:text-sm focus:rounded-sm"
        >
          Skip to main content
        </a>
        {/* Preloader — renders null after first session visit */}
        <PageLoader />
        <SmoothScrollProvider>
          {/* Performance-optimised cursor & glow */}
          <CustomCursor />
          <MouseGlow />
          {/* Scroll progress indicator */}
          <ScrollProgress />
          {/* Global nav & footer are Server Components */}
          <Navbar />
          <main id="main-content" tabIndex={-1}>
            {children}
          </main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
