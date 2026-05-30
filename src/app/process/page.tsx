import type { Metadata } from "next";
import Image from "next/image";
import { PROCESS_STEPS } from "@/lib/data";
import { ConsultationCTA } from "@/components/home/ConsultationCTA";

export const metadata: Metadata = {
  title: "Design Process",
  description: "Our signature 6-step design process — from discovery to final delivery.",
};

export default function ProcessPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-end pb-24 overflow-hidden">
        <Image src="/images/BW8A3694.jpg" alt="Design Process" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-luxury-black/65" />
        <div className="container-luxury relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <span className="w-10 h-px bg-luxury-gold" />
            <span className="eyebrow text-luxury-gold">How We Work</span>
          </div>
          <h1 className="heading-display text-display-2xl text-white mb-4">
            Our Signature<br/>
            <em className="italic text-luxury-gold font-light">Design Process</em>
          </h1>
          <p className="text-body-lg text-white/55 max-w-xl font-light">
            From the first conversation to the final reveal — a seamless journey of creativity and craftsmanship.
          </p>
        </div>
      </section>

      {/* Interactive Timeline */}
      <section className="section-pad bg-luxury-cream">
        <div className="container-md">
          <div className="flex flex-col gap-0">
            {PROCESS_STEPS.map((step, i) => (
              <div
                key={step.step}
                className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center section-pad-sm border-b border-luxury-gold/10 last:border-b-0 ${
                  i % 2 === 1 ? "lg:flex lg:flex-row-reverse" : ""
                }`}
              >
                {/* Content side */}
                <div className={i % 2 === 1 ? "lg:pl-16" : "lg:pr-16"}>
                  <div className="flex items-center gap-6 mb-6">
                    <div className="font-cormorant text-7xl font-light text-luxury-gold/20 leading-none">
                      {String(step.step).padStart(2, "0")}
                    </div>
                    <div className="w-px h-12 bg-luxury-gold/20" />
                    <div>
                      <div className="text-3xl mb-1">{step.icon}</div>
                      <div className="eyebrow text-[9px]">Step {step.step}</div>
                    </div>
                  </div>
                  <h2 className="heading-display text-display-md text-luxury-black mb-6">{step.title}</h2>
                  <p className="text-body-md text-luxury-gray leading-relaxed font-light">{step.description}</p>
                </div>

                {/* Visual side */}
                <div className="relative h-80 overflow-hidden bg-luxury-warm flex items-center justify-center">
                  <div className="font-cormorant text-[180px] font-light text-luxury-gold/6 leading-none select-none absolute">
                    {String(step.step).padStart(2, "0")}
                  </div>
                  <div className="relative z-10 text-center">
                    <div className="text-6xl mb-4">{step.icon}</div>
                    <div className="font-cormorant text-2xl italic text-luxury-gold">{step.title}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-pad bg-luxury-black">
        <div className="container-luxury">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="block w-10 h-px bg-luxury-gold/50" />
              <span className="eyebrow text-luxury-gold">Why Eleganté</span>
              <span className="block w-10 h-px bg-luxury-gold/50" />
            </div>
            <h2 className="heading-display text-display-lg text-white mb-4">
              The Eleganté <em className="italic text-luxury-gold font-light">Promise</em>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">
            {[
              { title: "On-Time Delivery",    icon: "⏱️", desc: "Every project delivered on schedule. We respect your time." },
              { title: "Transparent Pricing", icon: "📋", desc: "No surprises. Clear costs from the first proposal." },
              { title: "Premium Materials",   icon: "💎", desc: "Only the finest materials, sourced from exclusive suppliers." },
              { title: "Lifetime Support",    icon: "🛡️", desc: "Our relationship doesn't end at delivery. We're always available." },
            ].map(({ title, icon, desc }) => (
              <div key={title} className="bg-luxury-black/60 p-10 text-center hover:bg-white/5 transition-colors duration-400">
                <div className="text-4xl mb-5">{icon}</div>
                <h3 className="font-cormorant text-xl text-white mb-3">{title}</h3>
                <p className="text-body-sm text-white/40 font-light leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ConsultationCTA />
    </>
  );
}
