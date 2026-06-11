"use client";
/**
 * HeroSection — Premium Luxury Editorial
 *
 * Image reveal strategy:
 *   • CSS @keyframes with animation-fill-mode:both → images reveal instantly on mount,
 *     no dependency on GSAP timing or screenshot timing
 *   • GSAP handles: text word-by-word entrance, scroll parallax, mouse parallax only
 *
 * Layout:
 *   LEFT  44% — text panel, full height flex column
 *   RIGHT 56% — photography panel, full 100dvh
 *               ① main image fills entire panel (absolute inset-0)
 *               ② card bottom-left bridges the seam
 *               ③ card top-right floats on image
 *               ④ small logo card at centre seam
 *               ⑤ solid pink badge bottom-right
 */

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link  from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { CountUp }        from "@/components/ui/CountUp";
import {
  GoldRings, DotMatrix, GoldCircle, GoldDiamond, DiagonalLines,
} from "@/components/ui/Decorative";

/* ─── Shimmer + fill image ──────────────────────────────────── */
function HeroPhoto({
  src, alt, priority = false, sizes = "50vw", hoverClass = "",
}: {
  src: string; alt: string; priority?: boolean; sizes?: string; hoverClass?: string;
}) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div aria-hidden
        className={`absolute inset-0 z-[2] img-shimmer pointer-events-none
          transition-opacity duration-700 ${loaded ? "opacity-0" : "opacity-100"}`}
      />
      <Image
        src={src} alt={alt} fill priority={priority} sizes={sizes}
        className={`object-cover transition-transform duration-700
          ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${hoverClass}`}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}

/* ─── Gold corner brackets on cards ────────────────────────── */
function CardFrame() {
  return (
    <>
      <div className="absolute top-3 left-3 w-5 h-5 border-t border-l border-luxury-gold/60 pointer-events-none z-10" />
      <div className="absolute top-3 right-3 w-5 h-5 border-t border-r border-luxury-gold/60 pointer-events-none z-10" />
      <div className="absolute bottom-3 left-3 w-5 h-5 border-b border-l border-luxury-gold/60 pointer-events-none z-10" />
      <div className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-luxury-gold/60 pointer-events-none z-10" />
    </>
  );
}

const STATS = [
  { to: 20,  suffix: "+", label: "Years"     },
  { to: 500, suffix: "+", label: "Spaces"    },
  { to: 98,  suffix: "%", label: "Satisfied" },
  { to: 12,  suffix: "+", label: "Awards"    },
];

/* ─── Component ──────────────────────────────────────────────── */
export function HeroSection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const eyebrowRef  = useRef<HTMLDivElement>(null);
  const taglineRef  = useRef<HTMLParagraphElement>(null);
  const descRef     = useRef<HTMLParagraphElement>(null);
  const ctaRef      = useRef<HTMLDivElement>(null);
  const statsRef    = useRef<HTMLDivElement>(null);
  const scrollRef   = useRef<HTMLDivElement>(null);

  /* Image panel refs — for mouse parallax only */
  const card1Ref  = useRef<HTMLDivElement>(null);
  const card2Ref  = useRef<HTMLDivElement>(null);
  const card3Ref  = useRef<HTMLDivElement>(null);
  const mainRef   = useRef<HTMLDivElement>(null);

  /* ── GSAP: text + scroll parallax ── */
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });
      tl.from(eyebrowRef.current, { opacity: 0, x: -20, duration: 0.7, ease: "power3.out" });
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll(".hw");
        tl.from(words, { y: "110%", opacity: 0, duration: 0.85, stagger: 0.06, ease: "power3.out" }, "-=0.35");
      }
      tl.from(taglineRef.current, { opacity: 0, y: 14, duration: 0.65 }, "-=0.5");
      tl.from(descRef.current,    { opacity: 0, y: 14, duration: 0.65 }, "-=0.5");
      tl.from(ctaRef.current,     { opacity: 0, y: 12, duration: 0.6  }, "-=0.45");
      tl.from(statsRef.current,   { opacity: 0, y: 10, duration: 0.6  }, "-=0.4");
      tl.from(scrollRef.current,  { opacity: 0, y: 8,  duration: 0.5  }, "-=0.3");

      /* Scroll parallax — main image moves slower than scroll */
      if (mainRef.current) {
        gsap.to(mainRef.current, {
          yPercent: 18, ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  /* ── Mouse parallax on accent cards ── */
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth  - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      gsap.to(card1Ref.current, { x: x *  9, y: y * 7, duration: 1.1, ease: "power2.out", overwrite: "auto" });
      gsap.to(card2Ref.current, { x: x * -7, y: y * 9, duration: 1.0, ease: "power2.out", overwrite: "auto" });
      gsap.to(card3Ref.current, { x: x *  5, y: y * 5, duration: 0.9, ease: "power2.out", overwrite: "auto" });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  /* ─── JSX ────────────────────────────────────────────────── */
  return (
    <section
      ref={sectionRef}
      suppressHydrationWarning
      className="relative w-full bg-luxury-cream overflow-x-hidden"
      style={{ minHeight: "100dvh" }}
    >
      {/* ── Background decoration ── */}
      <GoldRings size={520} rings={5} opacity={0.07} animate
        className="absolute -top-20 -left-20 pointer-events-none select-none z-0" />
      <DotMatrix cols={10} rows={7} gap={22}
        className="absolute bottom-0 right-0 pointer-events-none select-none z-0 opacity-35" />
      <DiagonalLines width={130} height={130} count={7} opacity={0.06}
        className="absolute top-28 right-[46%] pointer-events-none select-none z-0" />

      {/* ── Split layout ── */}
      <div
        suppressHydrationWarning
        className="relative z-10 flex flex-col lg:flex-row"
        style={{ minHeight: "100dvh" }}
      >

        {/* ══════════════════════════════
            LEFT — Text Panel
        ══════════════════════════════ */}
        <div
          className="flex flex-col justify-center relative z-20
            w-full lg:w-[44%] flex-shrink-0
            px-[clamp(24px,5vw,80px)]
            pt-[max(110px,12vh)] pb-[max(60px,8vh)]"
        >
          {/* Eyebrow */}
          <div ref={eyebrowRef} className="flex items-center gap-4 mb-7">
            <div className="w-10 h-px bg-luxury-gold flex-shrink-0" />
            <span className="eyebrow text-[9.5px]">Luxury Interior Design Studio · Est. 2004</span>
            <GoldDiamond size={7} opacity={0.45} />
          </div>

          {/* Headline */}
          <h1
            ref={headlineRef}
            className="font-cormorant font-light leading-[1.04]
              tracking-[-0.025em] text-luxury-black mb-5"
            style={{ fontSize: "clamp(48px,5vw,90px)" }}
          >
            {[["Designing","Spaces"], ["That","Define"]].map((row, ri) => (
              <div key={ri} className="flex flex-wrap" style={{ gap: "0 0.22em" }}>
                {row.map((w) => (
                  <span key={w} className="overflow-hidden inline-block" style={{ verticalAlign: "bottom" }}>
                    <span className="hw inline-block">{w}</span>
                  </span>
                ))}
              </div>
            ))}
            <div className="overflow-hidden inline-block" style={{ verticalAlign: "bottom" }}>
              <em className="hw italic text-luxury-pink font-light inline-block">True Elegance</em>
            </div>
          </h1>

          {/* Tagline */}
          <p ref={taglineRef}
            className="font-cormorant italic text-luxury-gold mb-5"
            style={{ fontSize: "clamp(16px,1.8vw,24px)" }}>
            "Dare To Have Flair"
          </p>

          {/* Body */}
          <p ref={descRef}
            className="text-luxury-gray max-w-[400px] mb-10 font-light leading-[1.75]"
            style={{ fontSize: 15 }}>
            We transform interiors and events into extraordinary luxury experiences.
            From bespoke furniture curation to full event styling — every detail
            speaks of uncompromising craftsmanship.
          </p>

          {/* CTAs */}
          <div ref={ctaRef} className="flex flex-wrap gap-4 mb-12">
            <MagneticButton strength={0.25}>
              <Link href="/contact" className="btn-luxury-primary">
                Contact Us<span className="btn-arrow-line" />
              </Link>
            </MagneticButton>
            <MagneticButton strength={0.2}>
              <Link href="/gallery" className="btn-luxury-outline">
                View Gallery<span className="btn-arrow-line" />
              </Link>
            </MagneticButton>
          </div>

          {/* Stats */}
          <div ref={statsRef}
            className="flex flex-wrap gap-8 pt-8 border-t border-luxury-gold/15">
            {STATS.map(({ to, suffix, label }) => (
              <div key={label}>
                <div className="font-cormorant font-light leading-none text-luxury-black"
                  style={{ fontSize: 40 }}>
                  <CountUp to={to} suffix={suffix} />
                </div>
                <div className="eyebrow text-[8.5px] mt-1.5">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════
            RIGHT — Photography Panel
            • flex-1 fills remaining width
            • min-h-[100dvh] guarantees full height
            • Images use CSS @keyframe animations
              so they reveal regardless of JS timing
        ══════════════════════════════ */}
        <div
          suppressHydrationWarning
          className="hidden lg:block relative flex-1"
          style={{ minHeight: "100dvh" }}
        >

          {/* ① MAIN IMAGE — fills entire right panel
              CSS animation: heroMainReveal (clip-path slide from right)
              Starts 0.25s after mount, duration 1.4s
          */}
          <div
            ref={mainRef}
            className="absolute inset-0 will-change-transform hero-main-reveal"
          >
            <Image
              src="/images/BW8A3646.webp"
              alt="Eleganté — grand luxury interior hall"
              fill priority
              className="object-cover object-center"
              sizes="56vw"
            />
            {/* Left feather — blends into cream background */}
            <div className="absolute inset-y-0 left-0 w-28 pointer-events-none z-[3]"
              style={{ background: "linear-gradient(90deg,#FAF8F4 0%,transparent 100%)" }} />
            {/* Bottom feather */}
            <div className="absolute inset-x-0 bottom-0 h-36 pointer-events-none z-[3]"
              style={{ background: "linear-gradient(0deg,rgba(250,248,244,0.6) 0%,transparent 100%)" }} />
            {/* Inset gold frame */}
            <div className="absolute inset-[18px] border border-luxury-gold/25 pointer-events-none z-[4]" />
          </div>

          {/* ② ACCENT CARD 1 — bottom-left, bridges seam
              CSS: heroCardUp — slides up from below
          */}
          <div
            ref={card1Ref}
            className="absolute z-30 will-change-transform hero-card-up group cursor-pointer"
            style={{ bottom: "12%", left: "-72px", width: 280, height: 200 }}
          >
            <div className="relative w-full h-full overflow-hidden
              border-[7px] border-white
              shadow-[0_24px_70px_rgba(0,0,0,0.30)]">
              <HeroPhoto
                src="/images/BW8A3842.webp"
                alt="Luxury living room styling"
                sizes="280px"
                hoverClass="group-hover:scale-[1.07]"
              />
              <CardFrame />
              <div className="absolute inset-0 bg-gradient-to-t from-black/0 to-transparent
                group-hover:from-black/45 transition-all duration-500 z-[5] flex items-end pb-4 pl-4">
                <p className="eyebrow text-[8px] text-white/0 group-hover:text-white/90
                  transition-colors duration-400">Interior Styling</p>
              </div>
            </div>
          </div>

          {/* ③ ACCENT CARD 2 — top-right, floats over main image
              CSS: heroCardRight — slides in from right
          */}
          <div
            ref={card2Ref}
            className="absolute z-20 will-change-transform hero-card-right group cursor-pointer"
            style={{ top: "7%", right: "6%", width: 200, height: 285 }}
          >
            <div className="relative w-full h-full overflow-hidden
              border-[7px] border-white
              shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
              <HeroPhoto
                src="/images/BW8A3853.webp"
                alt="Luxury floral arrangement"
                sizes="200px"
                hoverClass="group-hover:scale-[1.07]"
              />
              <CardFrame />
              <div className="absolute inset-0 bg-gradient-to-t from-black/0 to-transparent
                group-hover:from-black/45 transition-all duration-500 z-[5] flex items-end pb-4 pl-4">
                <p className="eyebrow text-[8px] text-white/0 group-hover:text-white/90
                  transition-colors duration-400">Floral Design</p>
              </div>
            </div>
          </div>

          {/* ④ SMALL STUDIO CARD — seam accent
              CSS: heroCardPop — scale-in with spring
          */}
          <div
            ref={card3Ref}
            className="absolute z-40 will-change-transform hero-card-pop group cursor-pointer"
            style={{ top: "44%", left: "5%", width: 118, height: 118 }}
          >
            <div className="relative w-full h-full overflow-hidden
              border-[5px] border-white
              shadow-[0_10px_32px_rgba(0,0,0,0.22)]">
              <HeroPhoto
                src="/images/BW8A3887.webp"
                alt="Eleganté design studio"
                sizes="118px"
                hoverClass="group-hover:scale-[1.08]"
              />
            </div>
          </div>

          {/* ⑤ SOLID PINK BADGE — bottom-right
              CSS: heroBadgePop — scale+rotate spring
          */}
          <div
            className="absolute z-30 will-change-transform hero-badge-pop"
            style={{ bottom: "9%", right: "5%" }}
            aria-label="Dare to have flair — Eleganté"
          >
            {/* Glow halo */}
            <div className="absolute inset-[-16px] rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle,rgba(214,31,105,0.22) 0%,transparent 68%)" }} />
            {/* Solid disc */}
            <div
              className="relative w-[128px] h-[128px] rounded-full flex items-center justify-center"
              style={{
                background: "#D61F69",
                boxShadow: "0 8px 40px rgba(214,31,105,0.55),0 0 0 2px rgba(214,31,105,0.15)",
              }}
            >
              {/* Spinning text ring */}
              <svg viewBox="0 0 128 128"
                className="absolute inset-0 w-full h-full animate-spin-slow"
                aria-hidden="true">
                <path id="bp-hero" fill="none"
                  d="M64,64 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
                <text fill="white" fontSize="8.5" fontFamily="Inter,sans-serif"
                  fontWeight="500" letterSpacing="3.4">
                  <textPath href="#bp-hero">DARE TO HAVE FLAIR · ELEGANTÉ ·</textPath>
                </text>
              </svg>
              <span className="text-white text-[22px] select-none relative z-10 leading-none">✦</span>
            </div>
          </div>

          {/* Dashed decorative ring near card 1 */}
          <GoldCircle size={170} opacity={0.12} dashed
            className="absolute bottom-[8%] -left-14 pointer-events-none select-none z-0" />

          {/* Vertical gold accent line */}
          <div className="absolute top-[16%] left-0 w-px h-40
            bg-gradient-to-b from-transparent via-luxury-gold/30 to-transparent pointer-events-none" />
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div ref={scrollRef}
        className="absolute bottom-6 left-[22%] -translate-x-1/2
          hidden lg:flex flex-col items-center gap-2.5">
        <span className="eyebrow text-[8px] tracking-[0.38em]">Scroll</span>
        <div className="relative w-px h-9 overflow-hidden">
          <div className="absolute inset-x-0 h-full
            bg-gradient-to-b from-luxury-gold to-transparent scroll-line-animate" />
        </div>
      </div>
    </section>
  );
}
