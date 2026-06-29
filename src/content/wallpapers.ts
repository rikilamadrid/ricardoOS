import type { Localized } from "@/data";

/**
 * Wallpaper variants for the living desktop (phase 2). Each one drives the
 * sky gradient via the `--wp-*` CSS custom properties set by the theme store.
 * Night theme overrides the sky entirely (see `.os-sky--night` in globals.css),
 * so these stops describe the *day* look.
 */
export type WallpaperId = "sky" | "sunset" | "aurora" | "lavender";

export interface Wallpaper {
  id: WallpaperId;
  label: Localized<string>;
  /** Top gradient stop (zenith). */
  top: string;
  /** Middle gradient stop. */
  mid: string;
  /** Lower gradient stop (horizon haze). */
  low: string;
  /** Strength of the green horizon glow, 0–1. */
  grass: number;
  /** Two-stop gradient used for the context-menu swatch. */
  swatch: string;
}

export const wallpapers: Record<WallpaperId, Wallpaper> = {
  sky: {
    id: "sky",
    label: { en: "Sky", es: "Cielo", fr: "Ciel" },
    top: "#1E6FD9",
    mid: "#4FA8F5",
    low: "#BFE3FF",
    grass: 0.55,
    swatch: "linear-gradient(180deg, #1E6FD9, #BFE3FF)",
  },
  sunset: {
    id: "sunset",
    label: { en: "Sunset", es: "Atardecer", fr: "Coucher de soleil" },
    top: "#ff9e6d",
    mid: "#ffd28a",
    low: "#ffe9c9",
    grass: 0.3,
    swatch: "linear-gradient(180deg, #ff9e6d, #ffe9c9)",
  },
  aurora: {
    id: "aurora",
    label: { en: "Aurora", es: "Aurora", fr: "Aurore" },
    top: "#1b8a8a",
    mid: "#3fd0c0",
    low: "#cdfff2",
    grass: 0.45,
    swatch: "linear-gradient(180deg, #1b8a8a, #cdfff2)",
  },
  lavender: {
    id: "lavender",
    label: { en: "Lavender", es: "Lavanda", fr: "Lavande" },
    top: "#7a6cd8",
    mid: "#b3a8ff",
    low: "#ede9ff",
    grass: 0.4,
    swatch: "linear-gradient(180deg, #7a6cd8, #ede9ff)",
  },
};

/** Ordered list for menus that iterate the variants. */
export const wallpaperList: Wallpaper[] = Object.values(wallpapers);

export const DEFAULT_WALLPAPER: WallpaperId = "sky";
