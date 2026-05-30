"use client";
/**
 * MouseGlow — Performance-Hardened
 *
 * FIX 1: RAF is idle-aware — only interpolates/paints when the mouse has
 *         actually moved. At rest the RAF loop still ticks but skips the
 *         style mutation entirely (no composite work done).
 *
 * FIX 2: Uses `transform: translate3d()` instead of `left/top` → composite
 *         only, no layout or paint.
 *
 * FIX 3: Hidden on touch devices (pointer: coarse) — saves a compositor
 *         layer and a perpetual RAF on mobile.
 */
import { useEffect, useRef } from "react";

export function MouseGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const target  = useRef({ x: -999, y: -999 });
  const current = useRef({ x: -999, y: -999 });
  const raf     = useRef<number>();
  const moved   = useRef(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const el = glowRef.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
      moved.current  = true;
    };
    document.addEventListener("mousemove", onMove, { passive: true });

    function tick() {
      if (moved.current) {
        const LERP = 0.06;
        current.current.x += (target.current.x - current.current.x) * LERP;
        current.current.y += (target.current.y - current.current.y) * LERP;

        if (el) {
          el.style.transform = `translate3d(${current.current.x - 200}px, ${current.current.y - 200}px, 0)`;
        }

        // Stop painting when we've converged
        const dx = Math.abs(target.current.x - current.current.x);
        const dy = Math.abs(target.current.y - current.current.y);
        if (dx < 0.1 && dy < 0.1) moved.current = false;
      }
      raf.current = requestAnimationFrame(tick);
    }
    tick();

    return () => {
      document.removeEventListener("mousemove", onMove);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "400px",
        height: "400px",
        borderRadius: "50%",
        pointerEvents: "none",
        zIndex: 9996,
        willChange: "transform",
        background:
          "radial-gradient(circle, rgba(200,168,107,0.05) 0%, rgba(214,31,105,0.018) 50%, transparent 70%)",
      }}
    />
  );
}
