import type { Education, LanguageProficiency } from "./types";

export const education: Education[] = [
  {
    id: "cs-upr",
    degree: {
      en: "Bachelor of Computer Science",
      es: "Grado en Ciencias de la Computación",
      fr: "Licence en informatique",
    },
    institution: {
      en: "University of Puerto Rico",
      es: "Universidad de Puerto Rico",
      fr: "Université de Porto Rico",
    },
  },
  {
    id: "bfa-aau",
    degree: {
      en: "Bachelor of Fine Arts",
      es: "Grado en Bellas Artes",
      fr: "Licence en beaux-arts",
    },
    institution: {
      en: "Academy of Art University",
      es: "Academy of Art University",
      fr: "Academy of Art University",
    },
  },
];

/** Spoken languages and proficiency from the September 2026 résumé. */
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
    note: { en: "Fluent", es: "Fluido", fr: "Courant" },
  },
  {
    id: "french",
    name: { en: "French", es: "Francés", fr: "Français" },
    level: 3,
    note: { en: "Working", es: "Profesional", fr: "Professionnel" },
  },
];
