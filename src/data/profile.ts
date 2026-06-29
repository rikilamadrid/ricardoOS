import type { Profile } from "./types";

/**
 * Core identity + contact. Contact values are locale-independent; only the
 * labels translate. Source: Ricardo_Lamadrid_Resume_2026 (EN/ES).
 */
export const profile: Profile = {
  name: "Ricardo Lamadrid",
  initials: "RL",
  title: {
    en: "Full-Stack Senior Software Engineer · AI-Augmented Engineering",
    es: "Ingeniero de Software Senior Full-Stack · Ingeniería Aumentada con IA",
    fr: "Ingénieur Logiciel Senior Full-Stack · Ingénierie Augmentée par l'IA",
  },
  tagline: {
    en: "Calm software, glassy interfaces, slightly-too-ambitious ideas.",
    es: "Software tranquilo, interfaces de cristal, ideas un poco demasiado ambiciosas.",
    fr: "Des logiciels apaisés, des interfaces de verre, des idées un peu trop ambitieuses.",
  },
  summary: {
    en: "Full-stack Senior Software Engineer with 10+ years building production frontend and backend — specializing in component-driven architecture, design systems, and micro-frontends. Currently focused on integrating AI-assisted development into the engineering lifecycle, always under a human-in-the-loop review process that protects code quality, system security, and architectural integrity. Bridges strong fundamentals (SOLID, clean code, semantic HTML, accessibility) with a pragmatic, security-conscious approach to AI tooling.",
    es: "Ingeniero de Software Senior full-stack con más de 10 años de experiencia construyendo sistemas frontend y backend, especializado en arquitectura basada en componentes, sistemas de diseño y micro-frontends. Actualmente enfocado en integrar el desarrollo asistido por IA dentro del ciclo de ingeniería, siempre bajo un proceso de revisión humana que protege la calidad del código, la seguridad y la integridad arquitectónica. Combina fundamentos sólidos (SOLID, código limpio, HTML semántico, accesibilidad) con un enfoque pragmático y consciente de la seguridad hacia las herramientas de IA.",
    fr: "Ingénieur logiciel senior full-stack avec plus de 10 ans d'expérience dans la construction de frontends et backends en production, spécialisé dans l'architecture orientée composants, les design systems et les micro-frontends. Actuellement concentré sur l'intégration du développement assisté par l'IA dans le cycle d'ingénierie, toujours sous un processus de revue humaine qui protège la qualité du code, la sécurité des systèmes et l'intégrité architecturale. Allie des fondamentaux solides (SOLID, code propre, HTML sémantique, accessibilité) à une approche pragmatique et soucieuse de la sécurité des outils d'IA.",
  },
  contact: [
    {
      id: "email",
      label: { en: "Email", es: "Correo", fr: "E-mail" },
      value: "riki.lamadrid@gmail.com",
      href: "mailto:riki.lamadrid@gmail.com",
      icon: "✉️",
    },
    {
      id: "phone",
      label: { en: "Phone", es: "Teléfono", fr: "Téléphone" },
      value: "+1 / +34 323-977-0070",
      href: "tel:+13239770070",
      icon: "☎️",
    },
    {
      id: "location",
      label: { en: "Location", es: "Ubicación", fr: "Localisation" },
      value: "Madrid, Spain / Remote",
      href: "https://maps.google.com/?q=Madrid,Spain",
      icon: "📍",
    },
    {
      id: "linkedin",
      label: { en: "LinkedIn", es: "LinkedIn", fr: "LinkedIn" },
      value: "linkedin.com/in/rikilamadrid",
      href: "https://linkedin.com/in/rikilamadrid",
      icon: "🔗",
    },
    {
      id: "website",
      label: { en: "Website", es: "Sitio web", fr: "Site web" },
      value: "ricardolamadrid.com",
      href: "https://ricardolamadrid.com",
      icon: "✦",
    },
  ],
};
