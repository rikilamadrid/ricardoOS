# Current Feature

Phase 3 — Window Manager & Dock. The heart of the OS illusion: open, focus, drag, resize, minimize, maximize, and close windows, plus a functioning dock and desktop icons. Apps render placeholder content for now (real content arrives in phase 4).

Full spec: @context/features/phase-3-window-manager-spec.md

## Status

In Progress

## Goals

- **Window store** (Zustand) in `src/lib/window-store.ts`: `windows` map, `zTop`, actions `openApp`, `closeApp`, `focus`, `minimize`, `toggleMax`, `setRect`
- **Window component** with aqua-gel chrome: glossy title bar, jellybean traffic lights (close/min/max), glass body slot
- **Drag** by the title bar via Pointer Events (mouse + touch)
- **Resize** from a bottom-right grip via Pointer Events; min 280×200, capped to viewport; must work on mobile (no `!important` size locks)
- **Focus**: any pointer-down on a window raises its z-index
- **Single instance**: opening an open app focuses it (un-minimizes if needed)
- **Animations** (Framer Motion): open (scale + fade up), close (scale down + fade), minimize (shrink toward dock), maximize toggle
- **WindowManager** renders all open windows from the store
- **Dock**: launches apps, running-dot indicators, bounce on launch, single-icon hover lift (NO neighbor magnification), scrolls horizontally on overflow at any width
- **DesktopIcons**: curated subset; click/double-click opens the app
- **Mobile**: windows open near-fullscreen (~96vw, top ≈46px) in JS, still draggable/resizable; dock scrolls; icons reflow to a wrapping row

## Notes

New deps required: **Zustand** (window store) and **Framer Motion** (window animations) — neither is installed yet.

Out of scope (later phases): real app content (phase 4), dedicated project/writing pages (phase 5), easter-egg apps (phase 6).

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
- **2026-06-29** — Implemented Phase 3: installed `zustand` + `motion`. Added `src/lib/window-store.ts` (windows map, `zTop`, `openApp`/`closeApp`/`focus`/`minimize`/`toggleMax`/`setRect`, single-instance, mobile near-fullscreen placement). Rewrote `Window.tsx` with aqua-gel chrome, Pointer-Event drag (title bar) + resize (corner grip, min 280×200, viewport-capped), focus-on-press, and Framer Motion open/close/minimize/maximize transitions. New `WindowManager.tsx` (AnimatePresence) + `WindowContent.tsx` (phase-4 placeholder bodies). `Dock` now launches apps with running-dot indicators, bounce-on-launch, single-icon hover lift, and overflow scroll; `DesktopIcons` and menu-bar nav open apps. CSS for dock dots/bounce + resize grip added to `globals.css`. `npm run lint` and `npm run build` pass. **In Progress** (pending manual QA).
