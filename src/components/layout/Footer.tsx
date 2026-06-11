import Link from "next/link";
import Image from "next/image";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { NAV_LINKS, SERVICES } from "@/lib/data";

const SOCIAL = [
  { label: "Instagram", href: "#", icon: "IG" },
  { label: "Pinterest",  href: "#", icon: "PT" },
  { label: "Facebook",   href: "#", icon: "FB" },
  { label: "Houzz",      href: "#", icon: "HZ" },
];

export function Footer() {
  return (
    <footer className="bg-luxury-black text-white">
      {/* Top CTA Strip */}
      <div className="border-b border-white/8">
        <div className="container-luxury py-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="eyebrow text-luxury-gold mb-3">Begin Your Journey</p>
            <h3 className="font-cormorant text-display-md text-white font-light">
              Ready to Transform Your Space?
            </h3>
          </div>
          <Link href="/contact" className="btn-luxury-gold flex-shrink-0">
            Book Private Consultation
          </Link>
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="container-luxury py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="relative w-12 h-12 flex-shrink-0 overflow-hidden">
                <Image src="/images/Logo2.webp" alt="Eleganté" fill className="object-cover" />
              </div>
              <div>
                <div className="font-cormorant text-xl text-white">Eleganté</div>
                <div className="eyebrow text-[8px] text-luxury-gold">Interiors &amp; Events</div>
              </div>
            </Link>
            <p className="font-cormorant text-lg italic text-luxury-gold mb-4">
              "Dare To Have Flair"
            </p>
            <p className="text-body-sm text-white/35 leading-relaxed mb-8 max-w-[260px]">
              Michigan's premier luxury interior design studio, crafting extraordinary spaces since 2004.
            </p>
            <div className="flex gap-3">
              {SOCIAL.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 border border-white/10 rounded-full flex items-center justify-center text-[9px] font-inter tracking-wide text-white/40 hover:border-luxury-gold/60 hover:text-luxury-gold transition-all duration-300"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="eyebrow text-luxury-gold mb-6">Navigation</p>
            <ul className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-body-sm text-white/35 hover:text-white/70 transition-colors duration-300 underline-draw"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <p className="eyebrow text-luxury-gold mb-6">Services</p>
            <ul className="flex flex-col gap-3">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="text-body-sm text-white/35 hover:text-white/70 transition-colors duration-300"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="eyebrow text-luxury-gold mb-6">Visit the Studio</p>
            <div className="flex flex-col gap-4">
              {[
                { label: "Location", value: "1046 S Telegraph Rd\nPontiac, MI 48341" },
                { label: "Hours", value: "Mon–Sat: 10AM–6PM\nSunday: By Appointment" },
                { label: "Email", value: "hello@elegante-studio.com" },
                { label: "Phone", value: "(248) 555-0198" },
              ].map((item) => (
                <div key={item.label}>
                  <p className="eyebrow text-[8px] text-luxury-gold/60 mb-1">{item.label}</p>
                  <p className="text-body-sm text-white/45 whitespace-pre-line">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <GoldDivider className="my-14 opacity-25" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[11px] font-inter text-white/20 tracking-wide">
            © {new Date().getFullYear()} Eleganté Interiors & Events. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Sitemap"].map((item) => (
              <Link
                key={item}
                href="#"
                className="text-[11px] font-inter text-white/20 hover:text-white/50 transition-colors tracking-wide"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
