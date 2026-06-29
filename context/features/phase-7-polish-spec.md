# RicardoOS — Phase 7 Spec: Polish (Motion, A11y, Performance, QA)

## Overview

This is phase 7 of 7 — the final pass that turns a working build into something that feels premium and ships fast. No new features: this phase is motion consistency, accessibility, performance, responsive QA, and final SEO. The bar is "every pixel has intention" and "incredibly fast."

## Requirements for phase 7

- **Motion pass**: unify Framer Motion variants across windows, dock, cards, and page transitions. Remove any animation that exists "just because." Everything intentional and smooth
- **Reduced motion**: full audit of `prefers-reduced-motion` — disable ambient loops (bubbles, rays, breathing), keep essential state-change feedback instant
- **Accessibility**:
  - full keyboard operability: launching apps, all window controls, and links
  - visible focus rings everywhere
  - Radix/shadcn primitives for menus, popovers, dialogs (focus trap + ARIA)
  - `Escape` closes the focused window or open menu
  - proper roles/labels on windows; accessible names on all icon/emoji tiles
  - AA contrast for text over glass, verified in **both** day and night themes
- **Performance**:
  - lazy-load app components (`next/dynamic`)
  - cap simultaneous `backdrop-filter` layers; cap particle/bubble counts
  - pause ambient loops when the tab is hidden
  - prefer transform/opacity for motion; avoid layout thrash on drag/resize
  - `next/image` for images, subset fonts via `next/font`
  - target Lighthouse Performance ≥ 95 on desktop
- **Responsive QA**: verify desktop and ≤720px breakpoints — windows, dock scroll, icon reflow, drag/resize on touch
- **Cross-browser**: verify `backdrop-filter` (with `-webkit-` prefix) and glass rendering in Safari/Chrome/Firefox
- **Final SEO**: confirm sitemap, robots, and per-page metadata are complete

## Out of scope

- New features — this is the closing polish phase

## References

- @context/project-overview.md
- @context/ricardo-os.html
- @context/features/phase-6-easter-eggs-spec.md
