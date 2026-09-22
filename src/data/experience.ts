import type { Experience } from "./types";

/**
 * Work history, newest first. `period` is the printed range; `startDate` /
 * `endDate` (ISO YYYY-MM) are for sorting and "X years" math.
 */
export const experiences: Experience[] = [
  {
    id: "tecdata",
    company: "TECDATA",
    location: { en: "Madrid, Spain", es: "Madrid, España", fr: "Madrid, Espagne" },
    role: { en: "AI Engineer", es: "Ingeniero de IA", fr: "Ingénieur IA" },
    period: {
      en: "Sep 2026 – Present",
      es: "Sep 2026 – Actualidad",
      fr: "Sept. 2026 – Aujourd'hui",
    },
    startDate: "2026-09",
    endDate: null,
    highlights: [
      {
        kind: "ai",
        text: {
          en: "AI-powered software modernization for Carrefour.",
          es: "Modernización de software con IA para Carrefour.",
          fr: "Modernisation logicielle par l'IA pour Carrefour.",
        },
      },
      {
        kind: "feature",
        text: {
          en: "Designed agentic modernization workflows decomposing legacy migration into discovery, contract-reconstruction, conversion and verification agents.",
          es: "Diseñé flujos de modernización agénticos que descomponen la migración de sistemas heredados en agentes de descubrimiento, reconstrucción de contratos, conversión y verificación.",
          fr: "Conçu des workflows de modernisation agentiques décomposant la migration de systèmes legacy en agents de découverte, de reconstruction des contrats, de conversion et de vérification.",
        },
      },
      {
        kind: "feature",
        text: {
          en: "Architected the orchestration layer: tool contracts, context boundaries, deterministic checkpoints and resumable runs that survive interruption.",
          es: "Diseñé la capa de orquestación: contratos de herramientas, límites de contexto, puntos de control deterministas y ejecuciones reanudables resistentes a interrupciones.",
          fr: "Conçu la couche d'orchestration : contrats d'outils, limites de contexte, points de contrôle déterministes et exécutions reprenables résistantes aux interruptions.",
        },
      },
      {
        kind: "feature",
        text: {
          en: "Built RAG and context-isolation architecture separating reusable engineering knowledge from application-specific legacy context.",
          es: "Construí arquitecturas RAG y de aislamiento de contexto que separan el conocimiento de ingeniería reutilizable del contexto específico de cada sistema heredado.",
          fr: "Développé des architectures RAG et d'isolation du contexte séparant les connaissances d'ingénierie réutilisables du contexte propre à chaque application legacy.",
        },
      },
      {
        kind: "outcome",
        text: {
          en: "Established verification-first pipelines — characterization tests, contract checks, Playwright UI and accessibility validation — gating every migration.",
          es: "Establecí pipelines centrados en la verificación — pruebas de caracterización, comprobaciones de contratos y validación de interfaz y accesibilidad con Playwright — como requisito para cada migración.",
          fr: "Mis en place des pipelines centrés sur la vérification — tests de caractérisation, contrôles de contrats, validation UI et accessibilité avec Playwright — pour sécuriser chaque migration.",
        },
      },
      {
        kind: "outcome",
        text: {
          en: "Delivered migration pilots with Claude Code, OpenAI Codex and MCP servers, under human approval gates at architectural and release decisions.",
          es: "Entregué pilotos de migración con Claude Code, OpenAI Codex y servidores MCP, con aprobación humana en las decisiones de arquitectura y lanzamiento.",
          fr: "Livré des pilotes de migration avec Claude Code, OpenAI Codex et des serveurs MCP, avec validation humaine des décisions d'architecture et de mise en production.",
        },
      },
    ],
  },
  {
    id: "builders-first-source",
    company: "Builder's FirstSource",
    location: { en: "Dallas, TX", es: "Dallas, TX", fr: "Dallas, TX" },
    role: {
      en: "Senior Software Engineer",
      es: "Ingeniero de Software Senior",
      fr: "Ingénieur Logiciel Senior",
    },
    period: { en: "Oct 2019 – Jul 2026", es: "Oct 2019 – Jul 2026", fr: "Oct. 2019 – Juil. 2026" },
    startDate: "2019-10",
    endDate: "2026-07",
    highlights: [
      {
        kind: "feature",
        text: {
          en: "Architected a React, Redux and Node.js Progressive Web App for daily warehouse scanning operations.",
          es: "Diseñé la arquitectura de una aplicación web progresiva con React, Redux y Node.js para las operaciones diarias de escaneo en almacenes.",
          fr: "Conçu l'architecture d'une Progressive Web App en React, Redux et Node.js pour les opérations quotidiennes de scan en entrepôt.",
        },
      },
      {
        kind: "feature",
        text: {
          en: "Implemented micro-frontends with Webpack Module Federation and scaled a Storybook component catalog and design system.",
          es: "Implementé micro-frontends con Webpack Module Federation y amplié un catálogo de componentes en Storybook y un sistema de diseño.",
          fr: "Mis en œuvre des micro-frontends avec Webpack Module Federation et développé un catalogue de composants Storybook et un système de design.",
        },
      },
      {
        kind: "ai",
        text: {
          en: "Introduced AI-assisted development under a mandatory human-review gate, mentoring engineers on pairing AI velocity with SOLID design.",
          es: "Introduje el desarrollo asistido por IA con revisión humana obligatoria y formé a ingenieros para combinar la velocidad de la IA con diseño SOLID.",
          fr: "Introduit le développement assisté par l'IA avec revue humaine obligatoire et accompagné les ingénieurs pour allier la vitesse de l'IA à une conception SOLID.",
        },
      },
    ],
  },
  {
    id: "sngular",
    company: "Sngular",
    location: { en: "Dallas, TX", es: "Dallas, TX", fr: "Dallas, TX" },
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
          en: "Built a shared web component catalog and design system for banking clients.",
          es: "Construí un catálogo compartido de componentes web y un sistema de diseño para clientes del sector bancario.",
          fr: "Créé un catalogue partagé de composants web et un système de design pour des clients du secteur bancaire.",
        },
      },
    ],
  },
  {
    id: "everis",
    company: "Everis",
    location: { en: "Dallas, TX", es: "Dallas, TX", fr: "Dallas, TX" },
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
          en: "Built Balance Transfer and ACH features for a banking origination platform.",
          es: "Desarrollé funcionalidades de transferencia de saldos y ACH para una plataforma de originación bancaria.",
          fr: "Développé les fonctionnalités de transfert de solde et ACH pour une plateforme d'octroi bancaire.",
        },
      },
    ],
  },
];
