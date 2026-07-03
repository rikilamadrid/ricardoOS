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
    en: "Not a job list. Just the parts that actually changed how I build.",
    es: "No es una lista de empleos. Solo las partes que de verdad cambiaron cómo construyo.",
    fr: "Pas une liste de postes. Juste les moments qui ont vraiment changé ma façon de construire.",
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
        en: "I'm getting a real engineering team to actually use AI: scaffolding, refactoring, faster reviews. All of it behind a strict human review gate, because letting a model merge to main unsupervised is how you get an interesting Monday.",
        es: "Estoy logrando que un equipo de ingeniería real use la IA de verdad: scaffolding, refactorización, revisiones más rápidas. Todo detrás de un estricto control de revisión humana, porque dejar que un modelo haga merge a main sin supervisión es la receta perfecta para un lunes memorable.",
        fr: "J'amène une vraie équipe d'ingénierie à réellement utiliser l'IA : scaffolding, refactoring, revues plus rapides. Le tout derrière un contrôle humain strict, parce que laisser un modèle merger sur main sans surveillance, c'est la recette d'un lundi mémorable.",
      },
    },
    {
      id: "scale",
      when: { en: "Before", es: "Antes", fr: "Avant" },
      title: { en: "The scale chapter", es: "El capítulo de la escala", fr: "Le chapitre de l'échelle" },
      impact: {
        en: "I took products from rough-around-the-edges to something teams leaned on every day: micro-frontends, a shared design system, a component catalog. That's where I learned polish isn't decoration, it's a feature.",
        es: "Llevé productos de estar en bruto a algo en lo que los equipos se apoyaban cada día: micro-frontends, un sistema de diseño compartido, un catálogo de componentes. Ahí aprendí que el pulido no es decoración, es una funcionalidad.",
        fr: "J'ai fait passer des produits de l'état brut à des outils sur lesquels les équipes s'appuyaient chaque jour : micro-frontends, design system partagé, catalogue de composants. C'est là que j'ai appris que la finition n'est pas de la décoration, c'est une fonctionnalité.",
      },
    },
    {
      id: "craft",
      when: { en: "Earlier", es: "Más atrás", fr: "Plus tôt" },
      title: { en: "The craft chapter", es: "El capítulo del oficio", fr: "Le chapitre de l'artisanat" },
      impact: {
        en: "I went deep on the front of the stack for banking and distribution products: performance, accessibility, semantic HTML, and the small details that make software feel alive and worth trusting with your money.",
        es: "Me metí a fondo en el front del stack para productos de banca y distribución: rendimiento, accesibilidad, HTML semántico y los pequeños detalles que hacen que el software se sienta vivo y digno de confianza con tu dinero.",
        fr: "Je me suis plongé dans le front de la stack pour des produits bancaires et de distribution : performance, accessibilité, HTML sémantique, et les petits détails qui rendent un logiciel vivant et digne de confiance avec votre argent.",
      },
    },
    {
      id: "origin",
      when: { en: "Origin", es: "Origen", fr: "Origine" },
      title: { en: "The curiosity chapter", es: "El capítulo de la curiosidad", fr: "Le chapitre de la curiosité" },
      impact: {
        en: "I started by taking things apart on purpose, usually before I knew how to put them back. Still my favorite way to learn, and the reason this site exists.",
        es: "Empecé desarmando cosas a propósito, normalmente antes de saber cómo volver a armarlas. Sigue siendo mi forma favorita de aprender, y la razón por la que existe este sitio.",
        fr: "J'ai commencé par démonter les choses exprès, en général avant de savoir les remonter. C'est encore ma façon préférée d'apprendre, et la raison d'être de ce site.",
      },
    },
  ],
};
