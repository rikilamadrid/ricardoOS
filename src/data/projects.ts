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
    en: "Less portfolio, more product shelf — a few live, a few cooking.",
    es: "Menos portafolio, más estantería de productos — algunos en vivo, otros cocinándose.",
    fr: "Moins un portfolio qu'une étagère de produits — quelques-uns en ligne, d'autres qui mijotent.",
  },
  items: [
    {
      id: "pokepal",
      title: { en: "PokéPal", es: "PokéPal", fr: "PokéPal" },
      blurb: {
        en: "A mobile-first, iOS-style Pokémon card companion for kids. Scan a card, tag it, and build a collection — local-first and installable.",
        es: "Un compañero de cartas Pokémon al estilo iOS, pensado para niños y móvil primero. Escanea una carta, etiquétala y arma tu colección — local e instalable.",
        fr: "Un compagnon de cartes Pokémon façon iOS, pensé mobile d'abord pour les enfants. Scannez une carte, étiquetez-la et bâtissez une collection — local et installable.",
      },
      status: "shipped",
      tags: ["Next.js", "Supabase", "Capacitor"],
      icon: "🃏",
      from: "#ffd36e",
      to: "#ff7a8a",
      links: [
        { label: { en: "Live demo", es: "Demo en vivo", fr: "Démo en ligne" }, href: "https://pokepal-three.vercel.app" },
        { label: { en: "GitHub", es: "GitHub", fr: "GitHub" }, href: "https://github.com/rikilamadrid/pokepal" },
      ],
      year: 2026,
      tagline: {
        en: "An iOS-style Pokémon card companion for young collectors.",
        es: "Un compañero de cartas Pokémon estilo iOS para jóvenes coleccionistas.",
        fr: "Un compagnon de cartes Pokémon façon iOS pour jeunes collectionneurs.",
      },
      writeup: {
        en: "PokéPal is a mobile-first companion app for kids building a Pokémon card collection. Scan a card, tag it with name, type, rarity, and Pokédex number, and watch the collection grow.\n\nIt's local-first — the collection lives on the device so it stays fast and works offline — and installable as a PWA. It ships to iOS through Capacitor, wrapping the same Next.js app in a native shell so the camera and scan flow feel at home on a phone.\n\nBuilt on Next.js, React, and Tailwind with Supabase handling Postgres, auth, and storage. The whole thing is shaped like a phone: full-viewport, thumb-friendly, and unmistakably playful.",
        es: "PokéPal es una app compañera, pensada para móvil primero, para que los niños armen su colección de cartas Pokémon. Escanea una carta, etiquétala con nombre, tipo, rareza y número de Pokédex, y ve crecer la colección.\n\nEs local primero — la colección vive en el dispositivo, así que es rápida y funciona sin conexión — e instalable como PWA. Llega a iOS mediante Capacitor, envolviendo la misma app de Next.js en una carcasa nativa para que la cámara y el escaneo se sientan como en casa en un teléfono.\n\nConstruida sobre Next.js, React y Tailwind, con Supabase gestionando Postgres, autenticación y almacenamiento. Todo tiene forma de teléfono: pantalla completa, cómoda para el pulgar e inconfundiblemente juguetona.",
        fr: "PokéPal est une application compagne, pensée mobile d'abord, pour aider les enfants à constituer leur collection de cartes Pokémon. Scannez une carte, étiquetez-la avec le nom, le type, la rareté et le numéro de Pokédex, et regardez la collection grandir.\n\nElle est local d'abord — la collection vit sur l'appareil, donc elle reste rapide et fonctionne hors ligne — et installable en PWA. Elle arrive sur iOS via Capacitor, enveloppant la même application Next.js dans une coque native pour que l'appareil photo et le scan soient à leur place sur un téléphone.\n\nBâtie sur Next.js, React et Tailwind, avec Supabase pour Postgres, l'authentification et le stockage. Le tout a la forme d'un téléphone : plein écran, adapté au pouce et résolument ludique.",
      },
    },
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
  ],
};
