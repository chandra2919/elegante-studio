"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface CountUpProps {
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export function CountUp({ to, suffix = "", prefix = "", duration = 2, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const hasRun = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const obj = { val: 0 };
      ScrollTrigger.create({
        trigger: el,
        start: "top 90%",
        onEnter: () => {
          if (hasRun.current) return;
          hasRun.current = true;
          gsap.to(obj, {
            val: to,
            duration,
            ease: "power2.out",
            onUpdate() {
              el.textContent = prefix + Math.round(obj.val) + suffix;
            },
          });
        },
      });
    });

    return () => ctx.revert();
  }, [to, suffix, prefix, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  );
}
