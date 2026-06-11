"use client";
/**
 * JourneyTimeline — Alternating two-column layout with centre spine
 *
 * Layout (desktop):
 *   [LEFT CARD]   │●│
 *                 │●│   [RIGHT CARD]
 *   [LEFT CARD]   │●│
 *                 │●│   [RIGHT CARD]
 *
 * Mobile: single stacked column with left spine
 */
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const MILESTONES = [
  {
    year: "2004",
    title: "The Beginning",
    event: "Eleganté founded — boutique studio opening in Pontiac, MI",
    detail: "A single vision, a blank canvas, and an unwavering belief that every space deserves to be extraordinary.",
    image: "/images/BW8A3607.webp",
  },
  {
    year: "2008",
    title: "First Recognition",
    event: "First luxury residential award — Michigan Design Excellence",
    detail: "Four years of relentless craft rewarded with Michigan's most prestigious design honour.",
    image: "/images/BW8A3535.webp",
  },
  {
    year: "2012",
    title: "Styling Division",
    event: "Styling division launched — full interior styling capability",
    detail: "Expanding beyond interiors to transform celebrations and ceremonies into unforgettable experiences.",
    image: "/images/BW8A3877.webp",
  },
  {
    year: "2016",
    title: "Studio Expansion",
    event: "Studio expansion and flagship showroom opening",
    detail: "A new era — a showroom where clients could walk into the Eleganté world before a single project began.",
    image: "/images/BW8A3694.webp",
  },
  {
    year: "2019",
    title: "500 Spaces",
    event: "500th project milestone — celebrated with select clientele",
    detail: "Five hundred spaces transformed. Five hundred families who dared to have flair.",
    image: "/images/BW8A3410.webp",
  },
  {
    year: "2023",
    title: "National Stage",
    event: "National recognition — featured in Architectural Digest",
    detail: "Michigan's finest luxury studio recognised on the national stage — a moment two decades in the making.",
    image: "/images/BW8A3472.webp",
  },
];

/* ── One milestone card ──────────────────────────────────── */
function MilestoneCard({
  milestone,
  side,
}: {
  milestone: typeof MILESTONES[0];
  side: "left" | "right";
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = cardRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, x: side === "left" ? -50 : 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );
    });
    return () => ctx.revert();
  }, [side]);

  return (
    <div
      ref={cardRef}
      style={{ opacity: 0 }}
      className="group border border-white/[0.08] hover:border-luxury-gold/30 transition-all duration-500 overflow-hidden"
    >
      {/* Photo */}
      <div className="relative h-48 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={milestone.image}
          alt={milestone.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/65" />

        {/* Gold corner brackets */}
        <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-luxury-gold/55 pointer-events-none" />
        <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-luxury-gold/55 pointer-events-none" />
        <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-luxury-gold/55 pointer-events-none" />
        <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-luxury-gold/55 pointer-events-none" />

        {/* Title */}
        <div className="absolute bottom-4 left-5">
          <p className="font-cormorant text-xl italic text-white font-light">{milestone.title}</p>
        </div>

        {/* Ghost year */}
        <span
          aria-hidden="true"
          className="absolute bottom-1 right-4 font-cormorant font-light text-white/10 leading-none select-none pointer-events-none"
          style={{ fontSize: "68px" }}
        >
          {milestone.year}
        </span>
      </div>

      {/* Body */}
      <div className="p-5" style={{ background: "rgba(255,255,255,0.018)" }}>
        {/* Year chip */}
        <div className="flex items-center gap-3 mb-4">
          <span className="font-inter text-[8.5px] tracking-[0.28em] uppercase text-luxury-gold bg-luxury-gold/10 px-3 py-1.5">
            {milestone.year}
          </span>
          <div className="h-px flex-1 bg-luxury-gold/12 group-hover:bg-luxury-gold/35 transition-colors duration-500" />
        </div>

        <p className="font-inter text-[12.5px] font-light text-white/60 leading-relaxed mb-3">
          {milestone.event}
        </p>
        <p className="font-cormorant text-base italic text-white/28 font-light leading-relaxed">
          "{milestone.detail}"
        </p>

        {/* Hover underline sweep */}
        <div className="mt-5 h-px w-0 group-hover:w-full bg-gradient-to-r from-luxury-gold/50 to-transparent transition-all duration-700" />
      </div>
    </div>
  );
}

/* ── Spine node ──────────────────────────────────────────── */
function SpineNode({ index }: { index: number }) {
  const nodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = nodeRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: "back.out(2.2)",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={nodeRef}
      style={{ opacity: 0 }}
      className="relative flex items-center justify-center flex-shrink-0"
    >
      {/* Pulse ring */}
      <div
        className="absolute w-8 h-8 rounded-full animate-ping"
        style={{ background: "rgba(200,168,107,0.07)", animationDuration: "2.5s" }}
      />
      {/* Outer ring */}
      <div className="absolute w-6 h-6 rounded-full border border-luxury-gold/30" />
      {/* Core */}
      <div className="w-3 h-3 rounded-full bg-luxury-gold shadow-[0_0_10px_rgba(200,168,107,0.55)]" />
    </div>
  );
}

/* ── Background SVG decorations ─────────────────────────── */
function Bg() {
  return (
    <svg
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none select-none"
      preserveAspectRatio="xMidYMid slice"
    >
      {Array.from({ length: 8 }).map((_, i) => (
        <line key={i}
          x1={i * 200 - 200} y1="0" x2={i * 200 + 400} y2="100%"
          stroke="rgba(200,168,107,0.028)" strokeWidth="1"
        />
      ))}
      {[260, 190, 120, 60].map((r, i) => (
        <circle key={`tr${i}`} cx="96%" cy="5%" r={r}
          fill="none" stroke="rgba(200,168,107,0.05)" strokeWidth="1"
          strokeDasharray={i % 2 === 0 ? "none" : "5 3"}
        />
      ))}
      {[220, 150, 80].map((r, i) => (
        <circle key={`bl${i}`} cx="4%" cy="95%" r={r}
          fill="none" stroke="rgba(200,168,107,0.045)" strokeWidth="1"
        />
      ))}
      {Array.from({ length: 7 }).map((_, row) =>
        Array.from({ length: 7 }).map((_, col) => (
          <circle key={`d${row}-${col}`}
            cx={`${1.5 + col * 1.6}%`} cy={`${1.5 + row * 2}%`}
            r="1.4" fill="rgba(200,168,107,0.09)"
          />
        ))
      )}
      {Array.from({ length: 6 }).map((_, row) =>
        Array.from({ length: 6 }).map((_, col) => (
          <circle key={`e${row}-${col}`}
            cx={`${87 + col * 1.5}%`} cy={`${88 + row * 1.8}%`}
            r="1.4" fill="rgba(200,168,107,0.08)"
          />
        ))
      )}
    </svg>
  );
}

/* ── Main export ─────────────────────────────────────────── */
export function JourneyTimeline() {
  const spineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = spineRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { scaleY: 0, transformOrigin: "top center" },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 75%",
            end: "bottom 25%",
            scrub: 1.5,
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  /* Split milestones: odd index → left column, even → right */
  const leftItems  = MILESTONES.filter((_, i) => i % 2 === 0); // 0,2,4
  const rightItems = MILESTONES.filter((_, i) => i % 2 === 1); // 1,3,5

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(160deg,#0F0E0C 0%,#1C1914 55%,#0F0E0C 100%)" }}
    >
      <Bg />

      {/* Top border */}
      <div className="h-px w-full" style={{ background: "linear-gradient(90deg,transparent,rgba(200,168,107,0.45),transparent)" }} />

      <div className="container-luxury relative z-10 py-28">

        {/* ── Header ── */}
        <div className="text-center mb-24">
          <div className="flex items-center justify-center gap-5 mb-7">
            <div className="h-px w-14" style={{ background: "linear-gradient(to right,transparent,rgba(200,168,107,0.5))" }} />
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
              <polygon points="9,1 17,9 9,17 1,9" fill="none" stroke="rgba(200,168,107,0.6)" strokeWidth="1" />
              <circle cx="9" cy="9" r="2.5" fill="rgba(200,168,107,0.7)" />
            </svg>
            <span className="eyebrow text-luxury-gold tracking-[0.35em] text-[9px]">Our Journey</span>
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
              <polygon points="9,1 17,9 9,17 1,9" fill="none" stroke="rgba(200,168,107,0.6)" strokeWidth="1" />
              <circle cx="9" cy="9" r="2.5" fill="rgba(200,168,107,0.7)" />
            </svg>
            <div className="h-px w-14" style={{ background: "linear-gradient(to left,transparent,rgba(200,168,107,0.5))" }} />
          </div>

          <h2
            className="font-cormorant font-light text-white leading-[1.04] mb-5"
            style={{ fontSize: "clamp(36px,4.8vw,70px)" }}
          >
            Two Decades of{" "}
            <em className="italic text-luxury-gold font-light">Excellence</em>
          </h2>
          <p className="font-inter text-[13px] font-light text-white/40 max-w-sm mx-auto leading-relaxed">
            From a boutique studio in Pontiac to national recognition.
          </p>

          <div className="flex items-center justify-center gap-4 mt-8">
            <div className="h-px w-16 bg-luxury-gold/18" />
            <div className="w-1 h-1 bg-luxury-gold/40 rotate-45" />
            <div className="h-px w-16 bg-luxury-gold/18" />
          </div>
        </div>

        {/* ══ DESKTOP — two-column alternating layout ════════════════ */}
        <div className="hidden lg:block">
          {/*
            Grid: [left-col] [spine] [right-col]
            Left col  = cards at rows 1,3,5
            Spine col = 2px line + nodes at every row
            Right col = cards at rows 2,4,6 (offset by 0.5 row)
          */}
          <div className="relative grid grid-cols-[1fr_2px_1fr] gap-x-10 items-start">

            {/* ── Animated spine ── */}
            <div
              ref={spineRef}
              className="col-start-2 col-end-3 row-start-1 row-end-[-1]"
              style={{
                position: "absolute",
                left: "calc(50% - 1px)",
                top: 0,
                bottom: 0,
                width: "2px",
                background: "linear-gradient(to bottom, rgba(200,168,107,0.6), rgba(200,168,107,0.1))",
                transform: "scaleY(0)",
                transformOrigin: "top center",
              }}
            />
            {/* Spine track (faint background) */}
            <div
              className="absolute"
              style={{
                left: "calc(50% - 1px)",
                top: 0,
                bottom: 0,
                width: "2px",
                background: "rgba(200,168,107,0.1)",
              }}
            />

            {/* ── Paired rows: each row = left card + node + right card ── */}
            {MILESTONES.map((m, i) => {
              const isLeft  = i % 2 === 0;
              const rowSpan = i + 1;

              return (
                <div
                  key={m.year}
                  className={`contents`}
                >
                  {/* Left card slot */}
                  <div
                    className={`col-start-1 col-end-2 mb-12 ${isLeft ? "" : "invisible pointer-events-none"}`}
                    style={{ gridRow: `${rowSpan}` }}
                  >
                    {isLeft && <MilestoneCard milestone={m} side="left" />}
                  </div>

                  {/* Spine node — always centred */}
                  <div
                    className="col-start-2 col-end-3 flex items-start justify-center mb-12"
                    style={{ gridRow: `${rowSpan}`, paddingTop: "80px" }}
                  >
                    <SpineNode index={i} />
                  </div>

                  {/* Right card slot */}
                  <div
                    className={`col-start-3 col-end-4 mb-12 ${!isLeft ? "" : "invisible pointer-events-none"}`}
                    style={{ gridRow: `${rowSpan}` }}
                  >
                    {!isLeft && <MilestoneCard milestone={m} side="right" />}
                  </div>
                </div>
              );
            })}

          </div>
        </div>

        {/* ══ MOBILE — single column with left spine ══════════════════ */}
        <div className="lg:hidden space-y-0">
          {MILESTONES.map((m, i) => (
            <div key={m.year} className="grid grid-cols-[40px_1fr] gap-0">
              {/* Spine + node */}
              <div className="flex flex-col items-center">
                <div className="w-2.5 h-2.5 rounded-full bg-luxury-gold mt-6 flex-shrink-0 shadow-[0_0_8px_rgba(200,168,107,0.5)]" />
                {i < MILESTONES.length - 1 && (
                  <div className="w-px flex-1 mt-2 mb-0" style={{ background: "rgba(200,168,107,0.2)", minHeight: "20px" }} />
                )}
              </div>
              {/* Card */}
              <div className="pb-10 pl-3">
                <MilestoneCard milestone={m} side="left" />
              </div>
            </div>
          ))}
        </div>

        {/* ── Bottom ornament ── */}
        <div className="flex items-center justify-center gap-5 mt-8">
          <div className="h-px w-16" style={{ background: "linear-gradient(to right,transparent,rgba(200,168,107,0.4))" }} />
          <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
            <polygon points="12,2 22,12 12,22 2,12" fill="none" stroke="rgba(200,168,107,0.45)" strokeWidth="1" />
            <polygon points="12,6 18,12 12,18 6,12" fill="none" stroke="rgba(200,168,107,0.22)" strokeWidth="0.8" />
            <circle cx="12" cy="12" r="2" fill="rgba(200,168,107,0.6)" />
          </svg>
          <div className="h-px w-16" style={{ background: "linear-gradient(to left,transparent,rgba(200,168,107,0.4))" }} />
        </div>

        {/* ── Stats row ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px mt-20" style={{ background: "rgba(255,255,255,0.04)" }}>
          {[
            { num: "20",  suffix: "+", label: "Years of Studio"    },
            { num: "500", suffix: "+", label: "Spaces Transformed" },
            { num: "12",  suffix: "+", label: "Design Awards"      },
            { num: "98",  suffix: "%", label: "Client Satisfaction" },
          ].map(({ num, suffix, label }) => (
            <div
              key={label}
              className="py-10 px-6 text-center hover:bg-white/[0.04] transition-colors duration-400"
              style={{ background: "rgba(255,255,255,0.015)" }}
            >
              <div
                className="font-cormorant font-light text-white leading-none mb-2"
                style={{ fontSize: "clamp(40px,5vw,58px)" }}
              >
                {num}<span className="text-luxury-gold">{suffix}</span>
              </div>
              <div className="eyebrow text-[8.5px] text-white/30 tracking-[0.25em]">{label}</div>
            </div>
          ))}
        </div>

      </div>

      {/* Bottom border */}
      <div className="h-px w-full" style={{ background: "linear-gradient(90deg,transparent,rgba(200,168,107,0.45),transparent)" }} />
    </section>
  );
}
