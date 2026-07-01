# RicardoOS — Phase 14 Spec: Draggable / Rearrangeable Desktop Icons

## Overview

Make the desktop feel like a real OS: desktop icons can be **dragged anywhere** and
**stay where you put them** across reloads, with a way to reset the layout. Today
`DesktopIcons.tsx` renders a fixed auto-layout column (flex), no dragging.

## Goal

Click-and-drag any desktop icon to reposition it; the position persists; a
"Clean Up Icons" action restores the tidy default layout. Opening apps still works
(a click that doesn't drag = launch).

## Design

- **State + persistence:** a small dedicated store
  `src/lib/desktop-icons-store.ts` (Zustand), `positions: Record<appId, {x, y}>`,
  persisted to `localStorage` (mirror the persistence pattern in
  `theme-store.tsx` / `locale-store.tsx`). Browser storage is justified here (the
  feature *is* "remember where I put things"); note it as an allowed exception to
  the "no browser storage in v1" rule.
- **Default (auto) layout:** when an icon has no saved position, fall back to the
  current tidy column (top-left, below the menu bar). Saving a position only
  happens once an icon is actually dragged.
- **Dragging:** reuse the Pointer-Events approach from `Window.tsx`
  (pointerdown/move/up, `setPointerCapture`, `touch-action: none`). Extract a
  shared `useDrag` hook if it reduces duplication; otherwise keep it local.
  - Distinguish **drag vs. click**: only treat it as a drag past a small threshold
    (e.g. >4px). A clean click/double-click still calls `openApp`.
  - Use transform-based movement during drag (no layout thrash); commit the final
    `{x, y}` to the store on pointerup.
- **Bounds + snap:** clamp icons inside the desktop area (below the menu bar
  ~44px, above the dock, inside the viewport). Optional light **snap-to-grid**
  (e.g. 84px cells) so the desktop stays tidy — keep it subtle.
- **Reset:** add **"Clean Up Icons"** to the desktop right-click menu
  (`DesktopContextMenu.tsx`) that clears saved positions (back to auto-layout),
  with a toast.
- **Focus/visuals:** keep keyboard launch working (icons remain real buttons with
  focus rings). Dragging is a pointer enhancement, not the only way in.

## Responsive

- **≤720px:** keep the existing wrapping-row auto-layout. Free drag on a small
  touch screen is awkward and collides with scrolling — **default: disable
  rearrange on mobile** and just use the tidy reflow. (Confirm during build;
  revisit if Ricardo wants touch-drag.)

## Accessibility / motion

- Respect `prefers-reduced-motion`: no springy drift on drop, instant commit.
- Icons keep `role`/label and visible `:focus-visible` rings (phase-7 baseline).

## Acceptance

- Drag any desktop icon to a new spot; reload → it's still there.
- A plain click still opens the app (drag threshold prevents accidental launches).
- Icons can't be dropped under the menu bar / dock or off-screen.
- "Clean Up Icons" restores the default layout.
- Works with mouse and (if enabled) touch; keyboard launch intact.
- `npm run build` + `npm run lint` pass.

## Out of scope

- Multi-select / marquee selection, icon grid "auto-arrange by name," renaming.
- Persisting *window* positions (separate concern; window-store stays session-only).
- Dragging dock items.

## Dependencies

- Land **phase 13** first so the draggable layer operates on the final desktop app
  set (About, Projects, Résumé, Contact, Meditations).

## References

- @context/features/iteration-2-overview.md
- `src/components/os/DesktopIcons.tsx`, `src/components/os/Window.tsx`
  (drag pattern), `src/components/os/DesktopContextMenu.tsx`,
  `src/components/os/theme-store.tsx` (persistence pattern), `src/lib/window-store.ts`
