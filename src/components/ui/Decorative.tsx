"use client";
/**
 * Premium Decorative Elements
 * Pure CSS/SVG — no external deps. Royal rings, dot matrices, geometric lines.
 */
import { cn } from "@/lib/utils";

/* ── Concentric Gold Rings ─────────────────────────────────── */
export function GoldRings({
  size = 400,
  rings = 5,
  opacity = 0.12,
  className,
  animate = false,
}: {
  size?: number;
  rings?: number;
  opacity?: number;
  className?: string;
  animate?: boolean;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={cn("pointer-events-none select-none", className)}
      aria-hidden="true"
    >
      {Array.from({ length: rings }).map((_, i) => {
        const ratio = (i + 1) / rings;
        const r = (size / 2) * ratio * 0.92;
        const alpha = opacity * (1 - i / rings) + opacity * 0.3;
        return (
          <circle
            key={i}
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={`rgba(200,168,107,${alpha})`}
            strokeWidth={i === 0 ? "0.5" : "1"}
            strokeDasharray={i % 2 === 0 ? "none" : `${r * 0.15} ${r * 0.05}`}
            style={animate ? { animation: `ringPulse ${2 + i * 0.4}s ease-in-out infinite alternate` } : {}}
          />
        );
      })}
    </svg>
  );
}

/* ── Single Decorative Ring ─────────────────────────────────── */
export function GoldCircle({
  size = 200,
  strokeWidth = 1,
  opacity = 0.2,
  className,
  dashed = false,
}: {
  size?: number;
  strokeWidth?: number;
  opacity?: number;
  className?: string;
  dashed?: boolean;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={cn("pointer-events-none select-none", className)}
      aria-hidden="true"
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={size / 2 - strokeWidth}
        fill="none"
        stroke={`rgba(200,168,107,${opacity})`}
        strokeWidth={strokeWidth}
        strokeDasharray={dashed ? "8 4" : "none"}
      />
    </svg>
  );
}

/* ── Dot Matrix Pattern ─────────────────────────────────────── */
export function DotMatrix({
  cols = 8,
  rows = 6,
  gap = 20,
  dotSize = 2,
  className,
  color = "rgba(200,168,107,0.25)",
}: {
  cols?: number;
  rows?: number;
  gap?: number;
  dotSize?: number;
  className?: string;
  color?: string;
}) {
  const w = cols * gap;
  const h = rows * gap;
  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      className={cn("pointer-events-none select-none", className)}
      aria-hidden="true"
    >
      {Array.from({ length: rows }).map((_, row) =>
        Array.from({ length: cols }).map((_, col) => (
          <circle
            key={`${row}-${col}`}
            cx={col * gap + gap / 2}
            cy={row * gap + gap / 2}
            r={dotSize}
            fill={color}
          />
        ))
      )}
    </svg>
  );
}

/* ── Thin Cross / Plus ──────────────────────────────────────── */
export function GoldCross({
  size = 40,
  opacity = 0.3,
  className,
}: {
  size?: number;
  opacity?: number;
  className?: string;
}) {
  const c = size / 2;
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={cn("pointer-events-none select-none", className)}
      aria-hidden="true"
    >
      <line x1={c} y1="0" x2={c} y2={size} stroke={`rgba(200,168,107,${opacity})`} strokeWidth="0.8" />
      <line x1="0" y1={c} x2={size} y2={c} stroke={`rgba(200,168,107,${opacity})`} strokeWidth="0.8" />
    </svg>
  );
}

/* ── Diagonal Lines Sketch ──────────────────────────────────── */
export function DiagonalLines({
  width = 120,
  height = 120,
  count = 6,
  opacity = 0.12,
  className,
}: {
  width?: number;
  height?: number;
  count?: number;
  opacity?: number;
  className?: string;
}) {
  const step = (width + height) / count;
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={cn("pointer-events-none select-none", className)}
      aria-hidden="true"
    >
      {Array.from({ length: count + 2 }).map((_, i) => {
        const offset = i * step - height;
        return (
          <line
            key={i}
            x1={offset}
            y1="0"
            x2={offset + height}
            y2={height}
            stroke={`rgba(200,168,107,${opacity})`}
            strokeWidth="0.8"
          />
        );
      })}
    </svg>
  );
}

/* ── Arc / Half-ring ────────────────────────────────────────── */
export function GoldArc({
  size = 200,
  startAngle = -90,
  endAngle = 90,
  opacity = 0.18,
  strokeWidth = 1,
  className,
}: {
  size?: number;
  startAngle?: number;
  endAngle?: number;
  opacity?: number;
  strokeWidth?: number;
  className?: string;
}) {
  const r = size / 2 - strokeWidth;
  const cx = size / 2;
  const cy = size / 2;
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const x1 = cx + r * Math.cos(toRad(startAngle));
  const y1 = cy + r * Math.sin(toRad(startAngle));
  const x2 = cx + r * Math.cos(toRad(endAngle));
  const y2 = cy + r * Math.sin(toRad(endAngle));
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={cn("pointer-events-none select-none", className)}
      aria-hidden="true"
    >
      <path
        d={`M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`}
        fill="none"
        stroke={`rgba(200,168,107,${opacity})`}
        strokeWidth={strokeWidth}
      />
    </svg>
  );
}

/* ── Corner Bracket ─────────────────────────────────────────── */
export function GoldCorner({
  size = 40,
  opacity = 0.35,
  className,
}: {
  size?: number;
  opacity?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={cn("pointer-events-none select-none", className)}
      aria-hidden="true"
    >
      <polyline
        points={`${size},0 0,0 0,${size}`}
        fill="none"
        stroke={`rgba(200,168,107,${opacity})`}
        strokeWidth="1.2"
      />
    </svg>
  );
}

/* ── Ornamental Diamond ─────────────────────────────────────── */
export function GoldDiamond({
  size = 16,
  opacity = 0.5,
  filled = false,
  className,
}: {
  size?: number;
  opacity?: number;
  filled?: boolean;
  className?: string;
}) {
  const c = size / 2;
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={cn("pointer-events-none select-none inline-block", className)}
      aria-hidden="true"
    >
      <polygon
        points={`${c},0 ${size},${c} ${c},${size} 0,${c}`}
        fill={filled ? `rgba(200,168,107,${opacity})` : "none"}
        stroke={`rgba(200,168,107,${opacity})`}
        strokeWidth="1"
      />
    </svg>
  );
}

/* ── Wave Lines ─────────────────────────────────────────────── */
export function GoldWave({
  width = 200,
  height = 40,
  waves = 3,
  opacity = 0.2,
  className,
}: {
  width?: number;
  height?: number;
  waves?: number;
  opacity?: number;
  className?: string;
}) {
  const waveWidth = width / waves;
  const amp = height * 0.35;
  const cy = height / 2;

  let d = `M 0 ${cy}`;
  for (let i = 0; i < waves; i++) {
    const x = i * waveWidth;
    d += ` C ${x + waveWidth * 0.25} ${cy - amp}, ${x + waveWidth * 0.75} ${cy + amp}, ${x + waveWidth} ${cy}`;
  }

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={cn("pointer-events-none select-none", className)}
      aria-hidden="true"
    >
      <path d={d} fill="none" stroke={`rgba(200,168,107,${opacity})`} strokeWidth="1" />
    </svg>
  );
}

/* ── Sparkle ✦ (text-based) ─────────────────────────────────── */
export function Sparkle({ className, size = "text-lg" }: { className?: string; size?: string }) {
  return (
    <span className={cn("text-luxury-gold select-none", size, className)} aria-hidden="true">
      ✦
    </span>
  );
}
