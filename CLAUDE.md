# Ricardo OS

Portfolio website that boots like a tiny operating system (Frutiger Aero, glassy,
draggable windows). Live at <https://ricardolamadrid.com>.

## Orientation (read this first)

- **Deep context** lives in `context/` — read on demand, not every task:
  - @context/project-overview.md — vision, design system, app list, window manager
  - @context/coding-standards.md — TS/React/Next conventions (see caveats below)
  - @context/ai-interaction.md — the per-feature workflow (document → branch → build → ask before commit)
  - @context/current-feature.md — **what's active/next** (kept lean); append the phase summary to `context/history.md` when a feature lands
  - `context/history.md` — completed-work log + live deployment/hosting facts
- **Per-feature specs:** `context/features/phase-*-spec.md`.
- **Visual source of truth:** `context/ricardo-os.html` (single-file prototype).

## Actual architecture (supersedes stale bits in the context docs)

- **Stack:** Next.js 16 (App Router) · React 19 · TypeScript strict · Tailwind
  **v4** · Zustand · `motion` (Framer Motion) · Radix/shadcn · MDX for writing.
- **Ships as a static export** (`output: "export"` in `next.config.ts`), deployed
  to Hostinger via GitHub Actions on push to `main`. No server, **no database.**
  - ⚠️ `coding-standards.md`'s Prisma / Server Actions / API-route section does
    **not** apply here — there is no backend. Treat that section as generic
    boilerplate, not this project.
  - ⚠️ Static export gotcha: any metadata route (`sitemap.ts`, `robots.ts`,
    `manifest.ts`, `opengraph-image.tsx`) needs `export const dynamic = "force-static"`.
- **Content lives in `src/data/*`, not `src/content/apps.ts`** (the overview doc's
  paths are aspirational). Import from the `@/data` barrel; every user-facing
  string is `Localized<T>` = `{ en; es; fr }`, resolved with `t(value, locale)`.
  - App/dock/desktop/menu registry: `src/data/os.ts` (invariant: `onDesktop` ⇒ not `inDock`).
  - `src/content/` holds only the MDX blog posts + `wallpapers.ts`.
- **OS shell:** `src/components/os/*`. **One app = one component** in
  `src/components/apps/*`, routed by `kind` in `WindowContent.tsx`, lazy-loaded
  via `next/dynamic`.
- **State (Zustand):** `src/lib/window-store.ts` (windows/z-order/focus/theme/zen),
  `src/lib/desktop-icons-store.ts` (persisted icon positions). Theme + locale are
  React context providers in `src/components/os/*-store.tsx`.
- **Tailwind v4 = CSS config only.** Never create `tailwind.config.*`. Design
  tokens are CSS vars in `src/styles/tokens.css`; global styles in
  `src/app/globals.css`.

## Conventions

- Data-driven: sections come from `src/data/*` — never hardcode lists in components.
- Tokens, not magic numbers (colors/radii/shadows/blur live in `tokens.css`).
- `'use client'` only when needed; keep the OS illusion intact; honor `prefers-reduced-motion`.
- **Workflow:** branch per feature, document in `current-feature.md`, build must
  pass, **ask before committing** (see ai-interaction.md).
- **Versioning:** SemVer + Keep a Changelog. Log every change under `##
  [Unreleased]` in `CHANGELOG.md`; bump via `npm run version:patch|minor|major`
  on release (fix→patch, feature→minor, breaking/URL change→major). Details in
  ai-interaction.md → Versioning.

## Commands

```bash
npm run dev      # dev server → http://localhost:3001  (note: 3001, not 3000)
npm run build    # production build (must pass before commit)
npm run start    # serve production build
npm run lint     # ESLint

npm run version:patch   # bump PATCH + tag (backward-compatible fix)
npm run version:minor   # bump MINOR + tag (backward-compatible feature)
npm run version:major   # bump MAJOR + tag (breaking change / removed URL)
```
