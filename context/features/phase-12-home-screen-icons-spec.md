# RicardoOS — Phase 12 Spec: Home-Screen / Installable Icons (PWA Manifest)

## Overview

When a visitor chooses **"Add to Home Screen"** on iOS or Android, the saved icon
should be the on-brand bubble-R tile with a proper app name and a clean standalone
launch — not a generic glyph or a screenshot of the page.

Today the site has a favicon (`src/app/favicon.ico`), an `src/app/icon.svg`, and an
`src/app/apple-icon.png` (180×180), but **no web app manifest**. iOS already uses
`apple-icon.png` as the touch icon, but Android/Chrome needs a manifest with
properly sized PNG icons, and neither platform gets a custom name/theme yet.

## Goal

- **Android/Chrome:** "Add to Home Screen" uses a 192px + 512px icon and the
  "RicardoOS" name, launching in standalone mode.
- **iOS Safari:** "Add to Home Screen" keeps using the bubble-R touch icon, with a
  proper title and a polished standalone status bar.
- The bubble-R look stays consistent everywhere (browser tab, home screen, splash).

## Requirements

- **Generate PNG icon assets** from `src/app/icon.svg` (reuse the `sharp` approach
  already used for `favicon.ico` / `apple-icon.png`):
  - `icon-192.png` (192×192)
  - `icon-512.png` (512×512)
  - `icon-maskable-512.png` (512×512) — the bubble-R **with safe-zone padding** so
    Android's circular/rounded mask doesn't clip it (`purpose: "maskable"`).
  - Keep these in `public/` (referenced by absolute path from the manifest).
- **Add a web app manifest** via App Router metadata: `src/app/manifest.ts`
  exporting a `MetadataRoute.Manifest` with:
  - `name: "RicardoOS"`, `short_name: "RicardoOS"`
  - `description` (reuse the site description)
  - `start_url: "/"`, `display: "standalone"`
  - `background_color` + `theme_color` from the Aero tokens (e.g. sky blue
    `#1E6FD9` / a light glass background) — verify against `styles/tokens.css`.
  - `icons`: the 192, 512 (`purpose: "any"`), and maskable 512 entries.
- **iOS niceties** in the root `metadata` (`src/app/layout.tsx`):
  - `appleWebApp: { capable: true, title: "RicardoOS", statusBarStyle: "black-translucent" }`.
  - Confirm Next still emits the `apple-touch-icon` link from `apple-icon.png`.
- **Static-export compatibility (critical):** the site builds with
  `output: "export"`. The metadata `manifest` route may need
  `export const dynamic = "force-static"` (same gotcha that hit the OG images,
  `robots.ts`, `sitemap.ts` in phase 8). Verify `npm run build` emits
  `out/manifest.webmanifest` and the PNG icons.
- **MIME on Hostinger:** confirm `manifest.webmanifest` serves as
  `application/manifest+json` (or at least `application/json`) and the PNGs as
  `image/png`. If not, add a rule to `deploy/.htaccess` (same pattern as the
  OG-image `ForceType`).

## Acceptance

- `out/manifest.webmanifest` + all icon PNGs present after `npm run build`.
- Chrome DevTools → Application → Manifest shows the icons + name with no errors;
  "Installable" with no maskable warning.
- On a real iPhone and Android device: Add to Home Screen shows the bubble-R and
  "RicardoOS"; launching opens standalone.
- `npm run build` + `npm run lint` pass.

## Out of scope

- Full offline PWA / service worker / caching. This is **installable-icon only**,
  not an offline app. (Could be a later phase.)
- Splash-screen image sets per iOS device.

## References

- @context/features/iteration-2-overview.md
- @context/features/phase-8-static-export-spec.md  (force-static + .htaccess MIME gotchas)
- `src/app/icon.svg`, `src/app/apple-icon.png`, `deploy/.htaccess`
