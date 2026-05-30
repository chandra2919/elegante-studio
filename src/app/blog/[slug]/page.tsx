import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOG_POSTS } from "@/lib/data";

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
  return { title: post?.title ?? "Article", description: post?.excerpt };
}

export default function BlogPostPage({ params }: Props) {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
  if (!post) notFound();

  const related = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-end pb-20 overflow-hidden">
        <Image src={post.coverImage} alt={post.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-luxury-black/70" />
        <div className="container-md relative z-10">
          <Link href="/blog" className="eyebrow text-luxury-gold/70 hover:text-luxury-gold flex items-center gap-2 mb-8 transition-colors">
            ← Journal
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <span className="eyebrow text-luxury-gold">{post.category}</span>
            <span className="w-1 h-1 rounded-full bg-luxury-gold" />
            <span className="eyebrow text-white/40">{post.date}</span>
            <span className="w-1 h-1 rounded-full bg-luxury-gold" />
            <span className="eyebrow text-white/40">{post.readTime} read</span>
          </div>
          <h1 className="heading-display text-display-xl text-white max-w-3xl">{post.title}</h1>
        </div>
      </section>

      {/* Content */}
      <article className="section-pad bg-luxury-cream">
        <div className="container-md max-w-[760px]">
          <p className="font-cormorant text-2xl italic text-luxury-black leading-relaxed mb-8 font-light">{post.excerpt}</p>
          <div className="w-16 h-px bg-luxury-gold mb-10" />

          {/* Placeholder content */}
          {[
            "Every extraordinary interior begins with a question: what does this space need to say?",
            "Luxury design is not about expense — it is about intention. The most beautiful rooms we have designed were not necessarily the most costly. They were the most considered.",
            "When we approach a new project, we begin not with materials or furniture, but with story. We ask our clients: how do you want to feel when you walk into this room at the end of a long day? What impression should guests have in the first three seconds?",
            "Only when we understand the emotional brief can we begin the aesthetic one. Color, texture, light, proportion — these are the tools. But the vision must come first.",
          ].map((para, i) => (
            <p key={i} className="text-body-md text-luxury-gray font-light leading-relaxed mb-6">{para}</p>
          ))}

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-10">
            {post.tags.map((tag) => (
              <span key={tag} className="px-4 py-1.5 border border-luxury-gold/20 eyebrow text-[9px] text-luxury-gray">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </article>

      {/* Related */}
      {related.length > 0 && (
        <section className="section-pad bg-luxury-warm">
          <div className="container-luxury">
            <div className="eyebrow mb-10">Continue Reading</div>
            <div className="grid md:grid-cols-3 gap-8">
              {related.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className="group">
                  <div className="relative h-52 overflow-hidden mb-4">
                    <Image src={p.coverImage} alt={p.title} fill className="object-cover transition-transform duration-700 group-hover:scale-[1.07]" />
                  </div>
                  <div className="eyebrow text-[9px] mb-2">{p.category}</div>
                  <h3 className="font-cormorant text-xl text-luxury-black font-light group-hover:text-luxury-pink transition-colors duration-300">{p.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
