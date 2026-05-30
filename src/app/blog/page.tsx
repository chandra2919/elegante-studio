import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BLOG_POSTS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Journal",
  description: "Design insights, inspiration, and stories from the Eleganté studio.",
};

export default function BlogPage() {
  const [featured, ...rest] = BLOG_POSTS;

  return (
    <>
      {/* Hero */}
      <section className="pt-36 pb-16 bg-luxury-cream">
        <div className="container-luxury">
          <div className="flex items-center gap-4 mb-6">
            <span className="w-10 h-px bg-luxury-gold" />
            <span className="eyebrow">Design Journal</span>
          </div>
          <h1 className="heading-display text-display-2xl text-luxury-black">
            Insights &amp; <em className="italic text-luxury-pink font-light">Inspiration</em>
          </h1>
          <p className="text-body-lg text-luxury-gray mt-4 max-w-xl font-light">
            Thoughts on luxury design, styling philosophy, and the art of extraordinary spaces.
          </p>
        </div>
      </section>

      {/* Featured Article */}
      <section className="section-pad-sm bg-luxury-cream border-t border-luxury-gold/10">
        <div className="container-luxury">
          <Link href={`/blog/${featured.slug}`} className="group grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-80 lg:h-[480px] overflow-hidden">
              <Image
                src={featured.coverImage}
                alt={featured.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
              />
            </div>
            <div>
              <div className="eyebrow mb-3">{featured.category}</div>
              <h2 className="heading-display text-display-lg text-luxury-black mb-4 group-hover:text-luxury-pink transition-colors duration-300">
                {featured.title}
              </h2>
              <p className="text-body-md text-luxury-gray font-light leading-relaxed mb-6">{featured.excerpt}</p>
              <div className="flex items-center gap-6">
                <span className="eyebrow text-[9px] text-luxury-gray">{featured.date}</span>
                <span className="w-1 h-1 rounded-full bg-luxury-gold" />
                <span className="eyebrow text-[9px] text-luxury-gray">{featured.readTime} read</span>
              </div>
              <div className="flex items-center gap-3 mt-6 text-luxury-gold">
                <span className="eyebrow text-[9px]">Read Article</span>
                <span className="block w-5 h-px bg-luxury-gold group-hover:w-10 transition-all duration-300" />
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="section-pad bg-luxury-warm">
        <div className="container-luxury">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rest.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group bg-white border border-luxury-gold/10 hover:border-luxury-gold/30 hover:shadow-luxury transition-all duration-500">
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.07]"
                  />
                </div>
                <div className="p-7">
                  <div className="eyebrow text-[9px] mb-3">{post.category}</div>
                  <h3 className="font-cormorant text-xl text-luxury-black font-light mb-3 group-hover:text-luxury-pink transition-colors duration-300">
                    {post.title}
                  </h3>
                  <p className="text-body-sm text-luxury-gray font-light leading-relaxed mb-5">{post.excerpt}</p>
                  <div className="flex items-center gap-4">
                    <span className="eyebrow text-[8px] text-luxury-gray">{post.date}</span>
                    <span className="w-1 h-1 rounded-full bg-luxury-gold" />
                    <span className="eyebrow text-[8px] text-luxury-gray">{post.readTime} read</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
