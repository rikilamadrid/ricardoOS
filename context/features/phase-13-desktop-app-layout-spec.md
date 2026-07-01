# RicardoOS — Phase 13 Spec: Desktop App Set + Desktop/Dock Separation

## Overview

Curate what lives on the desktop vs. the dock. Two changes:

1. **Swap the desktop set:** remove **Recycle Bin** from the desktop, add
   **Contact** to the desktop.
2. **Make desktop and dock disjoint:** no app appears in *both* the desktop and the
   dock. The desktop holds the "primary" apps; the dock holds utilities and
   easter-eggs.

This is almost entirely a data change in `src/data/os.ts` (the registry already
drives both surfaces via `onDesktop` / `inDock`). `DesktopIcons.tsx` filters
`app.onDesktop`; `Dock.tsx` filters `app.inDock`.

## Current state (for reference)

- **onDesktop:** about, projects, resume, meditations, trash
- **inDock:** about, projects, playground, writing, experience, resume, contact,
  music, terminal, meditations, trash

## Target state

Apply the rule "**`onDesktop` ⇒ not `inDock`**" (mutually exclusive).

**Proposed split** (confirm before implementing — this is the one judgment call):

- **Desktop (`onDesktop: true`, `inDock: false`):**
  about, projects, resume, contact, meditations
- **Dock only (`inDock: true`, `onDesktop: false`):**
  playground, writing, experience, music, terminal, trash

Rationale: the desktop becomes the "front door" (who I am, what I built, résumé,
how to reach me, the reflective space); the dock holds secondary content +
easter-eggs. Adjust per Ricardo's preference, but keep the sets disjoint.

## Requirements

- Edit only the `onDesktop` / `inDock` booleans in `src/data/os.ts` to reach the
  target state. Do not change app `kind`, ids, or window dims.
- Enforce (and document in a comment) the invariant: **an app is on the desktop OR
  in the dock, never both.**
- **Menu-bar nav check:** `menuBar` in `os.ts` links About / Projects /
  Playground. Those still work regardless of surface (they call `openApp`), so no
  change needed — but verify Playground still launches now that it's dock-only.
- **Meditations stays special:** it's a desktop-level zen overlay, not a window;
  keep it launchable from wherever it's placed (it already routes through
  `openApp` → `zenMode`).
- **Responsive:** desktop icons reflow to a wrapping row ≤720px (existing
  behavior). Confirm the new, slightly larger desktop set still lays out cleanly on
  mobile and doesn't collide with the menu bar or dock.

## Acceptance

- Desktop shows exactly: About, Projects, Résumé, Contact, Meditations.
- Recycle Bin no longer on the desktop (still reachable from the dock).
- No app appears in both the desktop and the dock.
- Every app remains launchable from at least one surface (desktop, dock, or
  menu-bar nav).
- `npm run build` + `npm run lint` pass.

## Out of scope

- Drag-to-rearrange icons — that's **phase 14**. This phase only sets *which* apps
  are on the desktop; their auto-layout column/row is unchanged.
- New apps or content.

## References

- @context/features/iteration-2-overview.md
- `src/data/os.ts`, `src/components/os/DesktopIcons.tsx`, `src/components/os/Dock.tsx`
