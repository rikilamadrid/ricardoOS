import type { SkillGroup } from "./types";

/**
 * Skills grouped as on the September 2026 résumé. Brand names are repeated
 * across locales for consistency and presented as unranked tags.
 */
export const skillGroups: SkillGroup[] = [
  {
    id: "ai-engineering",
    category: { en: "AI Engineering", es: "Ingeniería de IA", fr: "Ingénierie IA" },
    skills: [
      { name: { en: "AI Agents", es: "AI Agents", fr: "AI Agents" } },
      { name: { en: "LLMs", es: "LLMs", fr: "LLMs" } },
      { name: { en: "RAG", es: "RAG", fr: "RAG" } },
      { name: { en: "Agentic Workflows", es: "Agentic Workflows", fr: "Agentic Workflows" } },
      { name: { en: "MCP", es: "MCP", fr: "MCP" } },
      { name: { en: "LLM Evals", es: "LLM Evals", fr: "LLM Evals" } },
      { name: { en: "Context Engineering", es: "Context Engineering", fr: "Context Engineering" } },
    ],
  },
  {
    id: "software",
    category: { en: "Software", es: "Software", fr: "Logiciel" },
    skills: [
      { name: { en: "Python", es: "Python", fr: "Python" } },
      { name: { en: "TypeScript", es: "TypeScript", fr: "TypeScript" } },
      { name: { en: "Node.js", es: "Node.js", fr: "Node.js" } },
      { name: { en: "React", es: "React", fr: "React" } },
      { name: { en: "Next.js", es: "Next.js", fr: "Next.js" } },
    ],
  },
  {
    id: "architecture",
    category: { en: "Architecture", es: "Arquitectura", fr: "Architecture" },
    skills: [
      { name: { en: "AI Modernization", es: "AI Modernization", fr: "AI Modernization" } },
      { name: { en: "Micro-frontends", es: "Micro-frontends", fr: "Micro-frontends" } },
      { name: { en: "Design Systems", es: "Design Systems", fr: "Design Systems" } },
      { name: { en: "Storybook", es: "Storybook", fr: "Storybook" } },
      { name: { en: "API Integration", es: "API Integration", fr: "API Integration" } },
    ],
  },
  {
    id: "delivery",
    category: { en: "Delivery", es: "Entrega", fr: "Livraison" },
    skills: [
      { name: { en: "Docker", es: "Docker", fr: "Docker" } },
      { name: { en: "CI/CD", es: "CI/CD", fr: "CI/CD" } },
      { name: { en: "Playwright", es: "Playwright", fr: "Playwright" } },
      { name: { en: "GitHub Actions", es: "GitHub Actions", fr: "GitHub Actions" } },
    ],
  },
];
