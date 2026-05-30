import type { Metadata } from "next";
import Image from "next/image";
import { TESTIMONIALS, STATS } from "@/lib/data";
import { ConsultationCTA } from "@/components/home/ConsultationCTA";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "Hear from our discerning clients about their Eleganté experience.",
};

export default function TestimonialsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[55vh] flex items-end pb-20 overflow-hidden">
        <Image src="/images/BW8A3607.jpg" alt="Client Stories" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-luxury-black/70" />
        <div className="container-luxury relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <span className="w-10 h-px bg-luxury-gold" />
            <span className="eyebrow text-luxury-gold">Client Stories</span>
          </div>
          <h1 className="heading-display text-display-2xl text-white">
            Words of<br/>
            <em className="italic text-luxury-gold font-light">Trust &amp; Excellence</em>
          </h1>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-luxury-warm border-b border-luxury-gold/15">
        <div className="container-luxury">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {STATS.map((stat, i) => (
              <div key={stat.label} className={`py-14 px-8 text-center border-r border-luxury-gold/12 last:border-r-0 ${i >= 2 ? "border-t border-luxury-gold/12 lg:border-t-0" : ""}`}>
                <div className="font-cormorant text-5xl font-light text-luxury-black">
                  {stat.number}<span className="text-luxury-gold">{stat.suffix}</span>
                </div>
                <div className="eyebrow text-[9px] mt-3">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="section-pad bg-luxury-cream">
        <div className="container-luxury">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.id} className="bg-white border border-luxury-gold/10 p-10 hover:border-luxury-gold/30 hover:shadow-luxury transition-all duration-500 relative">
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <span key={i} className="text-luxury-gold">★</span>
                  ))}
                </div>

                {/* Quote mark */}
                <div className="font-cormorant text-6xl text-luxury-gold/12 leading-none mb-3 absolute top-6 right-8">"</div>

                {/* Text */}
                <p className="font-cormorant text-lg italic text-luxury-black leading-relaxed mb-8 font-light">
                  {t.text}
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 pt-6 border-t border-luxury-gold/12">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-luxury-pink to-luxury-gold flex items-center justify-center flex-shrink-0">
                    <span className="font-cormorant text-lg text-white">{t.name[0]}</span>
                  </div>
                  <div>
                    <div className="font-inter text-sm font-medium text-luxury-black">{t.name}</div>
                    <div className="eyebrow text-[9px]">{t.role} · {t.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ConsultationCTA />
    </>
  );
}
