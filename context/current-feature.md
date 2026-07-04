# Current Feature

**Active: Phase 15 — Retro Winamp Media Player.** Replacing the soft Frutiger-Aero
"Aero FM" glass panel with a classic Winamp 2.x-inspired player (dark metal chrome,
green LCD, spectrum analyzer) plus a skin system. Spec:
@context/features/phase-15-winamp-media-player-spec.md

Branch: branch per sub-feature off `main` as each is scoped.

Sub-features (build one at a time):

- **A — Classic 2.x chrome (default skin)** ✅ **Merged** (`86e69f0`). Re-skinned
  the shell as a classic Winamp 2.x player and floated it as a chromeless window
  (drags from the WINAMP titlebar, resizes from the corner grip, own
  minimize/close controls). All audio/analyser logic preserved.
- **B — Skin system** ✅ **Merged** (`ff06c04`). `.os-wa` chrome colors are now
  `--wa-*` CSS tokens; `data/skins.ts` registers Classic / Frutiger Aero /
  Amber CRT, `lib/skin-store.ts` persists the choice, and a labeled `SKIN` row
  of rectangular swatch tiles (above the playlist) selects the skin.
- **C — Docked Playlist + 10-band EQ panels** ✅ **Merged** (`482d33f`).
  Toggleable PL/EQ chips reveal a dockable playlist panel and a real preamp +
  10-band graphic equalizer (biquad chain between source and analyser), both
  skin-token driven.
- **D — Projects section:** add a project card for the new player (motif +
  screenshot + localized writeup), superseding the "Aero FM" branding.

## Status

**In Progress — Phase 15D.** Sub-features A–C are merged. Building the
Projects-section card for the new Winamp player ("Aero Amp") — the final slice
before Phase 15 lands.

Branch: `feature/phase-15d-aero-amp-project`

## Goals

- Add a new `aero-amp` project entry to `src/data/projects.ts`, following the
  PokéPal / AI-Strategy pattern: localized `title` / `blurb` / `tagline` /
  `writeup`, `tags`, `icon`, gradient `from`/`to`, `status`, `year`, `links`,
  `motif`, and `screenshot`. This supersedes the "Aero FM" branding.
  - Title: **Aero Amp** → `/projects/aero-amp`.
  - Localized EN/ES/FR copy for every user-facing string (`Localized<T>`).
  - Screenshot peek at `/public/projects/aero-amp.png` of the actual player.
- Verify the card renders in the Projects window and the detail page
  (`/projects/aero-amp`) builds and reads well.
- `npm run build` passes; add a `## [Unreleased]` CHANGELOG entry.

## Notes

- Content-only slice — no component changes expected beyond data + a screenshot
  asset. The card/detail rendering already supports `motif` + `screenshot`.
- Screenshot must be a real capture of the Winamp/Aero-Amp player (default
  Classic skin), placed at `public/projects/aero-amp.png` like the existing
  `pokepal.png` / `ai-strategy-table.png` peeks.
- No `links.demo`/GitHub — the player lives inside this site; a deep link like
  `/?app=music` is the natural "open it" affordance if we want one.

---

## Deferred — maintenance & live QA track

Resume after Phase 15 lands. Overview retained for reference:

- Run remaining live-site QA from `context/features/phase-11-go-live-qa-spec.md`
  (Lighthouse, mobile/touch, cross-browser, OG/social, Search Console + sitemap).
- Replace any remaining seed/demo copy in `src/data/*` and `src/content/posts/*`.
- Keep `CHANGELOG.md`, `context/history.md`, and this file aligned as slices land.

---

## Recently landed

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
