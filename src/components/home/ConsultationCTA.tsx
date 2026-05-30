"use client";
import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticButton } from "@/components/ui/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

export function ConsultationCTA() {
  const imgRef  = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax on the background image
      if (imgRef.current) {
        gsap.to(imgRef.current, {
          yPercent: 25,
          ease: "none",
          scrollTrigger: {
            trigger: imgRef.current.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="relative overflow-hidden flex items-center justify-center" style={{ minHeight: "580px" }}>
      {/* Parallax image */}
      <div ref={imgRef} className="absolute inset-0 will-change-transform" style={{ top: "-15%", bottom: "-15%" }}>
        <Image src="/images/BW8A3472.jpg" alt="Crystal Chandelier" fill className="object-cover" />
      </div>

      {/* Overlays */}
      <div className="absolute inset-0 bg-luxury-black/72" />
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 70% at 50% 50%, rgba(200,168,107,0.08), transparent)" }} />

      {/* Floating ornaments */}
      <div className="absolute top-12 left-12 w-px h-20 float-line hidden lg:block" />
      <div className="absolute bottom-12 right-12 w-px h-20 float-line hidden lg:block" style={{ animationDelay: "1s" }} />
      <div className="absolute top-10 right-10 w-16 h-px bg-gradient-to-r from-luxury-gold/30 to-transparent hidden lg:block" />
      <div className="absolute bottom-10 left-10 w-16 h-px bg-gradient-to-r from-transparent to-luxury-gold/30 hidden lg:block" />

      <div className="container-luxury relative z-10 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="flex items-center justify-center gap-4 mb-7">
            <span className="block w-12 h-px bg-luxury-gold/50" />
            <span className="eyebrow text-luxury-gold">Begin Your Journey</span>
            <span className="block w-12 h-px bg-luxury-gold/50" />
          </div>

          <h2
            className="font-cormorant font-light text-white mb-6 max-w-3xl mx-auto leading-[1.06]"
            style={{ fontSize: "clamp(38px,4.5vw,72px)" }}
          >
            Let's Create Something{" "}
            <em className="italic text-luxury-gold font-light">Extraordinary</em>{" "}
            Together
          </h2>

          <p className="text-body-lg text-white/50 max-w-xl mx-auto mb-14 font-light">
            Every great space begins with a conversation. Schedule your private design
            consultation and discover the Eleganté difference.
          </p>

          <div className="flex flex-wrap gap-5 justify-center">
            <MagneticButton strength={0.25}>
              <Link href="/contact" className="btn-luxury-gold">
                Book Private Consultation
                <span className="btn-arrow-line" />
              </Link>
            </MagneticButton>
            <MagneticButton strength={0.2}>
              <Link
                href="/portfolio"
                className="btn-luxury-outline"
                style={{ borderColor: "rgba(255,255,255,0.25)", color: "white" }}
              >
                View Our Work
                <span className="btn-arrow-line" />
              </Link>
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
