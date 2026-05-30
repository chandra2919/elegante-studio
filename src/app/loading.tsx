/**
 * Global loading UI — shown during route transitions.
 * Uses CSS only (no JS) for maximum performance.
 */
export default function Loading() {
  return (
    <div
      role="status"
      aria-label="Loading"
      className="fixed inset-0 z-[9000] flex items-center justify-center bg-luxury-cream"
    >
      <div className="flex flex-col items-center gap-5">
        <div
          className="font-cormorant text-4xl font-light text-luxury-black tracking-[0.04em]"
          aria-hidden="true"
        >
          Eleg<em className="italic text-luxury-gold">anté</em>
        </div>
        {/* Gold pulse bar */}
        <div className="w-32 h-px bg-luxury-gold/20 overflow-hidden relative">
          <div
            className="absolute inset-y-0 left-0 w-1/2 bg-luxury-gold"
            style={{ animation: "loadingBar 1.2s ease-in-out infinite" }}
          />
        </div>
        <span className="sr-only">Loading…</span>
      </div>

      <style>{`
        @keyframes loadingBar {
          0%   { transform: translateX(-100%); }
          50%  { transform: translateX(100%); }
          100% { transform: translateX(300%); }
        }
      `}</style>
    </div>
  );
}
