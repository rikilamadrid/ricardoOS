import type { Localized, ContactLink } from "./types";
import { profile } from "./profile";

/**
 * Content for the "Contact" window. Intro copy lives here; the actual links
 * are sourced from `profile.contact` so there's a single source of truth for
 * email / socials. No forms — elegant link buttons only.
 */
export interface ContactContent {
  eyebrow: Localized<string>;
  heading: Localized<string>;
  intro: Localized<string>;
  footnote: Localized<string>;
  links: ContactLink[];
}

export const contact: ContactContent = {
  eyebrow: { en: "SAY HELLO", es: "SALUDA", fr: "DITES BONJOUR" },
  heading: { en: "Let's talk", es: "Hablemos", fr: "Discutons" },
  intro: {
    en: "No forms. Pick whichever feels right — I read everything.",
    es: "Sin formularios. Elige el que prefieras — leo todo.",
    fr: "Pas de formulaires. Choisissez ce qui vous va — je lis tout.",
  },
  footnote: {
    en: "Based wherever the wifi is good. Open to interesting conversations and good problems.",
    es: "Donde haya buen wifi. Abierto a conversaciones interesantes y buenos problemas.",
    fr: "Là où le wifi est bon. Ouvert aux conversations intéressantes et aux bons problèmes.",
  },
  links: profile.contact,
};
