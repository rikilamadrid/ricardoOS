// Generates all brand icons from the single source-of-truth art:
//   design-assets/ricardoOSicons/icon.png  (glossy Frutiger-Aero bubble-R, white bg)
// Run with: node scripts/generate-pwa-icons.mjs
//
// The source art is a rounded tile on an OPAQUE WHITE square. Left as-is, the
// white corners nullify the rounded shape in the browser tab. A fixed-radius
// rounded-rect mask can't match the art's real corner exactly, so it leaves a
// ring of white slivers. Instead we flood-fill the exterior white background
// (starting from the four corners) to transparent — this follows the tile's
// actual edge precisely, and the tile's interior white gloss is safe because it
// isn't connected to the border. We derive every output from that clean "tile".
//
// Outputs:
// - src/app/icon.png            → favicon source Next serves as <link rel="icon">
// - src/app/apple-icon.png      → 180×180 apple-touch-icon (corners → aqua)
// - src/app/favicon.ico         → multi-size legacy favicon (16/32/48), transparent corners
// - public/icon-192.png / 512   → PWA home-screen tiles (purpose: "any"), transparent corners
// - public/icon-maskable-512.png→ full-bleed brand-bg variant (purpose: "maskable")
import sharp from "sharp";
import pngToIco from "png-to-ico";
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const AQUA = "#1784DB"; // matches the tile's deepest blue
const SOURCE = "design-assets/ricardoOSicons/icon.png"; // original art (opaque white bg)
const WHITE = 238; // channel threshold for "background white"

// The clean tile: source with its exterior white background flood-filled to
// transparent. Iterative 4-neighbour flood fill seeded from the four corners.
const { data, info } = await sharp(await readFile(join(root, SOURCE)))
  .resize(512, 512)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width: W, height: H, channels: C } = info;
const isWhite = (i) => data[i] > WHITE && data[i + 1] > WHITE && data[i + 2] > WHITE;
const visited = new Uint8Array(W * H);
const stack = [[0, 0], [W - 1, 0], [0, H - 1], [W - 1, H - 1]];
while (stack.length) {
  const [x, y] = stack.pop();
  if (x < 0 || y < 0 || x >= W || y >= H) continue;
  const p = y * W + x;
  if (visited[p]) continue;
  const i = p * C;
  if (!isWhite(i)) continue;
  visited[p] = 1;
  data[i + 3] = 0; // make transparent
  stack.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
}

const tile = await sharp(data, { raw: { width: W, height: H, channels: C } })
  .png()
  .toBuffer();

// Rounded-corner "any" icons (transparent corners so the tab shows a rounded tile).
await sharp(tile).resize(192, 192).png().toFile(join(root, "public/icon-192.png"));
await sharp(tile).resize(512, 512).png().toFile(join(root, "public/icon-512.png"));

// Apple touch icon — iOS squares transparency to black, so fill corners with aqua.
await sharp(tile)
  .resize(180, 180)
  .flatten({ background: AQUA })
  .png()
  .toFile(join(root, "src/app/apple-icon.png"));

// Maskable — full-bleed brand background; the "R" sits in the central safe zone.
await sharp(tile)
  .resize(512, 512)
  .flatten({ background: AQUA })
  .png()
  .toFile(join(root, "public/icon-maskable-512.png"));

// Legacy favicon.ico (16/32/48) with transparent rounded corners.
const icoSizes = await Promise.all(
  [16, 32, 48].map((s) => sharp(tile).resize(s, s).png().toBuffer()),
);
await writeFile(join(root, "src/app/favicon.ico"), await pngToIco(icoSizes));

// Overwrite the favicon source itself with the cleaned tile (transparent corners).
await sharp(tile).png().toFile(join(root, "src/app/icon.png"));

console.log(
  "✓ Wrote icon.png (cleaned), icon-192/512, icon-maskable-512, apple-icon.png, favicon.ico",
);
