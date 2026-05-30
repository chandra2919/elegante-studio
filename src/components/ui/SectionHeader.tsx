"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  align?: "left" | "center" | "right";
  light?: boolean;
  className?: string;
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};
const item = {
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
  light = false,
  className,
}: SectionHeaderProps) {
  const alignClass = {
    left:   "items-start text-left",
    center: "items-center text-center",
    right:  "items-end text-right",
  }[align];

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className={cn("flex flex-col gap-5", alignClass, className)}
    >
      {eyebrow && (
        <motion.div variants={item} className="flex items-center gap-4">
          {align === "center" && <span className="block w-10 h-px bg-luxury-gold opacity-60" />}
          {align !== "center" && <span className="block w-10 h-px bg-luxury-gold opacity-60" />}
          <span className={cn("eyebrow", light ? "text-luxury-gold" : "text-luxury-gold")}>
            {eyebrow}
          </span>
          {align === "center" && <span className="block w-10 h-px bg-luxury-gold opacity-60" />}
        </motion.div>
      )}

      <motion.h2
        variants={item}
        className={cn(
          "heading-display text-display-xl",
          light ? "text-white" : "text-luxury-black",
        )}
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          variants={item}
          className={cn(
            "text-body-lg max-w-xl",
            light ? "text-white/60" : "text-luxury-gray",
            align === "center" && "mx-auto",
          )}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
