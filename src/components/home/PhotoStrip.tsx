"use client";
import { useState } from "react";
import Image from "next/image";
import { GoldDiamond } from "@/components/ui/Decorative";

const STRIP_IMAGES = [
  { src: "/images/BW8A3694.webp", alt: "Luxury venue styling"         },
  { src: "/images/BW8A3717.webp", alt: "Event floral arch"            },
  { src: "/images/BW8A3725.webp", alt: "Centrepiece detail"           },
  { src: "/images/BW8A3754.webp", alt: "Grand reception hall"         },
  { src: "/images/BW8A3784.webp", alt: "Hanging floral installation"  },
  { src: "/images/BW8A3820.webp", alt: "Intimate dining setup"        },
  { src: "/images/BW8A3824.webp", alt: "Stage decoration"             },
  { src: "/images/BW8A3836.webp", alt: "Entrance arch styling"        },
  { src: "/images/BW8A3858.webp", alt: "Luxury chandelier room"       },
  { src: "/images/BW8A3877.webp", alt: "Ornamental table design"      },
  { src: "/images/BW8A3879.webp", alt: "Bridal floral wall"           },
  { src: "/images/BW8A3881.webp", alt: "Event ceiling draping"        },
  { src: "/images/BW8A3882.webp", alt: "Gold and white theme setup"   },
  { src: "/images/BW8A3886.webp", alt: "Premium table decor"          },
  { src: "/images/BW8A3899.webp", alt: "Luxury event ambience"        },
];

// Double for seamless loop
const ALL = [...STRIP_IMAGES, ...STRIP_IMAGES];

function StripImg({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="relative flex-shrink-0 w-[320px] h-[440px] overflow-hidden group cursor-pointer">
      <div className={`absolute inset-0 img-shimmer transition-opacity duration-700 ${loaded ? "opacity-0" : "opacity-100"}`} />
      <Image
        src={src} alt={alt} fill
        className={`object-cover img-luxury-load transition-transform duration-700 group-hover:scale-[1.05] ${loaded ? "loaded" : ""}`}
        sizes="320px"
        onLoad={() => setLoaded(true)}
      />
      {/* Hover label */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
      <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-all duration-400 translate-y-3 group-hover:translate-y-0">
        <p className="eyebrow text-white/90 text-[8px]">{alt}</p>
      </div>
    </div>
  );
}

export function PhotoStrip() {
  return (
    <section className="relative py-0 overflow-hidden bg-luxury-warm">

      {/* Top ornament */}
      <div className="flex items-center justify-center gap-6 py-16">
        <div className="h-px w-20 bg-gradient-to-r from-transparent to-luxury-gold/50" />
        <GoldDiamond size={10} opacity={0.4} />
        <span className="eyebrow text-luxury-gold/70">Our Work</span>
        <GoldDiamond size={10} opacity={0.4} />
        <div className="h-px w-20 bg-gradient-to-l from-transparent to-luxury-gold/50" />
      </div>

      {/* Auto-scrolling strip */}
      <div className="relative overflow-hidden" style={{ height: 440 }}>
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, var(--bg-secondary), transparent)" }} />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, var(--bg-secondary), transparent)" }} />

        <div className="photo-strip-track h-full gap-[6px]" aria-label="Portfolio gallery strip">
          {ALL.map((img, i) => (
            <StripImg key={`${img.src}-${i}`} {...img} />
          ))}
        </div>
      </div>

      {/* Bottom ornament */}
      <div className="flex items-center justify-center gap-6 py-16">
        <div className="h-px w-20 bg-gradient-to-r from-transparent to-luxury-gold/50" />
        <GoldDiamond size={10} opacity={0.4} />
        <span className="eyebrow text-luxury-gold/70 text-[8px]">Eleganté Interiors</span>
        <GoldDiamond size={10} opacity={0.4} />
        <div className="h-px w-20 bg-gradient-to-l from-transparent to-luxury-gold/50" />
      </div>
    </section>
  );
}
