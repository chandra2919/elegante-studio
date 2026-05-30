"use client";
/**
 * RevealText — Hydration-Safe Word Reveal
 *
 * FIX 1: Removed innerHTML mutation (caused hydration mismatch, layout shift,
 *         and flash of un-styled text on first render).
 *
 * FIX 2: Words are split at render time into React elements so the server
 *         and client HTML match — no hydration error.
 *
 * FIX 3: Animation targets individual word spans via data attributes,
 *         not dynamic innerHTML injection.
 *
 * FIX 4: Each word has `overflow: hidden` on the wrapper so the translateY
 *         exit direction is clipped cleanly.
 */
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface RevealTextProps {
  children: string;
  className?: string;
  stagger?: number;
  delay?: number;
  triggerStart?: string;
  as?: "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "div";
}

export function RevealText({
  children,
  className,
  stagger = 0.04,
  delay = 0,
  triggerStart = "top 88%",
  as: Tag = "p",
}: RevealTextProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const wordEls = el.querySelectorAll<HTMLElement>("[data-word]");
    if (!wordEls.length) return;

    const ctx = gsap.context(() => {
      gsap.set(wordEls, { yPercent: 110 });
      gsap.to(wordEls, {
        yPercent: 0,
        duration: 0.85,
        ease: "power3.out",
        stagger,
        delay,
        scrollTrigger: {
          trigger: el,
          start: triggerStart,
          toggleActions: "play none none none",
        },
      });
    });

    return () => ctx.revert();
  }, [stagger, delay, triggerStart]);

  const words = children.split(" ");

  return (
    // @ts-expect-error polymorphic tag
    <Tag ref={ref} className={cn(className)} aria-label={children}>
      {words.map((word, i) => (
        <span
          key={i}
          style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom", lineHeight: "inherit" }}
          aria-hidden="true"
        >
          <span data-word style={{ display: "inline-block" }}>
            {word}
          </span>
          {i < words.length - 1 && " "}
        </span>
      ))}
    </Tag>
  );
}
