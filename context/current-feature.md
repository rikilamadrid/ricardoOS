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
- **C — Docked Playlist + 10-band EQ panels.**
- **D — Projects section:** add a project card for the new player (motif +
  screenshot + localized writeup), superseding the "Aero FM" branding.

---

**Maintenance mode — feature roadmap complete.** RicardoOS and the post-launch
enhancements are shipped. The active track is now live QA, real-content polish,
and any small follow-up fixes discovered on the deployed site.

Branch: `main` until a concrete fix/content slice is scoped, then branch per
feature as usual.

## Status

**Feature roadmap complete.** No planned product feature is currently open.
Only maintenance, verification, and content cleanup remain.

### Active maintenance track

- Run the remaining live-site QA from
  `context/features/phase-11-go-live-qa-spec.md`.
- Replace any remaining seed/demo copy in `src/data/*` and
  `src/content/posts/*` with final portfolio content.
- Verify the live experience across desktop and mobile, especially touch
  behavior, glass rendering, and localized content flows.
- Keep `CHANGELOG.md`, `context/history.md`, and this file aligned whenever a
  follow-up slice lands.

### What remains

- **Live QA:** Lighthouse on the deployed site, mobile/touch pass, cross-browser
  visual verification, OG/social preview checks, Search Console + sitemap.
- **Content pass:** projects, writing, About, Experience, Contact, résumé files,
  and any remaining placeholder/demo assets.
- **Small follow-ups as needed:** ship isolated fixes on feature branches, then
  reconcile docs/history after merge.

---

## Recently landed

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
