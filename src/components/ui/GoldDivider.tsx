import { cn } from "@/lib/utils";

export function GoldDivider({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-4 w-full", className)}>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-luxury-gold/40 to-transparent" />
      <div className="w-1 h-1 rotate-45 bg-luxury-gold" />
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-luxury-gold/40 to-transparent" />
    </div>
  );
}

export function GoldLine({ className, width = 60 }: { className?: string; width?: number }) {
  return (
    <div
      className={cn("h-px bg-luxury-gold", className)}
      style={{ width }}
    />
  );
}
