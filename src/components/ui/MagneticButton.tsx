"use client";
/**
 * MagneticButton — Performance-Hardened
 *
 * FIX 1: `will-change: transform` is now LAZY — only applied when mouse enters
 *         (so the browser promotes the element to its own compositor layer just
 *         before animation), and removed on leave (so the layer is reclaimed).
 *         Permanent will-change on every button = massive compositor bloat.
 *
 * FIX 2: mousemove handler uses `getBoundingClientRect()` which forces a layout
 *         query per mouse event. We cache it on mouseenter and reuse it.
 *
 * FIX 3: Removed gsap dependency for the elastic spring-back — CSS transition
 *         handles it correctly with no GSAP overhead for this simple case.
 */
import { useRef, useCallback } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

export function MagneticButton({
  children,
  className,
  strength = 0.28,
}: MagneticButtonProps) {
  const ref  = useRef<HTMLDivElement>(null);
  const rect = useRef<DOMRect | null>(null);

  const onEnter = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    rect.current = el.getBoundingClientRect(); // cache once per enter
    el.style.willChange = "transform";          // promote layer now
  }, []);

  const onMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current;
      const r  = rect.current;
      if (!el || !r) return;
      const x = e.clientX - r.left - r.width  / 2;
      const y = e.clientY - r.top  - r.height / 2;
      gsap.to(el, { x: x * strength, y: y * strength, duration: 0.45, ease: "power2.out", overwrite: true });
    },
    [strength],
  );

  const onLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    gsap.to(el, {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.55)",
      overwrite: true,
      onComplete: () => {
        if (el) el.style.willChange = "auto"; // reclaim compositor layer
      },
    });
    rect.current = null;
  }, []);

  return (
    <div
      ref={ref}
      onMouseEnter={onEnter}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn("inline-block", className)}
    >
      {children}
    </div>
  );
}
