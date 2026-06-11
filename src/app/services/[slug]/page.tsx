import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SERVICES } from "@/lib/data";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { ConsultationCTA } from "@/components/home/ConsultationCTA";

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = SERVICES.find((s) => s.slug === params.slug);
  return {
    title: service?.title ?? "Service",
    description: service?.description,
  };
}

export default function ServicePage({ params }: Props) {
  const service = SERVICES.find((s) => s.slug === params.slug);
  if (!service) notFound();

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[75vh] flex items-end pb-24 overflow-hidden">
        <Image src={service.heroImage} alt={service.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-luxury-black/65" />
        <div className="container-luxury relative z-10">
          <Link href="/services" className="eyebrow text-luxury-gold/70 hover:text-luxury-gold flex items-center gap-2 mb-8 transition-colors">
            ← All Services
          </Link>
          <div className="eyebrow text-luxury-gold mb-3">{service.subtitle}</div>
          <h1 className="heading-display text-display-xl text-white mb-6">{service.title}</h1>
          <p className="text-body-lg text-white/55 max-w-xl font-light">{service.description}</p>
          {service.startingPrice && (
            <p className="mt-4 eyebrow text-luxury-gold/60">Starting from {service.startingPrice}</p>
          )}
        </div>
      </section>

      {/* Overview */}
      <section className="section-pad bg-luxury-cream">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-2 gap-20">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <span className="w-10 h-px bg-luxury-gold" />
                <span className="eyebrow">Overview</span>
              </div>
              <h2 className="heading-display text-display-lg text-luxury-black mb-8">{service.title}</h2>
              <p className="text-body-md text-luxury-gray leading-relaxed mb-8 font-light">{service.longDescription}</p>
              <Link href="/contact" className="btn-luxury-primary">
                Enquire Now
                <span className="btn-arrow-line" />
              </Link>
            </div>

            {/* Benefits */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <span className="w-10 h-px bg-luxury-gold" />
                <span className="eyebrow">What's Included</span>
              </div>
              <ul className="flex flex-col gap-4">
                {service.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-4">
                    <span className="text-luxury-gold mt-1 flex-shrink-0">✦</span>
                    <span className="text-body-md text-luxury-gray font-light">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="section-pad bg-luxury-warm">
        <div className="container-luxury">
          <div className="eyebrow mb-4">Gallery</div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {service.galleryImages.map((img, i) => (
              <div key={i} className="group relative overflow-hidden aspect-square">
                <Image src={img} alt={`${service.title} ${i + 1}`} fill className="object-cover transition-transform duration-700 group-hover:scale-[1.08]" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section-pad bg-luxury-cream">
        <div className="container-luxury">
          <div className="flex items-center gap-4 mb-12">
            <span className="w-10 h-px bg-luxury-gold" />
            <span className="eyebrow">Our Process</span>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {service.process.map((step) => (
              <div key={step.step} className="p-8 border border-luxury-gold/12 hover:border-luxury-gold/35 hover:shadow-luxury transition-all duration-500">
                <div className="font-cormorant text-5xl font-light text-luxury-gold/20 mb-4">{String(step.step).padStart(2,"0")}</div>
                <h3 className="font-cormorant text-xl text-luxury-black mb-3">{step.title}</h3>
                <p className="text-body-sm text-luxury-gray font-light leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      {service.faqs.length > 0 && (
        <section className="section-pad bg-luxury-warm">
          <div className="container-md">
            <div className="flex items-center gap-4 mb-12">
              <span className="w-10 h-px bg-luxury-gold" />
              <span className="eyebrow">FAQs</span>
            </div>
            <div className="flex flex-col gap-px bg-luxury-gold/10">
              {service.faqs.map(({ question, answer }) => (
                <details key={question} className="group bg-luxury-warm p-8 cursor-pointer">
                  <summary className="flex items-center justify-between font-cormorant text-xl text-luxury-black font-light list-none">
                    {question}
                    <span className="text-luxury-gold text-xl ml-4 group-open:rotate-45 transition-transform duration-300 flex-shrink-0">+</span>
                  </summary>
                  <p className="text-body-md text-luxury-gray mt-5 leading-relaxed font-light">{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      <ConsultationCTA />
    </>
  );
}
