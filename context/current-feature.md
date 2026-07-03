# Current Feature

**Field Notes content localization fix.** The Field Notes app chrome already
switches languages, but the post titles/summaries are still plain English MDX
metadata and the article bodies are English-only. Make post metadata and MDX
body content localized, then resolve the active language from the Field Notes
app through static article routes.

Branch: `fix/localize-field-notes-content`.

## Status

**In progress** — build green (`npm run build`); static export now generates
localized article pages for all three posts in EN/ES/FR. Localized post pages now
return to the Field Notes index with `?locale=es|fr`, and the index renders that
language instead of falling back to English.

---

**Humanize the copy.** Rewrite the user-facing strings across `src/data/*` so
they stop reading like AI output. Concrete goals: (1) kill the em-dash tic — the
biggest "ChatGPT wrote this" tell — by rewriting sentences, not find-replacing;
(2) first person everywhere (project writeups and Experience chapters were third
person / impersonal gerunds); (3) a human, curious, lightly-sarcastic-but-
professional voice — no infantile tone. All three languages (EN/ES/FR).

Branch: `feature/humanize-copy`.

## Status

**In progress.**

### Scope

Files with user-facing copy: `about.ts`, `projects.ts`, `chapters.ts`
(Experience chapters), `experience.ts` (résumé bullets), `contact.ts`,
`playground.ts`, `trash.ts`, `terminal.ts`, `profile.ts`, `meditations.ts`.
Doc-comment em-dashes are left alone (not user-facing).

---

**Colorblind-safe palette + Projects header cleanup.** Make the accessibility
toggle visibly change the OS palette, and remove the Playground shortcut from
the top header so Projects remains the primary nav action.

Branch: `feature/colorblind-header-projects`.

## Status

**In progress** — build green (`npm run build`).

### Changes

- **`src/components/os/theme-store.tsx` / `src/styles/tokens.css` /
  `src/app/globals.css`** — colorblind mode now projects safe wallpaper tokens
  and swaps desktop sky hues, night-sky hues, wallpaper primitives, glass
  accents, dock chrome, app tiles, title bars, project thumbs, status pills, and
  the pressed state of the glasses toggle.
- **`src/data/os.ts`** — menu-bar nav now shows About + Projects, with Playground
  still available from the dock.

---

**Add PokéPal project.** Add a real shipped project — **PokéPal**, a mobile-first,
iOS-style Pokémon card companion for kids (scan a card, tag it, build a
local-first, installable collection) — to the Projects app and its
`/projects/pokepal` detail page.

Branch: `feature/add-pokepal-project`.

## Status

**In progress** — build green (`npm run build` generates `/projects/pokepal`).

### Changes

- **`src/data/projects.ts`** — new `pokepal` entry (status `shipped`, `🃏` tile,
  trilingual tagline/blurb/writeup, live-demo + GitHub links, year 2026).
- **`src/components/apps/ProjectCard.tsx`** — the "Live demo" button now opens the
  project's first link (`links[0]`) in a new tab when present, falling back to the
  old "Demo coming soon" toast when a project has no links.
- **Riding along:** `education.ts` (English → "Native", French → level 5
  "Fluent"), `package.json` (`dev` pinned to port 3001, `png-to-ico` devDep +
  generated PWA icon assets), docs churn.

---

## Previously landed

**Phase 14 — Draggable / rearrangeable desktop icons (persisted).** ✅ Merged to
`main` (merge `33ce629`, commit `07bd67c`), auto-deployed live.

---

## Iteration 2 — post-launch enhancements

A small enhancement track on top of the live site. Three independent features,
each its own spec + branch. Overview: @context/features/iteration-2-overview.md

| Phase | Feature | Spec | State |
| --- | --- | --- | --- |
| 12 | Home-screen / installable icons (PWA manifest) | `phase-12-home-screen-icons-spec.md` | ✅ **Merged** (`dab63f4`), live |
| 13 | Desktop app set + desktop/dock separation (remove Bin, add Contact; desktop ≠ dock) | `phase-13-desktop-app-layout-spec.md` | ✅ **Merged** (`7c7ab06`), live |
| 14 | Draggable / rearrangeable desktop icons (persisted) | `phase-14-draggable-desktop-icons-spec.md` | ✅ **Merged** (`33ce629`), live |

---

## History & deployment

Completed-work log and the live deployment/hosting facts moved to
@context/history.md (kept out of this file so it stays about what's *next*).
When a phase lands, summarize it there.

**Live:** <https://ricardolamadrid.com> (Hostinger static export, CI auto-deploy
on push to `main`). **Still open:** Phase 11 go-live QA + real content — see
@context/history.md.
