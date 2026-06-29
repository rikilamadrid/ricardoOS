# Current Feature

Phase 1 — Project Setup & OS Shell. Scaffold the project and build the **static desktop shell** for RicardoOS (a Frutiger Aero–style personal OS). Display only — no animation, window logic, or real content yet.

## Status

Completed

## Goals

- Initialize Next.js (App Router, latest stable) with TypeScript in strict mode
- Set up Tailwind CSS v4 + `globals.css`
- Initialize shadcn/ui and install base components: `button`, `dialog`, `dropdown-menu`, `popover`, `tooltip`, `sonner`
- Load fonts via `next/font`: Hanken Grotesk (UI) and Quicksand (OS branding)
- Create `src/styles/tokens.css` with design tokens (sky, aqua, ink, glass, radius, shadow) wired into the Tailwind theme
- Root `layout.tsx`: apply fonts, set theme class on `<html>` (default = day / light)
- `/` route renders a `Desktop` shell component
- **Wallpaper** (static): sky gradient + soft sun glow + glossy green hill — no bubbles, rays, or animation
- **MenuBar** (glass, display only): OS logo, static nav (About / Projects / Playground), status glyphs (☀ 📶 🔋), static time text
- **Dock** (glass, centered, rounded) with static glossy app tiles — no launch behavior
- **DesktopIcons**: static placeholder column of 2–3 glossy tiles — display only
- **Window** placeholder: one static glass window with traffic lights + title bar + `<h2>Main</h2>` body — not draggable
- Define night/dark theme tokens (visual only; toggle ships in phase 2)
- Basic responsive sanity: shell must not break on mobile widths

## Notes

- Spec: @context/features/phase-1-os-shell-spec.md
- Out of scope (later phases): animation/boot/theme switching (phase 2), window manager + dock launching (phase 3), real content/apps (phase 4)
- Localized mock data already exists under `src/data` (EN/ES/FR) — wire it in during phase 4, not now.

## History

<!-- Keep This updated. Earliest to latest -->

- **2026-06-28** — Initial Next.js + Tailwind CSS v4 setup. Scaffolded from Create Next App, removed default boilerplate (SVGs, AGENTS.md), added project context docs. Committed (`chore: initial nextjs and tailwind set up`) and pushed to remote `rikilamadrid/devstash`.
- **2026-06-29** — Stripped remaining boilerplate (bare "Ricardo OS" h1, trimmed `globals.css`) and added typed EN/ES/FR mock data under `src/data` (profile, skills, experience, education, about, projects, playground, music, terminal, OS shell) from the 2026 resumes and desktop mockups. Committed and pushed to `rikilamadrid/ricardoOS`.
- **2026-06-29** — Started Phase 1 (Project Setup & OS Shell). Moved current feature to **in Progress**.
- **2026-06-29** — Implemented Phase 1 on branch `feature/phase-1-os-shell`: shadcn/ui init (button, dialog, dropdown-menu, popover, tooltip, sonner), Hanken Grotesk + Quicksand fonts, `src/styles/tokens.css` Aero tokens + `.dark` night overrides, Aero surface classes in `globals.css`, and the static shell (Wallpaper, MenuBar, DesktopIcons, Dock, placeholder Window) composed in `Desktop` at `/`. Dock/icons are data-driven from the app registry with a per-app `tile` palette. `npm run build` and `npm run lint` pass. Merged via PR #1, branch deleted. **Completed.**
