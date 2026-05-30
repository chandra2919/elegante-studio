"use client";
/**
 * LuxuryImage — Premium image component
 * • Shimmer placeholder while loading
 * • Blur-to-sharp + fade-in on load (GPU-only transforms)
 * • Optional luxury frame border
 * • Optional gold ribbon label
 */
import { useState, useCallback } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LuxuryImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  className?: string;          // wrapper class
  imgClassName?: string;       // image class
  frame?: boolean;             // luxury frame border
  ribbon?: string;             // gold ribbon text
  zoom?: boolean;              // hover zoom
  overlay?: "dark" | "gold" | "none";
  priority2?: boolean;
}

export function LuxuryImage({
  src,
  alt,
  fill = false,
  width,
  height,
  sizes,
  priority = false,
  className,
  imgClassName,
  frame = false,
  ribbon,
  zoom = false,
  overlay = "none",
}: LuxuryImageProps) {
  const [loaded, setLoaded] = useState(false);

  const onLoad = useCallback(() => setLoaded(true), []);

  return (
    <div className={cn("relative overflow-hidden group", frame && "luxury-frame", className)}>
      {/* Shimmer placeholder */}
      {!loaded && (
        <div
          className="absolute inset-0 img-shimmer"
          aria-hidden="true"
        />
      )}

      {/* The image itself */}
      {fill ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes ?? "(max-width:768px) 100vw, 50vw"}
          priority={priority}
          onLoad={onLoad}
          className={cn(
            "object-cover img-luxury-load",
            loaded && "loaded",
            zoom && "transition-transform duration-[900ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.07]",
            imgClassName,
          )}
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          width={width ?? 800}
          height={height ?? 600}
          sizes={sizes}
          priority={priority}
          onLoad={onLoad}
          className={cn(
            "w-full h-auto img-luxury-load",
            loaded && "loaded",
            zoom && "transition-transform duration-[900ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.07]",
            imgClassName,
          )}
        />
      )}

      {/* Overlay */}
      {overlay === "dark" && (
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/70 via-transparent to-transparent pointer-events-none" />
      )}
      {overlay === "gold" && (
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-gold/20 via-transparent to-transparent pointer-events-none" />
      )}

      {/* Gold ribbon */}
      {ribbon && (
        <div className="gold-ribbon">{ribbon}</div>
      )}
    </div>
  );
}
