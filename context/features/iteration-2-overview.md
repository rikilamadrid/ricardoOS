# RicardoOS — Iteration 2: Post-Launch Enhancements (Overview)

The OS is live (phases 1–10) with phase 11 go-live QA still open. This is a small
enhancement track layered on top of the shipped product — three independent
features, each in its own spec, to be built one at a time on its own branch.

| Phase | Feature | Spec |
| --- | --- | --- |
| 12 | Home-screen / installable icons (PWA manifest) | `phase-12-home-screen-icons-spec.md` |
| 13 | Desktop app set + desktop/dock separation | `phase-13-desktop-app-layout-spec.md` |
| 14 | Draggable / rearrangeable desktop icons | `phase-14-draggable-desktop-icons-spec.md` |

## Why these three

- **12** — when someone "Add to Home Screen" on iOS/Android, the tile should be
  the on-brand bubble-R, with a proper name and standalone launch — not a
  screenshot of the page. Today only the favicon + `apple-icon.png` exist; there
  is no web app manifest, so Android installs fall back to a generic icon.
- **13** — curate what lives where: **Contact** belongs on the desktop, **Recycle
  Bin** does not. And the desktop icons vs. the dock should be **two distinct
  sets** (no app appears in both), so the desktop holds the "primary" apps and the
  dock holds utilities/easter-eggs.
- **14** — make the desktop feel like a real OS: icons can be **dragged around**
  and they **stay where you put them** (persisted), with a "Clean Up" reset.

## Suggested order

12 and 13 are quick, mostly data/asset changes — do them first (either order).
14 is the only one with real interaction logic; do it last. 13 should land before
14 so the draggable layer operates on the final desktop app set.

## Ground rules (carry over from the project)

- Data-driven: app placement comes from `src/data/os.ts`, never hardcoded in
  components.
- Tokens, not magic numbers. Strict TypeScript, no `any`.
- `npm run build` + `npm run lint` must pass before commit. Branch per feature,
  ask before committing, merge + delete branch, log it in `current-feature.md`.
- Every push to `main` auto-deploys live — only merge when verified.

## References

- @context/project-overview.md
- @context/coding-standards.md
- @context/ai-interaction.md
- @context/ricardo-os.html
