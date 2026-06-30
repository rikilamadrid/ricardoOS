# Current Feature

Phase 5 — Content Pages, Writing (MDX), Routing & SEO. Adds real, shareable, SEO-friendly pages alongside the desktop: dedicated project detail pages, the Writing app backed by MDX, query-param + path deep links into apps, and smooth transitions between the desktop and detail pages. The desktop at `/` stays the home base.

Full spec: @context/features/phase-5-content-pages-spec.md

## Status

**In Progress** — branch `feature/phase-5-content-pages`.

Building in two coherent slices on one branch:

- **Slice A — Project pages, deep links & SEO (no new deps):** extend the localized `Project` model (slug = id, `year`, `tagline`, long `writeup`, optional `cover`); add `/projects/[slug]` SSR detail pages (`generateStaticParams` + `generateMetadata`) and a crawlable `/projects` index; ProjectCard gains an "expand" → `/projects/[slug]` with a Framer-Motion page transition; `?app=<id>` deep link auto-opens an app on the desktop; `sitemap.ts` + `robots.ts`; richer root metadata (OG/Twitter, `metadataBase`) + a `<noscript>` summary.
- **Slice B — Writing/MDX + OG (next):** MDX pipeline for `content/posts/*.mdx` with typed `PostMeta` frontmatter; Writing app (replaces the placeholder `blog`→`/notes` link app) listing posts; `/writing` index + `/writing/[slug]` article pages; OG image generation (`@vercel/og`).

**Decisions:** Project/post detail pages render in **English** (canonical) for SEO/crawlability even though desktop content is localized EN/ES/FR. `/projects` (and later `/writing`) are standalone crawlable SSR index pages with an "Open in RicardoOS" CTA → `/?app=projects`, rather than auto-redirecting to the desktop (better serves the explicit SEO requirement). Posts are English-only for v1 (`PostMeta` has no locale).

---

## Previous — Phase 4 (Completed, PR #4)

Phase 4 — Content Models & Core Apps. Replaced the placeholder windows with real, data-driven content for About, Projects, Experience, Contact (+ Résumé). Built on the existing **localized** `@/data` models (EN/ES/FR), keeping the Phase-2 language switcher intact.

## Goals

- **Typed content files** in `src/content/` (interfaces from the project overview): `apps.ts` (registry), `projects.ts`, `experiments.ts`, `experience.ts`, `contact.ts`, `meditations.ts`
- **Data-driven launching**: dock, desktop icons, and window manager all read from `apps.ts`. New app = registry entry + component in `components/apps/`
- **Reusable UI primitives**: aqua-gel `Button`, glossy `Tile`, project `Card` (port styling from the prototype)
- **About app**: short human intro (curiosity, building, learning, games) + CTA → opens Projects. No résumé, no essay
- **Projects app**: responsive grid of product cards from `projects.ts` — gradient thumbnail, status pill (live/building/experiment), tech tags, demo/code buttons, hover lift + shadow bloom
- **Experience app**: rendered as **chapters** (`when`/`title`/`impact`) — no bullets, no timeline, no skill bars
- **Contact app**: elegant link buttons (email → copy + toast; external → new tab). No large form
- **Toasts** for in-app actions (copy email, "demo coming soon", etc.)
- Seed tasteful, clearly-editable placeholder content for Ricardo across all four apps

## Notes

Existing mock data already lives in `src/data/*` (profile, projects, experience, etc.) and the registry in `src/data/os.ts` — reconcile/migrate toward the `src/content/*` models the spec calls for rather than duplicating.

Out of scope (later phases): dedicated `/projects/[slug]` + `/writing/[slug]` pages, MDX, deep links (phase 5); Meditations, Playground, Terminal, Aero FM, Recycle Bin (phase 6).

## History

<!-- Keep This updated. Earliest to latest -->

- **2026-06-28** — Initial Next.js + Tailwind CSS v4 setup. Scaffolded from Create Next App, removed default boilerplate (SVGs, AGENTS.md), added project context docs. Committed (`chore: initial nextjs and tailwind set up`) and pushed to remote `rikilamadrid/devstash`.
- **2026-06-29** — Stripped remaining boilerplate (bare "Ricardo OS" h1, trimmed `globals.css`) and added typed EN/ES/FR mock data under `src/data` (profile, skills, experience, education, about, projects, playground, music, terminal, OS shell) from the 2026 resumes and desktop mockups. Committed and pushed to `rikilamadrid/ricardoOS`.
- **2026-06-29** — Started Phase 1 (Project Setup & OS Shell). Moved current feature to **in Progress**.
- **2026-06-29** — Implemented Phase 1 on branch `feature/phase-1-os-shell`: shadcn/ui init (button, dialog, dropdown-menu, popover, tooltip, sonner), Hanken Grotesk + Quicksand fonts, `src/styles/tokens.css` Aero tokens + `.dark` night overrides, Aero surface classes in `globals.css`, and the static shell (Wallpaper, MenuBar, DesktopIcons, Dock, placeholder Window) composed in `Desktop` at `/`. Dock/icons are data-driven from the app registry with a per-app `tile` palette. `npm run build` and `npm run lint` pass. Merged via PR #1, branch deleted. **Completed.**
- **2026-06-29** — Moved current feature to **Phase 2 (Living Desktop)**: boot sequence, animated wallpaper, live menu bar, day/night + wallpaper theming. Started work — **in Progress**.
- **2026-06-29** — Implemented Phase 2: `src/content/wallpapers.ts` (sky/sunset/aurora/lavender variants), a context-based theme store (`theme-store.tsx`, day/night + active wallpaper, persisted to localStorage, drives `.dark` + `--wp-*` vars), and a `useAmbientMotion` hook (honors `prefers-reduced-motion` + tab visibility). New components: `BootScreen` (breathing orb + progress bar, fade-out), `Bubbles`, `Stars` (night canvas), `Hint`, `DesktopContextMenu` (wallpaper switcher + day/night via Radix ContextMenu). `Wallpaper` rebuilt into crossfading day/night sky layers + rays + stars + bubbles. `MenuBar` now has a live 12-hour clock, ☀/🌙 toggle, Radix logo dropdown, and network/battery popovers with playful copy. Toasts via sonner. CSS for all of the above added to `globals.css`. `npm run lint` and `npm run build` pass.
- **2026-06-29** — Added a working language switcher: `locale-store.tsx` (`LocaleProvider`/`useLocale`, EN→ES→FR cycle, persisted + mirrored to `<html lang>`). Restored the menu-bar language glyph (shows the active flag, cycles on click). `MenuBar`, `Dock`, `DesktopIcons`, and the desktop context menu now resolve labels through the live locale instead of `DEFAULT_LOCALE`. Lint + build pass.
- **2026-06-29** — Merged Phase 2 via PR #2 (`feature/phase-2-living-desktop`), branch deleted. **Completed.**
- **2026-06-29** — Moved current feature to **Phase 3 (Window Manager & Dock)**: window store, draggable/resizable windows, animations, functioning dock + desktop icons. **Not Started.**
- **2026-06-29** — Implemented Phase 3: installed `zustand` + `motion`. Added `src/lib/window-store.ts` (windows map, `zTop`, `openApp`/`closeApp`/`focus`/`minimize`/`toggleMax`/`setRect`, single-instance, mobile near-fullscreen placement). Rewrote `Window.tsx` with aqua-gel chrome, Pointer-Event drag (title bar) + resize (corner grip, min 280×200, viewport-capped), focus-on-press, and Framer Motion open/close/minimize/maximize transitions. New `WindowManager.tsx` (AnimatePresence) + `WindowContent.tsx` (phase-4 placeholder bodies). `Dock` now launches apps with running-dot indicators, bounce-on-launch, single-icon hover lift, and overflow scroll; `DesktopIcons` and menu-bar nav open apps. CSS for dock dots/bounce + resize grip added to `globals.css`. `npm run lint` and `npm run build` pass.
- **2026-06-29** — Merged Phase 3 via PR #3 (`feature/phase-3-window-manager`), branch deleted. **Completed.**
- **2026-06-29** — Moved current feature to **Phase 4 (Content Models & Core Apps)**: typed `src/content/*`, data-driven launching, reusable UI primitives, and real About/Projects/Experience/Contact apps. **Not Started.**
- **2026-06-29** — Implemented Phase 4 on branch `feature/phase-4-content-apps`. Decision: kept the localized `@/data` models (and the EN/ES/FR switcher) rather than migrating to English-only `src/content/*`. New typed content: enriched `projects.ts` (gradient thumbnails + 4-item seed), `chapters.ts` (`ExperienceChapter` — impact chapters), `contact.ts` (intro copy + links sourced from `profile.contact`). Reusable primitives: polymorphic aqua-gel `AquaButton` (renders `<a>` when `href` set) + `ProjectCard`. Real apps in `src/components/apps/`: About (intro + CTA → Projects), Projects (card grid w/ status pills + tags), Experience (chapters), Contact (email copies + toast, links open out); `WindowContent` routes by `kind`. Added supporting CSS (eyebrow, gel, card/grid, pills, tags, chapter rows, contact grid). `npm run lint` + `npm run build` pass.
- **2026-06-29** — Added a dedicated **Résumé 📄** app (split from **Experience 📖**): `ResumeApp` renders a clean, on-brand résumé as native HTML from typed data (profile, experiences w/ ▸/⚡/✓ markers, skills as chips — no skill bars, education, languages as text) + per-language PDF download/open from `public/resume/Ricardo_Lamadrid_Resume_{en,es,fr}.pdf` (no iframe → mobile-friendly). Registry gained an `experience` kind; `os.ts` updated. Fixed three bugs: desktop hint pill overlapped the dock (raised to `bottom: 116px`), stacked windows were see-through (added opaque `.os-window` surface), and mobile window drag/resize worked poorly (`touch-action: none` on the title bar + larger resize grip on small screens). PDFs supplied by Ricardo.
- **2026-06-29** — Merged Phase 4 via PR #4 (`feature/phase-4-content-apps`), branch deleted. **Completed.**
- **2026-06-29** — Small a11y tweak on branch `feature/colorblind-mode`: added a **colorblind-safe** appearance mode as a *separate* toggle (orthogonal to day/night), not a third day/night value. `theme-store` gained `colorblind` (persisted) projected as a `.cb` class on `<html>`. `.cb` nudges the green accent toward Okabe-Ito bluish-green; status pills shift to colorblind-safe hues (bluish-green/blue/orange, text labels already carry meaning); window traffic lights shift hue **and** gain always-on `× − +` shape cues so they don't rely on color alone. Toggle exposed as a 👓 menu-bar glyph + a "Colorblind-safe" item in both the logo menu and the desktop right-click menu, each with a toast. `npm run lint` + `npm run build` pass. Awaiting review/commit.
- **2026-06-29** — Follow-up fixes on the same branch. (1) Colorblind toggle "did nothing" on the bare desktop because the only always-visible green (the wallpaper hill) was a hardcoded `rgba(126,217,87,…)`. Introduced a `--grass-rgb` channel token (overridden in `.cb`) and pointed the hill gradient at it, so toggling now visibly crossfades the hill lime→teal even with no window open (pills/traffic lights still only change inside windows). (2) Mobile menu bar overflowed — right-aligned cluster got pushed off and labels wrapped/stacked. Made the header `flex-nowrap` + `overflow-hidden`, hid the section nav and the network/battery popovers below `sm`, and gave the logo/clock/right-cluster `shrink-0` + `whitespace-nowrap`. Lint + build pass.
- **2026-06-29** — Merged colorblind-safe mode + mobile menu-bar fixes via PR #5 (`feature/colorblind-mode`), branch deleted. **Completed.**
