"use client";
import { useRef, useCallback } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  glare?: boolean;
}

export function TiltCard({
  children,
  className,
  maxTilt = 6,
  glare = true,
}: TiltCardProps) {
  const cardRef  = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top)  / rect.height;
    const xDeg = (x - 0.5) * maxTilt * 2;
    const yDeg = (y - 0.5) * maxTilt * 2;

    gsap.to(el, {
      rotateX: -yDeg,
      rotateY:  xDeg,
      transformPerspective: 900,
      duration: 0.35,
      ease: "power2.out",
    });

    if (glare && glareRef.current) {
      gsap.to(glareRef.current, {
        opacity: 0.12,
        background: `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,0.5), transparent 70%)`,
        duration: 0.3,
      });
    }
  }, [maxTilt, glare]);

  const onLeave = useCallback(() => {
    const el = cardRef.current;
    if (!el) return;
    gsap.to(el, {
      rotateX: 0, rotateY: 0,
      duration: 0.8,
      ease: "elastic.out(1, 0.6)",
    });
    if (glare && glareRef.current) {
      gsap.to(glareRef.current, { opacity: 0, duration: 0.4 });
    }
  }, [glare]);

  return (
    <div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn("relative will-change-transform", className)}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
      {glare && (
        <div
          ref={glareRef}
          className="absolute inset-0 pointer-events-none rounded-[inherit] opacity-0"
          aria-hidden="true"
        />
      )}
    </div>
  );
}
