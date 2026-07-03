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
    en: "No forms. Pick whatever feels right. I read all of it.",
    es: "Sin formularios. Elige lo que prefieras. Lo leo todo.",
    fr: "Pas de formulaires. Choisissez ce qui vous convient. Je lis tout.",
  },
  footnote: {
    en: "Based wherever the wifi is good. Always up for interesting conversations and good problems to chew on.",
    es: "Ubicado donde haya buen wifi. Siempre dispuesto a conversaciones interesantes y buenos problemas que masticar.",
    fr: "Basé là où le wifi est bon. Toujours partant pour de bonnes conversations et de bons problèmes à ronger.",
  },
  links: profile.contact,
};
