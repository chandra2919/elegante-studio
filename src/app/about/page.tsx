import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { STATS, PROCESS_STEPS, TESTIMONIALS } from "@/lib/data";
import { ConsultationCTA } from "@/components/home/ConsultationCTA";

export const metadata: Metadata = {
  title: "About",
  description: "The story of Eleganté Interiors & Events — 20+ years crafting Michigan's most extraordinary spaces.",
};

const MILESTONES = [
  { year: "2004", event: "Eleganté founded — boutique studio opening in Pontiac, MI" },
  { year: "2008", event: "First luxury residential award — Michigan Design Excellence" },
  { year: "2012", event: "Events division launched — full event styling capability" },
  { year: "2016", event: "Studio expansion and flagship showroom opening" },
  { year: "2019", event: "500th project milestone — celebrated with select clientele" },
  { year: "2023", event: "National recognition — featured in Architectural Digest" },
];

const VALUES = [
  { title: "Uncompromising Quality",  icon: "✦", desc: "We source, specify, and install only the finest materials, finishes, and objects available." },
  { title: "Bespoke Vision",          icon: "✦", desc: "Every project begins with listening. We design for who you are, not who we think you should be." },
  { title: "Artisan Craftsmanship",   icon: "✦", desc: "We work with master craftsmen who share our commitment to excellence in every detail." },
  { title: "Client-First Process",    icon: "✦", desc: "Transparent communication, on-time delivery, and results that consistently exceed expectation." },
];

const FAQS = [
  { q: "How do I begin working with Eleganté?", a: "Begin with a private consultation — in-studio, at your home, or virtually. We learn about you, your space, and your vision before any proposal is made." },
  { q: "Do you work with a set budget?",         a: "Yes. We design within your budget while maximising its impact. We are transparent about costs from the first conversation." },
  { q: "What makes Eleganté different?",         a: "Our philosophy that design should be deeply personal. We do not use templates — every project is conceived and executed as a singular work." },
  { q: "Can I visit the studio?",                a: "Yes — our showroom in Pontiac, MI is open Monday–Saturday. We recommend scheduling an appointment for an unhurried visit." },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-end pb-24 overflow-hidden">
        <Image src="/images/BW8A3535.jpg" alt="Studio" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-luxury-black/65" />
        <div className="container-luxury relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <span className="w-10 h-px bg-luxury-gold" />
            <span className="eyebrow text-luxury-gold">Our Story</span>
          </div>
          <h1 className="heading-display text-display-2xl text-white mb-6">
            The Eleganté<br />
            <em className="italic text-luxury-gold font-light">Story</em>
          </h1>
          <p className="text-body-lg text-white/55 max-w-xl font-light">
            Two decades of transforming Michigan's most discerning spaces — one extraordinary project at a time.
          </p>
        </div>
      </section>

      {/* Founder Story */}
      <section className="section-pad bg-luxury-cream">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <span className="w-10 h-px bg-luxury-gold" />
                <span className="eyebrow">Founder's Vision</span>
              </div>
              <h2 className="heading-display text-display-lg text-luxury-black mb-8">
                Built on a Belief That<br/>
                <em className="italic text-luxury-pink font-light">Every Space Deserves</em><br/>
                to be Extraordinary
              </h2>
              <p className="text-body-md text-luxury-gray leading-relaxed mb-6 font-light">
                Eleganté was founded with a single conviction: that the spaces we inhabit shape who we become.
                Bland, generic interiors do a disservice to the people who live and work within them.
                We set out to change that — one client, one space, one extraordinary project at a time.
              </p>
              <p className="text-body-md text-luxury-gray leading-relaxed mb-6 font-light">
                Over twenty years later, that conviction remains the heart of everything we do. We work with
                clients who understand that their environment is not a backdrop to their life — it is part of it.
              </p>
              <p className="font-cormorant text-2xl italic text-luxury-gold">
                "Dare To Have Flair" — it has always been our philosophy.
              </p>
            </div>
            <div className="relative h-[600px]">
              <Image src="/images/BW8A3383.jpg" alt="Eleganté Studio" fill className="object-cover shadow-luxury-lg" />
              <div className="absolute -bottom-6 -right-6 w-44 h-44 overflow-hidden border-4 border-luxury-cream shadow-luxury z-10">
                <Image src="/images/BW8A3607.jpg" alt="Studio Detail" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-luxury-warm border-y border-luxury-gold/15">
        <div className="container-luxury">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                className={`py-16 px-8 text-center border-r border-luxury-gold/15 last:border-r-0 ${i >= 2 ? "border-t border-luxury-gold/15 lg:border-t-0" : ""}`}
              >
                <div className="font-cormorant text-6xl font-light text-luxury-black">
                  {stat.number}<span className="text-luxury-gold">{stat.suffix}</span>
                </div>
                <div className="eyebrow text-[9px] mt-3">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="section-pad bg-luxury-cream">
        <div className="container-luxury">
          <SectionHeader eyebrow="Philosophy" title={<>Mission, Vision &amp; <em className="italic text-luxury-pink font-light">Values</em></>} className="mb-16" />

          <div className="grid lg:grid-cols-3 gap-px bg-luxury-gold/10 mb-20">
            {[
              { label: "Mission",    text: "To design spaces that are as unique as the people who inhabit them — delivering luxury without compromise, beauty without pretension, and quality that endures." },
              { label: "Vision",     text: "To be Michigan's most celebrated luxury design studio — known not just for beautiful rooms, but for the extraordinary experiences we create for our clients." },
              { label: "Philosophy", text: "Design is deeply personal. We believe that great interiors don't follow trends — they express truth. Our work is guided by the conviction that beauty is a necessity, not a luxury." },
            ].map(({ label, text }) => (
              <div key={label} className="bg-luxury-cream p-12">
                <div className="eyebrow mb-4">{label}</div>
                <p className="font-cormorant text-xl text-luxury-black leading-relaxed font-light">{text}</p>
              </div>
            ))}
          </div>

          {/* Values grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {VALUES.map(({ title, icon, desc }) => (
              <div key={title} className="group text-center p-8 border border-luxury-gold/12 hover:border-luxury-gold/35 hover:shadow-luxury transition-all duration-500">
                <div className="text-luxury-gold text-2xl mb-5">{icon}</div>
                <h3 className="font-cormorant text-xl text-luxury-black mb-4">{title}</h3>
                <p className="text-body-sm text-luxury-gray leading-relaxed font-light">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="section-pad bg-luxury-black">
        <div className="container-luxury">
          <SectionHeader eyebrow="Our Journey" title={<>Two Decades of <em className="italic text-luxury-gold font-light">Excellence</em></>} light className="mb-16" />
          <div className="relative">
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-luxury-gold/20 hidden lg:block" />
            <div className="flex flex-col gap-12">
              {MILESTONES.map(({ year, event }, i) => (
                <div key={year} className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${i % 2 === 1 ? "lg:direction-rtl" : ""}`}>
                  <div className={`${i % 2 === 1 ? "lg:text-right lg:order-2" : ""}`}>
                    <div className="font-cormorant text-5xl text-luxury-gold/30 font-light mb-2">{year}</div>
                    <p className="text-body-md text-white/60 font-light">{event}</p>
                  </div>
                  <div className={`hidden lg:flex items-center justify-center ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                    <div className="w-3 h-3 rounded-full bg-luxury-gold border-4 border-luxury-black ring-1 ring-luxury-gold/40" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-pad bg-luxury-warm">
        <div className="container-md">
          <SectionHeader eyebrow="FAQ" title={<>Common <em className="italic text-luxury-pink font-light">Questions</em></>} className="mb-14" />
          <div className="flex flex-col gap-px bg-luxury-gold/10">
            {FAQS.map(({ q, a }) => (
              <details key={q} className="group bg-luxury-warm p-8 cursor-pointer">
                <summary className="flex items-center justify-between font-cormorant text-xl text-luxury-black font-light list-none">
                  {q}
                  <span className="text-luxury-gold text-xl ml-4 group-open:rotate-45 transition-transform duration-300 flex-shrink-0">+</span>
                </summary>
                <p className="text-body-md text-luxury-gray mt-5 leading-relaxed font-light">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <ConsultationCTA />
    </>
  );
}
