"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  GoldRings, GoldCircle, DotMatrix, GoldDiamond,
  GoldArc, GoldWave,
} from "@/components/ui/Decorative";

const DETAILS = [
  { src: "/images/IMG_9329.webp", alt: "Floral detail — white roses"       },
  { src: "/images/IMG_9334.webp", alt: "Centrepiece arrangement"           },
  { src: "/images/IMG_9339.webp", alt: "Table candle styling"              },
  { src: "/images/IMG_9346.webp", alt: "Gold accent accessories"           },
  { src: "/images/IMG_9352.webp", alt: "Linen and crystal table setup"     },
  { src: "/images/IMG_9355.webp", alt: "Floral wall backdrop detail"       },
  { src: "/images/IMG_9362.webp", alt: "Luxury place setting"              },
  { src: "/images/IMG_9370.webp", alt: "Chair ribbon styling"              },
  { src: "/images/IMG_9378.webp", alt: "Hanging floral accent"             },
  { src: "/images/IMG_9380.webp", alt: "Candelabra detail"                 },
  { src: "/images/IMG_9385.webp", alt: "Custom stationery and decor"       },
  { src: "/images/IMG_9398.webp", alt: "Event lighting ambiance"           },
];

const HEIGHTS = [280, 340, 300, 260, 320, 280, 360, 280, 300, 340, 280, 320];

function DetailCard({ src, alt, height, delay }: { src: string; alt: string; height: number; delay: number }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay }}
      className="relative overflow-hidden group cursor-pointer img-frame break-inside-avoid mb-[6px]"
      style={{ height }}
    >
      <div className={`absolute inset-0 img-shimmer transition-opacity duration-700 ${loaded ? "opacity-0" : "opacity-100"}`} />
      <Image
        src={src} alt={alt} fill
        className={`object-cover img-luxury-load transition-transform duration-800 group-hover:scale-[1.06] ${loaded ? "loaded" : ""}`}
        sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
        onLoad={() => setLoaded(true)}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      {/* Label */}
      <div className="absolute bottom-5 left-5 right-5 translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-400">
        <p className="eyebrow text-white/90 text-[8px]">{alt}</p>
      </div>
      {/* Top-right gold tag on hover */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <GoldDiamond size={12} opacity={0.8} filled />
      </div>
    </motion.div>
  );
}

const COPY_BLOCKS = [
  {
    icon: "✦",
    title: "Artisan Florals",
    body: "Each arrangement is hand-crafted by master florists who understand that blooms are the punctuation of great design.",
  },
  {
    icon: "✦",
    title: "Material Mastery",
    body: "We source only the finest linens, crystals, and metals — because the touch and texture of a space speaks before the eye even registers.",
  },
  {
    icon: "✦",
    title: "Light & Ambience",
    body: "Lighting is the soul of a space. Our team orchestrates candlelight, chandeliers, and architectural lighting to create emotional depth.",
  },
  {
    icon: "✦",
    title: "Bespoke Furniture",
    body: "Every piece is curated or custom-crafted — nothing from a catalogue, everything from the heart of a craftsman's atelier.",
  },
];

export function CraftDetails() {
  return (
    <section className="relative py-28 bg-luxury-cream overflow-hidden">

      {/* Decorative elements */}
      <GoldRings size={440} rings={5} opacity={0.07} animate
        className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 ring-decoration" />
      <GoldCircle size={180} opacity={0.09} dashed
        className="absolute bottom-20 left-12 ring-decoration" />
      <DotMatrix cols={10} rows={7} gap={24}
        className="absolute top-24 left-0 ring-decoration opacity-40" />
      <GoldArc size={300} startAngle={180} endAngle={360} opacity={0.07}
        className="absolute -bottom-16 right-1/4 ring-decoration" />

      <div className="container-luxury relative z-10">

        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-16 items-end mb-20">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-px bg-luxury-gold" />
              <span className="eyebrow">The Art of Detail</span>
            </div>
            <h2
              className="font-cormorant font-light text-luxury-black leading-[1.06]"
              style={{ fontSize: "clamp(40px,4.8vw,76px)" }}
            >
              Crafted With<br />
              <em className="italic text-luxury-pink font-light">Obsessive Care</em>
            </h2>
          </div>
          <div>
            <GoldWave width={280} height={30} waves={4} opacity={0.25} className="mb-6" />
            <p className="text-body-md text-luxury-gray font-light leading-relaxed">
              Luxury lives in the details most people never consciously notice — the weight of
              a linen napkin, the precise arc of a floral stem, the warmth of a perfectly
              placed candle. At Eleganté, these micro-decisions are where we spend the most time.
            </p>
          </div>
        </div>

        {/* 4-column masonry grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-[6px]">
          {DETAILS.map((d, i) => (
            <DetailCard
              key={d.src}
              {...d}
              height={HEIGHTS[i]}
              delay={Math.min(i * 0.05, 0.45)}
            />
          ))}
        </div>

        {/* Copy blocks */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-20 pt-16 border-t border-luxury-gold/15">
          {COPY_BLOCKS.map(({ icon, title, body }) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="text-luxury-gold text-lg mb-4">{icon}</div>
              <h4 className="font-cormorant text-xl font-light text-luxury-black mb-3">{title}</h4>
              <p className="text-body-sm text-luxury-gray font-light leading-relaxed">{body}</p>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center mt-14">
          <Link href="/services" className="btn-luxury-outline">
            Our Services
            <span className="btn-arrow-line" />
          </Link>
        </div>
      </div>
    </section>
  );
}
