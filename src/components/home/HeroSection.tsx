"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { CountUp } from "@/components/ui/CountUp";

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const eyebrowRef  = useRef<HTMLDivElement>(null);
  const taglineRef  = useRef<HTMLParagraphElement>(null);
  const descRef     = useRef<HTMLParagraphElement>(null);
  const ctaRef      = useRef<HTMLDivElement>(null);
  const statsRef    = useRef<HTMLDivElement>(null);
  const img1Ref     = useRef<HTMLDivElement>(null);
  const img2Ref     = useRef<HTMLDivElement>(null);
  const img3Ref     = useRef<HTMLDivElement>(null);
  const collageRef  = useRef<HTMLDivElement>(null);
  const scrollRef   = useRef<HTMLDivElement>(null);

  // ── GSAP entrance timeline ─────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      // Eyebrow + line
      tl.from(eyebrowRef.current, { opacity: 0, x: -24, duration: 0.7, ease: "power3.out" })

      // Headline words
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll(".hw");
        tl.from(words, {
          y: "110%",
          opacity: 0,
          duration: 0.9,
          stagger: 0.06,
          ease: "power3.out",
        }, "-=0.3");
      }

      // Tagline
      tl.from(taglineRef.current, { opacity: 0, y: 14, duration: 0.7, ease: "power2.out" }, "-=0.5");

      // Description
      tl.from(descRef.current, { opacity: 0, y: 16, duration: 0.7, ease: "power2.out" }, "-=0.5");

      // CTAs
      tl.from(ctaRef.current, { opacity: 0, y: 14, duration: 0.6, ease: "power2.out" }, "-=0.45");

      // Stats
      tl.from(statsRef.current, { opacity: 0, y: 12, duration: 0.6, ease: "power2.out" }, "-=0.4");

      // Images cascade in
      tl.fromTo(img1Ref.current,
        { clipPath: "inset(0 100% 0 0)", scale: 1.1 },
        { clipPath: "inset(0 0% 0 0)", scale: 1, duration: 1.2, ease: "power3.inOut" },
        "-=0.8"
      );
      tl.fromTo(img2Ref.current,
        { clipPath: "inset(0 100% 0 0)", scale: 1.1 },
        { clipPath: "inset(0 0% 0 0)", scale: 1, duration: 1.1, ease: "power3.inOut" },
        "-=0.9"
      );
      tl.fromTo(img3Ref.current,
        { clipPath: "inset(0 100% 0 0)", scale: 1.08 },
        { clipPath: "inset(0 0% 0 0)", scale: 1, duration: 1.0, ease: "power3.inOut" },
        "-=0.85"
      );

      // Scroll indicator
      tl.from(scrollRef.current, { opacity: 0, y: 8, duration: 0.5 }, "-=0.3");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ── Mouse parallax on collage ──────────────────────────────
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const xPct = (e.clientX / window.innerWidth  - 0.5) * 2;
      const yPct = (e.clientY / window.innerHeight - 0.5) * 2;
      gsap.to(img1Ref.current, { x: xPct * -16, y: yPct * -10, duration: 0.8, ease: "power2.out" });
      gsap.to(img2Ref.current, { x: xPct *  12, y: yPct *   8, duration: 0.9, ease: "power2.out" });
      gsap.to(img3Ref.current, { x: xPct * -24, y: yPct * -18, duration: 0.7, ease: "power2.out" });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-luxury-cream"
    >
      {/* Radial background bloom */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 55% at 68% 50%, rgba(244,238,231,0.9), transparent)" }}
      />
      {/* Subtle noise texture */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")", backgroundSize: "200px" }}
      />

      <div className="container-luxury w-full pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-20 items-center">

          {/* ── LEFT COLUMN ─────────────────────────────── */}
          <div className="relative z-10">

            {/* Eyebrow */}
            <div ref={eyebrowRef} className="flex items-center gap-4 mb-8">
              <div className="w-12 h-px bg-luxury-gold" />
              <span className="eyebrow">Luxury Interior Design Studio · Est. 2004</span>
            </div>

            {/* Headline — word-by-word overflow clip */}
            <h1
              ref={headlineRef}
              className="font-cormorant font-light leading-[1.05] tracking-[-0.02em] text-luxury-black mb-6"
              style={{ fontSize: "clamp(52px, 6vw, 96px)" }}
            >
              {["Designing", "Spaces", "That", "Define"].map((w) => (
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

            {/* Tagline */}
            <p
              ref={taglineRef}
              className="font-cormorant italic text-luxury-gold mb-6"
              style={{ fontSize: "clamp(20px, 2vw, 28px)" }}
            >
              "Dare To Have Flair"
            </p>

            {/* Description */}
            <p
              ref={descRef}
              className="text-body-lg text-luxury-gray max-w-[460px] mb-10 font-light leading-relaxed"
            >
              We transform interiors and events into extraordinary luxury experiences.
              From bespoke furniture curation to full event styling — every detail
              speaks of uncompromising craftsmanship.
            </p>

            {/* CTAs */}
            <div ref={ctaRef} className="flex flex-wrap gap-4">
              <MagneticButton strength={0.25}>
                <Link href="/contact" className="btn-luxury-primary">
                  Book Consultation
                  <span className="btn-arrow-line" />
                </Link>
              </MagneticButton>
              <MagneticButton strength={0.2}>
                <Link href="/portfolio" className="btn-luxury-outline">
                  View Portfolio
                  <span className="btn-arrow-line" />
                </Link>
              </MagneticButton>
            </div>

            {/* Stats */}
            <div
              ref={statsRef}
              className="flex gap-10 mt-14 pt-10 border-t border-luxury-gold/15"
            >
              {[
                { to: 20,  suffix: "+", label: "Years"     },
                { to: 500, suffix: "+", label: "Spaces"    },
                { to: 98,  suffix: "%", label: "Satisfied" },
              ].map(({ to, suffix, label }) => (
                <div key={label}>
                  <div className="font-cormorant text-4xl font-light text-luxury-black">
                    <CountUp to={to} suffix={suffix} />
                  </div>
                  <div className="eyebrow text-[9px] mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT COLUMN — Photography collage ───────── */}
          <div
            ref={collageRef}
            className="relative h-[600px] lg:h-[700px] hidden lg:block"
          >
            {/* Main large image */}
            <div
              ref={img1Ref}
              className="absolute top-0 right-0 w-[65%] h-[72%] overflow-hidden shadow-luxury-lg border-[5px] border-white will-change-transform"
              style={{ clipPath: "inset(0 100% 0 0)" }}
            >
              <div className="w-full h-[115%] absolute -top-[7.5%] left-0 transition-transform duration-[900ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:scale-[1.04]">
                <Image src="/images/BW8A3410.jpg" alt="Luxury dining room with crystal chandelier by Eleganté" fill className="object-cover" sizes="(max-width:1024px) 0vw, 42vw" priority />
              </div>
            </div>

            {/* Bottom-left image */}
            <div
              ref={img2Ref}
              className="absolute bottom-0 left-0 w-[55%] h-[58%] overflow-hidden shadow-luxury-lg border-[5px] border-white will-change-transform"
              style={{ clipPath: "inset(0 100% 0 0)" }}
            >
              <div className="w-full h-[115%] absolute -top-[7.5%] left-0 transition-transform duration-[900ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:scale-[1.04]">
                <Image src="/images/BW8A3694.jpg" alt="Luxury ivory living room by Eleganté" fill className="object-cover" sizes="(max-width:1024px) 0vw, 36vw" />
              </div>
            </div>

            {/* Accent image */}
            <div
              ref={img3Ref}
              className="absolute top-[40%] right-[2%] w-[30%] h-[34%] overflow-hidden shadow-luxury border-[4px] border-white z-10 will-change-transform"
              style={{ clipPath: "inset(0 100% 0 0)" }}
            >
              <div className="w-full h-[115%] absolute -top-[7.5%] left-0 transition-transform duration-[900ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:scale-[1.05]">
                <Image src="/images/BW8A3607.jpg" alt="Eleganté Design Studio brand card" fill className="object-cover" sizes="(max-width:1024px) 0vw, 20vw" />
              </div>
            </div>

            {/* Rotating badge */}
            <div className="absolute bottom-[18%] right-[-32px] w-28 h-28 z-20 animate-spin-slow" aria-hidden="true">
              <svg viewBox="0 0 120 120" className="w-full h-full">
                <path id="bp" fill="none" d="M60,60 m-40,0 a40,40 0 1,1 80,0 a40,40 0 1,1 -80,0" />
                <text fill="#D61F69" fontSize="9" fontFamily="Inter" letterSpacing="3.5">
                  <textPath href="#bp">DARE TO HAVE FLAIR · ELEGANTÉ ·</textPath>
                </text>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-cormorant text-xl text-luxury-pink animate-float">✦</span>
              </div>
            </div>

            {/* Vertical gold accent */}
            <div className="absolute top-[24%] left-[-20px] w-px h-44 bg-gradient-to-b from-transparent via-luxury-gold/40 to-transparent" />
            {/* Horizontal gold accent */}
            <div className="absolute top-0 right-[35%] h-px w-24 bg-gradient-to-r from-transparent via-luxury-gold/30 to-transparent" />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="eyebrow text-[9px] tracking-[0.3em]">Scroll to Explore</span>
        <div className="relative w-px h-12 overflow-hidden">
          <div className="absolute inset-x-0 bg-gradient-to-b from-luxury-gold to-transparent scroll-line-animate" />
        </div>
      </div>

    </section>
  );
}
