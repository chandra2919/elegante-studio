"use client";
import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PhotoStrip } from "@/components/home/PhotoStrip";
import { ConsultationCTA } from "@/components/home/ConsultationCTA";
import { CraftDetails } from "@/components/home/CraftDetails";

// Register once at module level — safe in "use client" files
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ALL_IMAGES = [
  { src: "/images/BW8A3410.webp", title: "Grand Dining Suite",       cat: "Interiors"  },
  { src: "/images/BW8A3472.webp", title: "Crystal Chandelier",       cat: "Lighting"   },
  { src: "/images/BW8A3535.webp", title: "Black & Gold Study",       cat: "Interiors"  },
  { src: "/images/BW8A3578.webp", title: "Venetian Art Collection",  cat: "Decor"      },
  { src: "/images/BW8A3694.webp", title: "Ivory Living Collection",  cat: "Furniture"  },
  { src: "/images/BW8A3877.webp", title: "Grand Drape Installation", cat: "Styling"    },
  { src: "/images/BW8A3887.webp", title: "Silk Drapery Couture",     cat: "Styling"    },
  { src: "/images/BW8A3452.webp", title: "Beaded Luxury Vessel",     cat: "Decor"      },
  { src: "/images/IMG_9329.webp", title: "White Rose Detail",        cat: "Florals"    },
  { src: "/images/IMG_9334.webp", title: "Centrepiece Arrangement",  cat: "Florals"    },
  { src: "/images/IMG_9339.webp", title: "Table Candle Styling",     cat: "Styling"    },
  { src: "/images/IMG_9346.webp", title: "Gold Accent Accessories",  cat: "Decor"      },
  { src: "/images/IMG_9352.webp", title: "Linen & Crystal Setup",    cat: "Styling"    },
  { src: "/images/IMG_9355.webp", title: "Floral Wall Backdrop",     cat: "Florals"    },
  { src: "/images/IMG_9362.webp", title: "Luxury Place Setting",     cat: "Styling"    },
  { src: "/images/IMG_9370.webp", title: "Antique Gold Urn",         cat: "Decor"      },
  { src: "/images/IMG_9378.webp", title: "Hanging Floral Accent",    cat: "Florals"    },
  { src: "/images/IMG_9380.webp", title: "Candelabra Detail",        cat: "Decor"      },
  { src: "/images/IMG_9385.webp", title: "Custom Stationery",        cat: "Decor"      },
  { src: "/images/IMG_9398.webp", title: "Event Lighting Ambiance",  cat: "Lighting"   },
  { src: "/images/BW8A3607.webp", title: "Eleganté Brand Wall",      cat: "Studio"     },
  { src: "/images/BW8A3384.webp", title: "Studio Exterior",          cat: "Studio"     },
  { src: "/images/BW8A3820.webp", title: "Dare To Have Flair",       cat: "Studio"     },
  { src: "/images/BW8A3593.webp", title: "Studio Interior",          cat: "Interiors"  },
  { src: "/images/BW8A3604.webp", title: "Decor Vignette",           cat: "Decor"      },
  { src: "/images/BW8A3646.webp", title: "Room Styling",             cat: "Interiors"  },
  { src: "/images/BW8A3656.webp", title: "Furniture Collection",     cat: "Furniture"  },
  { src: "/images/BW8A3725.webp", title: "Styling Services",         cat: "Styling"    },
  { src: "/images/BW8A3784.webp", title: "Luxury Living",            cat: "Interiors"  },
  { src: "/images/BW8A3836.webp", title: "Artisan Object",           cat: "Decor"      },
  { src: "/images/BW8A3853.webp", title: "Gold Detail",              cat: "Decor"      },
];

function GalleryItem({
  src, title, cat, index, onClick,
}: { src: string; title: string; cat: string; index: number; onClick: () => void }) {
  const ref       = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const imgRef    = useRef<HTMLDivElement>(null);

  const getDir = useCallback((e: React.MouseEvent<HTMLElement>, el: HTMLElement) => {
    const rect  = el.getBoundingClientRect();
    const x     = e.clientX - rect.left - rect.width  / 2;
    const y     = e.clientY - rect.top  - rect.height / 2;
    const angle = Math.atan2(y, x) * (180 / Math.PI);
    if (angle > -45  && angle <= 45)   return { x:  40, y: 0 };
    if (angle > 45   && angle <= 135)  return { x: 0,  y:  40 };
    if (angle > 135  || angle <= -135) return { x: -40, y: 0 };
    return { x: 0, y: -40 };
  }, []);

  const onEnter = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || !overlayRef.current) return;
    const from = getDir(e, el);
    gsap.fromTo(overlayRef.current,
      { x: from.x, y: from.y, opacity: 0 },
      { x: 0, y: 0, opacity: 1, duration: 0.4, ease: "power2.out" }
    );
    gsap.to(imgRef.current, { scale: 1.07, duration: 0.8, ease: "power2.out" });
  }, [getDir]);

  const onLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || !overlayRef.current) return;
    const to = getDir(e, el);
    gsap.to(overlayRef.current, { x: to.x, y: to.y, opacity: 0, duration: 0.35, ease: "power2.in" });
    gsap.to(imgRef.current, { scale: 1, duration: 0.7, ease: "power2.out" });
  }, [getDir]);

  // Scroll-triggered entrance — animate FROM hidden TO visible
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 32, clipPath: "inset(0 0 100% 0)" },
        {
          opacity: 1,
          y: 0,
          clipPath: "inset(0 0 0% 0)",
          duration: 0.85,
          delay: (index % 4) * 0.07,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 94%",
            toggleActions: "play none none none",
          },
        }
      );
    });
    return () => ctx.revert();
  }, [index]);

  return (
    <div
      ref={ref}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={onClick}
      className="group relative overflow-hidden cursor-pointer mb-[6px]"
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
        style={{ background: "rgba(31,24,18,0.78)" }}
      >
        <div className="w-5 h-px bg-luxury-gold/60 mb-1" />
        <span className="font-cormorant text-lg italic text-white leading-snug">{title}</span>
        <span className="eyebrow text-[8px] text-luxury-gold/80 tracking-[0.22em]">{cat}</span>
        <div className="w-5 h-px bg-luxury-gold/60 mt-1" />
      </div>
    </div>
  );
}

// ── Divider between masonry and CraftDetails ──────────────────────────────────
function GalleryDivider() {
  return (
    <div className="bg-luxury-cream py-16">
      <div className="container-luxury">
        <div className="flex items-center gap-6">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-luxury-gold/30" />
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold/50" />
            <span className="eyebrow text-[9px] text-luxury-gold/60 tracking-[0.3em]">The Art of Detail</span>
            <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold/50" />
          </div>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-luxury-gold/30" />
        </div>
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
        {/* Decorative circles */}
        <div className="absolute top-8 right-12 pointer-events-none select-none" style={{width:"220px",height:"220px"}}>
          <div className="absolute inset-0 rounded-full" style={{border:"1px solid rgba(200,168,107,0.20)"}} />
          <div className="absolute inset-[30px] rounded-full" style={{border:"1px solid rgba(200,168,107,0.14)"}} />
          <div className="absolute inset-[60px] rounded-full" style={{border:"1px solid rgba(200,168,107,0.09)"}} />
        </div>
        <div className="absolute -bottom-10 left-0 pointer-events-none select-none" style={{width:"160px",height:"160px"}}>
          <div className="absolute inset-0 rounded-full" style={{border:"1px solid rgba(200,168,107,0.15)"}} />
          <div className="absolute inset-[22px] rounded-full" style={{border:"1px solid rgba(200,168,107,0.10)"}} />
        </div>
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
          {/* Stats row */}
          <div className="flex items-center gap-10 mt-10">
            {[
              { n: "31", label: "Works Shown" },
              { n: "6",  label: "Categories"  },
              { n: "20+", label: "Years of Craft" },
            ].map(({ n, label }) => (
              <div key={label} className="flex items-center gap-3">
                <span className="font-cormorant text-3xl font-light text-luxury-gold">{n}</span>
                <span className="eyebrow text-[8.5px] text-luxury-gray leading-snug">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Auto-scrolling panoramic strip */}
      <PhotoStrip />

      {/* Section label */}
      <div className="bg-luxury-cream pt-14 pb-4">
        <div className="container-luxury">
          <div className="flex items-center gap-5 mb-2">
            <span className="w-10 h-px bg-luxury-gold" />
            <span className="eyebrow text-[9px] text-luxury-gold">Full Collection</span>
          </div>
          <h2 className="font-cormorant font-light text-luxury-black" style={{fontSize:"clamp(28px,3vw,44px)"}}>
            Every Space, <em className="italic text-luxury-pink font-light">Every Detail</em>
          </h2>
        </div>
      </div>

      {/* Masonry grid */}
      <section className="pt-6 pb-4 bg-luxury-cream">
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

      {/* Divider + Art of Detail section */}
      <GalleryDivider />
      <CraftDetails />

      <ConsultationCTA />

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
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-luxury-black/70 to-transparent">
                <p className="font-cormorant text-xl italic text-white">{lightbox.title}</p>
              </div>
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
