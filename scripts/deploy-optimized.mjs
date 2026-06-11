/**
 * Replaces originals with optimised WebP versions.
 * Keeps originals as .jpg.bak so you can revert.
 * Run: node scripts/deploy-optimized.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname  = path.dirname(fileURLToPath(import.meta.url));
const IMG_DIR    = path.join(__dirname, "../public/images");
const OPT_DIR    = path.join(__dirname, "../public/images/optimized");

// Delete confirmed duplicate
const dup = path.join(IMG_DIR, "BW8A3609 (1).jpg");
if (fs.existsSync(dup)) { fs.unlinkSync(dup); console.log("✓ Deleted duplicate BW8A3609 (1).jpg"); }

// Replace each original with its optimised WebP
const files = fs.readdirSync(OPT_DIR).filter(f => f.endsWith(".webp"));
let replaced = 0;

for (const webpFile of files) {
  const baseName    = path.parse(webpFile).name;
  const srcWebp     = path.join(OPT_DIR, webpFile);
  const destWebp    = path.join(IMG_DIR,  webpFile);
  const origJpg     = path.join(IMG_DIR, `${baseName}.jpg`);
  const origJpeg    = path.join(IMG_DIR, `${baseName}.jpeg`);

  // Copy optimised WebP to images/
  fs.copyFileSync(srcWebp, destWebp);
  replaced++;

  // Optionally: backup + remove original JPG to save disk
  if (fs.existsSync(origJpg))  fs.unlinkSync(origJpg);
  if (fs.existsSync(origJpeg)) fs.unlinkSync(origJpeg);
}

console.log(`✓ Deployed ${replaced} WebP files to /public/images/`);
console.log("✓ Original JPGs removed");
console.log("\nUpdate all image src paths from .jpg → .webp (or keep as-is if using Next.js Image)");
