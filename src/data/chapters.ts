import type { Localized } from "./types";

/**
 * Content for the "Experience" window. Per the brief, experience is told as
 * impact-focused *chapters* — no job list, no timeline, no bullet points.
 * `when` is a soft marker ("Now", "Before"), not a precise date range.
 */
export interface ExperienceContent {
  eyebrow: Localized<string>;
  heading: Localized<string>;
  intro: Localized<string>;
  chapters: ExperienceChapter[];
}

export interface ExperienceChapter {
  id: string;
  when: Localized<string>;
  title: Localized<string>;
  impact: Localized<string>;
}

export const experienceContent: ExperienceContent = {
  eyebrow: { en: "THE STORY SO FAR", es: "LA HISTORIA HASTA AHORA", fr: "L'HISTOIRE JUSQU'ICI" },
  heading: {
    en: "Experience, as chapters",
    es: "Experiencia, por capítulos",
    fr: "L'expérience, par chapitres",
  },
  intro: {
    en: "Not a job list — the parts that actually changed how I build.",
    es: "No es una lista de empleos — son las partes que de verdad cambiaron cómo construyo.",
    fr: "Pas une liste de postes — les moments qui ont vraiment changé ma façon de construire.",
  },
  chapters: [
    {
      id: "now",
      when: { en: "Now", es: "Ahora", fr: "Maintenant" },
      title: {
        en: "The AI-augmented chapter",
        es: "El capítulo aumentado por IA",
        fr: "Le chapitre augmenté par l'IA",
      },
      impact: {
        en: "Bringing AI-assisted development into a real engineering team — scaffolding, refactoring, faster reviews — always under a strict human-in-the-loop gate that protects quality, security, and architecture.",
        es: "Llevando el desarrollo asistido por IA a un equipo real — scaffolding, refactorización, revisiones más rápidas — siempre bajo un control humano estricto que protege la calidad, la seguridad y la arquitectura.",
        fr: "J'intègre le développement assisté par l'IA dans une vraie équipe — scaffolding, refactoring, revues plus rapides — toujours sous un contrôle humain strict qui protège la qualité, la sécurité et l'architecture.",
      },
    },
    {
      id: "scale",
      when: { en: "Before", es: "Antes", fr: "Avant" },
      title: { en: "The scale chapter", es: "El capítulo de la escala", fr: "Le chapitre de l'échelle" },
      impact: {
        en: "Helped take products from rough edges to something teams relied on daily — micro-frontends, a shared design system, and a component catalog — and learned that polish is itself a feature.",
        es: "Ayudé a llevar productos de los bordes ásperos a algo en lo que los equipos confiaban a diario — micro-frontends, un sistema de diseño compartido y un catálogo de componentes — y aprendí que el pulido es, en sí mismo, una funcionalidad.",
        fr: "J'ai aidé à faire passer des produits de l'ébauche à des outils utilisés quotidiennement — micro-frontends, design system partagé, catalogue de composants — et j'ai appris que la finition est en soi une fonctionnalité.",
      },
    },
    {
      id: "craft",
      when: { en: "Earlier", es: "Más atrás", fr: "Plus tôt" },
      title: { en: "The craft chapter", es: "El capítulo del oficio", fr: "Le chapitre de l'artisanat" },
      impact: {
        en: "Went deep on the front of the stack for banking and distribution products: performance, accessibility, semantic HTML, and the small details that make software feel alive and trustworthy.",
        es: "Me adentré en el front del stack para productos de banca y distribución: rendimiento, accesibilidad, HTML semántico y los pequeños detalles que hacen que el software se sienta vivo y confiable.",
        fr: "Je me suis plongé dans le front de la stack pour des produits bancaires et de distribution : performance, accessibilité, HTML sémantique, et les détails qui rendent un logiciel vivant et digne de confiance.",
      },
    },
    {
      id: "origin",
      when: { en: "Origin", es: "Origen", fr: "Origine" },
      title: { en: "The curiosity chapter", es: "El capítulo de la curiosidad", fr: "Le chapitre de la curiosité" },
      impact: {
        en: "Started by taking things apart on purpose to understand them. Still my favourite way to learn — and the reason this site exists.",
        es: "Empecé desarmando cosas a propósito para entenderlas. Sigue siendo mi forma favorita de aprender — y la razón por la que existe este sitio.",
        fr: "J'ai commencé en démontant les choses exprès pour les comprendre. C'est encore ma façon préférée d'apprendre — et la raison d'être de ce site.",
      },
    },
  ],
};
