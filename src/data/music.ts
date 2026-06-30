import type { Localized } from "./types";

/**
 * "Aero FM" — a Winamp-flavored mini player that streams real audio files from
 * `public/audio/`. Drop an MP3 named `<id>.mp3` for each track below (e.g.
 * `public/audio/endless-summer-03.mp3`). Use royalty-free / licensed vaporwave
 * only. The player reads duration from the file and drives a live equalizer
 * from the audio itself; it never autoplays (sound starts on a user gesture).
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
  genre: { en: "vaporwave", es: "vaporwave", fr: "vaporwave" },
  tracks: [
    {
      id: "endless-summer-03",
      title: "Endless Summer '03",
      artist: "ｓｋｙ ｄｉｓｃ",
      caption: {
        en: "pool reflections",
        es: "reflejos de piscina",
        fr: "reflets de piscine",
      },
      cover: "🌴",
      src: audio("endless-summer-03"),
    },
    {
      id: "mall-hours-2am",
      title: "Mall Hours, 2 AM",
      artist: "ＤＵＴＹ ＦＲＥＥ",
      caption: {
        en: "empty atrium hum",
        es: "zumbido del atrio vacío",
        fr: "bourdon de l'atrium vide",
      },
      cover: "🛍️",
      src: audio("mall-hours-2am"),
    },
    {
      id: "poolside-telephone",
      title: "Poolside Telephone",
      artist: "ＡＱＵＡ７７",
      caption: {
        en: "warm rotary tone",
        es: "tono cálido de marcado",
        fr: "tonalité chaude",
      },
      cover: "☎️",
      src: audio("poolside-telephone"),
    },
    {
      id: "aero-glass-dreams",
      title: "Aero Glass Dreams",
      artist: "ｆｒｕｔｉｇｅｒ",
      caption: {
        en: "bubbles drifting up",
        es: "burbujas ascendentes",
        fr: "bulles qui montent",
      },
      cover: "🫧",
      src: audio("aero-glass-dreams"),
    },
    {
      id: "vhs-memory-foam",
      title: "VHS Memory Foam",
      artist: "ＮＩＧＨＴ ＴＡＰＥ",
      caption: {
        en: "tape wow & flutter",
        es: "fluctuación de cinta",
        fr: "pleurage de bande",
      },
      cover: "📼",
      src: audio("vhs-memory-foam"),
    },
  ],
};
