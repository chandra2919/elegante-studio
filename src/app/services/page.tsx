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
      <section className="section-pad bg-luxury-black">
        <div className="container-luxury">
          <SectionHeader eyebrow="How We Work" title={<>Our <em className="italic text-luxury-gold font-light">Signature</em> Process</>} light className="mb-16" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROCESS_STEPS.map((step) => (
              <div key={step.step} className="group p-8 border border-white/8 hover:border-luxury-gold/30 transition-all duration-400 hover:bg-white/3">
                <div className="font-cormorant text-6xl font-light text-luxury-gold/12 mb-4">
                  {String(step.step).padStart(2, "0")}
                </div>
                <h3 className="font-cormorant text-xl text-white mb-3">{step.title}</h3>
                <p className="text-body-sm text-white/40 leading-relaxed font-light">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ConsultationCTA />
    </>
  );
}
