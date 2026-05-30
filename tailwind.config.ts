import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand Colors
        "luxury-cream":    "#FAF8F4",
        "luxury-warm":     "#F4EEE7",
        "luxury-white":    "#FFFFFF",
        "luxury-gold":     "#C8A86B",
        "luxury-gold-premium": "#D4AF37",
        "luxury-pink":     "#D61F69",
        "luxury-pink-soft": "#F8D7E4",
        "luxury-black":    "#1F1F1F",
        "luxury-gray":     "#5D5D5D",
        "luxury-border":   "rgba(200,168,107,0.18)",
      },
      fontFamily: {
        cormorant: ["var(--font-cormorant)", "Georgia", "serif"],
        bodoni:    ["var(--font-bodoni)", "Georgia", "serif"],
        inter:     ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-2xl": ["clamp(64px,7vw,120px)", { lineHeight: "1.02", letterSpacing: "-0.02em" }],
        "display-xl":  ["clamp(48px,5.5vw,88px)",  { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-lg":  ["clamp(36px,4vw,68px)",    { lineHeight: "1.1",  letterSpacing: "-0.01em" }],
        "display-md":  ["clamp(28px,3vw,50px)",    { lineHeight: "1.15", letterSpacing: "-0.01em" }],
        "display-sm":  ["clamp(22px,2.5vw,38px)",  { lineHeight: "1.2" }],
        "body-lg":     ["18px", { lineHeight: "1.75" }],
        "body-md":     ["16px", { lineHeight: "1.7" }],
        "body-sm":     ["14px", { lineHeight: "1.65" }],
        "label":       ["11px", { lineHeight: "1.4", letterSpacing: "0.2em" }],
        "label-sm":    ["10px", { lineHeight: "1.4", letterSpacing: "0.25em" }],
      },
      spacing: {
        "section": "120px",
        "section-sm": "80px",
        "section-xs": "60px",
      },
      boxShadow: {
        "luxury":    "0 25px 80px rgba(0,0,0,0.07)",
        "luxury-md": "0 40px 100px rgba(0,0,0,0.10)",
        "luxury-lg": "0 60px 120px rgba(0,0,0,0.14)",
        "gold":      "0 8px 40px rgba(200,168,107,0.25)",
        "pink":      "0 8px 40px rgba(214,31,105,0.25)",
      },
      transitionTimingFunction: {
        "luxury": "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        "elastic": "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      },
      transitionDuration: {
        "400": "400ms",
        "600": "600ms",
        "800": "800ms",
        "1000": "1000ms",
      },
      backgroundImage: {
        "gold-gradient":   "linear-gradient(135deg, #C8A86B 0%, #D4AF37 50%, #C8A86B 100%)",
        "pink-gradient":   "linear-gradient(135deg, #D61F69 0%, #E91E8C 100%)",
        "cream-gradient":  "linear-gradient(180deg, #FAF8F4 0%, #F4EEE7 100%)",
        "overlay-dark":    "linear-gradient(to top, rgba(31,31,31,0.9) 0%, rgba(31,31,31,0.3) 60%, transparent 100%)",
        "overlay-subtle":  "linear-gradient(to top, rgba(31,31,31,0.6) 0%, transparent 70%)",
      },
      maxWidth: {
        "content": "1400px",
        "content-md": "1200px",
        "content-sm": "960px",
      },
      keyframes: {
        "fade-up": {
          "0%":   { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-left": {
          "0%":   { opacity: "0", transform: "translateX(40px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "scale-in": {
          "0%":   { opacity: "0", transform: "scale(0.92)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "marquee": {
          "0%":   { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-12px)" },
        },
        "spin-slow": {
          "to": { transform: "rotate(360deg)" }
        },
        "shimmer": {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "fade-up":   "fade-up 0.8s cubic-bezier(0.25,0.46,0.45,0.94) forwards",
        "fade-in":   "fade-in 0.6s ease forwards",
        "slide-left":"slide-left 0.8s cubic-bezier(0.25,0.46,0.45,0.94) forwards",
        "scale-in":  "scale-in 0.8s cubic-bezier(0.25,0.46,0.45,0.94) forwards",
        "marquee":   "marquee 30s linear infinite",
        "float":     "float 4s ease-in-out infinite",
        "spin-slow": "spin-slow 20s linear infinite",
        "shimmer":   "shimmer 2s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
