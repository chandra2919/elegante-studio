"use client";
/**
 * The Decor Collection — premium masonry grid using ALL decor/object images
 * with rings, gold frames, stagger reveal animations
 */
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LuxuryImage } from "@/components/ui/LuxuryImage";
import { GoldRings, GoldCircle, DotMatrix, GoldDiamond, Sparkle, GoldWave } from "@/components/ui/Decorative";

const DECOR_ITEMS = [
  { src: "/images/BW8A3452.webp",  alt: "Beaded luxury ceremonial vessel",        label: "Artisan Vessel",       span: "col-span-1 row-span-2" },
  { src: "/images/IMG_9370.webp",  alt: "Antique gold mosaic urn",                label: "Antique Gold Urn",     span: "col-span-1" },
  { src: "/images/BW8A3578.webp",  alt: "Venetian bronze carnival masks",         label: "Venetian Masks",       span: "col-span-1" },
  { src: "/images/BW8A3494.webp",  alt: "Gold botanical art in ornate frame",     label: "Gold Botanical Art",   span: "col-span-1 row-span-2" },
  { src: "/images/BW8A3593.webp",  alt: "Pearl-encrusted gold pitcher vessel",    label: "Pearl Pitcher",        span: "col-span-1" },
  { src: "/images/BW8A3604.webp",  alt: "Ornate silver mosaic jewellery box",     label: "Ornament Box",         span: "col-span-1" },
  { src: "/images/BW8A3490.webp",  alt: "Damask X-frame ottomon bench",           label: "Damask Ottoman",       span: "col-span-1" },
  { src: "/images/BW8A3858.webp",  alt: "Crystal brooch on champagne drape",      label: "Crystal Brooch",       span: "col-span-1" },
  { src: "/images/IMG_9378.webp",  alt: "Luxury decorative detail",               label: "Decor Detail",         span: "col-span-1" },
  { src: "/images/IMG_9385.webp",  alt: "Studio artisan object",                  label: "Artisan Object",       span: "col-span-1" },
  { src: "/images/IMG_9352.webp",  alt: "Luxury accessory detail",                label: "Luxury Accessory",     span: "col-span-1" },
  { src: "/images/IMG_9362.webp",  alt: "Eleganté decor collection",              label: "Collection Piece",     span: "col-span-1" },
];

export function DecorCollection() {
  const gridRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Header reveal
      gsap.from(headerRef.current, {
        opacity: 0, y: 40,
        scrollTrigger: { trigger: headerRef.current, start: "top 88%" },
        duration: 0.9, ease: "power3.out",
      });

      // Grid items stagger
      const cards = gridRef.current?.querySelectorAll(".decor-card");
      if (cards) {
        gsap.fromTo(cards,
          { opacity: 0, y: 50, clipPath: "inset(0 0 100% 0)" },
          {
            opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)",
            duration: 0.85, stagger: 0.08, ease: "power3.out",
            scrollTrigger: { trigger: gridRef.current, start: "top 85%" },
          }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="section-pad bg-luxury-black relative overflow-hidden">
      {/* Large background watermark */}
      <div className="editorial-number absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none select-none opacity-40" aria-hidden="true">
        DECOR
      </div>

      {/* Decorative rings */}
      <GoldRings size={300} rings={4} opacity={0.08} className="absolute top-8 left-8 ring-decoration" />
      <GoldCircle size={220} opacity={0.06} dashed className="absolute bottom-16 right-16 ring-decoration" />

      <div className="container-luxury relative z-10">
        {/* Header */}
        <div ref={headerRef} className="mb-16 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div>
            <div className="flex items-center gap-4 mb-5">
              <div className="w-10 h-px bg-luxury-gold" />
              <span className="eyebrow text-luxury-gold">Artisan Objects</span>
              <GoldDiamond size={8} opacity={0.6} />
            </div>
            <h2 className="font-cormorant font-light text-white leading-[1.06]" style={{ fontSize: "clamp(36px,4.5vw,68px)" }}>
              The Eleganté<br />
              <em className="italic text-luxury-gold">Decor Collection</em>
            </h2>
          </div>
          <div className="max-w-sm">
            <GoldWave width={180} height={30} opacity={0.3} className="mb-4" />
            <p className="text-body-md text-white/45 font-light leading-relaxed">
              Every object we carry is hand-selected from artisans and antique dealers around the world — each piece a conversation starter in its own right.
            </p>
          </div>
        </div>

        {/* Masonry-style grid */}
        <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {DECOR_ITEMS.map((item, i) => (
            <div
              key={i}
              className={`decor-card group relative overflow-hidden cursor-pointer luxury-frame ${
                i === 0 ? "row-span-2" :
                i === 3 ? "row-span-2" :
                ""
              }`}
              style={{ minHeight: i === 0 || i === 3 ? 420 : 200 }}
            >
              <LuxuryImage
                src={item.src}
                alt={item.alt}
                fill
                zoom
                sizes="(max-width:768px) 50vw, 25vw"
                className="absolute inset-0"
              />
              {/* Dark overlay on hover */}
              <div className="absolute inset-0 bg-luxury-black/0 group-hover:bg-luxury-black/55 transition-all duration-500 flex flex-col items-center justify-end pb-5 px-4">
                <div className="opacity-0 group-hover:opacity-100 transition-all duration-400 translate-y-4 group-hover:translate-y-0 text-center">
                  <p className="font-cormorant text-white text-base italic">{item.label}</p>
                  <div className="w-8 h-px bg-luxury-gold mx-auto mt-2" />
                </div>
              </div>
              {/* Gold corner accents */}
              <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-luxury-gold/40 pointer-events-none" />
              <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-luxury-gold/40 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Bottom ornament */}
        <div className="flex items-center justify-center gap-6 mt-16">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-luxury-gold/30 to-transparent" />
          <Sparkle size="text-2xl" />
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-luxury-gold/30 to-transparent" />
        </div>
      </div>
    </section>
  );
}
