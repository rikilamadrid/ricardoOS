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
  /** Year started / shipped — shown on the detail page. */
  year?: number;
  /** Short one-liner for the detail-page hero (falls back to `blurb`). */
  tagline?: Localized<string>;
  /** Long-form write-up for `/projects/[slug]`. Blank lines separate paragraphs. */
  writeup?: Localized<string>;
}

/** Slug used for `/projects/[slug]` — currently the stable `id`. */
export const projectSlug = (p: Project): string => p.id;

/** All project entries (the registry list). */
export const projectList = (): Project[] => projects.items;

/** Look up a single project by its slug for the detail page. */
export const getProject = (slug: string): Project | undefined =>
  projects.items.find((p) => projectSlug(p) === slug);

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
      year: 2026,
      tagline: {
        en: "A portfolio that boots like an operating system.",
        es: "Un portafolio que arranca como un sistema operativo.",
        fr: "Un portfolio qui démarre comme un système d'exploitation.",
      },
      writeup: {
        en: "RicardoOS reimagines the personal site as a tiny, glassy operating system. Instead of scrolling a résumé, you boot a desktop, drag windows, switch wallpapers, and stumble on easter eggs.\n\nIt's built on Next.js, React, and Tailwind, with a Zustand-backed window manager handling focus, z-order, drag, and resize. The aesthetic is Frutiger Aero — translucency, gloss, and a living wallpaper — held to a modern bar for performance and accessibility.\n\nThe goal isn't novelty for its own sake. It's to make something that feels built by a person who genuinely loves making things.",
        es: "RicardoOS reimagina el sitio personal como un pequeño sistema operativo de cristal. En lugar de desplazar un currículum, arrancas un escritorio, arrastras ventanas, cambias fondos y descubres sorpresas.\n\nEstá construido sobre Next.js, React y Tailwind, con un gestor de ventanas basado en Zustand que maneja foco, orden, arrastre y tamaño. La estética es Frutiger Aero — translucidez, brillo y un fondo vivo — con un listón moderno de rendimiento y accesibilidad.\n\nEl objetivo no es la novedad por sí misma, sino hacer algo que se sienta creado por alguien a quien le encanta construir cosas.",
        fr: "RicardoOS réinvente le site personnel comme un petit système d'exploitation vitré. Au lieu de faire défiler un CV, vous démarrez un bureau, déplacez des fenêtres, changez de fond d'écran et découvrez des surprises.\n\nIl est bâti sur Next.js, React et Tailwind, avec un gestionnaire de fenêtres basé sur Zustand pour le focus, l'ordre, le glissement et le redimensionnement. L'esthétique est Frutiger Aero — translucidité, brillance et fond vivant — tenue à un niveau moderne de performance et d'accessibilité.\n\nLe but n'est pas la nouveauté en soi, mais de créer quelque chose qui semble fait par une personne qui aime vraiment construire.",
      },
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
      year: 2026,
      tagline: {
        en: "An open-source kit for glossy Frutiger-Aero interfaces.",
        es: "Un kit de código abierto para interfaces Frutiger-Aero brillantes.",
        fr: "Un kit open-source pour des interfaces Frutiger-Aero brillantes.",
      },
      writeup: {
        en: "Aero Kit extracts the surfaces that make RicardoOS feel alive — frosted glass, aqua-gel buttons, glossy tiles, and a living wallpaper — into a small, themeable component set.\n\nThe aim is a tasteful take on Frutiger Aero: optimistic and glossy, but restrained enough to ship in real products. Tokens drive every color, radius, and blur, so a whole theme can shift from a handful of variables.\n\nStill cooking — this page is a placeholder while the API settles.",
        es: "Aero Kit extrae las superficies que hacen que RicardoOS se sienta vivo — cristal esmerilado, botones aqua-gel, mosaicos brillantes y un fondo vivo — en un set de componentes pequeño y personalizable.\n\nLa idea es una versión con buen gusto de Frutiger Aero: optimista y brillante, pero lo bastante contenida para usarse en productos reales. Los tokens controlan cada color, radio y desenfoque, así que todo un tema cambia desde unas pocas variables.\n\nAún cocinándose — esta página es un marcador mientras se asienta la API.",
        fr: "Aero Kit extrait les surfaces qui rendent RicardoOS vivant — verre dépoli, boutons aqua-gel, tuiles brillantes et fond vivant — dans un petit ensemble de composants personnalisable.\n\nL'objectif est une version élégante de Frutiger Aero : optimiste et brillante, mais assez sobre pour des produits réels. Les tokens pilotent chaque couleur, rayon et flou, donc tout un thème change à partir de quelques variables.\n\nEncore en préparation — cette page est un espace réservé le temps que l'API se stabilise.",
      },
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
      year: 2025,
      tagline: {
        en: "A task manager that reads like a side-quest log.",
        es: "Un gestor de tareas que se lee como un registro de misiones.",
        fr: "Un gestionnaire de tâches qui se lit comme un journal de quêtes.",
      },
      writeup: {
        en: "Questlog reframes the week as a log of side-quests — small, finishable, and quietly motivating. Playful on the surface, calm underneath, with no streaks to guilt you into opening it.\n\nIt's an experiment in making productivity feel like play without the gamification clichés: no points economy, no nagging. Just a gentle structure that makes progress visible.\n\nPlaceholder for now while the core loop gets built.",
        es: "Questlog replantea la semana como un registro de misiones secundarias — pequeñas, terminables y discretamente motivadoras. Juguetón por fuera, tranquilo por dentro, sin rachas que te hagan sentir culpable.\n\nEs un experimento para que la productividad se sienta como juego sin los clichés de la gamificación: sin economía de puntos, sin insistencias. Solo una estructura suave que hace visible el progreso.\n\nMarcador por ahora mientras se construye el bucle central.",
        fr: "Questlog transforme la semaine en journal de quêtes annexes — petites, finissables et discrètement motivantes. Ludique en surface, apaisé en dessous, sans séries pour culpabiliser.\n\nC'est une expérience pour rendre la productivité ludique sans les clichés de la gamification : pas d'économie de points, pas de relances. Juste une structure douce qui rend le progrès visible.\n\nEspace réservé pour l'instant, le temps que la boucle principale se construise.",
      },
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
      year: 2025,
      tagline: {
        en: "Makes plain screenshots look intentional.",
        es: "Hace que las capturas simples parezcan intencionadas.",
        fr: "Rend les captures d'écran ordinaires intentionnelles.",
      },
      writeup: {
        en: "Frame is a tiny tool that turns a raw screenshot into something that looks designed — soft shadows, tasteful gradients, balanced padding — in one drop, right in the browser.\n\nNo accounts, no upload: a Canvas pipeline does the work locally. The whole point is to remove the friction between \"I took a screenshot\" and \"this looks intentional.\"\n\nThis page is a placeholder while the export options are finalized.",
        es: "Frame es una pequeña herramienta que convierte una captura cruda en algo que parece diseñado — sombras suaves, degradados con gusto, márgenes equilibrados — en un solo arrastre, en el navegador.\n\nSin cuentas ni subidas: un pipeline de Canvas hace el trabajo localmente. La idea es quitar la fricción entre «hice una captura» y «esto parece intencionado».\n\nEsta página es un marcador mientras se finalizan las opciones de exportación.",
        fr: "Frame est un petit outil qui transforme une capture brute en quelque chose qui semble conçu — ombres douces, dégradés soignés, marges équilibrées — en un seul glisser, dans le navigateur.\n\nNi compte ni téléversement : un pipeline Canvas fait le travail localement. L'idée est de supprimer la friction entre « j'ai pris une capture » et « ça semble intentionnel ».\n\nCette page est un espace réservé le temps de finaliser les options d'export.",
      },
    },
  ],
};
