import type { Experience } from "./types";

/**
 * Work history, newest first. `period` is the printed range; `startDate` /
 * `endDate` (ISO YYYY-MM) are for sorting and "X years" math.
 */
export const experiences: Experience[] = [
  {
    id: "builders-first-source",
    company: "Builder's First Source",
    location: { en: "Dallas, TX", es: "Dallas, TX (EE. UU.)", fr: "Dallas, TX (États-Unis)" },
    role: {
      en: "Senior Software Engineer",
      es: "Ingeniero de Software Senior",
      fr: "Ingénieur Logiciel Senior",
    },
    period: { en: "Oct 2019 – Present", es: "Oct 2019 – Presente", fr: "Oct. 2019 – Présent" },
    startDate: "2019-10",
    endDate: null,
    highlights: [
      {
        kind: "feature",
        text: {
          en: "I built and shipped a warehouse-scanning PWA (React, Redux, Node services) that distribution teams now lean on every single day.",
          es: "Construí y lancé una PWA de escaneo de almacén (React, Redux, servicios en Node) que los equipos de distribución usan cada día.",
          fr: "J'ai construit et livré une PWA de scan en entrepôt (React, Redux, services Node) que les équipes de distribution utilisent chaque jour.",
        },
      },
      {
        kind: "feature",
        text: {
          en: "I grew a Storybook component catalog from scratch and moved the team toward component-driven development and one shared design system.",
          es: "Levanté un catálogo de componentes en Storybook desde cero y llevé al equipo hacia el desarrollo basado en componentes y un único sistema de diseño compartido.",
          fr: "J'ai bâti un catalogue de composants Storybook à partir de zéro et fait basculer l'équipe vers le développement orienté composants et un seul design system partagé.",
        },
      },
      {
        kind: "feature",
        text: {
          en: "I split the front end into micro-frontends with Webpack Module Federation, so each team could ship on its own schedule without the app feeling stitched together.",
          es: "Dividí el front en micro-frontends con Webpack Module Federation, para que cada equipo desplegara a su ritmo sin que la app pareciera un collage.",
          fr: "J'ai découpé le front en micro-frontends avec Webpack Module Federation, pour que chaque équipe déploie à son rythme sans que l'app paraisse rapiécée.",
        },
      },
      {
        kind: "ai",
        text: {
          en: "I brought AI into how the team actually works (Claude Code, MCP servers, real context engineering for scaffolding, refactors, and faster reviews) with one hard rule: a human reviews every AI-written change before it merges.",
          es: "Metí la IA en el trabajo real del equipo (Claude Code, servidores MCP e ingeniería de contexto de verdad para scaffolding, refactors y revisiones más rápidas) con una regla firme: una persona revisa cada cambio escrito por IA antes de que entre.",
          fr: "J'ai intégré l'IA dans le travail réel de l'équipe (Claude Code, serveurs MCP, vraie ingénierie de contexte pour le scaffolding, les refactors et des revues plus rapides) avec une règle stricte : un humain relit chaque changement écrit par l'IA avant qu'il ne soit fusionné.",
        },
      },
      {
        kind: "outcome",
        text: {
          en: "I coach the team on pairing that AI speed with solid design, so we reach for the tools on purpose instead of on reflex.",
          es: "Acompaño al equipo para combinar esa velocidad con un buen diseño, para que usemos las herramientas a propósito y no por reflejo.",
          fr: "J'accompagne l'équipe pour marier cette vitesse avec une conception solide, afin qu'on utilise ces outils volontairement et non par réflexe.",
        },
      },
    ],
  },
  {
    id: "sngular",
    company: "Sngular",
    location: { en: "Dallas, TX", es: "Dallas, TX (EE. UU.)", fr: "Dallas, TX (États-Unis)" },
    role: {
      en: "Senior Software Engineer",
      es: "Ingeniero de Software Senior",
      fr: "Ingénieur Logiciel Senior",
    },
    period: { en: "May 2019 – Oct 2019", es: "May 2019 – Oct 2019", fr: "Mai 2019 – Oct. 2019" },
    startDate: "2019-05",
    endDate: "2019-10",
    highlights: [
      {
        kind: "feature",
        text: {
          en: "I helped build a web component catalog, with a built-in generator and design system, that several banking clients shipped their products on.",
          es: "Ayudé a construir un catálogo de componentes web, con un generador integrado y un sistema de diseño, sobre el que varios clientes bancarios lanzaron sus productos.",
          fr: "J'ai aidé à construire un catalogue de composants web, avec générateur intégré et design system, sur lequel plusieurs clients bancaires ont livré leurs produits.",
        },
      },
      {
        kind: "outcome",
        text: {
          en: "Each client kept its own brand look while reusing the same architecture underneath, so nobody had to rebuild the wheel.",
          es: "Cada cliente mantuvo su propia identidad de marca reutilizando la misma arquitectura por debajo, así nadie tuvo que reinventar la rueda.",
          fr: "Chaque client gardait son identité de marque tout en réutilisant la même architecture en dessous, sans que personne ait à réinventer la roue.",
        },
      },
    ],
  },
  {
    id: "everis",
    company: "Everis",
    location: { en: "Dallas, TX", es: "Dallas, TX (EE. UU.)", fr: "Dallas, TX (États-Unis)" },
    role: {
      en: "Software Engineer",
      es: "Ingeniero de Software",
      fr: "Ingénieur Logiciel",
    },
    period: { en: "May 2018 – May 2019", es: "May 2018 – May 2019", fr: "Mai 2018 – Mai 2019" },
    startDate: "2018-05",
    endDate: "2019-05",
    highlights: [
      {
        kind: "feature",
        text: {
          en: "I designed and built features for an internal banking app that opened new accounts and credit cards.",
          es: "Diseñé y construí funcionalidades para una app bancaria interna que abría cuentas y tarjetas de crédito.",
          fr: "J'ai conçu et construit des fonctionnalités pour une app bancaire interne qui ouvrait des comptes et des cartes de crédit.",
        },
      },
      {
        kind: "feature",
        text: {
          en: "I worked on the Balance Transfer and ACH product, handling real money and live transactions while making it faster and safer.",
          es: "Trabajé en el producto de Balance Transfer y ACH, manejando dinero real y transacciones en vivo mientras lo hacía más rápido y seguro.",
          fr: "J'ai travaillé sur le produit Balance Transfer et ACH, en gérant de l'argent réel et des transactions en direct tout en le rendant plus rapide et plus sûr.",
        },
      },
    ],
  },
];
