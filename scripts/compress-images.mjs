/**
 * Production Image Compression Script
 * Converts all JPG/PNG → WebP (sections) and AVIF (hero) with sharp
 * Target: Hero < 250KB | Sections < 150KB | Gallery/Detail < 100KB
 *
 * Run: node scripts/compress-images.mjs
 */
import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const INPUT_DIR  = path.join(__dirname, "../public/images");
const OUTPUT_DIR = path.join(__dirname, "../public/images/optimized");

// ─── Category map — controls quality + format ───────────────────────────────
// hero: AVIF for maximum compression, high quality
// section: WebP, good quality
// gallery/detail: WebP, balanced quality
const CATEGORIES = {
  hero: {
    files: ["BW8A3646.jpg", "BW8A3842.jpg", "BW8A3853.jpg", "BW8A3837.jpg", "BW8A3887.jpg"],
    webpQ: 82, avifQ: 65, maxW: 1600,
  },
  section: {
    files: [
      "BW8A3578.jpg","BW8A3395.jpg","BW8A3383.jpg","BW8A3420.jpg","BW8A3437.jpg",
      "BW8A3384.jpg","BW8A3607.jpg","BW8A3820.jpg","BW8A3472.jpg","BW8A3410.jpg",
      "BW8A3694.jpg","BW8A3877.jpg","BW8A3535.jpg","BW8A3507.jpg","BW8A3486.jpg",
      "BW8A3404.jpg","BW8A3656.jpg","BW8A3725.jpg","BW8A3784.jpg","BW8A3836.jpg",
      "BW8A3858.jpg","BW8A3879.jpg","BW8A3881.jpg","BW8A3882.jpg","BW8A3886.jpg",
      "BW8A3899.jpg",
    ],
    webpQ: 78, avifQ: 60, maxW: 1200,
  },
  gallery: {
    files: [
      "BW8A3452.jpg","BW8A3487.jpg","BW8A3494.jpg","BW8A3490.jpg","BW8A3593.jpg",
      "BW8A3604.jpg","BW8A3613.jpg","BW8A3618.jpg","BW8A3623.jpg","BW8A3656.jpg",
      "BW8A3668.jpg","BW8A3717.jpg","BW8A3754.jpg","BW8A3824.jpg",
      "IMG_9329.jpg","IMG_9334.jpg","IMG_9339.jpg","IMG_9346.jpg","IMG_9352.jpg",
      "IMG_9355.jpg","IMG_9362.jpg","IMG_9370.jpg","IMG_9378.jpg","IMG_9380.jpg",
      "IMG_9385.jpg","IMG_9398.jpg",
    ],
    webpQ: 75, avifQ: 55, maxW: 900,
  },
  logo: {
    files: ["Logo1.jpg","Logo2.jpg","C87A9663-479A-41AE-873A-01356378C74D.jpg"],
    webpQ: 90, avifQ: 70, maxW: 400,
  },
};

// ─── Helpers ─────────────────────────────────────────────────────────────────
function fmtKB(bytes) { return `${(bytes / 1024).toFixed(1)} KB`; }
function getCategory(filename) {
  for (const [cat, conf] of Object.entries(CATEGORIES)) {
    if (conf.files.includes(filename)) return [cat, conf];
  }
  // Default: treat as gallery
  return ["gallery", CATEGORIES.gallery];
}

if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const inputFiles = fs.readdirSync(INPUT_DIR)
  .filter(f => /\.(jpe?g|png)$/i.test(f) && !f.includes("(1)") && f !== "Manish Sharma Logo.jpeg");

let totalBefore = 0, totalAfter = 0;
const results = [];

console.log(`\n🔍 Processing ${inputFiles.length} images...\n`);

for (const file of inputFiles) {
  const inputPath = path.join(INPUT_DIR, file);
  const baseName  = path.parse(file).name;
  const [cat, conf] = getCategory(file);
  const statBefore = fs.statSync(inputPath).size;
  totalBefore += statBefore;

  try {
    const img = sharp(inputPath).rotate(); // auto-rotate from EXIF

    // Get original dimensions
    const meta = await img.metadata();
    const needsResize = meta.width > conf.maxW;
    const pipeline = needsResize
      ? img.resize({ width: conf.maxW, withoutEnlargement: true })
      : img;

    // ── WebP output ──────────────────────────────────────────────────
    const webpOut = path.join(OUTPUT_DIR, `${baseName}.webp`);
    await pipeline.clone()
      .webp({ quality: conf.webpQ, effort: 6, smartSubsample: true })
      .toFile(webpOut);
    const webpSize = fs.statSync(webpOut).size;

    // ── AVIF output (hero + section only — encoder is slow) ──────────
    let avifSize = null;
    if (cat === "hero" || cat === "section") {
      const avifOut = path.join(OUTPUT_DIR, `${baseName}.avif`);
      await pipeline.clone()
        .avif({ quality: conf.avifQ, effort: 7, chromaSubsampling: "4:2:0" })
        .toFile(avifOut);
      avifSize = fs.statSync(avifOut).size;
      totalAfter += avifSize; // count best format
    } else {
      totalAfter += webpSize;
    }

    const saving = ((statBefore - (avifSize ?? webpSize)) / statBefore * 100).toFixed(1);
    results.push({
      file, cat,
      before: fmtKB(statBefore),
      webp: fmtKB(webpSize),
      avif: avifSize ? fmtKB(avifSize) : "—",
      saving: `${saving}%`,
      dims: `${meta.width}×${meta.height}${needsResize ? ` → ${conf.maxW}px` : ""}`,
    });

    process.stdout.write(`  ✓ ${file.padEnd(35)} ${fmtKB(statBefore).padStart(10)} → webp ${fmtKB(webpSize)}${avifSize ? ` / avif ${fmtKB(avifSize)}` : ""} (−${saving}%)\n`);
  } catch (err) {
    console.error(`  ✗ ${file}: ${err.message}`);
  }
}

// ─── Summary ─────────────────────────────────────────────────────────────────
const savedMB = ((totalBefore - totalAfter) / 1024 / 1024).toFixed(1);
const pct     = ((totalBefore - totalAfter) / totalBefore * 100).toFixed(1);

console.log(`
════════════════════════════════════════════════
  IMAGE COMPRESSION SUMMARY
════════════════════════════════════════════════
  Original total : ${(totalBefore / 1024 / 1024).toFixed(1)} MB
  Optimized total: ${(totalAfter  / 1024 / 1024).toFixed(1)} MB
  Total saved    : ${savedMB} MB  (${pct}% reduction)
  Output folder  : ${OUTPUT_DIR}
════════════════════════════════════════════════

Next steps:
  1. Review /public/images/optimized/
  2. Copy optimized files over originals (or update image paths)
  3. Use <source type="image/avif"> + <source type="image/webp"> in <picture> tags
     or rely on Next.js Image Optimization (formats: ["avif","webp"] in next.config)
`);
