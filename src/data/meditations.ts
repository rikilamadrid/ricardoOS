import type { Localized } from "./types";

/**
 * "Meditations Between Quests" — the reflective zen space. Opening the app
 * dims the desktop and enters another place: a breathing orb, a rotating
 * verse, and a gentle way back. Verses are short, localized, and cycle slowly.
 */
export interface MeditationsContent {
  eyebrow: Localized<string>;
  /** Rotating reflective lines, shown one at a time under the breathing orb. */
  verses: Localized<string>[];
  /** "Breathe in / breathe out" caption under the orb. */
  breath: { in: Localized<string>; out: Localized<string> };
  /** The button that returns to the desktop. */
  back: Localized<string>;
}

export const meditations: MeditationsContent = {
  eyebrow: { en: "MEDITATIONS BETWEEN QUESTS", es: "MEDITACIONES ENTRE MISIONES", fr: "MÉDITATIONS ENTRE LES QUÊTES" },
  verses: [
    {
      en: "Ship the small thing. The small thing is the thing.",
      es: "Lanza lo pequeño. Lo pequeño es lo que importa.",
      fr: "Livre la petite chose. La petite chose est la chose.",
    },
    {
      en: "Curiosity is a renewable resource. Spend it.",
      es: "La curiosidad es un recurso renovable. Gástala.",
      fr: "La curiosité est une ressource renouvelable. Dépense-la.",
    },
    {
      en: "Craft is just caring, repeated.",
      es: "El oficio es solo cuidado, repetido.",
      fr: "L'artisanat n'est que du soin, répété.",
    },
    {
      en: "Rest is part of the build. Breathe.",
      es: "El descanso es parte de la obra. Respira.",
      fr: "Le repos fait partie de la construction. Respire.",
    },
    {
      en: "You are allowed to make things just because they're fun.",
      es: "Tienes permiso de crear cosas solo porque son divertidas.",
      fr: "Tu as le droit de créer des choses juste parce que c'est amusant.",
    },
    {
      en: "Between quests, the hero remembers why they set out.",
      es: "Entre misiones, el héroe recuerda por qué partió.",
      fr: "Entre les quêtes, le héros se souvient pourquoi il est parti.",
    },
  ],
  breath: {
    in: { en: "breathe in", es: "inhala", fr: "inspire" },
    out: { en: "breathe out", es: "exhala", fr: "expire" },
  },
  back: { en: "Return to the desktop", es: "Volver al escritorio", fr: "Retour au bureau" },
};
