"use client";
/**
 * Full-width "Dare To Have Flair" cinematic reveal section
 */
import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GoldRings, DotMatrix, Sparkle } from "@/components/ui/Decorative";

gsap.registerPlugin(ScrollTrigger);

export function ReceptionShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text parallax upward as you scroll down
      gsap.fromTo(textRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1,
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none none" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden" style={{ height: "clamp(480px,70vw,820px)" }}>
      {/* Full-bleed image */}
      <Image
        src="/images/BW8A3820.jpg"
        alt="Dare To Have Flair — Eleganté Design Studio"
        fill
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Dark gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-luxury-black/80 via-luxury-black/50 to-transparent" />

      {/* Decorative rings top-right */}
      <GoldRings size={360} rings={5} opacity={0.12} className="absolute -top-12 -right-12 ring-decoration" />

      {/* Dot matrix bottom left */}
      <DotMatrix cols={8} rows={6} gap={20} className="absolute bottom-12 left-12 ring-decoration opacity-50" />

      {/* Text */}
      <div ref={textRef} className="absolute inset-0 flex flex-col justify-center px-[clamp(32px,8vw,140px)]">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-10 h-px bg-luxury-gold" />
          <span className="eyebrow text-luxury-gold">Studio Philosophy</span>
        </div>

        <div className="font-cormorant font-light leading-none text-white" style={{ fontSize: "clamp(52px,9vw,130px)" }}>
          Dare<br />
          <em className="italic text-luxury-gold font-light">To Have</em><br />
          Flair
        </div>

        <div className="flex items-center gap-4 mt-8">
          <Sparkle size="text-2xl" />
          <p className="font-cormorant text-xl italic text-white/60 max-w-sm">
            Since 2004, every space we touch becomes a statement of extraordinary living.
          </p>
        </div>
      </div>
    </section>
  );
}
