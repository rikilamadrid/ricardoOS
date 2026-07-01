// Generates the PWA home-screen PNG icons from the brand SVGs.
// Run with: node scripts/generate-pwa-icons.mjs
// - icon-192.png / icon-512.png  → the standard bubble-R tile (purpose: "any")
// - icon-maskable-512.png        → full-bleed variant with safe-zone padding
//                                  (purpose: "maskable") so Android's mask
//                                  doesn't clip the tile.
import sharp from "sharp";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const icon = await readFile(join(root, "src/app/icon.svg"));
const maskable = await readFile(join(root, "scripts/icon-maskable.svg"));

await sharp(icon, { density: 384 })
  .resize(192, 192)
  .png()
  .toFile(join(root, "public/icon-192.png"));

await sharp(icon, { density: 384 })
  .resize(512, 512)
  .png()
  .toFile(join(root, "public/icon-512.png"));

await sharp(maskable, { density: 384 })
  .resize(512, 512)
  .png()
  .toFile(join(root, "public/icon-maskable-512.png"));

console.log("✓ Wrote public/icon-192.png, icon-512.png, icon-maskable-512.png");
