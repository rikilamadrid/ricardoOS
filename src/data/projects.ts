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
    en: "Less a portfolio, more a shelf of things I've built. Some are live, some are still in the oven.",
    es: "Menos un portafolio y más una estantería de cosas que he construido. Algunas están en vivo; otras siguen en el horno.",
    fr: "Moins un portfolio qu'une étagère de choses que j'ai construites. Certaines sont en ligne, d'autres encore au four.",
  },
  items: [
    {
      id: "pokepal",
      title: { en: "PokéPal", es: "PokéPal", fr: "PokéPal" },
      blurb: {
        en: "An iOS-style app for kids who collect Pokémon cards. You scan a card, tag it, and the binder fills up. Local-first, so it's fast, works offline, and installs like the real thing.",
        es: "Una app estilo iOS para niños que coleccionan cartas Pokémon. Escaneas una carta, la etiquetas y el álbum se va llenando. Local primero: rápida, funciona sin conexión y se instala como una app de verdad.",
        fr: "Une app façon iOS pour les enfants qui collectionnent les cartes Pokémon. Tu scannes une carte, tu l'étiquettes, et le classeur se remplit. Local d'abord : rapide, hors ligne et s'installe comme une vraie app.",
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
        en: "A Pokémon card binder that lives on your phone.",
        es: "Un álbum de cartas Pokémon que vive en tu teléfono.",
        fr: "Un classeur de cartes Pokémon qui vit sur ton téléphone.",
      },
      writeup: {
        en: "PokéPal is the app I wish existed for kids who collect Pokémon cards. You scan a card, tag it with name, type, rarity, and Pokédex number, and the collection grows from there. No spreadsheets, no shoeboxes.\n\nIt's local-first, so the collection lives on the device: fast, offline, and yours. It installs as a PWA, and it ships to iOS through Capacitor, which wraps the same Next.js app in a native shell so the camera and the scan flow feel at home on a phone instead of bolted on.\n\nUnder the hood it's Next.js, React, and Tailwind, with Supabase handling Postgres, auth, and storage. Every screen is shaped like a phone: full-viewport, thumb-friendly, and unapologetically playful. It's for kids, after all.",
        es: "PokéPal es la app que me habría gustado tener para los niños que coleccionan cartas Pokémon. Escaneas una carta, la etiquetas con nombre, tipo, rareza y número de Pokédex, y la colección crece desde ahí. Sin hojas de cálculo, sin cajas de zapatos.\n\nEs local primero, así que la colección vive en el dispositivo: rápida, sin conexión y tuya. Se instala como PWA y llega a iOS mediante Capacitor, que envuelve la misma app de Next.js en una carcasa nativa para que la cámara y el escaneo se sientan como en casa en un teléfono, no pegados con celo.\n\nPor dentro es Next.js, React y Tailwind, con Supabase encargándose de Postgres, autenticación y almacenamiento. Cada pantalla tiene forma de teléfono: pantalla completa, cómoda para el pulgar y descaradamente juguetona. Es para niños, al fin y al cabo.",
        fr: "PokéPal est l'app que j'aurais aimé avoir pour les enfants qui collectionnent les cartes Pokémon. Tu scannes une carte, tu l'étiquettes avec le nom, le type, la rareté et le numéro de Pokédex, et la collection grandit à partir de là. Pas de tableurs, pas de boîtes à chaussures.\n\nElle est local d'abord, donc la collection vit sur l'appareil : rapide, hors ligne et à toi. Elle s'installe en PWA et arrive sur iOS via Capacitor, qui enveloppe la même app Next.js dans une coque native pour que l'appareil photo et le scan soient à leur place sur un téléphone, plutôt que collés à la va-vite.\n\nSous le capot, c'est Next.js, React et Tailwind, avec Supabase pour Postgres, l'authentification et le stockage. Chaque écran a la forme d'un téléphone : plein écran, adapté au pouce et résolument joueur. C'est pour des enfants, après tout.",
      },
    },
    {
      id: "ricardo-os",
      title: { en: "Ricardo OS", es: "Ricardo OS", fr: "Ricardo OS" },
      blurb: {
        en: "This site. A tiny operating system pretending to be a portfolio: windows, a dock, and a terminal that talks back.",
        es: "Este sitio. Un pequeño sistema operativo que finge ser un portafolio: ventanas, un dock y una terminal que responde.",
        fr: "Ce site. Un petit système d'exploitation qui se fait passer pour un portfolio : des fenêtres, un dock et un terminal qui répond.",
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
        en: "RicardoOS is my attempt at a personal site that's worth exploring instead of scrolling. Instead of reading a résumé, you boot a desktop, drag windows around, switch wallpapers, and trip over the occasional easter egg.\n\nIt runs on Next.js, React, and Tailwind, with a Zustand window manager doing the unglamorous work: focus, z-order, dragging, resizing. The look is Frutiger Aero, all that early-2000s gloss and translucency, held to a modern bar for performance and accessibility so the nostalgia doesn't cost you a smooth experience.\n\nIt's not novelty for novelty's sake. I wanted something that feels made by a person who actually enjoys making things. You're looking at it.",
        es: "RicardoOS es mi intento de hacer un sitio personal que valga la pena explorar en vez de recorrer con el scroll. En lugar de leer un currículum, arrancas un escritorio, arrastras ventanas, cambias fondos y tropiezas con alguna que otra sorpresa.\n\nFunciona con Next.js, React y Tailwind, con un gestor de ventanas en Zustand haciendo el trabajo poco glamuroso: foco, orden, arrastre y tamaño. La estética es Frutiger Aero, todo ese brillo y translucidez de principios de los 2000, con un listón moderno de rendimiento y accesibilidad para que la nostalgia no te cueste una experiencia fluida.\n\nNo es novedad por la novedad. Quería algo que se sintiera hecho por alguien que de verdad disfruta creando cosas. Lo estás mirando.",
        fr: "RicardoOS, c'est ma tentative de faire un site personnel qui vaille la peine d'être exploré plutôt que scrollé. Au lieu de lire un CV, tu démarres un bureau, tu déplaces des fenêtres, tu changes de fond d'écran et tu tombes sur l'une ou l'autre surprise.\n\nIl tourne sous Next.js, React et Tailwind, avec un gestionnaire de fenêtres en Zustand qui fait le travail ingrat : focus, ordre d'affichage, glissement, redimensionnement. Le style est Frutiger Aero, toute cette brillance et cette translucidité du début des années 2000, tenu à un niveau moderne de performance et d'accessibilité pour que la nostalgie ne te coûte pas une expérience fluide.\n\nCe n'est pas de la nouveauté pour la nouveauté. Je voulais quelque chose qui semble fait par une personne qui aime vraiment fabriquer des choses. Tu es en train de le regarder.",
      },
    },
  ],
};
