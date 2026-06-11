"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  GoldRings, GoldCircle, DotMatrix, GoldDiamond,
  DiagonalLines, GoldArc, GoldCorner,
} from "@/components/ui/Decorative";

function GalleryImg({
  src, alt, sizes = "33vw", className = "",
}: { src: string; alt: string; sizes?: string; className?: string }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className={`absolute inset-0 ${className}`}>
      <div className={`absolute inset-0 img-shimmer transition-opacity duration-700 ${loaded ? "opacity-0" : "opacity-100"}`} />
      <Image
        src={src} alt={alt} fill
        className={`object-cover img-luxury-load transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.07] ${loaded ? "loaded" : ""}`}
        sizes={sizes}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}

// Each cell: { src, alt, colSpan, rowSpan, tall? }
const GRID: Array<{ src: string; alt: string; col: string; row: string }> = [
  // Row 1 — wide hero
  { src: "/images/BW8A3578.webp",  alt: "Luxury event draping",        col: "col-span-8",  row: "row-span-5" },
  { src: "/images/BW8A3395.webp",  alt: "Reception hall centrepiece",  col: "col-span-4",  row: "row-span-3" },
  // Row 1 right bottom
  { src: "/images/BW8A3383.webp",  alt: "Floral arrangement",          col: "col-span-4",  row: "row-span-2" },
  // Row 2
  { src: "/images/BW8A3452.webp",  alt: "Table styling detail",        col: "col-span-3",  row: "row-span-3" },
  { src: "/images/BW8A3487.webp",  alt: "Event lighting setup",        col: "col-span-3",  row: "row-span-3" },
  { src: "/images/BW8A3420.webp",  alt: "Reception arch decor",        col: "col-span-6",  row: "row-span-3" },
  // Row 3
  { src: "/images/BW8A3437.webp",  alt: "Hanging floral installation", col: "col-span-4",  row: "row-span-4" },
  { src: "/images/BW8A3494.webp",  alt: "Gold candelabra detail",      col: "col-span-4",  row: "row-span-2" },
  { src: "/images/BW8A3535.webp",  alt: "Luxury table arrangement",    col: "col-span-4",  row: "row-span-2" },
  // Row 3 bottom
  { src: "/images/BW8A3472.webp",  alt: "Venue transformation",        col: "col-span-4",  row: "row-span-2" },
  { src: "/images/BW8A3490.webp",  alt: "Ceiling drape detail",        col: "col-span-4",  row: "row-span-2" },
  // Row 4
  { src: "/images/BW8A3593.webp",  alt: "Stage floral arch",           col: "col-span-5",  row: "row-span-4" },
  { src: "/images/BW8A3604.webp",  alt: "Crystal chandelier",          col: "col-span-4",  row: "row-span-2" },
  { src: "/images/BW8A3613.webp",  alt: "Bridal table setup",          col: "col-span-3",  row: "row-span-2" },
  { src: "/images/BW8A3618.webp",  alt: "Event hall overview",         col: "col-span-7",  row: "row-span-2" },
  // Row 5
  { src: "/images/BW8A3623.webp",  alt: "Luxury floral centrepiece",   col: "col-span-4",  row: "row-span-3" },
  { src: "/images/BW8A3656.webp",  alt: "Ornate room styling",         col: "col-span-4",  row: "row-span-3" },
  { src: "/images/BW8A3668.webp",  alt: "Gold accent decor",           col: "col-span-4",  row: "row-span-3" },
];

function Cell({ src, alt, col, row, delay }: typeof GRID[0] & { delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94], delay }}
      className={`relative overflow-hidden group cursor-pointer img-frame ${col} ${row}`}
      style={{ minHeight: 160 }}
    >
      <GalleryImg src={src} alt={alt} sizes="(max-width:768px) 100vw, 33vw" />
      {/* Permanent dark gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      {/* Gold corner brackets on hover */}
      <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
        <GoldCorner size={20} opacity={0.7} />
      </div>
      <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-400 rotate-180">
        <GoldCorner size={20} opacity={0.7} />
      </div>
      {/* Alt text label on hover */}
      <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-400 translate-y-2 group-hover:translate-y-0">
        <p className="eyebrow text-white/90 text-[8px] tracking-widest">{alt}</p>
      </div>
    </motion.div>
  );
}

export function GalleryWall() {
  return (
    <section className="relative bg-luxury-black overflow-hidden py-28">
      {/* Decorative rings */}
      <GoldRings size={500} rings={6} opacity={0.06} animate
        className="absolute -top-20 -left-20 ring-decoration" />
      <GoldArc size={400} startAngle={-90} endAngle={90} opacity={0.05}
        className="absolute top-1/2 -right-20 -translate-y-1/2 ring-decoration" />
      <DotMatrix cols={8} rows={6} gap={28}
        className="absolute bottom-10 left-8 ring-decoration opacity-30" />

      {/* Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="text-watermark opacity-30">Portfolio</span>
      </div>

      <div className="container-luxury relative z-10">

        {/* Section header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-5 mb-6">
            <div className="h-px w-16 bg-luxury-gold/40" />
            <span className="eyebrow text-luxury-gold/80">Signature Collection</span>
            <GoldDiamond size={8} opacity={0.5} />
            <div className="h-px w-16 bg-luxury-gold/40" />
          </div>
          <h2
            className="font-cormorant font-light text-white leading-[1.05]"
            style={{ fontSize: "clamp(42px,5vw,80px)" }}
          >
            Every Space,<br />
            <em className="italic text-luxury-gold font-light">A Masterpiece</em>
          </h2>
          <p className="text-white/50 font-inter font-light mt-4 max-w-xl mx-auto" style={{ fontSize: 15 }}>
            Two decades of transforming ordinary spaces into extraordinary experiences.
            Each project is a chapter in our story of luxury.
          </p>
        </div>

        {/* Mosaic grid — 12-column, 80px rows */}
        <div className="grid grid-cols-12 auto-rows-[80px] gap-[5px]">
          {GRID.map((cell, i) => (
            <Cell key={cell.src} {...cell} delay={Math.min(i * 0.04, 0.5)} />
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-14">
          <Link href="/portfolio"
            className="btn-luxury-gold hover:opacity-90 transition-opacity">
            Explore Full Portfolio
            <span className="btn-arrow-line" />
          </Link>
        </div>
      </div>
    </section>
  );
}
