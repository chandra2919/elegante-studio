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
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hovered,  setHovered]  = useState<string | null>(null);
  const pathname = usePathname();
  const logoRef  = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  // Subtle logo float on hover
  const onLogoEnter = () => {
    gsap.to(logoRef.current, { y: -2, duration: 0.35, ease: "power2.out" });
  };
  const onLogoLeave = () => {
    gsap.to(logoRef.current, { y: 0, duration: 0.5, ease: "elastic.out(1, 0.6)" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-luxury-cream/96 backdrop-blur-2xl border-b border-luxury-gold/12 py-3.5 shadow-[0_4px_40px_rgba(0,0,0,0.06)]"
            : "bg-transparent py-7",
        )}
      >
        <div className="container-luxury flex items-center justify-between">

          {/* Logo */}
          <Link
            ref={logoRef}
            href="/"
            className="flex items-center gap-3 will-change-transform"
            onMouseEnter={onLogoEnter}
            onMouseLeave={onLogoLeave}
          >
            <div className="relative w-11 h-11 overflow-hidden flex-shrink-0 border border-luxury-gold/20">
              <Image
                src="/images/Logo2.jpg"
                alt="Eleganté"
                fill
                className="object-cover transition-transform duration-500 hover:scale-110"
                priority
              />
            </div>
            <div className="flex flex-col leading-none gap-0.5">
              <span className="font-cormorant text-[22px] font-light text-luxury-black tracking-[0.04em] leading-none">
                Eleg<em className="italic">anté</em>
              </span>
              <span className="eyebrow text-[7.5px] tracking-[0.32em] text-luxury-gold leading-none">
                Interiors &amp; Events
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex items-center gap-9 relative">
            {NAV_LINKS.map((link) => {
              const isActive = pathname.startsWith(link.href) && link.href !== "/";
              return (
                <li key={link.href} className="relative">
                  <Link
                    href={link.href}
                    onMouseEnter={() => setHovered(link.href)}
                    onMouseLeave={() => setHovered(null)}
                    className={cn(
                      "font-inter text-[11px] tracking-[0.16em] uppercase transition-colors duration-300 block py-1",
                      isActive ? "text-luxury-black" : "text-luxury-gray hover:text-luxury-black",
                    )}
                  >
                    {link.label}
                  </Link>
                  {/* Hover / active underline — NO layoutId (caused multi-instance conflict) */}
                  <span
                    className="absolute -bottom-0.5 left-0 h-px bg-luxury-gold transition-all duration-350"
                    style={{
                      width: isActive || hovered === link.href ? "100%" : "0%",
                      transitionTimingFunction: "cubic-bezier(0.25,0.46,0.45,0.94)",
                    }}
                  />
                </li>
              );
            })}
          </ul>

          {/* Right — CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <Link href="/contact" className="btn-luxury-primary text-[10px] px-7 py-3.5">
              Book Consultation
            </Link>
          </div>

          {/* Hamburger */}
          <button
            className="lg:hidden flex flex-col gap-[5px] p-2 relative z-50"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 6.5, width: 28 } : { rotate: 0, y: 0, width: 28 }}
              className="block h-[1.5px] bg-luxury-black origin-center"
              style={{ width: 28 }}
            />
            <motion.span
              animate={menuOpen ? { opacity: 0, width: 0 } : { opacity: 1, width: 20 }}
              className="block h-[1.5px] bg-luxury-black"
              style={{ width: 20 }}
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -6.5, width: 28 } : { rotate: 0, y: 0, width: 24 }}
              className="block h-[1.5px] bg-luxury-black origin-center"
              style={{ width: 24 }}
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Full-screen Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)"   }}
            exit={{ clipPath: "inset(0 0 100% 0)"    }}
            transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-0 z-40 bg-luxury-cream flex flex-col"
          >
            {/* Background accent */}
            <div className="absolute right-0 bottom-0 w-64 h-64 opacity-20">
              <Image src="/images/Logo1.jpg" alt="" fill className="object-contain" />
            </div>

            <div className="flex flex-col items-center justify-center flex-1 gap-8 px-8">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "font-cormorant text-5xl font-light block text-center hover:text-luxury-pink transition-colors duration-300",
                      pathname.startsWith(link.href) && link.href !== "/" ? "text-luxury-gold" : "text-luxury-black",
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="mt-4"
              >
                <Link href="/contact" className="btn-luxury-primary">
                  Book Consultation
                </Link>
              </motion.div>
            </div>

            {/* Footer bar */}
            <div className="p-8 border-t border-luxury-gold/15 text-center">
              <p className="eyebrow text-[8px] text-luxury-gold/50">"Dare To Have Flair"</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
