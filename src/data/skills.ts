import type { SkillGroup } from "./types";

/**
 * Skills grouped as on the resume. `level` is the count of filled segments
 * (■) out of 5. Brand names are repeated across locales for consistency.
 */
export const skillGroups: SkillGroup[] = [
  {
    id: "frontend-architecture",
    category: {
      en: "Frontend & Architecture",
      es: "Frontend y Arquitectura",
      fr: "Frontend et Architecture",
    },
    skills: [
      { name: { en: "React / Next.js", es: "React / Next.js", fr: "React / Next.js" }, level: 5 },
      { name: { en: "Redux / TanStack", es: "Redux / TanStack", fr: "Redux / TanStack" }, level: 4 },
      { name: { en: "Webpack / MFE", es: "Webpack / MFE", fr: "Webpack / MFE" }, level: 4 },
      { name: { en: "Node.js", es: "Node.js", fr: "Node.js" }, level: 4 },
      { name: { en: "GraphQL", es: "GraphQL", fr: "GraphQL" }, level: 4 },
      { name: { en: "Storybook", es: "Storybook", fr: "Storybook" }, level: 5 },
    ],
  },
  {
    id: "ai-augmented-engineering",
    category: {
      en: "AI-Augmented Engineering",
      es: "Ingeniería Aumentada con IA",
      fr: "Ingénierie Augmentée par l'IA",
    },
    skills: [
      {
        name: {
          en: "Claude Code & CLI agents",
          es: "Claude Code y agentes CLI",
          fr: "Claude Code et agents CLI",
        },
        level: 5,
      },
      { name: { en: "MCP Servers", es: "Servidores MCP", fr: "Serveurs MCP" }, level: 4 },
      {
        name: {
          en: "Context Engineering",
          es: "Ingeniería de Contexto",
          fr: "Ingénierie de Contexte",
        },
        level: 5,
      },
      {
        name: {
          en: "AI-assisted code review",
          es: "Revisión de código asistida por IA",
          fr: "Revue de code assistée par l'IA",
        },
        level: 5,
      },
    ],
  },
  {
    id: "fundamentals-security",
    category: {
      en: "Fundamentals & Security",
      es: "Fundamentos y Seguridad",
      fr: "Fondamentaux et Sécurité",
    },
    skills: [
      {
        name: { en: "SOLID / Clean Code", es: "SOLID / Código Limpio", fr: "SOLID / Code Propre" },
        level: 5,
      },
      {
        name: {
          en: "Semantic HTML / A11y",
          es: "HTML Semántico / Accesibilidad",
          fr: "HTML Sémantique / A11y",
        },
        level: 4,
      },
      {
        name: { en: "Secure Coding", es: "Codificación Segura", fr: "Codage Sécurisé" },
        level: 5,
      },
    ],
  },
];
