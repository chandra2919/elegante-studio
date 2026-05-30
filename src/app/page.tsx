import { HeroSection }        from "@/components/home/HeroSection";
import { MarqueeStrip }       from "@/components/home/MarqueeStrip";
import { FeaturedProjects }   from "@/components/home/FeaturedProjects";
import { StudioIntro }        from "@/components/home/StudioIntro";
import { ServicesOverview }   from "@/components/home/ServicesOverview";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { InstagramShowcase }  from "@/components/home/InstagramShowcase";
import { ConsultationCTA }    from "@/components/home/ConsultationCTA";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MarqueeStrip />
      <FeaturedProjects />
      <StudioIntro />
      <ServicesOverview />
      <TestimonialsSection />
      <InstagramShowcase />
      <ConsultationCTA />
    </>
  );
}
