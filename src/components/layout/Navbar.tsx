"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { NAV_LINKS } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [hovered,   setHovered]   = useState<string | null>(null);
  const pathname  = usePathname();
  const logoRef   = useRef<HTMLAnchorElement>(null);

  /* ── Scroll detection ──────────────────────────────────────── */
  useEffect(() => {
    // Run once on mount so SSR → client state is correct immediately
    setScrolled(window.scrollY > 60);
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Close menu on route change ────────────────────────────── */
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  /* ── Logo magnetic float ───────────────────────────────────── */
  const onLogoEnter = () =>
    gsap.to(logoRef.current, { y: -2, duration: 0.35, ease: "power2.out" });
  const onLogoLeave = () =>
    gsap.to(logoRef.current, { y: 0,  duration: 0.5,  ease: "elastic.out(1,0.6)" });

  /* ── Derived helpers ───────────────────────────────────────── */
  // true while navbar sits transparently over a hero image
  const isOverImage = !scrolled && !menuOpen;

  return (
    <>
      {/* ══ NAV BAR ══════════════════════════════════════════════ */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-luxury-cream/96 backdrop-blur-2xl border-b border-luxury-gold/12 py-3.5 shadow-[0_4px_40px_rgba(0,0,0,0.07)]"
            : "py-6",
        )}
      >
        {/*
          Dark gradient scrim — always present when not scrolled.
          Separate element so it can be taller than the nav bar itself,
          ensuring text is ALWAYS readable regardless of what image is behind it.
        */}
        {!scrolled && (
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 pointer-events-none"
            style={{
              height: "120px",
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.38) 55%, transparent 100%)",
              zIndex: -1,
            }}
          />
        )}

        <div className="container-luxury flex items-center justify-between">

          {/* ── LOGO ─────────────────────────────────────────── */}
          <Link
            ref={logoRef}
            href="/"
            className="flex items-center gap-3 will-change-transform outline-none"
            onMouseEnter={onLogoEnter}
            onMouseLeave={onLogoLeave}
          >
            <div className="relative w-10 h-10 overflow-hidden flex-shrink-0 border border-luxury-gold/25">
              <Image
                src="/images/Logo2.webp"
                alt="Eleganté"
                fill
                className="object-cover transition-transform duration-500 hover:scale-110"
                priority
              />
            </div>
            <div className="flex flex-col leading-none gap-0.5">
              <span
                className={cn(
                  "font-cormorant text-[21px] font-light tracking-[0.04em] leading-none transition-colors duration-500",
                  isOverImage ? "text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]" : "text-luxury-black",
                )}
              >
                Eleg<em className="italic">anté</em>
              </span>
              <span className="eyebrow text-[7px] tracking-[0.32em] text-luxury-gold leading-none">
                Interiors
              </span>
            </div>
          </Link>

          {/* ── DESKTOP NAV LINKS ─────────────────────────────── */}
          <ul className="hidden lg:flex items-center gap-8 relative">
            {NAV_LINKS.map((link) => {
              const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              const isHov    = hovered === link.href;

              return (
                <li key={link.href} className="relative">
                  <Link
                    href={link.href}
                    onMouseEnter={() => setHovered(link.href)}
                    onMouseLeave={() => setHovered(null)}
                    className={cn(
                      // Base — remove ALL browser outlines/borders
                      "outline-none focus-visible:outline-none",
                      "font-inter text-[10.5px] tracking-[0.18em] uppercase block py-1.5",
                      "transition-colors duration-300",
                      // Color logic — over image vs scrolled
                      isOverImage
                        ? isActive
                          ? "text-white"
                          : "text-white/70 hover:text-white"
                        : isActive
                          ? "text-luxury-black"
                          : "text-luxury-gray hover:text-luxury-black",
                      // Drop-shadow only when over image for legibility
                      isOverImage && "drop-shadow-[0_1px_2px_rgba(0,0,0,0.55)]",
                    )}
                  >
                    {link.label}
                  </Link>

                  {/* Gold underline — slides in on hover / active. NO box, NO border. */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute bottom-0 left-0 h-px transition-all duration-300",
                      isOverImage ? "bg-white/70" : "bg-luxury-gold",
                    )}
                    style={{
                      width: isActive || isHov ? "100%" : "0%",
                      transitionTimingFunction: "cubic-bezier(0.25,0.46,0.45,0.94)",
                    }}
                  />
                </li>
              );
            })}
          </ul>

          {/* ── CTA BUTTON ───────────────────────────────────── */}
          <div className="hidden lg:flex items-center">
            <Link
              href="/contact"
              className={cn(
                "font-inter text-[9.5px] tracking-[0.22em] uppercase px-6 py-3 transition-all duration-400 outline-none focus-visible:outline-none",
                isOverImage
                  ? "border border-white/50 text-white hover:bg-white hover:text-luxury-black"
                  : "border border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-white",
              )}
            >
              Contact Us
            </Link>
          </div>

          {/* ── HAMBURGER (mobile) ────────────────────────────── */}
          <button
            className="lg:hidden flex flex-col gap-[5px] p-2 relative z-50 outline-none"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {[
              { anim: menuOpen ? { rotate: 45,  y: 6.5,  width: 26 } : { rotate: 0, y: 0,    width: 26 } },
              { anim: menuOpen ? { opacity: 0,  width: 0 }            : { opacity: 1, width: 18 } },
              { anim: menuOpen ? { rotate: -45, y: -6.5, width: 26 } : { rotate: 0, y: 0,    width: 22 } },
            ].map(({ anim }, i) => (
              <motion.span
                key={i}
                animate={anim}
                className={cn(
                  "block h-[1.5px] origin-center transition-colors duration-500",
                  isOverImage ? "bg-white" : "bg-luxury-black",
                )}
                style={{ width: i === 0 ? 26 : i === 1 ? 18 : 22 }}
              />
            ))}
          </button>
        </div>
      </motion.nav>

      {/* ══ MOBILE FULL-SCREEN MENU ══════════════════════════════ */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0%   0)" }}
            exit={{    clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-0 z-40 bg-luxury-cream flex flex-col"
          >
            {/* Decorative watermark */}
            <div className="absolute right-0 bottom-0 w-64 h-64 opacity-[0.07]">
              <Image src="/images/Logo1.webp" alt="" fill className="object-contain" />
            </div>

            <div className="flex flex-col items-center justify-center flex-1 gap-7 px-8">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0  }}
                  transition={{ delay: 0.07 + i * 0.055, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "font-cormorant text-5xl font-light block text-center",
                      "outline-none focus-visible:outline-none",
                      "hover:text-luxury-pink transition-colors duration-300",
                      (link.href === "/" ? pathname === "/" : pathname.startsWith(link.href))
                        ? "text-luxury-gold"
                        : "text-luxury-black",
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.48, duration: 0.4 }}
                className="mt-3"
              >
                <Link href="/contact" className="btn-luxury-primary outline-none focus-visible:outline-none">
                  Contact Us
                </Link>
              </motion.div>
            </div>

            <div className="p-8 border-t border-luxury-gold/15 text-center">
              <p className="eyebrow text-[8px] text-luxury-gold/45 tracking-[0.3em]">
                "Dare To Have Flair"
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
