# Current Feature

**Phase 14 — Draggable / rearrangeable desktop icons (persisted).** Make the
desktop feel like a real OS: icons can be **dragged around** and **stay where you
put them** (persisted), with a "Clean Up" reset. The only Iteration-2 feature with
real interaction logic — 13 landed first so dragging targets the final desktop app
set (About, Projects, Résumé, Contact, Meditations).

Spec: @context/features/phase-14-draggable-desktop-icons-spec.md · Iteration
overview: @context/features/iteration-2-overview.md

## Status

**🟡 In Progress** on `feature/phase-14-draggable-desktop-icons`.

### Plan

- **Store:** new `src/lib/desktop-icons-store.ts` (Zustand + `persist` middleware),
  `positions: Record<appId, {x, y}>`, `setPosition`, `cleanUp` (clears all →
  auto-layout). Persisted to `localStorage` — the justified exception to the
  "no browser storage in v1" rule (the feature *is* "remember where I put things").
- **DesktopIcons:** desktop (>720px, post-mount) renders icons absolutely
  positioned; un-moved icons fall back to a tidy default column; dragged icons use
  their saved `{x, y}`. Pointer-Events drag (mirrors `Window.tsx`): >4px threshold
  distinguishes drag from click, transform-based movement during drag, commit on
  pointerup, subtle snap-to-grid. Bounds clamp icons below the menu bar / above the
  dock / on-screen. A drag swallows the ensuing click; a plain click still
  `openApp`s; keyboard launch + focus rings intact.
- **Mobile:** drag is **enabled at every size** (Ricardo's call — the OS desktop
  doesn't scroll, and `touch-action: none` on icons prevents scroll-fighting).
  Icons render as an absolute left column by default. A one-shot mount flag gates
  reading *saved* positions so SSR (which has none) matches the first client render
  — no hydration mismatch.
- **Reset:** "Clean Up Icons" item in `DesktopContextMenu.tsx` → `cleanUp()` + toast.
- **Motion:** honor `prefers-reduced-motion` (no drop drift; instant commit).

### Acceptance

- Drag any desktop icon → reload → still there.
- Plain click still opens the app (threshold prevents accidental launches).
- Icons can't be dropped under the menu bar / dock or off-screen.
- "Clean Up Icons" restores the default layout.
- Mouse + keyboard launch intact; mobile keeps tidy reflow.
- `npm run build` + `npm run lint` pass.

---

## Iteration 2 — post-launch enhancements

A small enhancement track on top of the live site. Three independent features,
each its own spec + branch. Overview: @context/features/iteration-2-overview.md

| Phase | Feature | Spec | State |
| --- | --- | --- | --- |
| 12 | Home-screen / installable icons (PWA manifest) | `phase-12-home-screen-icons-spec.md` | ✅ **Merged** (`dab63f4`), live |
| 13 | Desktop app set + desktop/dock separation (remove Bin, add Contact; desktop ≠ dock) | `phase-13-desktop-app-layout-spec.md` | ✅ **Merged** (`7c7ab06`), live |
| 14 | Draggable / rearrangeable desktop icons (persisted) | `phase-14-draggable-desktop-icons-spec.md` | ⚪ **Next up** |

---

## Reference — Deployment track (Phases 8–11, 🟢 LIVE)

**🟢 LIVE at <https://ricardolamadrid.com>** — RicardoOS replaced the old site.
Phases 8–10 done; **CI/CD live** (push to `main` → auto-deploy). **Phase 11
(go-live QA + real content) still open** and can be picked up any time.

Strategy doc: @context/features/deployment-overview.md

### Hosting facts

- **Host:** Hostinger Single Web Hosting · **Server IP:** `191.101.79.132` · docroot `public_html`.
- **Registrar:** Porkbun · **Nameservers:** `ns1/ns2.dns-parking.com` (**Hostinger's** — DNS is managed at Hostinger, not Porkbun). No DNS cutover was needed.
- **SSL:** Let's Encrypt, valid, auto-renew. **Redirects:** http→https + www→root, via `deploy/.htaccess`.
- **Redeploy:** push to `main` auto-deploys via CI (FTPS). Manual fallback: `npm run build` → zip `out/` (with `.htaccess`) → hPanel File Manager. See `DEPLOY.md`.

### Phase 11 remaining (go-live QA + maintenance)

- Live **Lighthouse** (desktop, target ≥95) + deferred Phase-7 live QA: ≤720px touch, cross-browser glass.
- **OG/social** card validators on home + a project + a post.
- **Google Search Console**: verify ownership + submit `sitemap.xml`.
- **Real content**: swap seed data in `src/data/*` + `src/content/posts/*` (projects/links, writing, About/Experience/Contact copy, résumé PDFs).
- Optional: lightweight analytics, Porkbun email forwarding.

---

## Previous — Phase 7 (a11y/motion/cross-browser polish, ✅ Merged)

Phase 7 — Polish. Added keyboard `:focus-visible` rings across the OS (none existed), window `role="dialog"` + `aria-label`, reduced-motion-aware window transitions, global Escape-to-close-frontmost-window, and a missing `-webkit-backdrop-filter` prefix. Verified ambient loops already honor reduced-motion + tab visibility; SEO complete; contrast spot-check passes AA. Committed on `feature/phase-7-polish` (`d35b062`); **merged to `main` as part of the phase 7 + 8 + favicon + CI stack** (no standalone PR). Live-browser QA (Lighthouse/mobile/cross-browser) deferred into deployment Phase 11.

## Previous — Phase 6 (Completed, PR #7 + polish PR #8)

Phase 6 — Special & Easter-Egg Apps. Added the reflective **Meditations** zen mode and the easter-egg apps — **Playground**, **Terminal**, **Aero FM**, **Recycle Bin** — all data-driven via the registry and lazy-loaded via `next/dynamic`. Followed by a Winamp-style Aero FM rebuild + UI polish pass (PR #8). See History for details.

## Previous — Phase 5 (Completed, PR #6)

Phase 5 — Content Pages, Writing (MDX), Routing & SEO. Two slices on one branch: **A** — `/projects/[slug]` SSR detail pages + crawlable `/projects` index, ProjectCard expand transition, `?app=<id>` deep links, `sitemap.ts`/`robots.ts`, richer root metadata (`5a232d7`). **B** — MDX pipeline (`gray-matter` + `next-mdx-remote`), `/writing` + `/writing/[slug]`, in-window Writing app via `PostsProvider`, OG images via `next/og` (`3a133b0`). English-canonical detail pages; standalone crawlable index pages with "Open in RicardoOS" CTAs.

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
- **2026-06-29** — Implemented Phase 5 (Content Pages, Writing/MDX, Routing & SEO) on `feature/phase-5-content-pages` in two slices. **Slice A** (`5a232d7`): `/projects/[slug]` SSR detail pages + crawlable `/projects` index (`generateStaticParams`/`generateMetadata`), ProjectCard "expand" with Framer-Motion transition, `?app=<id>` deep links, `sitemap.ts` + `robots.ts`, richer root metadata + `<noscript>`. **Slice B** (`3a133b0`): MDX pipeline (`gray-matter` + `next-mdx-remote` RSC), `src/lib/posts.ts` → typed `PostMeta` from `src/content/posts/*.mdx` (3 seed posts), `/writing` index + `/writing/[slug]` pages, in-window **Writing** app fed by a client `PostsProvider` (no `fs` in client bundle), `blog`→`writing` registry change, OG images via `next/og` (`src/lib/og.tsx`) at root + per project/post, sitemap extended. `npm run build` + `npm run lint` pass. Merged via PR #6, branch deleted. **Completed.**
- **2026-06-29** — Implemented Phase 6 (Special & Easter-Egg Apps) on `feature/phase-6-easter-eggs` (`1762da3`). **Meditations** 🌙 as a desktop-level zen mode (`zenMode` in `window-store`; `ZenOverlay` dims the desktop with a 7s breathing orb + rotating verses from new `meditations.ts`, Escape/button to return, reduced-motion aware). **Playground** 🧪 card grid (toast on click). **Terminal** ⌨️ working parser + scrollback (`help`/`about`/`projects`/`whoami`/`ls`/`theme [day|night]`/`joke`/`sudo`/`clear`/`contact`/`exit`, friendly error on unknown; `terminal.ts` extended). **Aero FM** 🎵 Web Audio synth pad (drifting chord, lowpass, low gain) — click-to-start only, stoppable, animated equalizer, never autoplay. **Recycle Bin** 🗑️ old-portfolio relics from new `trash.ts` (empty-bin toast). Registry gained `meditations` + `trash` kinds/entries; the four windowed apps lazy-load via `next/dynamic` in `WindowContent`; new CSS for all surfaces (equalizer respects reduced motion). `npm run build` (23 routes) + `npm run lint` pass. Merged via PR #7, branch deleted. **Completed.**
- **2026-06-29** — Post-phase-6 polish on `feature/winamp-music-polish` (`65e6300`). Rebuilt **Aero FM** 🎵 as a Frutiger Aero / Winamp-style player streaming real MP3s from `public/audio/` (5 vaporwave tracks): glossy LCD readout, **live `AnalyserNode` equalizer** (bars react to the audio; reduced-motion static fallback), seek, volume, prev/next/stop, and auto-advance (`music.ts` → real `src` files; `MusicApp` rewritten around an `<audio>` element). **Center-aligned window titles** (traffic lights stay top-left, title centered via a `pointer-events-none` overlay). **Dock click-to-minimize toggle** (`toggleApp` in `window-store`: open/restore/raise, or minimize when frontmost; no bounce on minimize). Fixed **Playground toast** legibility (sonner injects unlayered styles → moved the override out of `@layer` with `!important`). **Recycle Bin** JavaScript relic → jQuery. Fixed the player volume slider overflowing on resize (wrap + shrinkable inputs). `npm run lint` + `npm run build` pass. Merged via PR #8, branch deleted. **Completed.**
- **2026-06-29** — Started Phase 7 (Polish — Motion, A11y, Performance, QA) on branch `feature/phase-7-polish`. Final phase; no new features. Updated `current-feature.md` with the phase-7 scope/plan. **In Progress.**
- **2026-06-29** — Phase 7 a11y + motion first pass. **Audit** surfaced: no `:focus-visible` rings anywhere (several elements set `outline: none`), windows lacked `role`/`aria-label`, Escape didn't close the focused window, and `Window.tsx` ran its open/close/minimize spring regardless of `prefers-reduced-motion`. **Fixes**: (1) unlayered keyboard focus-ring block in `globals.css` (aqua-deep `:focus-visible` ring, beats Tailwind's layered `outline-none`; tight overrides for `.os-light` orbs, dock apps, menu items, terminal input, menubar controls); (2) `Window` gained `role="dialog"` + `aria-label`, and `useReducedMotion` collapses its transitions to a quick fade (no scale/translate) when reduced motion is set; (3) global Escape handler in `WindowManager` closes the frontmost non-minimized window, deferring to zen mode + open Radix poppers. `npm run lint` + `npm run build` pass. Ambient loops (bubbles/rays/boot/eq/zen orb) confirmed already reduced-motion + tab-visibility aware.
- **2026-06-29** — Phase 7 cross-browser + SEO + contrast pass. **Cross-browser**: found one `backdrop-filter` (`.os-zen`) missing its `-webkit-` prefix → added it; all glass surfaces now carry the Safari prefix. **SEO** verified complete: `sitemap.ts`, `robots.ts`, root `metadata` (metadataBase + OG + Twitter), and per-page `generateMetadata` on projects/writing index + `[slug]`. **Contrast** spot-check — main ink tokens pass AA over their surfaces in both themes (day `--ink-soft` #41607e ≈ 6.5:1 on the opaque window surface; night #a9c4e6 ≈ 7:1 on dark glass). `npm run lint` + `npm run build` pass. Committed (`d35b062`) + pushed on `feature/phase-7-polish`; PR not yet opened. Remaining: Lighthouse run (≥95), live ≤720px touch QA, and visual cross-browser check — all require a running browser (folded into deployment Phase 11).
- **2026-06-30** — Authored the **deployment track**: `deployment-overview.md` (Porkbun vs Hostinger roles, why static export, redeploy workflow) + four phase specs (8 static export, 9 Hostinger upload, 10 Porkbun DNS/SSL, 11 go-live QA). Decision: **static export to Hostinger Single**, DNS kept at **Porkbun**, no Vercel — the whole app is SSG so no server is needed.
- **2026-06-30** — Implemented **Phase 8 (Static Export Readiness)** on `feature/phase-8-static-export` (stacked on phase-7-polish). Set `output: "export"` + `trailingSlash` + `images.unoptimized` in `next.config.ts`. Next 16 export rejected the metadata routes until `export const dynamic = "force-static"` was added to all three `opengraph-image.tsx` + `robots.ts` + `sitemap.ts`. `npm run build` emits a clean `out/` (23 routes); served it locally and confirmed every route, `sitemap.xml`, `robots.txt`, the 404, and the OG PNGs return 200. Caught that OG images export **extensionless** (served as `application/octet-stream`) → added version-controlled `deploy/.htaccess` (`ForceType image/png` + HTTPS/www redirects + caching). Committed + pushed (`13530ae`). **Done.**
- **2026-06-30** — Replaced the default **Vercel-triangle favicon** with an on-brand one: `src/app/icon.svg` (glossy aqua app-tile + glass bubble + specular, echoing the boot orb + wallpaper bubbles); generated multi-size `favicon.ico` + `apple-icon.png` from it via `sharp`; removed unused `vercel/next/file/globe/window.svg`. Build emits all three icon link tags. Committed + pushed; repackaged `ricardo-os-deploy.zip`. **Needs re-upload to go live.**
- **2026-06-30** — **Phases 9 + 10 — DEPLOYED LIVE.** Packaged `ricardo-os-deploy.zip` (`out/` + `.htaccess`); Ricardo uploaded + extracted it into `public_html` via hPanel File Manager (backup taken first). Verified from the CLI against server IP `191.101.79.132` and the live domain: `https://ricardolamadrid.com/` serves the new site, http→https + www→root 301s work, all routes 200, `sitemap.xml`/`robots.txt` correct MIME, OG image serves `image/png` (ForceType works live), 404 works. **Discovery:** nameservers are `ns1/ns2.dns-parking.com` (Hostinger's), so DNS was already at Hostinger and SSL (Let's Encrypt) already valid — no DNS cutover needed; Phase 10 was effectively a no-op. The new RicardoOS has **replaced the old ricardolamadrid.com**. Remaining: Phase 11 (live Lighthouse/mobile/OG QA, Search Console, real content).
- **2026-06-30** — Started **Iteration 2**. Implemented **Phase 12 (Home-Screen / Installable Icons — PWA manifest)** on `feature/phase-12-pwa-manifest`. Generated `public/icon-192.png`, `icon-512.png`, and `icon-maskable-512.png` from the bubble-R `src/app/icon.svg` via a committed `scripts/generate-pwa-icons.mjs` (sharp); the maskable variant (`scripts/icon-maskable.svg`) is a full-bleed brand-gradient background with the tile scaled into the central 80% safe zone so Android's circular mask never clips it. Added `src/app/manifest.ts` (`MetadataRoute.Manifest`, `export const dynamic = "force-static"` for the static export — same phase-8 gotcha) with name/short_name "RicardoOS", standalone display, `background_color #bfe3ff` + `theme_color #1e6fd9` from the Aero tokens, and the three icons (192/512 `any` + maskable 512). Added `appleWebApp` (capable, title, `black-translucent` status bar) to root `metadata`; Next still emits the `apple-touch-icon` from `apple-icon.png`. Added an `AddType application/manifest+json .webmanifest` rule to `deploy/.htaccess`. Hit (and fixed) a corrupted `node_modules` — a missing `next/dist/shared/lib/head.js` failed the build until `npm ci`. `npm run build` emits `out/manifest.webmanifest` + the three PNGs; `npm run lint` clean. **Awaiting commit.** (iOS/Android real-device Add-to-Home-Screen check is the one remaining manual QA.)
- **2026-06-30** — **CI/CD set up & working.** Added `.github/workflows/deploy.yml` (push to `main` → `npm ci` + `npm run build` + FTPS upload to Hostinger via `SamKirkland/FTP-Deploy-Action`). Merged the whole stack (phase 7 + 8 + favicon + CI) to `main`. Debug saga, all fixed: (1) `npm ci` E401 — the global `~/.npmrc` pointed at a private Azure feed and the lockfile was pinned there; fixed with a project `.npmrc` (public registry) + regenerated `package-lock.json`. (2) one transient `ETIMEDOUT` on FTP (single bad runner IP; retry connected). (3) `530 Login incorrect` — wrong FTP password secret; corrected. (4) `server-dir` was `public_html/` but the FTP account is **jailed to the web root**, so fixed to `./`. (5) **Self-inflicted outage:** recursively deleting the `public_html` entry (a self-referential symlink to the web root) wiped the live site → **restored immediately** by re-running the deploy. Added `paths-ignore` (docs don't trigger deploys) + documented the symlink landmine in `DEPLOY.md`. Net: every push to `main` now auto-publishes; site verified healthy with new favicon + old boilerplate gone.
- **2026-06-30** — Merged `feature/desktop-icon-and-favicon` (`cf582a9`, commit `8dd2e52`): swapped the **Playground** desktop icon for the **Résumé** desktop icon (Résumé now surfaced on the desktop) and finalized the **bubble-R favicon**. Auto-deployed live via CI. **Completed.**
- **2026-06-30** — Merged **Phase 12 (PWA manifest / installable home-screen icons)** via `feature/phase-12-pwa-manifest` (merge `dab63f4`, commit `978ba4d`) — the "Awaiting commit" work from the prior entry is now committed, merged to `main`, and auto-deployed live. **Completed.** (iOS/Android real-device Add-to-Home-Screen check remains the one manual QA.)
- **2026-06-30** — CI stabilization: rotated the `FTP-Deploy-Action` sync-state marker twice (`9afe501` v?→v2, `436a3f4` v2→v3) to recover from stale-folder `550` errors where the action's cached remote state pointed at folders that no longer existed on the host. Deploys green again.
- **2026-06-30** — Implemented **Phase 13 (Desktop app set + desktop/dock separation)** on `feature/phase-13-desktop-app-layout`. Pure data change in `src/data/os.ts`: flipped `onDesktop`/`inDock` booleans to make the two surfaces **disjoint** and documented the invariant (`onDesktop` ⇒ not `inDock`) in a comment above the `apps` array. **Desktop:** About, Projects, Résumé, Contact, Meditations. **Dock:** Playground, Writing, Experience, Aero FM, Terminal, Recycle Bin (removed Bin from the desktop, added Contact). Playground is now dock-only but still launches via menu-bar nav (`openApp`). Also cleaned up `current-feature.md` (headlined Phase 13, dropped the finished deployment track to a reference section, removed stale Phase-7 Goals/Notes). `npm run build` + `npm run lint` pass. Merged to `main` (merge `7c7ab06`, commit `10795c1`), branch deleted, auto-deployed live. **Completed.**
