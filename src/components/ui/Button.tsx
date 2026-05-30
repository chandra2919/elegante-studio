"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { motion } from "framer-motion";

type Variant = "primary" | "outline" | "gold" | "ghost";

interface ButtonProps {
  variant?: Variant;
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  arrow?: boolean;
  className?: string;
  external?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary: "btn-luxury-primary",
  outline: "btn-luxury-outline",
  gold:    "btn-luxury-gold",
  ghost:   "inline-flex items-center gap-3 font-inter text-[11px] tracking-[0.22em] uppercase text-luxury-gray hover:text-luxury-gold transition-colors duration-300",
};

function Arrow() {
  return (
    <span className="inline-flex items-center gap-1">
      <span className="btn-arrow-line" />
    </span>
  );
}

export function Button({
  variant = "primary",
  href,
  onClick,
  children,
  arrow = false,
  className,
  external = false,
}: ButtonProps) {
  const cls = cn(variantClasses[variant], className);

  const content = (
    <>
      {children}
      {arrow && <Arrow />}
    </>
  );

  if (href) {
    return external ? (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {content}
      </a>
    ) : (
      <Link href={href} className={cls}>
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={cls}>
      {content}
    </button>
  );
}

// Magnetic button with Framer Motion
export function MagneticButton({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={onClick}
      className={className}
    >
      {children}
    </motion.button>
  );
}
