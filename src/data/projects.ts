import type { Localized } from "./types";

/**
 * Content for the "Projects" window ("Things I'm building").
 * Most entries are intentional placeholders for now — swap `status` to
 * "shipped" and fill `links` as real projects land in later phases.
 */
export interface ProjectsContent {
  eyebrow: Localized<string>;
  heading: Localized<string>;
  intro: Localized<string>;
  items: Project[];
}

export interface Project {
  id: string;
  title: Localized<string>;
  blurb: Localized<string>;
  /** Lifecycle: placeholder = coming soon, building = WIP, shipped = live. */
  status: "placeholder" | "building" | "shipped";
  tags: string[];
  icon: string;
  links: { label: Localized<string>; href: string }[];
}

export const projects: ProjectsContent = {
  eyebrow: { en: "THINGS I'M BUILDING", es: "COSAS QUE ESTOY CONSTRUYENDO", fr: "CE QUE JE CONSTRUIS" },
  heading: { en: "Projects", es: "Proyectos", fr: "Projets" },
  intro: {
    en: "Less portfolio, more proof of what's cooking. (Placeholders for now — the real ones are landing here phase by phase.)",
    es: "Menos portafolio, más prueba de lo que se está cocinando. (Por ahora son marcadores — los reales irán llegando fase por fase.)",
    fr: "Moins un portfolio qu'une preuve de ce qui mijote. (Des espaces réservés pour l'instant — les vrais arriveront phase par phase.)",
  },
  items: [
    {
      id: "ricardo-os",
      title: { en: "Ricardo OS", es: "Ricardo OS", fr: "Ricardo OS" },
      blurb: {
        en: "This site. A tiny operating system standing in for a portfolio — windows, a dock, and a terminal that talks back.",
        es: "Este sitio. Un pequeño sistema operativo que hace de portafolio — ventanas, un dock y una terminal que responde.",
        fr: "Ce site. Un petit système d'exploitation en guise de portfolio — des fenêtres, un dock et un terminal qui répond.",
      },
      status: "building",
      tags: ["Next.js", "TypeScript", "Tailwind"],
      icon: "🧩",
      links: [],
    },
    {
      id: "placeholder-2",
      title: { en: "Coming soon", es: "Próximamente", fr: "Bientôt" },
      blurb: {
        en: "A spot reserved for the next thing. Details when it's real.",
        es: "Un lugar reservado para lo siguiente. Detalles cuando sea real.",
        fr: "Une place réservée pour la prochaine idée. Des détails quand ce sera réel.",
      },
      status: "placeholder",
      tags: [],
      icon: "🛠️",
      links: [],
    },
    {
      id: "placeholder-3",
      title: { en: "Coming soon", es: "Próximamente", fr: "Bientôt" },
      blurb: {
        en: "Another placeholder. Half-formed, on purpose.",
        es: "Otro marcador. A medio formar, a propósito.",
        fr: "Un autre espace réservé. À moitié formé, volontairement.",
      },
      status: "placeholder",
      tags: [],
      icon: "✨",
      links: [],
    },
  ],
};
