# Changelog

All notable changes to RicardoOS are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.6.0] - 2026-07-22

### Added
- Blip can now answer typed questions. A small "?" toggle beside Blip's
  dismiss orb opens a glass input where you can ask about the stack, hiring,
  the best project, how to get in touch, background, résumé, experience, or
  how the site itself was built. Blip matches the question against a small
  canned-answer bank and replies in its speech bubble — some answers also
  open the relevant app (Projects, Contact, About, Résumé, Experience).
  Unmatched questions get a friendly fallback rather than silence. No AI
  model involved: it's the same scripted, keyword-matched approach as Blip's
  other lines, staying fully static.

## [1.5.0] - 2026-07-22

### Added
- Blip, a desktop assistant. A small glass bubble character with eyes and a
  smile drifts on the desktop and speaks through a frosted speech bubble. Blip
  can be dragged anywhere, and both the position and whether it has been sent
  away are remembered between visits. Clicking Blip toggles its speech; the
  little red orb sends it away, and the desktop right-click menu brings it back.
  Available in English, Spanish, and French, with the idle float and blink
  dropped for anyone who prefers reduced motion.
- Blip reacts to what's actually happening on the desktop rather than reciting
  random quotes: a different hello on a first visit than on a return, a line of
  its own for each app you open, a nudge when the wallpaper changes, a remark
  when the last window closes, and a gentle prompt after a long idle stretch.
  It never talks over itself, leaves a real gap between remarks, and never
  repeats a line in the same visit, so it gets quieter the longer you stay.

## [1.4.0] - 2026-07-22

### Added
- Four new desktop backdrops, bringing the total to eight: Brushed Metal (an
  Aqua-era chrome plate), Skyline (glass towers that catch a sun glint by day
  and light their windows at night), Deep Water (submerged, with light shafts
  from the surface and rising bubbles), and Chrome Bubble (one oversized glass
  sphere). All four are drawn in CSS and SVG, so they add no images to load,
  and each has its own day, night, and colorblind-safe treatment.

### Changed
- The desktop right-click menu now opens wallpapers in a submenu laid out as a
  grid of preview swatches, with the active one marked, instead of a flat list
  of names. Keyboard navigation and the confirmation toast are unchanged.

## [1.3.0] - 2026-07-21

### Added
- New Field Notes post, "The machine forgets", on building with an AI agent and
  why this site was developed in numbered phases: a feature that fits in one head
  has to fit in one context window. Available in English, Spanish, and French.

## [1.2.0] - 2026-07-21

### Added
- A minimal name/email/message form in the Contact app, alongside the
  existing link buttons, with client-side validation and toast feedback.
  Messages are relayed by a small serverless endpoint — the site itself
  stays fully static — and arrive with the sender's name and email in the
  body so replies go to the right place. The endpoint validates input,
  rejects cross-origin posts, and rate-limits by IP.
- "Aero Amp" project card in the Projects app — a write-up of the Winamp-style
  media player, with a detail page at `/projects/aero-amp`, superseding the old
  "Aero FM" branding.
- Winamp player skins: switch the media player between Classic (green LCD),
  Frutiger Aero (glossy blue), and Amber CRT looks from a labeled SKIN row of
  swatch tiles. The choice is remembered between visits.
- Dockable Playlist and 10-band Equalizer panels in the Winamp player, toggled
  by PL and EQ buttons. The equalizer is a real graphic EQ (preamp + ten
  frequency bands) wired into the audio, with a reset, and follows the active
  skin's colors.

### Changed
- Replaced the Winamp player's placeholder vaporwave tracks with Ricardo's own
  music, released as RKY — eight original tracks now stream from the player's
  playlist.
- Reskinned the Aero FM music app as a classic Winamp 2.x-style media player:
  dark brushed-metal chrome, a green segmented LCD with a scrolling title
  marquee and live spectrum analyzer, beveled transport buttons, and a
  black-on-green playlist. Added balance, shuffle, and repeat controls. All
  existing audio behavior (real streaming, never-autoplay) is preserved.
- The Winamp player now floats as a chromeless window instead of sitting inside
  the aqua glass frame: it drags from its own WINAMP titlebar, resizes from the
  corner, and has its own minimize/close buttons — while still behaving as a
  real window (focus, z-order, dock indicator).

### Fixed
- Project cards now preserve the selected language when opening detail pages,
  including localized project copy and return links for Spanish/French routes.
- Aero Amp mobile touch targets: bigger seek/volume/EQ slider thumbs and
  tracks on touch devices, with `touch-action: none` so drags don't fight
  page scroll, and a larger invisible tap area around the tiny minimize/close
  buttons. Desktop mouse sizing is untouched.

### Removed
- The Playground app. Its dock icon, window, and `?app=playground` deep link
  are gone; the experiments it listed never shipped. Visiting the old deep
  link now just lands on the desktop.

## [1.1.0] - 2026-07-03

### Added
- PokéPal project showcase with a dedicated `/projects/pokepal` detail page.
- AI Strategy Table project showcase with a dedicated `/projects/ai-strategy-table` detail page.
- Installable PWA: web app manifest and home-screen icons.
- Screenshot-backed project "peeks" on project cards and detail pages.
- "Live demo" buttons on project cards now open a project's first external link.
- "Lamadrid Labs" footer credit on the desktop and in windows.
- Draggable, persisted desktop icons with a "Clean Up" reset.

### Changed
- Renamed the "Writing" app to "Field Notes".
- Localized Field Notes app chrome and post content (titles, summaries, bodies, dates) across EN/ES/FR, with localized static article routes.
- Rewrote user-facing copy across the data layer for a more human, first-person voice.
- Humanized the résumé / Experience chapter bullets.
- Refined the colorblind-safe palette and simplified the Projects navigation.
- Separated the desktop and dock app sets (added Contact; removed the Bin from the desktop).
- Swapped the Playground desktop icon for a Résumé icon.

### Fixed
- Field Notes / writing post dates no longer display "1969".
- Removed white corners from the favicon.

## [1.0.0] - 2026-06-30

Initial public release — RicardoOS goes live at https://ricardolamadrid.com.

### Added
- Boot sequence and Frutiger Aero "living desktop" wallpaper (sky, sun, rays, drifting bubbles, glass).
- Glass menu bar and horizontally scrolling dock with running indicators and launch bounce.
- Window manager: open/focus/close, drag, resize, minimize, and maximize (mouse + touch).
- Core apps wired to typed, localized content: About, Projects, Experience, Contact, Résumé.
- Content pages with deep links and SEO: `/projects/[slug]` and MDX-backed `/writing/[slug]`, plus generated OG images.
- Easter-egg apps: Meditations zen mode, Playground, Terminal, Winamp-style Aero FM player, and Recycle Bin.
- Colorblind-safe appearance mode and day/night theming with wallpaper switching.
- Static export (`output: "export"`) and automated deployment to Hostinger via GitHub Actions.
- On-brand bubble-R favicon.

[Unreleased]: https://github.com/rikilamadrid/ricardoOS/compare/v1.6.0...HEAD
[1.6.0]: https://github.com/rikilamadrid/ricardoOS/compare/v1.5.0...v1.6.0
[1.5.0]: https://github.com/rikilamadrid/ricardoOS/compare/v1.4.0...v1.5.0
[1.4.0]: https://github.com/rikilamadrid/ricardoOS/compare/v1.3.0...v1.4.0
[1.3.0]: https://github.com/rikilamadrid/ricardoOS/compare/v1.2.0...v1.3.0
[1.2.0]: https://github.com/rikilamadrid/ricardoOS/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/rikilamadrid/ricardoOS/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/rikilamadrid/ricardoOS/releases/tag/v1.0.0
