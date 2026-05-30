"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { CountUp } from "@/components/ui/CountUp";
import {
  GoldRings, DotMatrix, GoldCircle, GoldDiamond, Sparkle,
  GoldArc, DiagonalLines, GoldCorner,
} from "@/components/ui/Decorative";

gsap.registerPlugin(ScrollTrigger);

function LuxImg({
  src, alt, priority = false, className = "",
}: { src: string; alt: string; priority?: boolean; className?: string }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className={`absolute inset-0 img-shimmer transition-opacity duration-500 ${loaded ? "opacity-0" : "opacity-100"}`} />
      <Image
        src={src} alt={alt} fill priority={priority}
        className={`object-cover img-luxury-load ${loaded ? "loaded" : ""} ${className}`}
        sizes="(max-width:768px) 100vw, 50vw"
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}

const STATS = [
  { to: 20, suffix: "+", label: "Years" },
  { to: 500, suffix: "+", label: "Spaces" },
  { to: 98, suffix: "%", label: "Satisfied" },
  { to: 12, suffix: "+", label: "Awards" },
];

export function HeroSection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const eyebrowRef  = useRef<HTMLDivElement>(null);
  const taglineRef  = useRef<HTMLParagraphElement>(null);
  const descRef     = useRef<HTMLParagraphElement>(null);
  const ctaRef      = useRef<HTMLDivElement>(null);
  const statsRef    = useRef<HTMLDivElement>(null);
  const colRef      = useRef<HTMLDivElement>(null);
  const scrollRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 });
      tl.from(eyebrowRef.current,  { opacity: 0, x: -24, duration: 0.7, ease: "power3.out" });
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll(".hw");
        tl.from(words, { y: "110%", opacity: 0, duration: 0.9, stagger: 0.055, ease: "power3.out" }, "-=0.3");
      }
      tl.from(taglineRef.current, { opacity: 0, y: 12, duration: 0.65, ease: "power2.out" }, "-=0.5");
      tl.from(descRef.current,    { opacity: 0, y: 14, duration: 0.65, ease: "power2.out" }, "-=0.5");
      tl.from(ctaRef.current,     { opacity: 0, y: 12, duration: 0.6,  ease: "power2.out" }, "-=0.45");
      tl.from(statsRef.current,   { opacity: 0, y: 10, duration: 0.6,  ease: "power2.out" }, "-=0.4");

      // Stagger collage reveal
      if (colRef.current) {
        const panels = colRef.current.querySelectorAll(".hero-panel");
        tl.fromTo(panels,
          { clipPath: "inset(0 100% 0 0)", scale: 1.06 },
          { clipPath: "inset(0 0% 0 0)", scale: 1, duration: 1.1, stagger: 0.1, ease: "power3.inOut" },
          "-=0.85"
        );
      }
      tl.from(scrollRef.current, { opacity: 0, y: 8, duration: 0.5 }, "-=0.2");
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Parallax on mouse move
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const xPct = (e.clientX / window.innerWidth  - 0.5) * 2;
      const yPct = (e.clientY / window.innerHeight - 0.5) * 2;
      if (!colRef.current) return;
      const panels = colRef.current.querySelectorAll<HTMLElement>(".hero-panel");
      panels.forEach((p, i) => {
        const depth = (i % 3 + 1) * 6;
        const sign  = i % 2 === 0 ? -1 : 1;
        gsap.to(p, { x: xPct * depth * sign, y: yPct * depth * 0.7, duration: 0.9, ease: "power2.out" });
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center overflow-hidden bg-luxury-cream">

      {/* Soft radial bloom */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 72% 65% at 62% 48%, rgba(244,238,231,0.92), transparent)" }} />

      {/* Large concentric rings — top left */}
      <GoldRings size={640} rings={7} opacity={0.07} animate
        className="absolute -top-24 -left-24 ring-decoration" />

      {/* Smaller ring — bottom left */}
      <GoldCircle size={240} opacity={0.1} dashed
        className="absolute bottom-12 left-8 ring-decoration" />

      {/* Arc — right edge */}
      <GoldArc size={340} startAngle={-120} endAngle={60} opacity={0.1}
        className="absolute -right-16 top-1/3 ring-decoration" />

      {/* Dot grid — bottom right */}
      <DotMatrix cols={12} rows={9} gap={22}
        className="absolute bottom-0 right-0 ring-decoration opacity-50" />

      {/* Diagonal sketch lines — top right corner */}
      <DiagonalLines width={160} height={160} count={8} opacity={0.07}
        className="absolute top-24 right-40 ring-decoration" />

      {/* Vertical accent line */}
      <div className="absolute left-[52%] top-0 bottom-0 w-px
        bg-gradient-to-b from-transparent via-luxury-gold/10 to-transparent
        pointer-events-none hidden xl:block" />

      <div className="container-luxury w-full pt-32 pb-20 relative z-10">
        <div className="grid lg:grid-cols-[1fr_1.05fr] gap-10 xl:gap-16 items-center">

          {/* ── LEFT ── */}
          <div className="relative z-10 order-2 lg:order-1">
            <div ref={eyebrowRef} className="flex items-center gap-4 mb-8">
              <div className="w-12 h-px bg-luxury-gold" />
              <span className="eyebrow">Luxury Interior Design Studio · Est. 2004</span>
              <GoldDiamond size={8} opacity={0.5} />
            </div>

            <h1
              ref={headlineRef}
              className="font-cormorant font-light leading-[1.04] tracking-[-0.025em] text-luxury-black mb-5"
              style={{ fontSize: "clamp(48px,5.5vw,92px)" }}
            >
              {["Designing", "Spaces"].map((w) => (
                <span key={w} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom", marginRight: "0.22em" }}>
                  <span className="hw" style={{ display: "inline-block" }}>{w}</span>
                </span>
              ))}
              <br />
              {["That", "Define"].map((w) => (
                <span key={w} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom", marginRight: "0.22em" }}>
                  <span className="hw" style={{ display: "inline-block" }}>{w}</span>
                </span>
              ))}
              <br />
              <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}>
                <em className="hw italic text-luxury-pink font-light" style={{ display: "inline-block" }}>
                  True Elegance
                </em>
              </span>
            </h1>

            <p ref={taglineRef} className="font-cormorant italic text-luxury-gold mb-5"
              style={{ fontSize: "clamp(18px,1.9vw,26px)" }}>
              "Dare To Have Flair"
            </p>

            <p ref={descRef} className="text-body-lg text-luxury-gray max-w-[460px] mb-10 font-light leading-relaxed">
              We transform interiors and events into extraordinary luxury experiences.
              From bespoke furniture curation to full event styling — every detail
              speaks of uncompromising craftsmanship.
            </p>

            <div ref={ctaRef} className="flex flex-wrap gap-4">
              <MagneticButton strength={0.25}>
                <Link href="/contact" className="btn-luxury-primary">
                  Book Consultation<span className="btn-arrow-line" />
                </Link>
              </MagneticButton>
              <MagneticButton strength={0.2}>
                <Link href="/portfolio" className="btn-luxury-outline">
                  View Portfolio<span className="btn-arrow-line" />
                </Link>
              </MagneticButton>
            </div>

            <div ref={statsRef} className="flex flex-wrap gap-8 mt-14 pt-10 border-t border-luxury-gold/15">
              {STATS.map(({ to, suffix, label }) => (
                <div key={label} className="text-center sm:text-left">
                  <div className="font-cormorant text-4xl font-light text-luxury-black">
                    <CountUp to={to} suffix={suffix} />
                  </div>
                  <div className="eyebrow text-[9px] mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT — 5-image cinematic collage ── */}
          <div ref={colRef} className="relative h-[680px] lg:h-[780px] order-1 lg:order-2 hidden sm:block">

            {/* Main large — top-right */}
            <div className="hero-panel absolute top-0 right-0 w-[63%] h-[55%] overflow-hidden
              shadow-luxury-lg border-[5px] border-white will-change-transform img-frame"
              style={{ clipPath: "inset(0 100% 0 0)" }}>
              <LuxImg src="/images/BW8A3646.jpg" alt="Eleganté luxury reception" priority />
            </div>

            {/* Mid-left tall */}
            <div className="hero-panel absolute top-[8%] left-0 w-[44%] h-[60%] overflow-hidden
              shadow-luxury-lg border-[5px] border-white will-change-transform img-frame"
              style={{ clipPath: "inset(0 100% 0 0)" }}>
              <LuxImg src="/images/BW8A3842.jpg" alt="Luxury living space" priority />
            </div>

            {/* Bottom-right */}
            <div className="hero-panel absolute bottom-0 right-0 w-[54%] h-[42%] overflow-hidden
              shadow-luxury-lg border-[5px] border-white will-change-transform img-frame"
              style={{ clipPath: "inset(0 100% 0 0)" }}>
              <LuxImg src="/images/BW8A3837.jpg" alt="Event styling" />
            </div>

            {/* Accent center */}
            <div className="hero-panel absolute top-[38%] left-[37%] w-[24%] h-[28%] overflow-hidden
              shadow-luxury border-[4px] border-white z-10 will-change-transform"
              style={{ clipPath: "inset(0 100% 0 0)" }}>
              <LuxImg src="/images/BW8A3507.jpg" alt="Interior detail" />
            </div>

            {/* Small bottom-left accent */}
            <div className="hero-panel absolute bottom-[3%] left-[4%] w-[32%] h-[30%] overflow-hidden
              shadow-luxury border-[4px] border-white z-10 will-change-transform"
              style={{ clipPath: "inset(0 100% 0 0)" }}>
              <LuxImg src="/images/BW8A3853.jpg" alt="Floral decor detail" />
            </div>

            {/* Corner bracket decorations */}
            <GoldCorner size={36} opacity={0.35}
              className="absolute top-[-4px] left-[-4px] ring-decoration" />
            <GoldCorner size={36} opacity={0.35}
              className="absolute bottom-[-4px] right-[-4px] ring-decoration rotate-180" />

            {/* Rotating badge */}
            <div className="absolute bottom-[20%] right-[-28px] w-28 h-28 z-20 animate-spin-slow" aria-hidden="true">
              <svg viewBox="0 0 120 120" className="w-full h-full">
                <path id="bp2" fill="none" d="M60,60 m-40,0 a40,40 0 1,1 80,0 a40,40 0 1,1 -80,0" />
                <text fill="#D61F69" fontSize="9" fontFamily="Inter" letterSpacing="3.5">
                  <textPath href="#bp2">DARE TO HAVE FLAIR · ELEGANTÉ ·</textPath>
                </text>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkle size="text-xl" />
              </div>
            </div>

            {/* Decorative circle behind collage */}
            <GoldCircle size={220} opacity={0.1} dashed
              className="absolute -bottom-10 -left-10 ring-decoration" />
            <div className="absolute top-[20%] left-[-20px] w-px h-48
              bg-gradient-to-b from-transparent via-luxury-gold/40 to-transparent ring-decoration" />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div ref={scrollRef} className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <span className="eyebrow text-[9px] tracking-[0.3em]">Scroll to Explore</span>
        <div className="relative w-px h-12 overflow-hidden">
          <div className="absolute inset-x-0 bg-gradient-to-b from-luxury-gold to-transparent scroll-line-animate" />
        </div>
      </div>
    </section>
  );
}
