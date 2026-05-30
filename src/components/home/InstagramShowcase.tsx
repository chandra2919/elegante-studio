"use client";
import Image from "next/image";
import { motion } from "framer-motion";

const IMAGES = [
  "/images/BW8A3535.jpg",
  "/images/BW8A3578.jpg",
  "/images/IMG_9370.jpg",
  "/images/BW8A3452.jpg",
  "/images/BW8A3694.jpg",
  "/images/BW8A3887.jpg",
];

export function InstagramShowcase() {
  return (
    <section className="section-pad-sm bg-luxury-cream">
      <div className="container-luxury">
        <div className="text-center mb-10">
          <p className="eyebrow mb-3">Follow the Studio</p>
          <h2 className="font-cormorant text-display-md text-luxury-black font-light">
            @elegante_studio
          </h2>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {IMAGES.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="group relative aspect-square overflow-hidden cursor-pointer"
            >
              <Image src={src} alt={`Studio work ${i + 1}`} fill className="object-cover transition-transform duration-700 group-hover:scale-[1.1]" />
              <div className="absolute inset-0 bg-luxury-black/0 group-hover:bg-luxury-black/40 transition-all duration-400 flex items-center justify-center">
                <span className="text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">+</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
