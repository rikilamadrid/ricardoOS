# RicardoOS — Phase 1 Spec: Project Setup & OS Shell

## Overview

This is phase 1 of 7 for RicardoOS — a personal site that behaves like a Frutiger Aero operating system. Phase 1 scaffolds the project and builds the **static desktop shell**. Everything here is **display only** — no animation, no window logic, no real content. Use the reference prototype and project overview for how it should look.

## Requirements for phase 1

- Initialize Next.js (App Router, latest stable) with TypeScript in strict mode
- Set up Tailwind CSS v4 + `globals.css`
- Initialize shadcn/ui and install base components: `button`, `dialog`, `dropdown-menu`, `popover`, `tooltip`, `sonner`
- Load fonts via `next/font`: Hanken Grotesk (UI workhorse) and Quicksand (OS branding)
- Create `src/styles/tokens.css` with the design tokens from the overview (sky, aqua, ink, glass, radius, shadow) and wire them into the Tailwind theme
- Root `layout.tsx`: apply fonts, set the theme class on `<html>` (default = day / light)
- `/` route renders a `Desktop` shell component
- **Wallpaper** (static): sky gradient + soft sun glow + glossy green hill. No bubbles, rays, or animation yet
- **MenuBar** (glass, display only): OS logo, static nav items (About / Projects / Playground), status glyphs (☀ 📶 🔋), static time text
- **Dock** container (glass, centered, rounded) with static glossy app tiles — display only, no launch behavior
- **DesktopIcons**: a static placeholder column of 2–3 glossy tiles — display only
- **Window** placeholder: one static glass window with traffic lights + title bar + an `<h2>Main</h2>` body, to validate the chrome styling. Not draggable
- Define night/dark theme tokens (visual only; the toggle ships in phase 2)
- Basic responsive sanity: the shell must not break on mobile widths

## Out of scope (handled later)

- Animation, boot screen, theme/wallpaper switching → phase 2
- Window manager (open/drag/resize/focus) and dock launching → phase 3
- Real content and apps → phase 4

## References

- @context/project-overview.md
- @context/ricardo-os.html, @context/screenshots (reference prototype — visual & interaction inspiration)
- @src/styles/tokens.css
- @context/features/phase-2-living-desktop-spec.md
- @context/features/phase-3-window-manager-spec.md
