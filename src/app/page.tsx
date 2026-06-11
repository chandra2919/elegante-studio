import dynamic from "next/dynamic";
import { MarqueeStrip } from "@/components/home/MarqueeStrip";

// HeroSection is fully client-driven (GSAP, mousemove, clip-path animations)
// ssr:false prevents stale SSR HTML from ever causing hydration mismatches
const HeroSection = dynamic(
  () => import("@/components/home/HeroSection").then(m => ({ default: m.HeroSection })),
  { ssr: false }
);

// Heavy sections — dynamically imported so they don't block initial paint
const GalleryWall        = dynamic(() => import("@/components/home/GalleryWall").then(m => ({ default: m.GalleryWall })),        { ssr: false });
const StudioIntro        = dynamic(() => import("@/components/home/StudioIntro").then(m => ({ default: m.StudioIntro })));
const ServicesOverview   = dynamic(() => import("@/components/home/ServicesOverview").then(m => ({ default: m.ServicesOverview })));
const TestimonialsSection= dynamic(() => import("@/components/home/TestimonialsSection").then(m => ({ default: m.TestimonialsSection })));
const InstagramShowcase  = dynamic(() => import("@/components/home/InstagramShowcase").then(m => ({ default: m.InstagramShowcase })));
const ConsultationCTA    = dynamic(() => import("@/components/home/ConsultationCTA").then(m => ({ default: m.ConsultationCTA })));

export default function HomePage() {
  return (
    <>
      {/* Above-fold — loaded immediately */}
      <HeroSection />
      <MarqueeStrip />

      {/* Below-fold — lazy loaded */}
      <GalleryWall />
      <StudioIntro />
      <ServicesOverview />
      <TestimonialsSection />
      <InstagramShowcase />
      <ConsultationCTA />
    </>
  );
}
