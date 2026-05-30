"use client";
/**
 * Global Error Boundary.
 * Catches runtime errors and shows a luxury fallback UI.
 */
import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to error monitoring service in production
    if (process.env.NODE_ENV === "production") {
      console.error("[Eleganté Error]", error.digest ?? error.message);
    }
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-luxury-cream px-6">
      <div className="text-center max-w-lg">
        <div className="font-cormorant text-[80px] font-light text-luxury-gold/20 leading-none mb-4">✦</div>
        <h1 className="font-cormorant text-4xl text-luxury-black font-light mb-4">
          Something went wrong
        </h1>
        <p className="text-body-md text-luxury-gray font-light leading-relaxed mb-10">
          We encountered an unexpected issue. Our team has been notified.
          Please try again or return to the home page.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <button onClick={reset} className="btn-luxury-primary">
            Try Again
          </button>
          <Link href="/" className="btn-luxury-outline">
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
