# Swarm Entrance

## Status

In Progress

## Goal

On every full load of the landing page, a swarm of arrow cursors
visibly assembles the RicardoOS desktop as the boot screen fades, in about 2
seconds, without costing the page any speed or usability.

## Context

- Read: `src/components/os/BootScreen.tsx`, `DesktopIcons.tsx`, `Dock.tsx`,
  `MenuBar.tsx`, `src/app/globals.css`, `src/styles/tokens.css`.
- Relevant area: the `/` desktop shell only.
- Avoid: windows, apps, content routes, the boot screen's timing and look.

## Requirements

- The landing page has no hero, so its first viewport maps onto the brief: the
  menu bar is the heading, desktop icons are the primary actions, the dock is
  the supporting element.
  The wallpaper hill, sun, tip pill, and footer credit are built too; none is
  interactive.
- Apps are built in a workshop in the middle of the screen, then hauled out to
  their real places.
- LCP is the boot title. It is never touched; the swarm starts at the boot fade.
- All hidden states live inside running Web Animations. Cancelling them, or never
  starting, leaves the real page. Native WAAPI only; no dependencies.
- Interactive elements are never moved, so hit-testing stays at final positions.
- At most 28 cursors on desktop and 26 on phones, raised from the brief's initial
  6–8 at the owner's request for more visible work. Phones run the same
  choreography as desktop, at the owner's request, with a tighter workshop layout.
- Plays on every full page load including refresh, at the owner's request (this
  replaces the brief's once-per-session rule). Client-side navigation back to the
  desktop does not replay it.
- Skip when: reduced motion, `?app=` deep link, Save-Data, low-end device, start
  over 250 ms late, or input before it starts.
- Input finishes it without consuming the action. A hidden tab, resize, route
  change, or main-thread long task over 150 ms ends it cleanly.

## Out of Scope

- Replacing or shortening the boot screen.
- Animating below the first viewport or open windows.

## Acceptance Criteria

- No added CLS, no median LCP increase beyond run-to-run variation (investigate
  over 100 ms), no animation-attributable task over 50 ms, at most 10 KB added
  compressed JS, no animation network requests, no residual work after finishing.
- First visit, repeat visit, reduced motion, interruption, mobile layout, keyboard
  access, and cleanup verified in a real browser.

## Notes / Decisions

- Keeping the boot screen means the entrance begins about 2.3 s after hydration.
  That delay already exists and nobody can use the page behind the boot overlay.
