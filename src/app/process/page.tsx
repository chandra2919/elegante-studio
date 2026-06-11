import type { Metadata } from "next";
import Image from "next/image";
import { ConsultationCTA } from "@/components/home/ConsultationCTA";

export const metadata: Metadata = {
  title: "Design Process",
  description: "Our signature 6-step design process — from discovery to final delivery.",
};

/* Each step paired with a matching project image and a short pull-quote */
const STEPS = [
  {
    step: 1,
    title: "Discovery",
    description:
      "A private consultation to understand your vision, lifestyle, and aspirations. We listen deeply before a single sketch is drawn.",
    quote: "Every great space begins with a conversation.",
    image: "/images/BW8A3694.webp",
  },
  {
    step: 2,
    title: "Concept Design",
    description:
      "Bespoke mood boards, spatial layouts, and material narratives crafted exclusively for you. You approve every direction before work begins.",
    quote: "Design is the silent ambassador of your identity.",
    image: "/images/BW8A3535.webp",
  },
  {
    step: 3,
    title: "Material Selection",
    description:
      "Hand-selecting premium fabrics, finishes, and furniture curated from trade-only collections unavailable to the general public.",
    quote: "Luxury lives in the materials most people never notice.",
    image: "/images/IMG_9329.webp",
  },
  {
    step: 4,
    title: "Execution",
    description:
      "Master craftsmen and our installation team bring every detail to life with the precision that defines the Eleganté standard.",
    quote: "Perfection is not an accident — it is a process.",
    image: "/images/BW8A3877.webp",
  },
  {
    step: 5,
    title: "Styling",
    description:
      "Florals, accessories, and lighting are positioned to create the perfect atmosphere — the final layer that transforms a room into an experience.",
    quote: "The details are not the details. They make the design.",
    image: "/images/IMG_9339.webp",
  },
  {
    step: 6,
    title: "Final Delivery",
    description:
      "The reveal moment — your extraordinary space, ready to be lived in, celebrated, and cherished. Followed by 30 days of dedicated aftercare.",
    quote: "We don't finish projects. We unveil experiences.",
    image: "/images/BW8A3410.webp",
  },
];

const PROMISES = [
  {
    symbol: "I",
    title: "On-Time Delivery",
    desc: "Every project delivered on schedule. We honour your time as we honour our craft.",
  },
  {
    symbol: "II",
    title: "Transparent Pricing",
    desc: "No hidden costs. Clear, detailed proposals from the very first conversation.",
  },
  {
    symbol: "III",
    title: "Premium Materials",
    desc: "Only the finest materials from exclusive trade suppliers — quality that endures.",
  },
  {
    symbol: "IV",
    title: "Lifetime Relationship",
    desc: "Our connection doesn't end at delivery. We remain available for every future need.",
  },
];

export default function ProcessPage() {
  return (
    <>
      {/* ── Hero ────────────────────────────────────────────── */}
      <section className="relative min-h-[65vh] flex items-end pb-24 overflow-hidden">
        <Image
          src="/images/BW8A3694.webp"
          alt="Design Process"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/80 via-luxury-black/40 to-transparent" />
        <div className="container-luxury relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <span className="w-10 h-px bg-luxury-gold" />
            <span className="eyebrow text-luxury-gold">How We Work</span>
          </div>
          <h1
            className="font-cormorant font-light text-white leading-[1.04] mb-5"
            style={{ fontSize: "clamp(44px,5.5vw,88px)" }}
          >
            Our Signature<br />
            <em className="italic text-luxury-gold font-light">Design Process</em>
          </h1>
          <p className="text-body-lg text-white/55 max-w-xl font-light leading-relaxed">
            From the first conversation to the final reveal — a seamless journey
            of creativity, precision, and uncompromising craftsmanship.
          </p>
        </div>
      </section>

      {/* ── Intro line ──────────────────────────────────────── */}
      <div className="bg-luxury-cream border-b border-luxury-gold/12">
        <div className="container-luxury py-10 flex items-center gap-8">
          <div className="w-10 h-px bg-luxury-gold flex-shrink-0" />
          <p className="font-cormorant text-xl italic text-luxury-gray font-light leading-relaxed">
            Six deliberate steps — each one a commitment to the detail, the quality,
            and the vision that defines every Eleganté project.
          </p>
        </div>
      </div>

      {/* ── Steps ───────────────────────────────────────────── */}
      <section className="bg-luxury-cream">
        {STEPS.map((step, i) => {
          const isEven = i % 2 === 0;
          return (
            <div
              key={step.step}
              className="border-b border-luxury-gold/10 last:border-b-0"
            >
              <div
                className={`container-luxury grid lg:grid-cols-2 gap-0 ${
                  isEven ? "" : "lg:flex lg:flex-row-reverse"
                }`}
              >
                {/* ── Text side ── */}
                <div
                  className={`flex flex-col justify-center py-20 ${
                    isEven ? "lg:pr-20" : "lg:pl-20"
                  }`}
                >
                  {/* Step number */}
                  <div className="flex items-center gap-5 mb-8">
                    <span
                      className="font-cormorant font-light text-luxury-gold/25 leading-none select-none"
                      style={{ fontSize: "clamp(72px,8vw,110px)" }}
                    >
                      {String(step.step).padStart(2, "0")}
                    </span>
                    <div className="flex flex-col gap-1">
                      <div className="w-px h-10 bg-luxury-gold/30" />
                      <span className="eyebrow text-[8.5px] text-luxury-gold">
                        Step {step.step} of 6
                      </span>
                    </div>
                  </div>

                  <h2
                    className="font-cormorant font-light text-luxury-black leading-[1.06] mb-6"
                    style={{ fontSize: "clamp(36px,3.6vw,56px)" }}
                  >
                    {step.title}
                  </h2>

                  <p className="text-body-md text-luxury-gray leading-relaxed font-light mb-8 max-w-md">
                    {step.description}
                  </p>

                  {/* Pull-quote */}
                  <div className="border-l-2 border-luxury-gold/40 pl-5">
                    <p className="font-cormorant text-lg italic text-luxury-gold/80 font-light leading-relaxed">
                      "{step.quote}"
                    </p>
                  </div>
                </div>

                {/* ── Image side ── */}
                <div className="relative overflow-hidden" style={{ minHeight: "480px" }}>
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-cover"
                    sizes="(max-width:1024px) 100vw, 50vw"
                  />
                  {/* Subtle overlay gradient */}
                  <div
                    className={`absolute inset-0 ${
                      isEven
                        ? "bg-gradient-to-r from-luxury-cream/30 to-transparent"
                        : "bg-gradient-to-l from-luxury-cream/30 to-transparent"
                    }`}
                  />
                  {/* Step number watermark */}
                  <div
                    className="absolute bottom-6 right-8 font-cormorant font-light text-white/10 leading-none select-none pointer-events-none"
                    style={{ fontSize: "clamp(100px,14vw,180px)" }}
                  >
                    {String(step.step).padStart(2, "0")}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* ── The Eleganté Promise ─────────────────────────────── */}
      <section className="section-pad bg-luxury-black relative overflow-hidden">
        {/* Decorative large text watermark */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center pointer-events-none select-none font-cormorant font-light leading-none"
          style={{
            fontSize: "clamp(80px,16vw,220px)",
            color: "rgba(200,168,107,0.04)",
            letterSpacing: "-0.03em",
          }}
        >
          Promise
        </div>

        <div className="container-luxury relative z-10">
          {/* Header */}
          <div className="text-center mb-20">
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="block w-10 h-px bg-luxury-gold/40" />
              <span className="eyebrow text-luxury-gold">Why Eleganté</span>
              <span className="block w-10 h-px bg-luxury-gold/40" />
            </div>
            <h2
              className="font-cormorant font-light text-white leading-[1.06]"
              style={{ fontSize: "clamp(36px,4.5vw,68px)" }}
            >
              The Eleganté{" "}
              <em className="italic text-luxury-gold font-light">Promise</em>
            </h2>
          </div>

          {/* Promise cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">
            {PROMISES.map(({ symbol, title, desc }) => (
              <div
                key={title}
                className="bg-luxury-black/60 p-10 text-center group hover:bg-white/[0.04] transition-colors duration-500"
              >
                {/* Roman numeral instead of emoji */}
                <div className="mb-6 flex justify-center">
                  <span
                    className="font-cormorant font-light text-luxury-gold/30 group-hover:text-luxury-gold/60 transition-colors duration-500 leading-none"
                    style={{ fontSize: "56px" }}
                  >
                    {symbol}
                  </span>
                </div>
                {/* Gold line */}
                <div className="w-8 h-px bg-luxury-gold/30 mx-auto mb-6 group-hover:w-14 group-hover:bg-luxury-gold/60 transition-all duration-500" />
                <h3 className="font-cormorant text-[22px] text-white mb-4 font-light">
                  {title}
                </h3>
                <p className="text-body-sm text-white/40 font-light leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ConsultationCTA />
    </>
  );
}
