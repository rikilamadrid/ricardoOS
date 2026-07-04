# Aero FM audio

One MP3 per track, named `<track-id>.mp3`. The IDs come from
`src/data/music.ts` — currently Ricardo's own tracks, released as RKY:

- `break.mp3`
- `el-tiempo-pasa.mp3`
- `floating.mp3`
- `primera.mp3`
- `sin-sueno.mp3`
- `trance.mp3`
- `try-it.mp3`
- `waves.mp3`

Files are served statically from `/audio/<id>.mp3`. Until a file exists, that
track shows as unavailable in the player.
