import type { Localized } from "./types";

/**
 * "Aero FM" — a Winamp-flavored mini player that streams real audio files from
 * `public/audio/`. Drop an MP3 named `<id>.mp3` for each track below. The
 * player reads duration from the file and drives a live equalizer from the
 * audio itself; it never autoplays (sound starts on a user gesture).
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
  cover: string;
  /** Audio file served from /public. */
  src: string;
}

const audio = (id: string) => `/audio/${id}.mp3`;

export const aeroFm: MusicStation = {
  station: "Aero FM",
  genre: { en: "original", es: "original", fr: "original" },
  tracks: [
    {
      id: "break",
      title: "break",
      artist: "RKY",
      caption: {
        en: "a beat breaks open",
        es: "un ritmo se abre",
        fr: "un rythme s'ouvre",
      },
      cover: "🎧",
      src: audio("break"),
    },
    {
      id: "el-tiempo-pasa",
      title: "el tiempo pasa",
      artist: "RKY",
      caption: {
        en: "time keeps moving",
        es: "el tiempo sigue",
        fr: "le temps avance",
      },
      cover: "⏳",
      src: audio("el-tiempo-pasa"),
    },
    {
      id: "floating",
      title: "floating",
      artist: "RKY",
      caption: {
        en: "weightless and slow",
        es: "ingrávido y lento",
        fr: "en apesanteur, lentement",
      },
      cover: "🪶",
      src: audio("floating"),
    },
    {
      id: "primera",
      title: "primera",
      artist: "RKY",
      caption: {
        en: "the first one",
        es: "la primera",
        fr: "la première",
      },
      cover: "🌱",
      src: audio("primera"),
    },
    {
      id: "sin-sueno",
      title: "sin sueño",
      artist: "RKY",
      caption: {
        en: "wide awake at 3am",
        es: "despierto a las 3am",
        fr: "éveillé à 3h du matin",
      },
      cover: "🌙",
      src: audio("sin-sueno"),
    },
    {
      id: "trance",
      title: "trance",
      artist: "RKY",
      caption: {
        en: "locked into the loop",
        es: "atrapado en el loop",
        fr: "pris dans la boucle",
      },
      cover: "🌀",
      src: audio("trance"),
    },
    {
      id: "try-it",
      title: "Try it",
      artist: "RKY",
      caption: {
        en: "just try it",
        es: "solo inténtalo",
        fr: "essaie, juste",
      },
      cover: "✨",
      src: audio("try-it"),
    },
    {
      id: "waves",
      title: "waves",
      artist: "RKY",
      caption: {
        en: "rolling in, rolling out",
        es: "van y vienen",
        fr: "elles vont et viennent",
      },
      cover: "🌊",
      src: audio("waves"),
    },
  ],
};
