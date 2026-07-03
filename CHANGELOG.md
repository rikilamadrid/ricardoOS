# Changelog

All notable changes to RicardoOS are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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

[Unreleased]: https://github.com/rikilamadrid/ricardoOS/compare/v1.1.0...HEAD
[1.1.0]: https://github.com/rikilamadrid/ricardoOS/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/rikilamadrid/ricardoOS/releases/tag/v1.0.0
