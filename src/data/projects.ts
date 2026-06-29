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
  /** Gradient thumbnail stops (top-left → bottom-right). */
  from: string;
  to: string;
  links: { label: Localized<string>; href: string }[];
}

export const projects: ProjectsContent = {
  eyebrow: { en: "THINGS I'M BUILDING", es: "COSAS QUE ESTOY CONSTRUYENDO", fr: "CE QUE JE CONSTRUIS" },
  heading: { en: "Projects", es: "Proyectos", fr: "Projets" },
  intro: {
    en: "Less portfolio, more product shelf — a few live, a few cooking. (Placeholders for now; the real ones land here phase by phase.)",
    es: "Menos portafolio, más estantería de productos — algunos en vivo, otros cocinándose. (Por ahora son marcadores; los reales irán llegando fase por fase.)",
    fr: "Moins un portfolio qu'une étagère de produits — quelques-uns en ligne, d'autres qui mijotent. (Des espaces réservés pour l'instant ; les vrais arriveront phase par phase.)",
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
      from: "#7fd4ff",
      to: "#5aa8ff",
      links: [],
    },
    {
      id: "aero-kit",
      title: { en: "Aero Kit", es: "Aero Kit", fr: "Aero Kit" },
      blurb: {
        en: "An open-source component set for building glossy Frutiger-Aero interfaces — glass, gel buttons, living wallpapers.",
        es: "Un set de componentes de código abierto para crear interfaces Frutiger-Aero brillantes — cristal, botones gel, fondos vivos.",
        fr: "Un ensemble de composants open-source pour bâtir des interfaces Frutiger-Aero brillantes — verre, boutons gel, fonds vivants.",
      },
      status: "placeholder",
      tags: ["React", "Tailwind", "TS"],
      icon: "💎",
      from: "#7ee0c2",
      to: "#2bb8e0",
      links: [],
    },
    {
      id: "questlog",
      title: { en: "Questlog", es: "Questlog", fr: "Questlog" },
      blurb: {
        en: "A task manager that reframes your week as a side-quest log. Playful on the surface, calm underneath.",
        es: "Un gestor de tareas que replantea tu semana como un registro de misiones secundarias. Juguetón por fuera, tranquilo por dentro.",
        fr: "Un gestionnaire de tâches qui transforme votre semaine en journal de quêtes annexes. Ludique en surface, apaisé en dessous.",
      },
      status: "placeholder",
      tags: ["Next.js", "SQLite"],
      icon: "🗺️",
      from: "#b69bff",
      to: "#7d6cff",
      links: [],
    },
    {
      id: "frame",
      title: { en: "Frame", es: "Frame", fr: "Frame" },
      blurb: {
        en: "A tiny tool that makes plain screenshots look intentional — soft shadows, gradients, just enough polish.",
        es: "Una pequeña herramienta que hace que las capturas simples parezcan intencionadas — sombras suaves, degradados, el toque justo.",
        fr: "Un petit outil qui rend les captures d'écran ordinaires intentionnelles — ombres douces, dégradés, juste ce qu'il faut de finition.",
      },
      status: "placeholder",
      tags: ["JS", "Canvas"],
      icon: "🖼️",
      from: "#9be4ff",
      to: "#5ad0a0",
      links: [],
    },
  ],
};
