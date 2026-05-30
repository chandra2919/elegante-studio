import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-luxury-cream px-6 pt-24">
      <div className="text-center max-w-lg">
        <div
          className="font-cormorant font-light text-luxury-gold/15 leading-none mb-6 select-none"
          style={{ fontSize: "clamp(100px,18vw,200px)" }}
          aria-hidden="true"
        >
          404
        </div>
        <h1 className="font-cormorant text-4xl text-luxury-black font-light mb-4">
          Page Not Found
        </h1>
        <p className="text-body-md text-luxury-gray font-light leading-relaxed mb-10">
          The page you are looking for may have moved or no longer exists.
          Let us guide you back to something beautiful.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/" className="btn-luxury-primary">Return Home</Link>
          <Link href="/portfolio" className="btn-luxury-outline">View Portfolio</Link>
        </div>
      </div>
    </div>
  );
}
