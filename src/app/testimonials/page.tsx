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
        <Image src="/images/BW8A3607.webp" alt="Client Stories" fill className="object-cover" priority />
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
              <div
                key={stat.label}
                className={`relative py-14 px-8 text-center border-r border-luxury-gold/12 last:border-r-0 overflow-hidden group hover:bg-luxury-cream/50 transition-colors duration-400 ${i >= 2 ? "border-t border-luxury-gold/12 lg:border-t-0" : ""}`}
              >
                {/* Concentric circles — top right */}
                <div className="absolute -top-6 -right-6 pointer-events-none select-none" style={{width:"88px",height:"88px"}}>
                  <div className="absolute inset-0 rounded-full" style={{border:"1.5px solid rgba(200,168,107,0.35)"}} />
                  <div className="absolute inset-[14px] rounded-full" style={{border:"1.5px solid rgba(200,168,107,0.25)"}} />
                  <div className="absolute inset-[28px] rounded-full" style={{border:"1.5px solid rgba(200,168,107,0.18)"}} />
                </div>
                {/* Bottom-left bracket */}
                <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-luxury-gold/0 group-hover:border-luxury-gold/30 transition-all duration-400" />
                <div className="font-cormorant text-5xl font-light text-luxury-black group-hover:text-luxury-gold transition-colors duration-400">
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
              <div key={t.id} className="group bg-white border border-luxury-gold/10 p-10 hover:border-luxury-gold/30 hover:shadow-luxury transition-all duration-500 relative overflow-hidden">
                {/* Gold top bar — slides in on hover */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-luxury-gold/0 via-luxury-gold to-luxury-gold/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                {/* Concentric circles — bottom right */}
                <div className="absolute -bottom-6 -right-6 pointer-events-none select-none" style={{width:"96px",height:"96px"}}>
                  <div className="absolute inset-0 rounded-full" style={{border:"1.5px solid rgba(200,168,107,0.30)"}} />
                  <div className="absolute inset-[14px] rounded-full" style={{border:"1.5px solid rgba(200,168,107,0.22)"}} />
                  <div className="absolute inset-[28px] rounded-full" style={{border:"1.5px solid rgba(200,168,107,0.15)"}} />
                </div>

                {/* Corner brackets */}
                <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-luxury-gold/0 group-hover:border-luxury-gold/35 transition-all duration-400" />
                <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-luxury-gold/0 group-hover:border-luxury-gold/35 transition-all duration-400" />

                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <span key={i} className="text-luxury-gold">★</span>
                  ))}
                </div>

                {/* Quote mark */}
                <div className="font-cormorant text-6xl text-luxury-gold/12 group-hover:text-luxury-gold/25 transition-colors duration-400 leading-none mb-3 absolute top-6 right-8">"</div>

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
