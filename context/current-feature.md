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
- **C — Docked Playlist + 10-band EQ panels.** ⏳ **In progress** (`feature/winamp-docked-panels`). See Goals below.
- **D — Projects section:** add a project card for the new player (motif +
  screenshot + localized writeup), superseding the "Aero FM" branding.

## Status

**In Progress** — Phase 15C on `feature/winamp-docked-panels`.

## Goals

Break the single Winamp window into the authentic stacked multi-panel layout —
main player + Playlist (PL) + Equalizer (EQ) — matching `winamp1.png` /
`winamp2.png`.

- **Docked panels:** render Playlist and Equalizer as separate panels that dock
  beneath / alongside the main player, toggled by the existing `PL` / `EQ` chips
  (currently placeholders). Respect the chromeless floating-window model from 15A.
- **Playlist panel:** promote the current inline `.os-wa-list` into its own
  dockable PL panel (track rows, active-row highlight, click-to-select preserved).
- **Equalizer panel:** 10-band EQ with the classic vertical sliders + preamp,
  styled per the active skin's `--wa-*` tokens. Decorative first; optionally wire
  to a `BiquadFilter` chain feeding the existing audio graph.
- **Skin-aware:** all three panels honor the 15B skin tokens.
- **Preserve audio + a11y:** real `<audio>`, live `AnalyserNode`, seek, volume,
  balance, never-autoplay, labels, and `prefers-reduced-motion` all intact.

## Notes

- Visual source of truth: `context/screenshots/winamp1.png`, `winamp2.png`
  (docked main + EQ + playlist), `winamp3.png` (main chrome).
- **Out of scope:** real drag-to-dock window physics beyond the current window
  manager; adding new audio files.
- Toggling PL/EQ should feel native to the OS window model — decide whether panels
  are extra windows in the store or child panels of the one Winamp window
  (lean child-panels to keep the "one app = one window" invariant simple).
- If EQ is wired to audio, insert the `BiquadFilter` chain between source and the
  existing `AnalyserNode`/destination without breaking the analyser feed.

---

## Deferred — maintenance & live QA track

Resume after Phase 15 lands. Overview retained for reference:

- Run remaining live-site QA from `context/features/phase-11-go-live-qa-spec.md`
  (Lighthouse, mobile/touch, cross-browser, OG/social, Search Console + sitemap).
- Replace any remaining seed/demo copy in `src/data/*` and `src/content/posts/*`.
- Keep `CHANGELOG.md`, `context/history.md`, and this file aligned as slices land.

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
