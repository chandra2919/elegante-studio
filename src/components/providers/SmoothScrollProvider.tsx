"use client";
/**
 * SmoothScrollProvider
 *
 * FIX 1: Removed duplicate requestAnimationFrame loop.
 *         Lenis was being called twice per frame (once via gsap.ticker,
 *         once via a manual rAF loop). Removed the manual loop entirely.
 *
 * FIX 2: Captured the exact ticker function reference so gsap.ticker.remove()
 *         actually removes it (inline arrow → permanent memory leak).
 *
 * FIX 3: lagSmoothing(0) stays — prevents GSAP from throttling animations
 *         when the tab loses focus.
 */
import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;

    // Connect Lenis scroll events to ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Single RAF path: gsap.ticker drives Lenis (no duplicate rAF)
    const tickerFn = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tickerFn);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tickerFn); // exact reference → actually removes it
    };
  }, []);

  return <>{children}</>;
}
