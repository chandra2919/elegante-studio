"use client";
import { useState, useRef, useCallback, useEffect } from "react";
// Note: CATS filter removed by design — gallery shows all images in full masonry
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PhotoStrip } from "@/components/home/PhotoStrip";

const ALL_IMAGES = [
  { src: "/images/BW8A3410.webp", title: "Grand Dining Suite",       cat: "interiors"  },
  { src: "/images/BW8A3472.webp", title: "Crystal Chandelier",       cat: "lighting"   },
  { src: "/images/BW8A3535.webp", title: "Black & Gold Study",       cat: "interiors"  },
  { src: "/images/BW8A3578.webp", title: "Venetian Art Collection",  cat: "decor"      },
  { src: "/images/BW8A3694.webp", title: "Ivory Living Collection",  cat: "furniture"  },
  { src: "/images/BW8A3877.webp", title: "Grand Drape Installation", cat: "events"     },
  { src: "/images/BW8A3887.webp", title: "Silk Drapery Couture",     cat: "events"     },
  { src: "/images/BW8A3452.webp", title: "Beaded Luxury Vessel",     cat: "decor"      },
  { src: "/images/IMG_9370.webp", title: "Antique Gold Urn",         cat: "decor"      },
  { src: "/images/BW8A3607.webp", title: "Eleganté Brand Wall",      cat: "studio"     },
  { src: "/images/BW8A3384.webp", title: "Studio Exterior",          cat: "studio"     },
  { src: "/images/BW8A3820.webp", title: "Dare To Have Flair",       cat: "studio"     },
  { src: "/images/BW8A3593.webp", title: "Studio Interior",          cat: "interiors"  },
  { src: "/images/BW8A3604.webp", title: "Decor Vignette",           cat: "decor"      },
  { src: "/images/BW8A3646.webp", title: "Room Styling",             cat: "interiors"  },
  { src: "/images/BW8A3656.webp", title: "Furniture Collection",     cat: "furniture"  },
  { src: "/images/BW8A3725.webp", title: "Styling Services",            cat: "events"     },
  { src: "/images/BW8A3784.webp", title: "Luxury Living",            cat: "interiors"  },
  { src: "/images/BW8A3836.webp", title: "Artisan Object",           cat: "decor"      },
  { src: "/images/BW8A3853.webp", title: "Gold Detail",              cat: "decor"      },
];


function GalleryItem({
  src, title, cat, index, onClick,
}: { src: string; title: string; cat: string; index: number; onClick: () => void }) {
  const ref     = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const imgRef  = useRef<HTMLDivElement>(null);

  const getDir = useCallback((e: React.MouseEvent<HTMLElement>, el: HTMLElement) => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width  / 2;
    const y = e.clientY - rect.top  - rect.height / 2;
    const angle = Math.atan2(y, x) * (180 / Math.PI);
    if (angle > -45  && angle <= 45)  return { x:  40, y: 0 };
    if (angle > 45   && angle <= 135) return { x: 0,  y:  40 };
    if (angle > 135  || angle <= -135) return { x: -40, y: 0 };
    return { x: 0, y: -40 };
  }, []);

  const onEnter = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || !overlayRef.current) return;
    const from = getDir(e, el);
    gsap.fromTo(overlayRef.current, { x: from.x, y: from.y, opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: 0.4, ease: "power2.out" });
    gsap.to(imgRef.current, { scale: 1.08, duration: 0.8, ease: "power2.out" });
  }, [getDir]);

  const onLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || !overlayRef.current) return;
    const to = getDir(e, el);
    gsap.to(overlayRef.current, { x: to.x, y: to.y, opacity: 0, duration: 0.35, ease: "power2.in" });
    gsap.to(imgRef.current, { scale: 1, duration: 0.7, ease: "power2.out" });
  }, [getDir]);

  // Scroll-triggered entrance
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.from(el, {
        opacity: 0,
        y: 40,
        clipPath: "inset(0 0 100% 0)",
        duration: 0.9,
        delay: (index % 4) * 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 92%", toggleActions: "play none none none" },
      });
    });
    return () => ctx.revert();
  }, [index]);

  return (
    <div
      ref={ref}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={onClick}
      className="group relative overflow-hidden cursor-pointer mb-4"
      style={{ opacity: 0 }}
    >
      <div ref={imgRef} className="will-change-transform" style={{ transformOrigin: "center" }}>
        <Image
          src={src}
          alt={title}
          width={600}
          height={800}
          className="w-full object-cover"
          loading="lazy"
          sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
        />
      </div>

      {/* Direction-aware overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 opacity-0 pointer-events-none flex flex-col items-center justify-center gap-2 px-4 text-center will-change-transform"
        style={{ background: "rgba(31,31,31,0.72)" }}
      >
        <span className="font-cormorant text-lg italic text-white">{title}</span>
        <span className="eyebrow text-[8px] text-luxury-gold">{cat}</span>
        <div className="w-6 h-px bg-luxury-gold mt-1" />
      </div>
    </div>
  );
}

export default function GalleryPage() {
  const [lightbox, setLightbox] = useState<{ src: string; title: string } | null>(null);

  return (
    <>
      {/* Hero */}
      <section className="pt-36 pb-20 bg-luxury-cream relative overflow-hidden">
        <div className="absolute inset-0 bg-luxury-dots opacity-60" />
        <div className="container-luxury relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <span className="w-10 h-px bg-luxury-gold" />
            <span className="eyebrow">Visual Portfolio</span>
          </div>
          <h1 className="font-cormorant font-light text-luxury-black leading-[1.05]" style={{ fontSize: "clamp(52px,6.5vw,100px)" }}>
            The <em className="italic text-luxury-pink">Gallery</em>
          </h1>
          <p className="text-body-lg text-luxury-gray mt-4 max-w-xl font-light">
            A curated window into our world of luxury design and styling excellence.
          </p>
        </div>
      </section>

      {/* Auto-scrolling panoramic strip */}
      <PhotoStrip />

      {/* Masonry grid */}
      <section className="pt-2 pb-20 bg-luxury-cream">
        <div className="container-luxury">
          <AnimatePresence mode="wait">
            <motion.div
              key="all"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="masonry-grid"
            >
              {ALL_IMAGES.map((img, i) => (
                <GalleryItem
                  key={img.src}
                  {...img}
                  index={i}
                  onClick={() => setLightbox(img)}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[9990] flex items-center justify-center p-8"
            style={{ background: "rgba(15,15,15,0.96)", backdropFilter: "blur(12px)" }}
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.86, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={lightbox.src}
                alt={lightbox.title}
                width={1400}
                height={1000}
                className="w-full object-contain max-h-[85vh]"
              />
              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-luxury-black/70 to-transparent">
                <p className="font-cormorant text-xl italic text-white">{lightbox.title}</p>
              </div>
              {/* Gold frame */}
              <div className="absolute inset-3 border border-luxury-gold/20 pointer-events-none" />
            </motion.div>

            <button
              onClick={() => setLightbox(null)}
              className="absolute top-6 right-8 w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:border-luxury-gold/60 hover:text-luxury-gold transition-all duration-300"
              aria-label="Close"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
