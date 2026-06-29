# RicardoOS — Phase 6 Spec: Special & Easter-Egg Apps

## Overview

This is phase 6 of 7 — the personality and delight layer. It adds the reflective Meditations space and the easter-egg apps that reward exploration: Playground, Terminal, Aero FM, and the Recycle Bin. All register through `apps.ts` and lazy-load. Use the prototype for behavior and tone.

## Requirements for phase 6

- **Meditations Between Quests**: opening it **dims the desktop** with an overlay and enters a calm, minimal "other space" — a 7s breathing orb, a rotating reflective verse from `meditations.ts`, and a gentle "return to the desktop" button. Should feel like entering somewhere else
- **Playground app**: grid of experiments from `experiments.ts`; clicking one shows a toast or opens its sandbox link
- **Terminal app**: a working command parser with prompt input and scrollback. Commands: `help`, `about`, `projects`, `whoami`, `ls`, `theme [day|night]`, `joke`, `sudo`, `clear`, `contact`, `exit`. Unknown commands return a friendly error
- **Aero FM (music)**: ambient player UI with an animated equalizer and a soft Web Audio synth pad that starts on a user click (default off, low volume, stoppable) — never autoplay
- **Recycle Bin**: contains `old-portfolio.html`; "empty bin" triggers a playful toast
- **Registration & loading**: register all five in `apps.ts`; lazy-load each app component via `next/dynamic` so their code loads only when first opened

## Out of scope (handled later)

- Final motion polish, accessibility audit, performance tuning, responsive QA → phase 7

## References

- @context/project-overview.md
- @context/ricardo-os.html
- @src/content/apps.ts
- @src/content/meditations.ts
- @src/content/experiments.ts
- @context/features/phase-5-content-pages-spec.md
- @context/features/phase-7-polish-spec.md
