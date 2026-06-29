# RicardoOS — Phase 3 Spec: Window Manager & Dock

## Overview

This is phase 3 of 7 — the heart of the OS illusion. It adds the window manager (open, focus, drag, resize, minimize, maximize, close) and the functioning dock + desktop icons. Apps render **placeholder content** for now; real content arrives in phase 4. Match the prototype's chrome and interactions exactly.

## Requirements for phase 3

- **Window store** (Zustand) in `src/lib/window-store.ts`: `windows` map, `zTop`, and actions `openApp`, `closeApp`, `focus`, `minimize`, `toggleMax`, `setRect`
- **Window component** with authentic aqua-gel chrome: glossy title bar (top-half highlight), jellybean traffic lights (close / minimize / maximize), glass body slot
- **Drag** by the title bar using Pointer Events (works for mouse and touch)
- **Resize** from a bottom-right grip using Pointer Events; min 280×200, capped to the viewport — **must work on mobile too** (no `!important` size locks)
- **Focus**: any pointer-down on a window raises its z-index
- **Single instance**: opening an already-open app focuses it (and un-minimizes if needed)
- **Animations** (Framer Motion): open (scale + fade up), close (scale down + fade), minimize (shrink toward dock), maximize toggle
- **WindowManager** renders all open windows from the store
- **Dock**: launches apps, shows running-dot indicators, bounces the icon on launch, applies a subtle **single-icon hover lift (NO neighbor magnification)**, and **scrolls horizontally whenever it overflows at any screen width**
- **DesktopIcons**: a curated subset of apps; click/double-click opens the app
- **Mobile behavior**: windows open near-fullscreen (~96vw, top ≈46px) set in JS, still draggable/resizable; dock scrolls; desktop icons reflow to a wrapping row

## Out of scope (handled later)

- Real content in About/Projects/Experience/Contact → phase 4
- Dedicated project/writing pages → phase 5
- Special/easter-egg apps → phase 6

## References

- @context/project-overview.md
- @context/ricardo-os.html
- @src/lib/window-store.ts
- @src/components/os/Window.tsx
- @src/components/os/Dock.tsx
- @context/features/phase-2-living-desktop-spec.md
- @context/features/phase-4-content-apps-spec.md
