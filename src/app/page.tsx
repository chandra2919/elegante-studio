import { HeroSection }        from "@/components/home/HeroSection";
import { MarqueeStrip }       from "@/components/home/MarqueeStrip";
import { GalleryWall }        from "@/components/home/GalleryWall";
import { PhotoStrip }         from "@/components/home/PhotoStrip";
import { StudioIntro }        from "@/components/home/StudioIntro";
import { CraftDetails }       from "@/components/home/CraftDetails";
import { ServicesOverview }   from "@/components/home/ServicesOverview";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { InstagramShowcase }  from "@/components/home/InstagramShowcase";
import { ConsultationCTA }    from "@/components/home/ConsultationCTA";

export default function HomePage() {
  return (
    <>
      {/* 1 — Cinematic 5-image hero */}
      <HeroSection />

      {/* 2 — Marquee brand strip */}
      <MarqueeStrip />

      {/* 3 — Massive editorial mosaic gallery (dark bg, 18 images) */}
      <GalleryWall />

      {/* 4 — Auto-scrolling panoramic photo strip (15 images) */}
      <PhotoStrip />

      {/* 5 — Studio story with 3-image collage + timeline */}
      <StudioIntro />

      {/* 6 — Detail masonry grid (12 lifestyle images) + craft copy */}
      <CraftDetails />

      {/* 7 — Services overview */}
      <ServicesOverview />

      {/* 8 — Testimonials */}
      <TestimonialsSection />

      {/* 9 — Instagram / social showcase */}
      <InstagramShowcase />

      {/* 10 — Final CTA */}
      <ConsultationCTA />
    </>
  );
}
