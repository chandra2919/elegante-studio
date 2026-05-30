import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PROJECTS, TESTIMONIALS } from "@/lib/data";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { ConsultationCTA } from "@/components/home/ConsultationCTA";

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = PROJECTS.find((p) => p.slug === params.slug);
  return { title: project?.title ?? "Project", description: project?.description };
}

export default function ProjectPage({ params }: Props) {
  const project = PROJECTS.find((p) => p.slug === params.slug);
  if (!project) notFound();

  const related = PROJECTS.filter((p) => p.slug !== project.slug && p.category === project.category).slice(0, 3);
  const testimonial = project.testimonial ?? TESTIMONIALS.find((t) => t.projectSlug === project.slug);

  return (
    <>
      {/* Hero Banner */}
      <section className="relative h-screen flex items-end pb-20 overflow-hidden">
        <Image src={project.heroImage} alt={project.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/85 via-luxury-black/30 to-transparent" />
        <div className="container-luxury relative z-10">
          <Link href="/portfolio" className="eyebrow text-luxury-gold/70 hover:text-luxury-gold flex items-center gap-2 mb-8 transition-colors">
            ← Portfolio
          </Link>
          <div className="eyebrow text-luxury-gold mb-4">{project.category} · {project.year}</div>
          <h1 className="heading-display text-display-2xl text-white mb-4">{project.title}</h1>
          <p className="text-body-lg text-white/55 max-w-xl font-light">{project.location}</p>
        </div>
      </section>

      {/* Overview */}
      <section className="section-pad bg-luxury-cream">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-4 mb-6">
                <span className="w-10 h-px bg-luxury-gold" />
                <span className="eyebrow">Project Overview</span>
              </div>
              <p className="font-cormorant text-2xl text-luxury-black font-light leading-relaxed mb-8">{project.description}</p>

              <div className="grid md:grid-cols-3 gap-8 mb-12">
                {[
                  { label: "Challenge", text: project.challenge },
                  { label: "Solution",  text: project.solution  },
                  { label: "Result",    text: project.result    },
                ].map(({ label, text }) => (
                  <div key={label}>
                    <div className="eyebrow mb-3">{label}</div>
                    <p className="text-body-sm text-luxury-gray font-light leading-relaxed">{text}</p>
                  </div>
                ))}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="px-4 py-1.5 border border-luxury-gold/20 eyebrow text-[9px] text-luxury-gray">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Meta sidebar */}
            <div className="flex flex-col gap-6">
              {[
                { label: "Category",  value: project.category  },
                { label: "Location",  value: project.location  },
                { label: "Year",      value: project.year      },
                ...(project.client ? [{ label: "Client", value: project.client }] : []),
              ].map(({ label, value }) => (
                <div key={label} className="pb-6 border-b border-luxury-gold/12">
                  <div className="eyebrow text-[9px] mb-2">{label}</div>
                  <div className="font-cormorant text-lg text-luxury-black capitalize">{value}</div>
                </div>
              ))}
              <Link href="/contact" className="btn-luxury-primary mt-4">
                Commission Similar
                <span className="btn-arrow-line" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="section-pad-sm bg-luxury-warm">
        <div className="container-luxury">
          <div className="eyebrow mb-8">Project Gallery</div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {project.images.map((img, i) => (
              <div key={i} className={`group relative overflow-hidden ${i === 0 ? "md:col-span-2 h-80" : "h-64"}`}>
                <Image src={img} alt={`${project.title} ${i + 1}`} fill className="object-cover transition-transform duration-700 group-hover:scale-[1.06]" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      {testimonial && (
        <section className="section-pad bg-luxury-cream">
          <div className="container-md text-center">
            <div className="font-cormorant text-7xl text-luxury-gold/15 mb-4 leading-none">"</div>
            <p className="font-cormorant text-2xl lg:text-3xl italic text-luxury-black font-light leading-relaxed mb-8 -mt-6">
              {testimonial.text}
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="w-10 h-10 rounded-full bg-luxury-pink flex items-center justify-center">
                <span className="font-cormorant text-lg text-white">{testimonial.name[0]}</span>
              </div>
              <div className="text-left">
                <div className="font-inter text-sm font-medium text-luxury-black">{testimonial.name}</div>
                <div className="eyebrow text-[9px]">{testimonial.role}</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Related Projects */}
      {related.length > 0 && (
        <section className="section-pad bg-luxury-warm">
          <div className="container-luxury">
            <div className="eyebrow mb-10">Related Projects</div>
            <div className="grid md:grid-cols-3 gap-6">
              {related.map((p) => (
                <Link key={p.slug} href={`/portfolio/${p.slug}`} className="group block overflow-hidden">
                  <div className="relative h-64 overflow-hidden mb-4">
                    <Image src={p.heroImage} alt={p.title} fill className="object-cover transition-transform duration-700 group-hover:scale-[1.08]" />
                    <div className="absolute inset-0 overlay-subtle opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                  </div>
                  <h3 className="font-cormorant text-xl text-luxury-black font-light group-hover:text-luxury-pink transition-colors duration-300">{p.title}</h3>
                  <p className="eyebrow text-[9px] mt-2">{p.location}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <ConsultationCTA />
    </>
  );
}
