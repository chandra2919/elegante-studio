"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export function PageLoader() {
  const loaderRef  = useRef<HTMLDivElement>(null);
  const logoRef    = useRef<HTMLDivElement>(null);
  const lineRef    = useRef<HTMLDivElement>(null);
  const countRef   = useRef<HTMLSpanElement>(null);
  const panelTopRef   = useRef<HTMLDivElement>(null);
  const panelBotRef   = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem("elegante_loaded")) {
      setVisible(false);
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem("elegante_loaded", "1");
        setVisible(false);
      },
    });

    // Animate counter
    const obj = { val: 0 };
    tl.to(obj, {
      val: 100,
      duration: 1.8,
      ease: "power2.inOut",
      onUpdate() {
        if (countRef.current) countRef.current.textContent = String(Math.round(obj.val));
      },
    }, 0);

    // Gold line grows
    tl.fromTo(lineRef.current, { scaleX: 0 }, { scaleX: 1, duration: 1.8, ease: "power2.inOut", transformOrigin: "left" }, 0);

    // Logo fades in
    tl.from(logoRef.current, { opacity: 0, y: 16, duration: 0.7, ease: "power3.out" }, 0);

    // Panels split apart
    tl.to(panelTopRef.current, { yPercent: -100, duration: 0.9, ease: "power3.inOut" }, 1.9);
    tl.to(panelBotRef.current, { yPercent:  100, duration: 0.9, ease: "power3.inOut" }, 1.9);

    return () => { tl.kill(); };
  }, []);

  if (!visible) return null;

  return (
    <div ref={loaderRef} role="status" aria-label="Loading Eleganté Design Studio" className="fixed inset-0 z-[99999] flex flex-col pointer-events-none">
      {/* Top panel */}
      <div
        ref={panelTopRef}
        className="absolute inset-x-0 top-0 h-1/2 bg-[#1F1F1F] flex flex-col items-center justify-end pb-6"
      >
        <div ref={logoRef} className="text-center select-none">
          <div className="font-cormorant text-[56px] font-light tracking-[0.05em] text-[#FAF8F4] leading-none">
            Eleg<em className="italic text-[#C8A86B]">anté</em>
          </div>
          <div style={{ fontFamily: "Inter, sans-serif" }} className="text-[9px] tracking-[0.35em] uppercase text-[#C8A86B]/70 mt-3">
            Interiors
          </div>
        </div>
      </div>

      {/* Bottom panel */}
      <div
        ref={panelBotRef}
        className="absolute inset-x-0 bottom-0 h-1/2 bg-[#1F1F1F] flex flex-col items-center justify-start pt-6"
      >
        {/* Progress line */}
        <div className="w-48 h-px bg-white/10 relative overflow-hidden">
          <div
            ref={lineRef}
            className="absolute inset-y-0 left-0 right-0 bg-[#C8A86B]"
            style={{ transformOrigin: "left" }}
          />
        </div>
        <div className="mt-5 flex items-baseline gap-1">
          <span
            ref={countRef}
            style={{ fontFamily: "Cormorant Garamond, serif" }}
            className="text-[40px] font-light text-white/20 tabular-nums"
          >
            0
          </span>
          <span style={{ fontFamily: "Inter, sans-serif" }} className="text-[10px] text-white/20 tracking-widest">
            %
          </span>
        </div>
      </div>
    </div>
  );
}
