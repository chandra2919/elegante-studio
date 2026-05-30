"use client";
/**
 * CustomCursor — Performance-Hardened
 *
 * FIX 1: Replaced mass event listeners (forEach on every p/h1/h2/h3/h4/span)
 *         with a single event-delegated approach on document. Eliminates
 *         hundreds of listeners, prevents GC pressure, and works with
 *         dynamically added elements.
 *
 * FIX 2: Ring follower uses CSS `transform: translate3d()` with GPU compositing
 *         instead of `left/top` (forces layout → paint → composite). Now only
 *         triggers the composite step.
 *
 * FIX 3: Mouse dot also uses transform instead of left/top.
 *
 * FIX 4: `will-change` only on elements that actually need compositor promotion.
 *
 * FIX 5: Hidden on touch/mobile devices via media query — no wasted RAF.
 */
import { useEffect, useRef } from "react";

export function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse   = useRef({ x: -999, y: -999 });
  const ringPos = useRef({ x: -999, y: -999 });
  const rafId   = useRef<number>();
  const dirty   = useRef(false); // only update ring when mouse actually moved

  useEffect(() => {
    // Don't run on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // ── Mouse tracking — transform3d (composite only, no layout) ──────────
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      dirty.current = true;
      // Dot: synchronous, zero-lag
      dot.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`;
    };
    document.addEventListener("mousemove", onMove, { passive: true });

    // ── Event delegation — ONE listener on document ───────────────────────
    const onDocEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!dot || !ring) return;

      const isInteractive = target.closest("a, button, [data-cursor]");
      if (isInteractive) {
        dot.style.width  = "16px";
        dot.style.height = "16px";
        dot.style.background = "#D4AF37";
        dot.style.opacity = "0.75";
        ring.style.width  = "52px";
        ring.style.height = "52px";
        ring.style.borderColor = "rgba(214,31,105,0.55)";
      }
    };
    const onDocLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!dot || !ring) return;
      const isInteractive = target.closest("a, button, [data-cursor]");
      if (isInteractive) {
        dot.style.width  = "8px";
        dot.style.height = "8px";
        dot.style.background = "#D61F69";
        dot.style.opacity = "1";
        ring.style.width  = "36px";
        ring.style.height = "36px";
        ring.style.borderColor = "rgba(200,168,107,0.55)";
      }
    };

    document.addEventListener("mouseover", onDocEnter, { passive: true });
    document.addEventListener("mouseout",  onDocLeave, { passive: true });

    // ── Ring follower — only runs when mouse has moved (saves CPU when idle)
    function animateRing() {
      if (dirty.current) {
        const LERP = 0.11;
        ringPos.current.x += (mouse.current.x - ringPos.current.x) * LERP;
        ringPos.current.y += (mouse.current.y - ringPos.current.y) * LERP;

        if (ring) {
          ring.style.transform = `translate3d(calc(${ringPos.current.x}px - 50%), calc(${ringPos.current.y}px - 50%), 0)`;
        }

        // Stop marking dirty when ring is essentially at target
        const dx = Math.abs(mouse.current.x - ringPos.current.x);
        const dy = Math.abs(mouse.current.y - ringPos.current.y);
        if (dx < 0.05 && dy < 0.05) dirty.current = false;
      }
      rafId.current = requestAnimationFrame(animateRing);
    }
    animateRing();

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onDocEnter);
      document.removeEventListener("mouseout",  onDocLeave);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <>
      {/* Dot — GPU layer, transform only */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0, left: 0,
          width: "8px",
          height: "8px",
          background: "#D61F69",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 99999,
          willChange: "transform",
          transition: "width 0.2s ease, height 0.2s ease, background 0.2s ease, opacity 0.2s ease",
        }}
      />
      {/* Ring — GPU layer, transform only */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0, left: 0,
          width: "36px",
          height: "36px",
          border: "1px solid rgba(200,168,107,0.55)",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 99998,
          willChange: "transform",
          transition: "width 0.3s ease, height 0.3s ease, border-color 0.3s ease",
        }}
      />
    </>
  );
}
