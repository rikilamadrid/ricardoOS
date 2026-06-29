import type { Localized } from "./types";

/**
 * "Aero FM" mini music player from the mockup. Tracks are synthesized on
 * click (no audio files yet) — `src` is left null until real audio exists.
 */
export interface MusicStation {
  station: string;
  genre: Localized<string>;
  tracks: Track[];
}

export interface Track {
  id: string;
  title: string;
  artist: string;
  caption: Localized<string>;
  /** Audio URL, or null while generated client-side. */
  src: string | null;
  cover: string;
}

export const aeroFm: MusicStation = {
  station: "Aero FM",
  genre: { en: "ambient", es: "ambiental", fr: "ambient" },
  tracks: [
    {
      id: "endless-summer-03",
      title: "Endless Summer '03",
      artist: "Aero FM",
      caption: {
        en: "soft synth pad · plays on click",
        es: "pad de sintetizador suave · suena al hacer clic",
        fr: "pad de synthé doux · joue au clic",
      },
      src: null,
      cover: "🎧",
    },
  ],
};
