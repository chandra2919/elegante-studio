"use client";
import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SERVICES } from "@/lib/data";

function ServiceCard({ service, index }: { service: typeof SERVICES[0]; index: number }) {
  const cardRef     = useRef<HTMLDivElement>(null);
  const glowRef     = useRef<HTMLDivElement>(null);
  const cardRect    = useRef<DOMRect | null>(null);
  const rafPending  = useRef(false);
  const lastX       = useRef(0);
  const lastY       = useRef(0);

  // Cache rect on enter — avoids getBoundingClientRect on every mousemove
  const onEnter = () => {
    const el = cardRef.current;
    if (!el) return;
    cardRect.current = el.getBoundingClientRect();
    el.style.willChange = "transform";
  };

  // RAF-throttled GSAP tween — at most one tween per animation frame
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    lastX.current = e.clientX;
    lastY.current = e.clientY;
    if (rafPending.current) return;
    rafPending.current = true;
    requestAnimationFrame(() => {
      rafPending.current = false;
      const el = cardRef.current;
      const r  = cardRect.current;
      if (!el || !r) return;
      const x    = (lastX.current - r.left) / r.width;
      const y    = (lastY.current - r.top)  / r.height;
      const xDeg = (x - 0.5) * 8; // reduced from 10 to 8 degrees
      const yDeg = (y - 0.5) * 8;
      gsap.to(el, { rotateX: -yDeg, rotateY: xDeg, transformPerspective: 1000, duration: 0.35, ease: "power2.out", overwrite: true });
      if (glowRef.current) {
        glowRef.current.style.opacity = "1";
        glowRef.current.style.background = `radial-gradient(circle at ${x*100}% ${y*100}%, rgba(200,168,107,0.09), transparent 70%)`;
      }
    });
  };

  const onLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    cardRect.current = null;
    gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.75, ease: "elastic.out(1,0.6)", overwrite: true, onComplete: () => { if (el) el.style.willChange = "auto"; } });
    if (glowRef.current) glowRef.current.style.opacity = "0";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94], delay: index * 0.1 }}
    >
      <div
        ref={cardRef}
        onMouseEnter={onEnter}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ transformStyle: "preserve-3d" }}
        className="relative"
      >
        {/* Glow overlay */}
        <div
          ref={glowRef}
          className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-300 opacity-0"
          aria-hidden="true"
        />

        <Link
          href={`/services/${service.slug}`}
          className="group block bg-white border border-luxury-gold/10 hover:border-luxury-gold/40 transition-all duration-500"
          style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.04)" }}
        >
          {/* Image */}
          <div className="relative h-60 overflow-hidden">
            <Image
              src={service.heroImage}
              alt={service.title}
              fill
              sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.07]"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/50 via-transparent to-transparent" />
            {/* Category eyebrow pill */}
            <div className="absolute top-4 left-4">
              <span className="eyebrow text-[8px] bg-luxury-black/50 backdrop-blur-sm text-luxury-gold px-3 py-1.5 tracking-[0.22em]">
                {service.subtitle}
              </span>
            </div>
            {/* Starting price */}
            {service.startingPrice && (
              <div className="absolute top-4 right-4 bg-luxury-cream/90 backdrop-blur-sm px-3 py-1">
                <span className="eyebrow text-[8px]">From {service.startingPrice}</span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-7 relative">
            {/* Animated top border */}
            <div className="absolute top-0 left-0 h-px w-0 bg-luxury-gold group-hover:w-full transition-all duration-700" />

            <div className="eyebrow text-[9px] mb-3 text-luxury-gold/80">{service.title}</div>
            <h3 className="font-cormorant text-2xl font-light text-luxury-black mb-3 group-hover:text-luxury-pink transition-colors duration-400">
              {service.title}
            </h3>
            <p className="text-body-sm text-luxury-gray leading-relaxed mb-6 font-light">
              {service.description}
            </p>

            {/* Arrow CTA */}
            <div className="flex items-center gap-0 overflow-hidden">
              <span className="eyebrow text-[9px] text-luxury-gold">Explore Service</span>
              <div className="relative ml-3 h-px bg-luxury-gold overflow-hidden w-5 group-hover:w-10 transition-all duration-400">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 border-t border-r border-luxury-gold rotate-45" />
              </div>
            </div>
          </div>
        </Link>
      </div>
    </motion.div>
  );
}

export function ServicesOverview() {
  return (
    <section className="section-pad bg-luxury-warm relative overflow-hidden">
      {/* Watermark */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none select-none"
        aria-hidden="true"
        style={{
          fontFamily: "Cormorant Garamond, serif",
          fontSize: "clamp(120px,18vw,260px)",
          fontWeight: 300,
          color: "rgba(200,168,107,0.04)",
          lineHeight: 1,
          letterSpacing: "-0.04em",
          whiteSpace: "nowrap",
          transform: "translateX(15%)",
        }}
      >
        Services
      </div>

      <div className="container-luxury relative z-10">
        <SectionHeader
          eyebrow="What We Offer"
          title={<>A Suite of <em className="italic text-luxury-pink">Luxury</em> Services</>}
          subtitle="From intimate residential redesigns to grand event transformations — we curate every experience to exceed expectation."
          className="mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.slug} service={service} index={i} />
          ))}
        </div>

        <div className="flex justify-center mt-14">
          <Link href="/services" className="btn-luxury-outline">
            All Services
            <span className="btn-arrow-line" />
          </Link>
        </div>
      </div>
    </section>
  );
}
