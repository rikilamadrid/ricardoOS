import type { Profile } from "./types";

/**
 * Core identity + contact. Source: the September 2026 résumés (EN/ES/FR).
 */
export const profile: Profile = {
  name: "Ricardo Lamadrid",
  initials: "RL",
  title: {
    en: "AI Engineer · Senior Software Engineer",
    es: "Ingeniero de IA · Ingeniero de Software Senior",
    fr: "Ingénieur IA · Ingénieur logiciel senior",
  },
  tagline: {
    en: "Agentic systems · AI-powered modernization",
    es: "Sistemas agénticos · Modernización con IA",
    fr: "Systèmes agentiques · Modernisation par l'IA",
  },
  summary: {
    en: "Software engineer with 10+ years in production web systems, now building agentic AI systems for software modernization. Designs the system around the model: orchestration, context and tool boundaries, retrieval architecture, evaluation and verification gates that keep generated work reviewable.",
    es: "Ingeniero de software con más de 10 años de experiencia en sistemas web en producción, especializado actualmente en sistemas de IA agéntica para la modernización de software. Diseña el sistema alrededor del modelo: orquestación, límites de contexto y herramientas, arquitectura de recuperación, evaluación y controles de verificación que mantienen el trabajo generado revisable.",
    fr: "Ingénieur logiciel avec plus de 10 ans d'expérience sur des systèmes web en production, désormais spécialisé dans les systèmes d'IA agentique pour la modernisation logicielle. Conçoit le système autour du modèle : orchestration, limites de contexte et d'outils, architecture de récupération, évaluation et contrôles de vérification afin que le travail généré reste révisable.",
  },
  contact: [
    {
      id: "email",
      label: { en: "Email", es: "Correo", fr: "E-mail" },
      value: {
        en: "riki.lamadrid@gmail.com",
        es: "riki.lamadrid@gmail.com",
        fr: "riki.lamadrid@gmail.com",
      },
      href: "mailto:riki.lamadrid@gmail.com",
      icon: "✉️",
    },
    {
      id: "phone",
      label: { en: "Phone", es: "Teléfono", fr: "Téléphone" },
      value: {
        en: "🇪🇸 +34 624 442 572 / 🇺🇸 +1 323-977-0070",
        es: "🇪🇸 +34 624 442 572 / 🇺🇸 +1 323-977-0070",
        fr: "🇪🇸 +34 624 442 572 / 🇺🇸 +1 323-977-0070",
      },
      href: "tel:+13239770070",
      icon: "☎️",
    },
    {
      id: "location",
      label: { en: "Location", es: "Ubicación", fr: "Localisation" },
      value: {
        en: "Madrid, Spain · Remote",
        es: "Madrid, España · Remoto",
        fr: "Madrid, Espagne · Télétravail",
      },
      href: "https://maps.google.com/?q=Madrid,Spain",
      icon: "📍",
    },
    {
      id: "linkedin",
      label: { en: "LinkedIn", es: "LinkedIn", fr: "LinkedIn" },
      value: {
        en: "linkedin.com/in/rikilamadrid",
        es: "linkedin.com/in/rikilamadrid",
        fr: "linkedin.com/in/rikilamadrid",
      },
      href: "https://linkedin.com/in/rikilamadrid",
      icon: "🔗",
    },
    {
      id: "github",
      label: { en: "GitHub", es: "GitHub", fr: "GitHub" },
      value: {
        en: "github.com/rikilamadrid",
        es: "github.com/rikilamadrid",
        fr: "github.com/rikilamadrid",
      },
      href: "https://github.com/rikilamadrid",
      icon: "⌘",
    },
    {
      id: "website",
      label: { en: "Website", es: "Sitio web", fr: "Site web" },
      value: {
        en: "ricardolamadrid.com",
        es: "ricardolamadrid.com",
        fr: "ricardolamadrid.com",
      },
      href: "https://ricardolamadrid.com",
      icon: "✦",
    },
  ],
};
