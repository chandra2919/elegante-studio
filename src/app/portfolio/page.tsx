"use client";
import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { PROJECTS } from "@/lib/data";
import type { ProjectCategory } from "@/lib/types";

const CATEGORIES: { label: string; value: "all" | ProjectCategory }[] = [
  { label: "All Works",   value: "all"        },
  { label: "Residential", value: "residential" },
  { label: "Commercial",  value: "commercial"  },
  { label: "Events",      value: "events"      },
  { label: "Decor",       value: "decor"       },
  { label: "Furniture",   value: "furniture"   },
  { label: "Floral",      value: "floral"      },
];

function getDirection(e: React.MouseEvent<HTMLElement>, el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width  / 2;
  const y = e.clientY - rect.top  - rect.height / 2;
  const angle = Math.atan2(y, x) * (180 / Math.PI);
  if (angle > -45  && angle <= 45)  return { x:  50, y: 0 };
  if (angle > 45   && angle <= 135) return { x: 0, y:  50 };
  if (angle > 135  || angle <= -135) return { x: -50, y: 0 };
  return { x: 0, y: -50 };
}

function ProjectTile({ project, index }: { project: typeof PROJECTS[0]; index: number }) {
  const cardRef   = useRef<HTMLDivElement>(null);
  const imgRef    = useRef<HTMLDivElement>(null);
  const overlayRef= useRef<HTMLDivElement>(null);

  const onEnter = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el || !overlayRef.current) return;
    const from = getDirection(e, el);
    gsap.fromTo(overlayRef.current, { x: from.x, y: from.y, opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: 0.4, ease: "power2.out" });
    gsap.to(imgRef.current, { scale: 1.07, duration: 0.8, ease: "power2.out" });
  }, []);

  const onLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el || !overlayRef.current) return;
    const to = getDirection(e, el);
    gsap.to(overlayRef.current, { x: to.x, y: to.y, opacity: 0, duration: 0.35, ease: "power2.in" });
    gsap.to(imgRef.current, { scale: 1, duration: 0.7, ease: "power2.out" });
  }, []);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94], delay: index * 0.05 }}
    >
      <div
        ref={cardRef}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        className="group cursor-pointer overflow-hidden bg-luxury-cream"
      >
        <Link href={`/portfolio/${project.slug}`} className="block">
          {/* Image */}
          <div className="relative h-72 overflow-hidden">
            <div
              ref={imgRef}
              className="absolute inset-0 will-change-transform"
              style={{ transformOrigin: "center" }}
            >
              <Image src={project.heroImage} alt={project.title} fill className="object-cover" sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw" />
            </div>

            {/* Direction-aware hover overlay */}
            <div
              ref={overlayRef}
              className="absolute inset-0 opacity-0 will-change-transform pointer-events-none"
              style={{ background: "linear-gradient(to top, rgba(31,31,31,0.75), rgba(31,31,31,0.1))" }}
            />

            {/* Category pill — always visible */}
            <div className="absolute top-4 left-4 z-10">
              <span className="tag-gold bg-luxury-cream/90 backdrop-blur-sm">{project.category}</span>
            </div>

            {/* Featured badge */}
            {project.featured && (
              <div className="absolute top-4 right-4 z-10 w-8 h-8 bg-luxury-gold rounded-full flex items-center justify-center">
                <span className="text-white text-[10px]">✦</span>
              </div>
            )}

            {/* Gold inset frame */}
            <div className="absolute inset-3 border border-luxury-gold/0 group-hover:border-luxury-gold/30 transition-colors duration-500 pointer-events-none z-10" />
          </div>

          {/* Meta */}
          <div className="p-5 border border-luxury-gold/10 group-hover:border-luxury-gold/25 border-t-0 transition-colors duration-400 relative">
            {/* Animated top border */}
            <div className="absolute top-0 left-0 h-px w-0 bg-luxury-gold group-hover:w-full transition-all duration-600" />
            <h3 className="font-cormorant text-xl text-luxury-black font-light mb-1 group-hover:text-luxury-pink transition-colors duration-300">
              {project.title}
            </h3>
            <p className="text-body-sm text-luxury-gray font-light">{project.location} · {project.year}</p>
          </div>
        </Link>
      </div>
    </motion.div>
  );
}

export default function PortfolioPage() {
  const [active, setActive] = useState<"all" | ProjectCategory>("all");
  const filtered = active === "all" ? PROJECTS : PROJECTS.filter((p) => p.category === active);

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-end pb-20 overflow-hidden" style={{ minHeight: "60vh" }}>
        <Image src="/images/BW8A3410.jpg" alt="Portfolio" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/85 via-luxury-black/30 to-transparent" />
        <div className="container-luxury relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <span className="w-10 h-px bg-luxury-gold" />
            <span className="eyebrow text-luxury-gold">Our Work</span>
          </div>
          <h1 className="font-cormorant font-light text-white leading-[1.05]" style={{ fontSize: "clamp(52px,6.5vw,100px)" }}>
            Signature<br />
            <em className="italic text-luxury-gold">Portfolio</em>
          </h1>
          <p className="text-body-lg text-white/55 max-w-xl font-light mt-5">
            Six categories of extraordinary work — each project a unique conversation between space, material, and light.
          </p>
        </div>
      </section>

      {/* Sticky filter bar */}
      <div className="bg-luxury-cream/96 backdrop-blur-xl border-b border-luxury-gold/12 sticky top-[66px] z-30">
        <div className="container-luxury py-4 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {CATEGORIES.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setActive(value)}
              className={`flex-shrink-0 px-6 py-2.5 font-inter text-[10px] tracking-[0.22em] uppercase transition-all duration-350 ${
                active === value
                  ? "bg-luxury-black text-white border border-luxury-black"
                  : "bg-transparent text-luxury-gray border border-luxury-gold/20 hover:border-luxury-gold/50 hover:text-luxury-black"
              }`}
            >
              {label}
              {active === value && <span className="ml-2 text-luxury-gold">({filtered.length})</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <section className="section-pad bg-luxury-cream">
        <div className="container-luxury">
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <ProjectTile key={project.slug} project={project} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <div className="text-center py-28">
              <div className="font-cormorant text-6xl text-luxury-gold/20 mb-6">✦</div>
              <p className="font-cormorant text-2xl text-luxury-gray italic">No projects in this category yet.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
