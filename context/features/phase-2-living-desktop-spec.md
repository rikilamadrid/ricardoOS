# RicardoOS — Phase 2 Spec: Living Desktop (Boot, Wallpaper Motion, Theming)

## Overview

This is phase 2 of 7. It brings the static shell from phase 1 to life: the boot sequence, the animated Frutiger Aero wallpaper, the live menu bar, and day/night + wallpaper switching. Still **no window manager and no real app content** — those come in phases 3–4. Use the reference prototype for the exact feel.

## Requirements for phase 2

- **Boot screen**: breathing orb + progress bar, then fade out to reveal the desktop on first load
- **Animated wallpaper**: drifting translucent bubbles, slow rotating light rays, soft sun glow; a subtle star canvas for night
- **Live clock** in the menu bar (updates over time, 12-hour format)
- **Theme store** (Zustand or context) holding `theme: "day" | "night"` and the active `wallpaper`
- **Day/night toggle** (☀ / 🌙) in the menu bar that crossfades the wallpaper and swaps token values (~1.1s)
- **Night theme**: polished deep-aurora wallpaper + night token set (NOT a "hacker dark" look)
- **Wallpaper variants** defined in `content/wallpapers.ts`: `sky`, `sunset`, `aurora`, `lavender`
- **Desktop right-click → ContextMenu**: wallpaper switcher + day/night toggle (use shadcn/Radix)
- **Status popovers** (network, battery) and the **OS logo menu** as Radix dropdown/popover, with playful copy ("Powered by curiosity — 100%")
- **Toast system** (sonner) wired for actions like "Wallpaper changed"
- **Reduced motion**: honor `prefers-reduced-motion` — disable ambient loops (bubbles, rays); pause loops when the tab is hidden

## Out of scope (handled later)

- Opening/dragging/resizing windows and dock launching → phase 3
- Real content inside apps → phase 4

## References

- @context/project-overview.md
- @context/ricardo-os.html
- @src/styles/tokens.css
- @src/content/wallpapers.ts
- @context/features/phase-1-os-shell-spec.md
- @context/features/phase-3-window-manager-spec.md
