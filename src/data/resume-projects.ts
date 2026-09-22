import type { ResumeProject } from "./types";

/** Selected projects featured in the September 2026 résumé. */
export const resumeProjects: ResumeProject[] = [
  {
    id: "pathfinder",
    name: "Pathfinder",
    description: {
      en: "Agent orchestration kit for multi-agent delivery — Git worktrees, agent claims, verification gates, resumable state. On npm.",
      es: "Kit de orquestación de agentes para desarrollo multiagente — worktrees de Git, asignación de agentes, controles de verificación y estado reanudable. Publicado en npm.",
      fr: "Kit d'orchestration d'agents pour le développement multi-agent — worktrees Git, attribution des agents, contrôles de vérification et état reprenable. Publié sur npm.",
    },
  },
  {
    id: "forge",
    name: "Forge",
    description: {
      en: "Local LLM inference SDK and CLI for Ollama and Qwen models (TypeScript) — config validation, timeouts, metrics. On npm.",
      es: "SDK y CLI de inferencia local de LLM para modelos Ollama y Qwen (TypeScript) — validación de configuración, tiempos de espera y métricas. Publicado en npm.",
      fr: "SDK et CLI d'inférence locale de LLM pour les modèles Ollama et Qwen (TypeScript) — validation de configuration, délais d'attente et métriques. Publié sur npm.",
    },
  },
  {
    id: "lama",
    name: "LAMA",
    description: {
      en: "Local-first AI assistant on Forge (Next.js, React), self-hosted.",
      es: "Asistente de IA local-first sobre Forge (Next.js, React), autoalojado.",
      fr: "Assistant IA local-first basé sur Forge (Next.js, React), auto-hébergé.",
    },
  },
];
