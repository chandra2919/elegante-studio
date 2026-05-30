"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PROJECTS } from "@/lib/data";

const featured = PROJECTS.filter((p) => p.featured).slice(0, 4);

/* Direction-aware hover overlay */
function getDirection(e: React.MouseEvent<HTMLElement>, el: HTMLElement): "top" | "right" | "bottom" | "left" {
  const rect = el.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width  / 2;
  const y = e.clientY - rect.top  - rect.height / 2;
  const angle = Math.atan2(y, x) * (180 / Math.PI);
  if (angle > -45  && angle <= 45)  return "right";
  if (angle > 45   && angle <= 135) return "bottom";
  if (angle > 135  || angle <= -135) return "left";
  return "top";
}

const dirMap = {
  top:    { x: 0, y: -40 },
  bottom: { x: 0, y:  40 },
  left:   { x: -40, y: 0 },
  right:  { x:  40, y: 0 },
};

function ProjectCard({
  slug,
  heroImage,
  title,
  category,
  location,
  year,
  large = false,
  wide = false,
  delay = 0,
}: {
  slug: string;
  heroImage: string;
  title: string;
  category: string;
  location: string;
  year: string;
  large?: boolean;
  wide?: boolean;
  delay?: number;
}) {
  const cardRef  = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const imgRef   = useRef<HTMLDivElement>(null);

  const onEnter = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    const overlay = overlayRef.current;
    if (!card || !overlay) return;
    const dir = getDirection(e, card);
    const from = dirMap[dir];
    gsap.fromTo(overlay, { x: from.x, y: from.y, opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: 0.45, ease: "power2.out" });
    gsap.to(imgRef.current, { scale: 1.07, duration: 0.8, ease: "power2.out" });
  }, []);

  const onLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    const overlay = overlayRef.current;
    if (!card || !overlay) return;
    const dir = getDirection(e, card);
    const to = dirMap[dir];
    gsap.to(overlay, { x: to.x, y: to.y, opacity: 0, duration: 0.38, ease: "power2.in" });
    gsap.to(imgRef.current, { scale: 1, duration: 0.7, ease: "power2.out" });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: large ? 50 : 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94], delay }}
      className={`relative overflow-hidden cursor-pointer ${large ? "h-[500px]" : wide ? "h-64" : "flex-1 min-h-[230px]"}`}
      ref={cardRef}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <Link href={`/portfolio/${slug}`} className="block w-full h-full">
        {/* Image */}
        <div ref={imgRef} className="absolute inset-0 will-change-transform" style={{ transformOrigin: "center" }}>
          <Image
            src={heroImage}
            alt={title}
            fill
            className="object-cover"
            sizes={large ? "(max-width:768px) 100vw, 58vw" : wide ? "100vw" : "(max-width:768px) 100vw, 42vw"}
          />
        </div>

        {/* Permanent dark gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/80 via-luxury-black/20 to-transparent" />

        {/* Direction-aware overlay */}
        <div
          ref={overlayRef}
          className="absolute inset-0 opacity-0 will-change-transform"
          style={{ background: "linear-gradient(to top, rgba(200,168,107,0.18), transparent 60%)" }}
        />

        {/* Gold inset border on hover */}
        <div className="absolute inset-3 border border-luxury-gold/0 group-hover:border-luxury-gold/30 transition-colors duration-500 pointer-events-none" />

        {/* Content */}
        <div className={`absolute bottom-0 left-0 right-0 ${large || wide ? "p-9" : "p-6"}`}>
          <div className="eyebrow text-luxury-gold mb-2 text-[9px] opacity-80">{category}</div>
          <h3 className={`font-cormorant font-light text-white leading-tight ${large ? "text-3xl" : wide ? "text-2xl" : "text-xl"}`}>
            {title}
          </h3>
          <p className="text-[11px] text-white/45 mt-2 font-inter tracking-wider uppercase">{location} · {year}</p>
        </div>
      </Link>
    </motion.div>
  );
}

export function FeaturedProjects() {
  return (
    <section className="section-pad bg-luxury-cream">
      <div className="container-luxury">
        <SectionHeader
          eyebrow="Signature Portfolio"
          title={<>Our Most <em className="italic text-luxury-pink">Celebrated</em> Works</>}
          subtitle="Each project is a testament to our philosophy — luxury is in the details, and excellence is our only standard."
          className="mb-16"
        />

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Large feature — 7 col */}
          <div className="md:col-span-7">
            <ProjectCard
              {...featured[0]}
              large
              delay={0}
            />
          </div>

          {/* Right stack — 5 col */}
          <div className="md:col-span-5 flex flex-col gap-4">
            {featured.slice(1, 3).map((p, i) => (
              <ProjectCard key={p.slug} {...p} delay={0.12 + i * 0.12} />
            ))}
          </div>

          {/* Wide bottom — full width */}
          {featured[3] && (
            <div className="md:col-span-12">
              <ProjectCard {...featured[3]} wide delay={0.25} />
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-14">
          <Link href="/portfolio" className="btn-luxury-outline">
            View Full Portfolio
            <span className="btn-arrow-line" />
          </Link>
        </div>
      </div>
    </section>
  );
}
