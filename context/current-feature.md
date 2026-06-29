# Current Feature

Phase 2 — Living Desktop (Boot, Wallpaper Motion, Theming). Brings the static phase 1 shell to life: boot sequence, animated Frutiger Aero wallpaper, live menu bar, and day/night + wallpaper switching. Still no window manager or real app content (phases 3–4).

Full spec: @context/features/phase-2-living-desktop-spec.md

## Status

In Progress

## Goals

- **Boot screen**: breathing orb + progress bar, fade out to desktop on first load
- **Animated wallpaper**: drifting bubbles, slow rotating light rays, soft sun glow; star canvas for night
- **Live clock** in the menu bar (updates over time, 12-hour format)
- **Theme store** (Zustand/context) holding `theme: "day" | "night"` and active `wallpaper`
- **Day/night toggle** (☀ / 🌙) in the menu bar — crossfades wallpaper + swaps token values (~1.1s)
- **Night theme**: polished deep-aurora wallpaper + night token set (not "hacker dark")
- **Wallpaper variants** in `content/wallpapers.ts`: `sky`, `sunset`, `aurora`, `lavender`
- **Desktop right-click → ContextMenu**: wallpaper switcher + day/night toggle (shadcn/Radix)
- **Status popovers** (network, battery) + **OS logo menu** as Radix dropdown/popover, playful copy
- **Toast system** (sonner) wired for actions like "Wallpaper changed"
- **Reduced motion**: honor `prefers-reduced-motion`; pause loops when tab is hidden

## Notes

Out of scope (later phases): opening/dragging/resizing windows and dock launching (phase 3), real app content (phase 4).

## History

<!-- Keep This updated. Earliest to latest -->

- **2026-06-28** — Initial Next.js + Tailwind CSS v4 setup. Scaffolded from Create Next App, removed default boilerplate (SVGs, AGENTS.md), added project context docs. Committed (`chore: initial nextjs and tailwind set up`) and pushed to remote `rikilamadrid/devstash`.
- **2026-06-29** — Stripped remaining boilerplate (bare "Ricardo OS" h1, trimmed `globals.css`) and added typed EN/ES/FR mock data under `src/data` (profile, skills, experience, education, about, projects, playground, music, terminal, OS shell) from the 2026 resumes and desktop mockups. Committed and pushed to `rikilamadrid/ricardoOS`.
- **2026-06-29** — Started Phase 1 (Project Setup & OS Shell). Moved current feature to **in Progress**.
- **2026-06-29** — Implemented Phase 1 on branch `feature/phase-1-os-shell`: shadcn/ui init (button, dialog, dropdown-menu, popover, tooltip, sonner), Hanken Grotesk + Quicksand fonts, `src/styles/tokens.css` Aero tokens + `.dark` night overrides, Aero surface classes in `globals.css`, and the static shell (Wallpaper, MenuBar, DesktopIcons, Dock, placeholder Window) composed in `Desktop` at `/`. Dock/icons are data-driven from the app registry with a per-app `tile` palette. `npm run build` and `npm run lint` pass. Merged via PR #1, branch deleted. **Completed.**
- **2026-06-29** — Moved current feature to **Phase 2 (Living Desktop)**: boot sequence, animated wallpaper, live menu bar, day/night + wallpaper theming. Started work — **in Progress**.
- **2026-06-29** — Implemented Phase 2: `src/content/wallpapers.ts` (sky/sunset/aurora/lavender variants), a context-based theme store (`theme-store.tsx`, day/night + active wallpaper, persisted to localStorage, drives `.dark` + `--wp-*` vars), and a `useAmbientMotion` hook (honors `prefers-reduced-motion` + tab visibility). New components: `BootScreen` (breathing orb + progress bar, fade-out), `Bubbles`, `Stars` (night canvas), `Hint`, `DesktopContextMenu` (wallpaper switcher + day/night via Radix ContextMenu). `Wallpaper` rebuilt into crossfading day/night sky layers + rays + stars + bubbles. `MenuBar` now has a live 12-hour clock, ☀/🌙 toggle, Radix logo dropdown, and network/battery popovers with playful copy. Toasts via sonner. CSS for all of the above added to `globals.css`. `npm run lint` and `npm run build` pass.
- **2026-06-29** — Added a working language switcher: `locale-store.tsx` (`LocaleProvider`/`useLocale`, EN→ES→FR cycle, persisted + mirrored to `<html lang>`). Restored the menu-bar language glyph (shows the active flag, cycles on click). `MenuBar`, `Dock`, `DesktopIcons`, and the desktop context menu now resolve labels through the live locale instead of `DEFAULT_LOCALE`. Lint + build pass.
