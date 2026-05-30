"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { RevealText } from "@/components/ui/RevealText";
import { CountUp } from "@/components/ui/CountUp";

gsap.registerPlugin(ScrollTrigger);

const VALUES = [
  { icon: "✦", label: "Uncompromising Quality" },
  { icon: "✦", label: "Bespoke Vision"         },
  { icon: "✦", label: "Artisan Craftsmanship"  },
  { icon: "✦", label: "Client-First Process"   },
];

export function StudioIntro() {
  const imgMainRef = useRef<HTMLDivElement>(null);
  const imgAccRef  = useRef<HTMLDivElement>(null);
  const badgeRef   = useRef<HTMLDivElement>(null);
  const lineRef    = useRef<HTMLDivElement>(null);

  // Mask reveal + parallax for images
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (imgMainRef.current) {
        gsap.fromTo(imgMainRef.current,
          { clipPath: "inset(0 100% 0 0)" },
          {
            clipPath: "inset(0 0% 0 0)",
            duration: 1.4,
            ease: "power3.inOut",
            scrollTrigger: { trigger: imgMainRef.current, start: "top 85%", toggleActions: "play none none none" },
          }
        );
        // Subtle parallax
        gsap.to(imgMainRef.current.querySelector("img"), {
          yPercent: -15,
          ease: "none",
          scrollTrigger: {
            trigger: imgMainRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      if (imgAccRef.current) {
        gsap.fromTo(imgAccRef.current,
          { clipPath: "inset(100% 0 0 0)", opacity: 0 },
          {
            clipPath: "inset(0% 0 0 0)",
            opacity: 1,
            duration: 1.1,
            ease: "power3.inOut",
            delay: 0.3,
            scrollTrigger: { trigger: imgAccRef.current, start: "top 88%", toggleActions: "play none none none" },
          }
        );
      }

      if (badgeRef.current) {
        gsap.from(badgeRef.current, {
          opacity: 0, scale: 0.7,
          duration: 0.7, ease: "back.out(1.4)",
          scrollTrigger: { trigger: badgeRef.current, start: "top 90%" },
        });
      }

      // Animated line
      if (lineRef.current) {
        gsap.fromTo(lineRef.current, { scaleX: 0 }, {
          scaleX: 1,
          duration: 1.2,
          ease: "power3.inOut",
          transformOrigin: "left",
          scrollTrigger: { trigger: lineRef.current, start: "top 90%" },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="section-pad bg-luxury-warm relative overflow-hidden">
      {/* Background dots pattern */}
      <div className="absolute inset-0 bg-luxury-dots opacity-60 pointer-events-none" />

      <div className="container-luxury relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 xl:gap-28 items-center">

          {/* Left — images */}
          <div className="relative h-[580px]">
            {/* Main image with clip-path reveal */}
            <div
              ref={imgMainRef}
              className="absolute top-0 left-0 w-[80%] h-[75%] shadow-luxury-lg overflow-hidden"
              style={{ clipPath: "inset(0 100% 0 0)" }}
            >
              <Image
                src="/images/BW8A3384.jpg"
                alt="Eleganté Studio"
                fill
                className="object-cover"
                style={{ transform: "scale(1.12)", transformOrigin: "center" }}
              />
            </div>

            {/* Accent image */}
            <div
              ref={imgAccRef}
              className="absolute bottom-0 right-0 w-[52%] h-[50%] overflow-hidden border-[5px] border-luxury-warm shadow-luxury z-10"
              style={{ clipPath: "inset(100% 0 0 0)", opacity: 0 }}
            >
              <Image src="/images/Logo1.jpg" alt="Eleganté Logo" fill className="object-cover" />
            </div>

            {/* Years badge */}
            <div
              ref={badgeRef}
              className="absolute top-[60%] left-[72%] -translate-x-1/2 z-20 bg-luxury-pink text-white px-6 py-5 text-center shadow-pink min-w-[100px]"
            >
              <div className="font-cormorant text-4xl font-light leading-none">
                <CountUp to={20} suffix="+" />
              </div>
              <div className="eyebrow text-[7.5px] mt-1.5 opacity-80">Years of<br />Excellence</div>
            </div>

            {/* Floating vertical line */}
            <div className="absolute top-[10%] right-[16%] w-px h-24 float-line" />
          </div>

          {/* Right — content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-px bg-luxury-gold" />
              <span className="eyebrow">Our Story</span>
            </div>

            <h2
              className="font-cormorant font-light text-luxury-black mb-5 leading-[1.08]"
              style={{ fontSize: "clamp(38px, 4.5vw, 64px)" }}
            >
              The Eleganté<br />
              <em className="italic text-luxury-pink font-light">Story</em>
            </h2>

            <p className="font-cormorant text-2xl italic text-luxury-gold mb-8 leading-relaxed">
              "Dare To Have Flair"
            </p>

            <p className="text-body-md text-luxury-gray leading-relaxed mb-5 font-light">
              Eleganté Interiors & Events was born from a singular belief: that every space
              deserves to be extraordinary. Founded with a passion for the opulent and
              beautifully crafted, we've spent over two decades redefining luxury.
            </p>
            <p className="text-body-md text-luxury-gray leading-relaxed mb-10 font-light">
              Our studio is more than a design firm — it is a destination for those who
              understand that their environment reflects their identity.
            </p>

            {/* Animated gold line */}
            <div
              ref={lineRef}
              className="h-px w-full bg-gradient-to-r from-luxury-gold/40 to-transparent mb-10"
              style={{ transformOrigin: "left" }}
            />

            <div className="grid grid-cols-2 gap-4 mb-10">
              {VALUES.map(({ icon, label }) => (
                <div key={label} className="flex items-center gap-3 group">
                  <span className="text-luxury-gold text-sm flex-shrink-0 transition-transform duration-300 group-hover:scale-125">{icon}</span>
                  <span className="text-body-sm text-luxury-black font-medium">{label}</span>
                </div>
              ))}
            </div>

            <Link href="/about" className="btn-luxury-outline">
              Discover Our Story
              <span className="btn-arrow-line" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
