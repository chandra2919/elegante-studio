"use client";
import { useRef, useCallback, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  speed?: number;           // 0.1 – 0.5, parallax intensity
  zoom?: boolean;           // hover zoom
  tilt?: boolean;           // 3D perspective tilt on hover
  maskReveal?: boolean;     // clip-path reveal on scroll
  overlay?: boolean;
  priority?: boolean;
}

export function ParallaxImage({
  src,
  alt,
  className,
  speed = 0.2,
  zoom = true,
  tilt = false,
  maskReveal = true,
  overlay = false,
  priority = false,
}: ParallaxImageProps) {
  const wrapRef  = useRef<HTMLDivElement>(null);
  const imgRef   = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(!maskReveal);

  // Scroll parallax
  useEffect(() => {
    const wrap = wrapRef.current;
    const img  = imgRef.current;
    if (!wrap || !img) return;

    const ctx = gsap.context(() => {
      // Mask reveal
      if (maskReveal) {
        gsap.fromTo(
          wrap,
          { clipPath: "inset(0 100% 0 0)" },
          {
            clipPath: "inset(0 0% 0 0)",
            duration: 1.4,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: wrap,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Parallax scroll
      gsap.to(img, {
        yPercent: speed * -80,
        ease: "none",
        scrollTrigger: {
          trigger: wrap,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, [maskReveal, speed]);

  // 3D Tilt
  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!tilt) return;
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const xPct = ((e.clientX - rect.left) / rect.width  - 0.5) * 2;
    const yPct = ((e.clientY - rect.top)  / rect.height - 0.5) * 2;
    gsap.to(el, {
      rotateX: -yPct * 6,
      rotateY:  xPct * 6,
      transformPerspective: 900,
      duration: 0.4,
      ease: "power2.out",
    });
  }, [tilt]);

  const onLeave = useCallback(() => {
    if (!tilt) return;
    const el = wrapRef.current;
    if (!el) return;
    gsap.to(el, {
      rotateX: 0, rotateY: 0,
      duration: 0.7,
      ease: "power2.out",
    });
  }, [tilt]);

  return (
    <div
      ref={wrapRef}
      className={cn("relative overflow-hidden", className)}
      style={{ willChange: "clip-path, transform" }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <div
        ref={imgRef}
        className={cn(
          "w-full h-[115%] -top-[7.5%] absolute left-0",
          zoom && "transition-transform duration-[900ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:scale-[1.06]",
        )}
        style={{ willChange: "transform" }}
      >
        <Image src={src} alt={alt} fill className="object-cover" priority={priority} />
      </div>

      {overlay && (
        <div className="absolute inset-0 overlay-subtle pointer-events-none" />
      )}
    </div>
  );
}
