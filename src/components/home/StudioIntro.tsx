"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CountUp } from "@/components/ui/CountUp";
import {
  GoldRings, GoldCircle, DotMatrix, GoldDiamond,
  GoldArc, GoldCorner, DiagonalLines,
} from "@/components/ui/Decorative";

function Img({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <>
      <div className={`absolute inset-0 img-shimmer transition-opacity duration-700 ${loaded ? "opacity-0" : "opacity-100"}`} />
      <Image
        src={src} alt={alt} fill
        className={`object-cover img-luxury-load ${loaded ? "loaded" : ""}`}
        sizes="(max-width:1024px) 90vw, 50vw"
        onLoad={() => setLoaded(true)}
      />
    </>
  );
}

const VALUES = [
  { icon: "✦", label: "Uncompromising Quality" },
  { icon: "✦", label: "Bespoke Vision"         },
  { icon: "✦", label: "Artisan Craftsmanship"  },
  { icon: "✦", label: "Client-First Process"   },
];

const MILESTONES = [
  { year: "2004", text: "Eleganté founded in Michigan" },
  { year: "2009", text: "First international project in Dubai" },
  { year: "2015", text: "100th luxury residence completed" },
  { year: "2022", text: "Recognised — Top 10 Luxury Studios, USA" },
];

export function StudioIntro() {
  const img1Ref = useRef<HTMLDivElement>(null);
  const img2Ref = useRef<HTMLDivElement>(null);
  const img3Ref = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const revealOpts = (el: HTMLElement, fromDir: "left" | "bottom" = "left") => ({
        clipPath: fromDir === "left" ? "inset(0 100% 0 0)" : "inset(100% 0 0 0)",
        ...(fromDir === "bottom" ? { opacity: 0 } : {}),
      });

      if (img1Ref.current) {
        gsap.fromTo(img1Ref.current, revealOpts(img1Ref.current), {
          clipPath: "inset(0 0% 0 0)", duration: 1.4, ease: "power3.inOut",
          scrollTrigger: { trigger: img1Ref.current, start: "top 82%", toggleActions: "play none none none" },
        });
        gsap.to(img1Ref.current.querySelector("img"), {
          yPercent: -14, ease: "none",
          scrollTrigger: { trigger: img1Ref.current, start: "top bottom", end: "bottom top", scrub: true },
        });
      }
      if (img2Ref.current) {
        gsap.fromTo(img2Ref.current, { clipPath: "inset(100% 0 0 0)", opacity: 0 }, {
          clipPath: "inset(0% 0 0 0)", opacity: 1, duration: 1.1, ease: "power3.inOut", delay: 0.25,
          scrollTrigger: { trigger: img2Ref.current, start: "top 88%", toggleActions: "play none none none" },
        });
      }
      if (img3Ref.current) {
        gsap.fromTo(img3Ref.current, { clipPath: "inset(0 100% 0 0)", opacity: 0 }, {
          clipPath: "inset(0 0% 0 0)", opacity: 1, duration: 1.0, ease: "power3.inOut", delay: 0.45,
          scrollTrigger: { trigger: img3Ref.current, start: "top 88%", toggleActions: "play none none none" },
        });
      }
      if (badgeRef.current) {
        gsap.from(badgeRef.current, {
          opacity: 0, scale: 0.75, duration: 0.8, ease: "back.out(1.5)",
          scrollTrigger: { trigger: badgeRef.current, start: "top 88%" },
        });
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="relative py-28 bg-luxury-warm overflow-hidden">
      {/* Background dot pattern */}
      <div className="absolute inset-0 bg-luxury-dots opacity-50 pointer-events-none" />

      {/* Decorative */}
      <GoldRings size={480} rings={6} opacity={0.07} animate
        className="absolute -bottom-24 -right-24 ring-decoration" />
      <GoldCircle size={200} opacity={0.09} dashed
        className="absolute top-16 left-8 ring-decoration" />
      <DiagonalLines width={140} height={140} count={7} opacity={0.07}
        className="absolute bottom-20 left-16 ring-decoration" />
      <DotMatrix cols={9} rows={6} gap={22}
        className="absolute top-0 right-20 ring-decoration opacity-40" />

      <div className="container-luxury relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 xl:gap-28 items-center">

          {/* ── LEFT — 3-image collage ── */}
          <div className="relative h-[640px]">

            {/* Main image */}
            <div ref={img1Ref} className="absolute top-0 left-0 w-[78%] h-[70%]
              shadow-luxury-lg overflow-hidden img-frame"
              style={{ clipPath: "inset(0 100% 0 0)" }}>
              <Img src="/images/BW8A3384.webp" alt="Eleganté Studio — luxury design process" />
            </div>

            {/* Accent image bottom-right */}
            <div ref={img2Ref} className="absolute bottom-0 right-0 w-[50%] h-[46%]
              overflow-hidden border-[5px] border-luxury-warm shadow-luxury z-10 img-frame"
              style={{ clipPath: "inset(100% 0 0 0)", opacity: 0 }}>
              <Img src="/images/BW8A3607.webp" alt="Luxury event decor" />
            </div>

            {/* Third accent — mid */}
            <div ref={img3Ref} className="absolute bottom-[20%] left-[58%] w-[28%] h-[24%]
              overflow-hidden border-[4px] border-luxury-warm shadow z-20"
              style={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}>
              <Img src="/images/BW8A3887.webp" alt="Studio logo detail" />
            </div>

            {/* 20+ years badge */}
            <div ref={badgeRef}
              className="absolute top-[60%] left-[70%] -translate-x-1/2 z-30
              bg-luxury-pink text-white px-7 py-6 text-center shadow-pink min-w-[108px]">
              <div className="font-cormorant text-4xl font-light leading-none">
                <CountUp to={20} suffix="+" />
              </div>
              <div className="eyebrow text-[7.5px] mt-2 opacity-80">Years of<br />Excellence</div>
            </div>

            {/* Corner brackets */}
            <GoldCorner size={32} opacity={0.3} className="absolute top-0 left-0 ring-decoration" />
            <GoldCorner size={32} opacity={0.3} className="absolute bottom-0 right-0 ring-decoration rotate-180" />

            {/* Floating vertical line */}
            <div className="absolute top-[8%] right-[18%] w-px h-28 float-line" />
          </div>

          {/* ── RIGHT — content ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-px bg-luxury-gold" />
              <span className="eyebrow">Our Story</span>
            </div>

            <h2
              className="font-cormorant font-light text-luxury-black mb-5 leading-[1.07]"
              style={{ fontSize: "clamp(38px,4.5vw,66px)" }}
            >
              The Eleganté<br />
              <em className="italic text-luxury-pink font-light">Story</em>
            </h2>

            <p className="font-cormorant text-2xl italic text-luxury-gold mb-8 leading-relaxed">
              "Dare To Have Flair"
            </p>

            <p className="text-body-md text-luxury-gray leading-relaxed mb-5 font-light">
              Eleganté Interiors was born from a singular belief: that every space
              deserves to be extraordinary. Founded with a passion for the opulent and
              beautifully crafted, we've spent over two decades redefining luxury.
            </p>
            <p className="text-body-md text-luxury-gray leading-relaxed mb-8 font-light">
              Our studio is more than a design firm — it is a destination for those who
              understand that their environment reflects their identity.
            </p>

            {/* Milestone timeline */}
            <div className="space-y-4 mb-10">
              {MILESTONES.map(({ year, text }) => (
                <div key={year} className="flex items-start gap-5 group">
                  <span className="font-cormorant text-luxury-gold font-light text-lg flex-shrink-0 w-12">
                    {year}
                  </span>
                  <div className="h-px w-8 bg-luxury-gold/30 mt-3 flex-shrink-0
                    group-hover:w-12 transition-all duration-400" />
                  <span className="text-body-sm text-luxury-gray font-light">{text}</span>
                </div>
              ))}
            </div>

            {/* Values grid */}
            <div className="grid grid-cols-2 gap-4 mb-10 pt-8 border-t border-luxury-gold/15">
              {VALUES.map(({ icon, label }) => (
                <div key={label} className="flex items-center gap-3 group">
                  <span className="text-luxury-gold text-sm flex-shrink-0
                    transition-transform duration-300 group-hover:scale-125">{icon}</span>
                  <span className="text-body-sm text-luxury-black font-medium">{label}</span>
                </div>
              ))}
            </div>

            <Link href="/about" className="btn-luxury-outline">
              Discover Our Story
              <span className="btn-arrow-line" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
