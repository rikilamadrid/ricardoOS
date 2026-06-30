# Phase 8 — Static Export Readiness

> Make the app build to a correct, fully static `out/` folder that any web server can host. **Code + local verification only — no hosting in this phase.**

Context: @context/features/deployment-overview.md

## Goal

`npm run build` produces `./out` containing the entire site as static HTML/CSS/JS — every route, the OG images, a working 404, and clean URLs — verified by serving `out/` locally and clicking through it.

## Requirements

### 1. Enable static export in `next.config.ts`

Add to the config (keep `reactCompiler: true`):

```ts
const nextConfig: NextConfig = {
  reactCompiler: true,
  output: "export",        // emit static ./out
  trailingSlash: true,     // /projects/foo/ → folder + index.html (best for Apache/LiteSpeed)
  images: { unoptimized: true }, // no server-side image optimizer in a static export
};
```

- `trailingSlash: true` makes every route a real folder with `index.html`, which LiteSpeed/Apache serve without rewrite rules. Confirm internal links/canonicals still look right.
- `images.unoptimized` is harmless (the app currently uses no `next/image`) but future-proofs it.

### 2. Resolve build-time blockers for export

`output: "export"` forbids anything that needs a server at request time. Audit and fix:

- **Dynamic routes** (`/projects/[slug]`, `/writing/[slug]`) — must have `generateStaticParams` (already present; confirm they cover every slug).
- **Route handlers / `app/api/*`** — must not exist (confirm none).
- **`dynamic = "force-dynamic"`, `cookies()`, `headers()`, runtime `searchParams` on the server** — must not be used on prerendered pages. The `?app=` deep link is read **client-side** (`DeepLinkOpener`) — verify it doesn't force server dynamics.
- **`sitemap.ts` / `robots.ts`** — these generate static `sitemap.xml` / `robots.txt` under export; confirm they emit at build.

### 3. Open Graph images — the key risk on Next 16

The `opengraph-image.tsx` files use `next/og` `ImageResponse`. Under `output: "export"` they should prerender to static PNGs at build.

- **First:** run the export and check whether `out/` contains the generated OG PNGs and that the build didn't error on them.
- **If it works:** done — confirm the `<meta property="og:image">` URLs in the page source resolve to real files under `out/`.
- **If it fails or warns:** fall back to **prebaked static OG images**:
  - Generate the images once (script using `@vercel/og`/`satori` at build, or export the current designs to PNG) and place them in `/public` (e.g. `/public/og/default.png`, per-project, per-post).
  - Replace the dynamic `opengraph-image.tsx` routes with static `openGraph.images` / `twitter.images` entries in each `generateMetadata` / root `metadata` pointing at those `/public` files.
  - Keep the look identical; this only changes *when* the PNG is produced (build, into a file) vs. *how* (route).

### 4. Confirm production origin

- `src/lib/site.ts` → `SITE_URL` is already `https://ricardolamadrid.com`. Confirm it's used by `metadataBase`, sitemap, robots, and OG URLs so absolute links in the static output are correct.

### 5. 404 page

- Static export emits `out/404.html` from `app/not-found.tsx` (add a small on-brand one if missing). Hostinger serves it via `.htaccess ErrorDocument` (configured in Phase 9). Verify the file exists in `out/`.

## Verification (local, before any upload)

```bash
npm run lint
npm run build           # must succeed and create ./out
npx serve out           # or: python3 -m http.server -d out 8080
```

Then in the browser against the local static server:

- [ ] Desktop boots; dock, windows, drag/resize, theme/wallpaper all work (it's a hydrated SPA over static HTML).
- [ ] Direct-load each route: `/`, `/projects/`, `/projects/<slug>/`, `/writing/`, `/writing/<slug>/` — no 404s, no blank pages.
- [ ] `/sitemap.xml` and `/robots.txt` resolve and list the right URLs.
- [ ] View-source on a project + post page: `og:image` / `twitter:image` point to files that actually exist in `out/`.
- [ ] A bogus URL shows the 404 page.
- [ ] `?app=projects` deep link still auto-opens the app.
- [ ] No console errors that only appear in the static build.

## Out of scope

- Uploading to Hostinger (Phase 9), DNS/SSL (Phase 10), live QA (Phase 11).

## Deliverable

A committed branch (`feature/phase-8-static-export`) where `npm run build` yields a verified, browsable `out/` — the artifact Phase 9 uploads.
