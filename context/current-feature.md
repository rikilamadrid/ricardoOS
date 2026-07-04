# Current Feature

<!-- No active feature. Populate when the next one is scoped. -->

## Status

<!-- Not Started -->

## Goals

<!-- Populate when the next feature is scoped. -->

## Notes

<!-- Populate when the next feature is scoped. -->

---

## Deferred — maintenance & live QA track

Resume after Phase 15 lands. Overview retained for reference:

- Run remaining live-site QA from `context/features/phase-11-go-live-qa-spec.md`
  (Lighthouse, mobile/touch, cross-browser, OG/social, Search Console + sitemap).
- Replace any remaining seed/demo copy in `src/data/*` and `src/content/posts/*`.
- Keep `CHANGELOG.md`, `context/history.md`, and this file aligned as slices land.

---

## Recently landed

**Aero Amp mobile touch targets.** ✅ Merged to `main` (merge `a730640`, commit
`6d6ef64`). Touch-only (`pointer: coarse`) sizing for the Winamp player: bigger
seek/volume/EQ slider thumbs and tracks with `touch-action: none` so drags
don't fight page scroll, and an invisible tap-area extension around the tiny
minimize/close buttons — desktop mouse sizing untouched. Also finishes the
Aero FM → Aero Amp rename left over from Phase 15D, removes the unused shadcn
`dropdown-menu.tsx` scaffold, and backfills `context/history.md` with the
Phase 15A–15D entries that were never logged.

---

**Phase 15D — Aero Amp project card + RKY playlist.** ✅ Merged to `main`
(`969734d`; feature commits `7e4e99e`, `585ccd0`, `d47068f`). Adds the
`aero-amp` project entry and `/projects/aero-amp` detail page, superseding the
old "Aero FM" branding, and swaps the Winamp player's placeholder vaporwave
tracks for eight of Ricardo's own tracks (released as RKY). **Phase 15 —
Retro Winamp Media Player is now complete** (sub-features A–D all merged).

---

**Phase 15C — Docked Winamp playlist + 10-band EQ panels.** ✅ Merged to `main`
(`482d33f`; feature commit `1f5a733`). The PL and EQ chips toggle a dockable
playlist panel and a preamp + 10-band graphic equalizer wired into the audio
graph (lowshelf/peaking/highshelf biquad chain between source and analyser),
with a reset and skin-aware styling. Only sub-feature D (project card) remains.

---

**Phase 15B — Winamp skin system.** ✅ Merged to `main` (`ff06c04`). Token-driven
`--wa-*` chrome with Classic / Frutiger Aero / Amber CRT skins, persisted via
`lib/skin-store.ts`, selected from a labeled `SKIN` row of swatch tiles above the
playlist. Sub-features C (playlist/EQ) and D (project card) remain.

---

**Phase 15A — Winamp reskin + chromeless floating player.** ✅ Merged to `main`
(`86e69f0`). The media player now renders outside the aqua-glass frame as its own
draggable, resizable Winamp panel.

---

**Semantic versioning + changelog workflow.** Added `CHANGELOG.md`, version bump
scripts in `package.json`, and repo guidance so releases follow SemVer and Keep a
Changelog conventions.

---

**AI Strategy Table project + project chrome refresh.** ✅ Merged to `main`
(`5ca41fe`; feature commits `2d94b8b`, `82ecc73`). Adds
`/projects/ai-strategy-table`, screenshot-backed project peeks on cards/detail
pages, and the red PokéPal title accent.

---

**Lamadrid Labs footer credit.** ✅ Merged to `main` (`d88532b`; feature commit
`c39b763`). Added the footer credit to both the desktop shell and window views.

---

**Field Notes localization.** ✅ Merged to `main` (`3656421` and `29fa9db`;
feature commits `f2c88c4`, `a56b125`). Localized the Field Notes app chrome,
post metadata, article bodies, and locale-preserving article/index navigation.

---

## Iteration 2 — post-launch enhancements

A small enhancement track on top of the live site. Overview:
@context/features/iteration-2-overview.md

| Phase | Feature | Spec | State |
| --- | --- | --- | --- |
| 12 | Home-screen / installable icons (PWA manifest) | `phase-12-home-screen-icons-spec.md` | ✅ **Merged** (`dab63f4`), live |
| 13 | Desktop app set + desktop/dock separation (remove Bin, add Contact; desktop ≠ dock) | `phase-13-desktop-app-layout-spec.md` | ✅ **Merged** (`7c7ab06`), live |
| 14 | Draggable / rearrangeable desktop icons (persisted) | `phase-14-draggable-desktop-icons-spec.md` | ✅ **Merged** (`33ce629`), live |

---

## History & deployment

Completed-work log and live deployment facts live in @context/history.md.

**Live:** <https://ricardolamadrid.com> (Hostinger static export, CI auto-deploy
on push to `main`).
