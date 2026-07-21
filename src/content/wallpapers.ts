import type { Localized } from "@/data";

/**
 * Wallpaper variants for the living desktop (phase 2). Each one drives the
 * sky gradient via the `--wp-*` CSS custom properties set by the theme store.
 * Night theme overrides the sky entirely (see `.os-sky--night` in globals.css),
 * so these stops describe the *day* look.
 */
export type WallpaperId =
  | "sky"
  | "sunset"
  | "aurora"
  | "lavender"
  | "metal"
  | "skyline"
  | "water"
  | "orb";

/**
 * The foreground layer a wallpaper paints over the sky. `hill` is the original
 * Bliss-style green hill; the others are full scenes with their own CSS in
 * globals.css. Each scene carries day, night (`.dark`) and colorblind-safe
 * (`.cb`) treatments.
 */
export type WallpaperScene = "hill" | "skyline" | "metal" | "water" | "orb";

export interface Wallpaper {
  id: WallpaperId;
  label: Localized<string>;
  /** Foreground scene layer painted over the sky. */
  scene: WallpaperScene;
  /** Top gradient stop (zenith). */
  top: string;
  /** Middle gradient stop. */
  mid: string;
  /** Lower gradient stop (horizon haze). */
  low: string;
  /** Final stop at the very bottom of the sky, under the scene layer. */
  base: string;
  /** Strength of the green horizon glow, 0–1. */
  grass: number;
  /** Soft sun glow in the upper right. Off where it would fight the scene. */
  sun: boolean;
  /** Slow rotating light shafts. Wrong over brushed metal, hence the toggle. */
  rays: boolean;
  /** Drifting translucent bubbles. */
  bubbles: boolean;
  /** Two-stop gradient used for the context-menu swatch. */
  swatch: string;
}

export const wallpapers: Record<WallpaperId, Wallpaper> = {
  sky: {
    id: "sky",
    label: { en: "Sky", es: "Cielo", fr: "Ciel" },
    scene: "hill",
    top: "#1E6FD9",
    mid: "#4FA8F5",
    low: "#BFE3FF",
    base: "#eaf7e0",
    grass: 0.55,
    sun: true,
    rays: true,
    bubbles: true,
    swatch: "linear-gradient(180deg, #1E6FD9, #BFE3FF)",
  },
  sunset: {
    id: "sunset",
    label: { en: "Sunset", es: "Atardecer", fr: "Coucher de soleil" },
    scene: "hill",
    top: "#ff9e6d",
    mid: "#ffd28a",
    low: "#ffe9c9",
    base: "#eaf7e0",
    grass: 0.3,
    sun: true,
    rays: true,
    bubbles: true,
    swatch: "linear-gradient(180deg, #ff9e6d, #ffe9c9)",
  },
  aurora: {
    id: "aurora",
    label: { en: "Aurora", es: "Aurora", fr: "Aurore" },
    scene: "hill",
    top: "#1b8a8a",
    mid: "#3fd0c0",
    low: "#cdfff2",
    base: "#eaf7e0",
    grass: 0.45,
    sun: true,
    rays: true,
    bubbles: true,
    swatch: "linear-gradient(180deg, #1b8a8a, #cdfff2)",
  },
  lavender: {
    id: "lavender",
    label: { en: "Lavender", es: "Lavanda", fr: "Lavande" },
    scene: "hill",
    top: "#7a6cd8",
    mid: "#b3a8ff",
    low: "#ede9ff",
    base: "#eaf7e0",
    grass: 0.4,
    sun: true,
    rays: true,
    bubbles: true,
    swatch: "linear-gradient(180deg, #7a6cd8, #ede9ff)",
  },
  metal: {
    id: "metal",
    label: { en: "Brushed Metal", es: "Metal cepillado", fr: "Métal brossé" },
    scene: "metal",
    top: "#e8edf1",
    mid: "#b9c3cc",
    low: "#98a5b1",
    base: "#c5cfd7",
    grass: 0,
    // The plate is full-bleed and opaque: a sun or rotating shafts over it
    // would read as a rendering mistake rather than a reflection.
    sun: false,
    rays: false,
    bubbles: false,
    swatch: "linear-gradient(166deg, #fbfdfe, #c2ccd5 46%, #8e9daa)",
  },
  skyline: {
    id: "skyline",
    label: { en: "Skyline", es: "Horizonte", fr: "Horizon urbain" },
    scene: "skyline",
    top: "#1f5fae",
    mid: "#6fb0e8",
    low: "#cfe7fb",
    base: "#f7e5cb",
    grass: 0,
    sun: true,
    rays: false,
    bubbles: false,
    swatch: "linear-gradient(180deg, #1f5fae, #cfe7fb 62%, #2c3f57)",
  },
  water: {
    id: "water",
    label: { en: "Deep Water", es: "Aguas profundas", fr: "Eaux profondes" },
    scene: "water",
    top: "#1fa8c9",
    mid: "#0e6ba8",
    low: "#0a4a7d",
    base: "#062c46",
    grass: 0,
    // Submerged: the light comes from the scene's own shafts, and the rising
    // bubbles finally make literal sense.
    sun: false,
    rays: false,
    bubbles: true,
    swatch: "linear-gradient(180deg, #1fa8c9, #0a4a7d 58%, #062c46)",
  },
  orb: {
    id: "orb",
    label: { en: "Chrome Bubble", es: "Burbuja cromada", fr: "Bulle chromée" },
    scene: "orb",
    top: "#2b7fd4",
    mid: "#79c0f2",
    low: "#d9efff",
    base: "#eaf4ff",
    grass: 0,
    sun: true,
    rays: false,
    bubbles: true,
    swatch: "radial-gradient(circle at 34% 28%, #ffffff, #9fc9ea 44%, #43596b)",
  },
};

/** Ordered list for menus that iterate the variants. */
export const wallpaperList: Wallpaper[] = Object.values(wallpapers);

export const DEFAULT_WALLPAPER: WallpaperId = "sky";
