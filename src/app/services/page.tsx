import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { SERVICES, PROCESS_STEPS } from "@/lib/data";
import { ConsultationCTA } from "@/components/home/ConsultationCTA";

export const metadata: Metadata = {
  title: "Services",
  description: "A complete suite of luxury interior design services — residential, commercial, events, and more.",
};

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-end pb-24 overflow-hidden">
        <Image src="/images/BW8A3877.webp" alt="Services" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-luxury-black/65" />
        <div className="container-luxury relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <span className="w-10 h-px bg-luxury-gold" />
            <span className="eyebrow text-luxury-gold">Our Expertise</span>
          </div>
          <h1 className="heading-display text-display-2xl text-white mb-6">
            A Suite of<br/>
            <em className="italic text-luxury-gold font-light">Luxury Services</em>
          </h1>
          <p className="text-body-lg text-white/55 max-w-xl font-light">
            From intimate residential redesigns to grand interior transformations — every service delivered with absolute precision.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-pad bg-luxury-cream">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-luxury-gold/10">
            {SERVICES.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group bg-luxury-cream flex gap-0 hover:bg-luxury-warm transition-colors duration-400 overflow-hidden"
              >
                {/* Image panel */}
                <div className="relative w-52 flex-shrink-0 overflow-hidden hidden md:block">
                  <Image
                    src={service.heroImage}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.1]"
                  />
                  <div className="absolute inset-0 overlay-subtle" />
                </div>

                {/* Content */}
                <div className="p-10 flex-1">
                  <div className="flex items-start justify-between mb-4">
                    {service.startingPrice && (
                      <span className="eyebrow text-[9px] text-luxury-gray">From {service.startingPrice}</span>
                    )}
                  </div>
                  <h2 className="font-cormorant text-2xl text-luxury-black font-light mb-2 group-hover:text-luxury-pink transition-colors duration-300">
                    {service.title}
                  </h2>
                  <p className="eyebrow text-[9px] mb-4">{service.subtitle}</p>
                  <p className="text-body-sm text-luxury-gray leading-relaxed mb-6 font-light">{service.description}</p>
                  <div className="flex items-center gap-3 text-luxury-gold">
                    <span className="eyebrow text-[9px]">Explore</span>
                    <span className="block w-5 h-px bg-luxury-gold group-hover:w-10 transition-all duration-300" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Process Overview */}
      <section className="section-pad bg-luxury-black relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none select-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-luxury-gold/8 to-transparent" />
          <div className="absolute top-1/2 left-0 -translate-y-1/2 h-px w-full bg-gradient-to-r from-transparent via-luxury-gold/8 to-transparent" />
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full border border-luxury-gold/5" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full border border-luxury-gold/5" />
        </div>

        <div className="container-luxury relative z-10">
          <SectionHeader eyebrow="How We Work" title={<>Our <em className="italic text-luxury-gold font-light">Signature</em> Process</>} light className="mb-20" />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-0.5 bg-white/5">
            {PROCESS_STEPS.map((step, i) => (
              <div
                key={step.step}
                className="group relative bg-luxury-black p-10 overflow-hidden transition-all duration-500 hover:bg-white/[0.03]"
              >
                {/* Top gold bar — slides in on hover */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-luxury-gold/0 via-luxury-gold to-luxury-gold/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                {/* Decorative concentric circles — top right corner */}
                <div className="absolute -top-6 -right-6 pointer-events-none select-none">
                  <div className="w-24 h-24 rounded-full border border-luxury-gold/8 group-hover:border-luxury-gold/20 transition-colors duration-500" />
                  <div className="absolute inset-3 rounded-full border border-luxury-gold/6 group-hover:border-luxury-gold/15 transition-colors duration-500" />
                  <div className="absolute inset-6 rounded-full border border-luxury-gold/5 group-hover:border-luxury-gold/12 transition-colors duration-500" />
                  <div className="absolute inset-9 rounded-full bg-luxury-gold/0 group-hover:bg-luxury-gold/8 transition-colors duration-500" />
                </div>

                {/* Step indicator */}
                <div className="flex items-center gap-3 mb-7">
                  <div className="relative w-8 h-8 flex items-center justify-center flex-shrink-0">
                    <div className="absolute inset-0 rounded-full border border-luxury-gold/30 group-hover:border-luxury-gold/70 transition-colors duration-400" />
                    <div className="absolute inset-0 rounded-full bg-luxury-gold/0 group-hover:bg-luxury-gold/10 transition-colors duration-400" />
                    <span className="font-inter text-[10px] tracking-widest text-luxury-gold/60 group-hover:text-luxury-gold transition-colors duration-400 relative z-10">
                      {String(step.step).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="flex-1 h-px bg-gradient-to-r from-luxury-gold/30 to-transparent group-hover:from-luxury-gold/60 transition-all duration-400" />
                </div>

                {/* Title */}
                <h3 className="font-cormorant text-2xl font-light text-white group-hover:text-luxury-gold transition-colors duration-400 mb-4 leading-snug">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-body-sm text-white/40 group-hover:text-white/60 leading-relaxed font-light transition-colors duration-400">
                  {step.description}
                </p>

                {/* Bottom corner brackets */}
                <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-luxury-gold/0 group-hover:border-luxury-gold/35 transition-all duration-400" />
                <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-luxury-gold/0 group-hover:border-luxury-gold/35 transition-all duration-400" />

                {/* Connector dot for flow */}
                {i < PROCESS_STEPS.length - 1 && (
                  <div className="hidden lg:block absolute -right-[3px] top-1/2 -translate-y-1/2 w-[5px] h-[5px] rounded-full bg-luxury-gold/20 group-hover:bg-luxury-gold/60 transition-colors duration-400 z-10" />
                )}
              </div>
            ))}
          </div>

          {/* Bottom flow line */}
          <div className="mt-12 flex items-center justify-center gap-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-luxury-gold/20" />
            <span className="eyebrow text-[9px] text-luxury-gold/50 tracking-[0.3em]">Six Steps to Extraordinary</span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-luxury-gold/20" />
          </div>
        </div>
      </section>

      <ConsultationCTA />
    </>
  );
}
