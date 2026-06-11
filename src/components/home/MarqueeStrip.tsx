export function MarqueeStrip() {
  const items = [
    "Luxury Interiors", "Styling Services", "Furniture Curation",
    "Dare To Have Flair", "Premium Decor", "Chandelier Installations",
    "Floral Artistry", "Eleganté Design Studio",
  ];

  const doubled = [...items, ...items];

  return (
    <div className="bg-luxury-black overflow-hidden py-5 border-t border-b border-white/5">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <div key={i} className="flex items-center gap-8 flex-shrink-0 px-8">
            <span className="font-cormorant text-base italic text-white/40 whitespace-nowrap">
              {item}
            </span>
            <span className="w-1 h-1 rounded-full bg-luxury-gold flex-shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}
