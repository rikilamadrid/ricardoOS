import type { Localized } from "./types";

/**
 * Winamp player skins (phase 15B). Each skin is a look the media player can
 * wear, like the real Winamp did. The visual work lives in CSS: the base
 * `.os-wa` block in globals.css holds the Classic tokens, and every other
 * skin re-paints them under `.os-wa[data-skin="<id>"]`. This registry only
 * drives the titlebar switcher (label + swatch) and is the source of truth
 * for which skin ids are valid.
 */
export type SkinId = "classic" | "aero" | "amber";

export interface Skin {
  id: SkinId;
  label: Localized<string>;
  /** Swatch color for the switcher dot (CSS color). */
  swatch: string;
}

export const skins: Skin[] = [
  {
    id: "classic",
    label: { en: "Classic", es: "Clásico", fr: "Classique" },
    swatch: "#1fe37d",
  },
  {
    id: "aero",
    label: { en: "Frutiger Aero", es: "Frutiger Aero", fr: "Frutiger Aero" },
    swatch: "#5aa9ea",
  },
  {
    id: "amber",
    label: { en: "Amber CRT", es: "CRT Ámbar", fr: "CRT Ambre" },
    swatch: "#ffb038",
  },
];

export const DEFAULT_SKIN: SkinId = "classic";
