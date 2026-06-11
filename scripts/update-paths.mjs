/**
 * Updates all image src paths from .jpg/.jpeg → .webp in every source file
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC_DIR   = path.join(__dirname, "../src");

function walk(dir) {
  let files = [];
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) files = files.concat(walk(full));
    else if (/\.(tsx|ts|js|jsx)$/.test(f)) files.push(full);
  }
  return files;
}

let changed = 0;
for (const file of walk(SRC_DIR)) {
  const orig = fs.readFileSync(file, "utf8");
  // Replace /images/xxx.jpg and /images/xxx.jpeg with /images/xxx.webp
  const updated = orig.replace(/(\/images\/[^"'\s]+?)\.(jpg|jpeg)/g, "$1.webp");
  if (updated !== orig) {
    fs.writeFileSync(file, updated, "utf8");
    console.log(`✓ Updated: ${path.relative(process.cwd(), file)}`);
    changed++;
  }
}
console.log(`\n✓ Done — updated ${changed} files`);
