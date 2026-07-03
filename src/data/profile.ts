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
    en: "I'm a full-stack senior software engineer with 10+ years building production frontend and backend, focused on component-driven architecture, design systems, and micro-frontends. These days I'm integrating AI-assisted development into the engineering lifecycle, always behind a human-in-the-loop review that protects code quality, security, and architecture. I pair strong fundamentals (SOLID, clean code, semantic HTML, accessibility) with a pragmatic, security-conscious take on AI tooling.",
    es: "Soy ingeniero de software senior full-stack con más de 10 años construyendo frontend y backend en producción, centrado en arquitectura basada en componentes, sistemas de diseño y micro-frontends. Últimamente integro el desarrollo asistido por IA en el ciclo de ingeniería, siempre detrás de una revisión humana que protege la calidad del código, la seguridad y la arquitectura. Combino fundamentos sólidos (SOLID, código limpio, HTML semántico, accesibilidad) con un enfoque pragmático y consciente de la seguridad hacia las herramientas de IA.",
    fr: "Je suis ingénieur logiciel senior full-stack avec plus de 10 ans à construire des frontends et backends en production, centré sur l'architecture orientée composants, les design systems et les micro-frontends. Ces temps-ci, j'intègre le développement assisté par l'IA dans le cycle d'ingénierie, toujours derrière une revue humaine qui protège la qualité du code, la sécurité et l'architecture. J'allie des fondamentaux solides (SOLID, code propre, HTML sémantique, accessibilité) à une approche pragmatique et soucieuse de la sécurité des outils d'IA.",
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
