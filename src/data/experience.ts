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
          en: "Architected and shipped a Progressive Web App (PWA) for warehouse scanning using React, Redux, and Node.js services, used daily across distribution operations.",
          es: "Diseñó y lanzó una Progressive Web App (PWA) para escáner de almacén con React, Redux y servicios en Node.js, usada diariamente en operaciones de distribución.",
          fr: "A conçu et livré une Progressive Web App (PWA) pour le scan en entrepôt avec React, Redux et des services Node.js, utilisée quotidiennement dans les opérations de distribution.",
        },
      },
      {
        kind: "feature",
        text: {
          en: "Built and scaled a web component catalog with Storybook, leading the shift to component-driven development and a shared design system.",
          es: "Construyó y escaló un catálogo de componentes web con Storybook, liderando la transición hacia desarrollo basado en componentes y un sistema de diseño compartido.",
          fr: "A construit et fait évoluer un catalogue de composants web avec Storybook, menant la transition vers un développement orienté composants et un design system partagé.",
        },
      },
      {
        kind: "feature",
        text: {
          en: "Implemented a micro-frontend architecture via Webpack Module Federation, enabling independent team deployments without sacrificing a unified app shell.",
          es: "Implementó una arquitectura de micro-frontends mediante Webpack Module Federation, permitiendo despliegues independientes sin perder un app shell unificado.",
          fr: "A mis en place une architecture micro-frontend via Webpack Module Federation, permettant des déploiements d'équipes indépendants sans sacrifier un app shell unifié.",
        },
      },
      {
        kind: "ai",
        text: {
          en: "Introduced AI-assisted development into the team workflow (Claude Code, MCP servers, and context engineering for scaffolding, refactoring, and faster reviews), under a strict human-review gate for every AI-generated change.",
          es: "Introdujo el desarrollo asistido por IA en el flujo del equipo (Claude Code, servidores MCP e ingeniería de contexto para scaffolding, refactorización y revisiones más rápidas), bajo un estricto control de revisión humana para cada cambio generado por IA.",
          fr: "A introduit le développement assisté par l'IA dans le flux de l'équipe (Claude Code, serveurs MCP et ingénierie de contexte pour le scaffolding, le refactoring et des revues plus rapides), sous un contrôle humain strict pour chaque changement généré par l'IA.",
        },
      },
      {
        kind: "outcome",
        text: {
          en: "Mentored engineers on pairing AI-assisted velocity with SOLID design, helping the team adopt AI tooling deliberately rather than reflexively.",
          es: "Mentorizó a otros ingenieros sobre cómo equilibrar la velocidad asistida por IA con el diseño SOLID, fomentando una adopción deliberada de la IA.",
          fr: "A accompagné d'autres ingénieurs pour conjuguer la vélocité assistée par l'IA avec une conception SOLID, favorisant une adoption réfléchie plutôt que réflexe des outils d'IA.",
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
          en: "Contributed to a comprehensive web component catalog with an integrated component generator and design system, used across multiple banking clients.",
          es: "Contribuyó a un catálogo de componentes web con un generador de componentes integrado y un sistema de diseño, usado por varios clientes bancarios.",
          fr: "A contribué à un catalogue complet de composants web doté d'un générateur de composants intégré et d'un design system, utilisé par plusieurs clients bancaires.",
        },
      },
      {
        kind: "outcome",
        text: {
          en: "Enabled client teams to consistently achieve brand-specific look and feel while reusing a shared underlying architecture.",
          es: "Permitió que los equipos de los clientes lograran consistentemente la identidad visual de su marca reutilizando una arquitectura compartida.",
          fr: "A permis aux équipes clientes d'obtenir de façon cohérente l'identité visuelle de leur marque tout en réutilisant une architecture commune.",
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
          en: "Designed and developed features for an internal banking application used to originate accounts and credit cards.",
          es: "Diseñó y desarrolló funcionalidades para una aplicación bancaria interna usada para originar cuentas y tarjetas de crédito.",
          fr: "A conçu et développé des fonctionnalités pour une application bancaire interne servant à ouvrir des comptes et des cartes de crédit.",
        },
      },
      {
        kind: "feature",
        text: {
          en: "Built features for the Balance Transfer and ACH product, handling sensitive financial data and realtime transactions while improving speed and security.",
          es: "Construyó funcionalidades para el producto de Balance Transfer y ACH, manejando datos financieros sensibles y transacciones en tiempo real, mejorando la velocidad y seguridad de la aplicación.",
          fr: "A développé des fonctionnalités pour le produit Balance Transfer et ACH, traitant des données financières sensibles et des transactions en temps réel tout en améliorant la vitesse et la sécurité.",
        },
      },
    ],
  },
];
