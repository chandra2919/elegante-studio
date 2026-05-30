"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TESTIMONIALS } from "@/lib/data";

const IMAGES = [
  "/images/BW8A3535.jpg",
  "/images/BW8A3410.jpg",
  "/images/BW8A3694.jpg",
  "/images/BW8A3877.jpg",
  "/images/BW8A3472.jpg",
];

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const timer   = useRef<ReturnType<typeof setInterval>>();

  const goTo = useCallback((n: number) => {
    setCurrent(((n % TESTIMONIALS.length) + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  useEffect(() => {
    timer.current = setInterval(() => goTo(current + 1), 6000);
    return () => clearInterval(timer.current);
  }, [current, goTo]);

  const t = TESTIMONIALS[current];
  const imgSrc = IMAGES[current % IMAGES.length];

  return (
    <section className="section-pad bg-luxury-black relative overflow-hidden">
      {/* Large background number */}
      <div
        className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none select-none"
        aria-hidden="true"
        style={{
          fontFamily: "Cormorant Garamond, serif",
          fontSize: "clamp(160px, 22vw, 320px)",
          fontWeight: 300,
          color: "rgba(200,168,107,0.035)",
          lineHeight: 1,
        }}
      >
        {String(current + 1).padStart(2, "0")}
      </div>

      {/* Ambient background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(200,168,107,0.07), transparent)" }}
      />

      <div className="container-luxury relative z-10">
        <SectionHeader
          eyebrow="Client Stories"
          title={<>Words from Our <em className="italic text-luxury-gold font-light">Valued</em> Clients</>}
          light
          className="mb-16"
        />

        <div className="grid lg:grid-cols-[1fr_420px] gap-16 items-center">
          {/* Left — testimonial content */}
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {/* Stars */}
                <div className="flex gap-1.5 mb-8">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <span key={i} className="text-luxury-gold text-base">★</span>
                  ))}
                </div>

                {/* Giant quote */}
                <div
                  className="font-cormorant leading-none text-luxury-gold/12 mb-4 select-none"
                  style={{ fontSize: "clamp(80px, 10vw, 140px)" }}
                  aria-hidden="true"
                >
                  "
                </div>

                {/* Testimonial text */}
                <p
                  className="font-cormorant italic font-light text-white/85 leading-relaxed -mt-8 mb-10"
                  style={{ fontSize: "clamp(18px, 2vw, 26px)" }}
                >
                  {t.text}
                </p>

                {/* Author */}
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-luxury-pink to-luxury-gold flex items-center justify-center flex-shrink-0">
                    <span className="font-cormorant text-xl text-white">{t.name[0]}</span>
                  </div>
                  <div className="w-px h-10 bg-luxury-gold/20" />
                  <div>
                    <div className="font-inter text-sm font-medium text-white tracking-wide">{t.name}</div>
                    <div className="eyebrow text-[9px] text-luxury-gold/60 mt-1">{t.role}</div>
                    <div className="eyebrow text-[8px] text-white/25 mt-0.5">{t.location}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center gap-5 mt-12">
              <button
                onClick={() => goTo(current - 1)}
                className="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center text-white/40 hover:border-luxury-gold/60 hover:text-luxury-gold transition-all duration-300 text-lg"
                aria-label="Previous"
              >
                ←
              </button>

              <div className="flex gap-2">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    aria-label={`Testimonial ${i + 1}`}
                    className={`block rounded-full transition-all duration-400 ${
                      i === current
                        ? "w-7 h-1.5 bg-luxury-gold"
                        : "w-1.5 h-1.5 bg-white/20 hover:bg-white/40"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => goTo(current + 1)}
                className="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center text-white/40 hover:border-luxury-gold/60 hover:text-luxury-gold transition-all duration-300 text-lg"
                aria-label="Next"
              >
                →
              </button>

              <span className="ml-2 font-cormorant text-white/20 text-sm">
                {String(current + 1).padStart(2, "0")} / {String(TESTIMONIALS.length).padStart(2, "0")}
              </span>
            </div>
          </div>

          {/* Right — ambient portrait image */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`img-${current}`}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative h-[420px] overflow-hidden hidden lg:block"
            >
              <Image src={imgSrc} alt="Project" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/60 via-transparent to-transparent" />
              {/* Gold frame accent */}
              <div className="absolute inset-4 border border-luxury-gold/20 pointer-events-none" />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
