# RicardoOS — Phase 4 Spec: Content Models & Core Apps

## Overview

This is phase 4 of 7. It replaces placeholder windows with real, data-driven content for the four core apps: About, Projects, Experience, and Contact. All content is strongly typed and lives in `src/content/*` — the app registry becomes the single source of truth for what launches. Use the content models in the project overview.

## Requirements for phase 4

- **Typed content files** in `src/content/` implementing the interfaces from the overview:
  - `apps.ts` — the app registry (`id`, `title`, `icon`, tile colors, `kind`, `inDock`, `onDesktop`, `defaultWidth`)
  - `projects.ts`, `experiments.ts`, `experience.ts`, `contact.ts`, `meditations.ts`
- **Data-driven launching**: the dock, desktop icons, and window manager all read from `apps.ts`. Adding an app = registry entry + a component in `components/apps/`
- **Reusable UI primitives**: aqua-gel `Button`, glossy app `Tile`, project `Card` (port styling from the prototype)
- **About app**: short, human intro (curiosity, building, learning, games) + CTA button → opens Projects. No résumé, no essay
- **Projects app**: responsive grid of product-like cards from `projects.ts` — gradient thumbnail tile, status pill (live / building / experiment), tech tags, and demo/code buttons. Hover lift + shadow bloom
- **Experience app**: rendered as **chapters** (`when` / `title` / `impact`) — no bullet lists, no timeline, no skill bars
- **Contact app**: elegant link buttons (email → copy + toast; external → open in new tab). No large form
- **Toasts** for in-app actions (copy email, "demo coming soon", etc.)
- Seed tasteful, clearly-editable placeholder content for Ricardo across all four apps

## Out of scope (handled later)

- Dedicated `/projects/[slug]` and `/writing/[slug]` pages, MDX, deep links → phase 5
- Meditations, Playground, Terminal, Aero FM, Recycle Bin → phase 6

## References

- @context/project-overview.md
- @context/ricardo-os.html
- @src/content/apps.ts
- @src/content/projects.ts
- @context/features/phase-3-window-manager-spec.md
- @context/features/phase-5-content-pages-spec.md
