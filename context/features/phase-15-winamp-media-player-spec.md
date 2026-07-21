# Phase 15 — Retro Winamp Media Player

Replace the current soft Frutiger-Aero "Aero FM" glass panel with a **classic
Winamp 2.x-inspired** media player: a deliberate retro break from the rest of the
OS chrome, with a skin system so the player can wear different looks like the real
Winamp did back in the day.

**Visual source of truth:** `context/screenshots/winamp*.png`.
- `winamp3.png` — the anchor: dark brushed-metal chrome, green segmented LCD,
  scrolling title marquee, `kbps · kHz · mono/stereo` readouts, spectrum
  analyzer, beveled transport buttons, position/volume/balance sliders,
  `EQ`/`PL` toggles, shuffle/repeat.
- `winamp.png` — Frutiger-Aero "egg" alternate skin (later phase).
- `winamp1.png` / `winamp2.png` — modern + custom skins and the docked
  multi-window (main + equalizer + playlist) layout, as reference.

**Hard constraint:** keep all existing audio behavior intact — real `<audio>`
streaming from `public/audio/`, the live `AnalyserNode` equalizer, seek, volume,
playlist, never-autoplay. Phase A is a re-skin of the shell, not an audio rewrite.

## Sub-features (work one at a time)

### A — Classic 2.x chrome (default skin) ✅ this branch
- Rewrite `MusicApp.tsx` shell to the classic layout; preserve all audio/analyser
  logic and accessibility (labels, `prefers-reduced-motion`).
- Titlebar with `WINAMP`-style wordmark + window glyphs (decorative).
- Green segmented LCD: scrolling `NN. Title — Artist`, big time readout,
  `kbps · kHz · mono/stereo` (static/synthetic values are fine — no real
  bitrate probing needed), spectrum analyzer fed by the existing analyser.
- Beveled transport row: prev / play / pause / stop / next.
- Position slider + volume + balance sliders in the retro track style.
- `EQ` / `PL` toggle chips + shuffle / repeat (repeat/shuffle wired to playback;
  EQ toggle can be a no-op placeholder until Phase C).
- New `.os-amp*` (or `.os-wa*`) CSS replacing the current glass styles. Tokens
  where sensible; retro metal/LCD colors may be local since they're skin-specific.

### B — Skin system (data-driven)
- `src/data/skins.ts` registry (id, label, class/CSS-var set). Skin switcher in
  the titlebar; persist choice to `localStorage` (mirror `desktop-icons-store`).
- Ship: Classic (default), Frutiger-Aero egg (`winamp.png`), one accent skin.

### C — Docked Playlist + 10-band Equalizer panels
- Break the single window into the authentic stacked layout (main + PL + EQ).
- EQ can be decorative first, then optionally wired to a `BiquadFilter` chain.

### D — Projects section
- Add a new project entry for the redesigned player, following the
  PokéPal / AI-Strategy pattern (localized `title/blurb/tagline/writeup`, `tags`,
  `motif`, `screenshot`, `status`). This supersedes the "Aero FM" branding.
- Provide a `/public/projects/<slug>.png` screenshot peek of the new player.

## Out of scope
- Real drag-to-dock window physics beyond what the window manager already does.
- Uploading/adding new audio files.
