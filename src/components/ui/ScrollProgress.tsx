"use client";
/**
 * ScrollProgress — Performance-Hardened
 *
 * FIX 1: Uses `transform: scaleX()` via CSS variable + inline style
 *         (GPU-accelerated composite only — no layout, no paint).
 *
 * FIX 2: Passive scroll listener — doesn't block main thread.
 *
 * FIX 3: aria-hidden since this is decorative (screen readers don't
 *         need visual progress bar info).
 */
import { useEffect, useRef } from "react";

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const update = () => {
      const docH   = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docH > 0 ? window.scrollY / docH : 0;
      // transform: scaleX() — composite only (no layout, no paint)
      bar.style.transform = `scaleX(${progress})`;
    };

    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div
      ref={barRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "2px",
        background: "linear-gradient(90deg, #D61F69, #C8A86B)",
        transformOrigin: "left",
        transform: "scaleX(0)",
        zIndex: 9997,
        willChange: "transform",
        pointerEvents: "none",
      }}
    />
  );
}
