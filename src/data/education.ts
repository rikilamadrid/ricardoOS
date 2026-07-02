import type { Education, LanguageProficiency } from "./types";

export const education: Education[] = [
  {
    id: "cs-upr",
    degree: {
      en: "Bachelor of Computer Science",
      es: "Licenciatura en Ciencias de la Computación",
      fr: "Licence en Informatique",
    },
    institution: "University of Puerto Rico",
  },
  {
    id: "bfa-aau",
    degree: {
      en: "Bachelor of Fine Arts",
      es: "Licenciatura en Bellas Artes",
      fr: "Licence en Beaux-Arts",
    },
    institution: "Academy of Art University",
  },
];

/** Spoken languages with self-rated proficiency (out of 5). */
export const languageProficiency: LanguageProficiency[] = [
  {
    id: "spanish",
    name: { en: "Spanish", es: "Español", fr: "Espagnol" },
    level: 5,
    note: { en: "Native", es: "Nativo", fr: "Langue maternelle" },
  },
  {
    id: "english",
    name: { en: "English", es: "Inglés", fr: "Anglais" },
    level: 5,
    note: { en: "Native", es: "Nativo", fr: "Langue maternelle" },
  },
  {
    id: "french",
    name: { en: "French", es: "Francés", fr: "Français" },
    level: 5,
    note: { en: "Fluent", es: "Fluido", fr: "Courant" },
  },
];
