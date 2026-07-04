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
  /**
   * Optional CSS texture painted inside the card thumbnail — a "peek" at the
   * project's own vibe, framed by the Aero glass. Falls back to the plain
   * gradient when omitted.
   */
  motif?: "neon-grid" | "holo" | "bubbles" | "led-green";
  /**
   * Optional screenshot shown in the card thumbnail (path under `/public`,
   * e.g. `/projects/ai-strategy-table.png`). Layers over the motif, so a
   * missing file degrades gracefully to the motif + gradient.
   */
  screenshot?: string;
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
      motif: "holo",
      screenshot: "/projects/pokepal.png",
    },
    {
      id: "ai-strategy-table",
      title: { en: "AI Strategy Table", es: "Mesa de Estrategia IA", fr: "Table de Stratégie IA" },
      blurb: {
        en: "Ask a hard question and four AI advisors argue it out in a Brass & Neon war room, then a moderator boils the noise down to one decision brief. It's stateless and cost-disciplined, so a whole session is two or three model calls, not a runaway meter.",
        es: "Haces una pregunta difícil y cuatro asesores de IA la debaten en una sala de guerra de latón y neón; luego un moderador reduce el ruido a un solo informe de decisión. No guarda estado y cuida el gasto, así que una sesión entera son dos o tres llamadas al modelo, no un contador desbocado.",
        fr: "Tu poses une question épineuse et quatre conseillers IA en débattent dans une war room laiton et néon, puis un modérateur réduit le bruit à une seule note de décision. Sans état et sobre en coûts : une session entière tient en deux ou trois appels au modèle, pas un compteur qui s'emballe.",
      },
      status: "building",
      tags: ["Next.js", "TypeScript", "Vercel AI SDK"],
      icon: "♟️",
      from: "#f5b642",
      to: "#ff2d78",
      links: [
        { label: { en: "Live demo", es: "Demo en vivo", fr: "Démo en ligne" }, href: "https://ai-strategy-room-bice.vercel.app" },
        { label: { en: "GitHub", es: "GitHub", fr: "GitHub" }, href: "https://github.com/rikilamadrid/ai-strategy-room" },
      ],
      year: 2026,
      tagline: {
        en: "A cinematic multi-agent decision room.",
        es: "Una sala de decisiones multiagente y cinematográfica.",
        fr: "Une salle de décision multi-agents et cinématographique.",
      },
      writeup: {
        en: "AI Strategy Table is what happens when you stop asking one model for one answer and instead sit four of them around a table. You type a strategic question, and four AI advisors with different temperaments deliberate on it in a Brass & Neon war-room UI. A moderator then reads the room and hands you a single decision brief instead of four competing walls of text.\n\nThe interesting constraint was money. It would be easy to let agents chatter forever and watch the bill climb, so the whole thing is stateless and deliberately cheap: a full session is two or three model calls, no more. Every response is structured output validated with Zod, which means the UI never has to guess what a model meant, and I never have to parse prose by hand.\n\nIt runs on Next.js and TypeScript, with the Vercel AI SDK orchestrating the calls, Zustand holding the session together on the client, and Tailwind carrying the war-room look. It's less a chatbot and more a decision instrument that happens to think out loud.",
        es: "AI Strategy Table es lo que pasa cuando dejas de pedirle una respuesta a un solo modelo y en su lugar sientas a cuatro alrededor de una mesa. Escribes una pregunta estratégica y cuatro asesores de IA con temperamentos distintos la deliberan en una interfaz de sala de guerra de latón y neón. Después un moderador lee la sala y te entrega un único informe de decisión en vez de cuatro muros de texto que compiten.\n\nLa restricción interesante era el dinero. Sería fácil dejar que los agentes charlen sin fin y ver subir la factura, así que todo es sin estado y deliberadamente barato: una sesión completa son dos o tres llamadas al modelo, no más. Cada respuesta es salida estructurada validada con Zod, así la interfaz nunca tiene que adivinar qué quiso decir un modelo y yo nunca tengo que analizar prosa a mano.\n\nFunciona con Next.js y TypeScript, con el Vercel AI SDK orquestando las llamadas, Zustand manteniendo la sesión unida en el cliente y Tailwind cargando con la estética de sala de guerra. Es menos un chatbot y más un instrumento de decisión que piensa en voz alta.",
        fr: "AI Strategy Table, c'est ce qui arrive quand tu arrêtes de demander une réponse à un seul modèle et que tu en installes plutôt quatre autour d'une table. Tu tapes une question stratégique, et quatre conseillers IA aux tempéraments différents en délibèrent dans une interface de war room laiton et néon. Un modérateur lit ensuite la salle et te remet une seule note de décision au lieu de quatre pavés de texte concurrents.\n\nLa contrainte intéressante, c'était l'argent. Il serait facile de laisser les agents bavarder sans fin et regarder la note grimper, donc l'ensemble est sans état et volontairement économe : une session complète tient en deux ou trois appels au modèle, pas plus. Chaque réponse est une sortie structurée validée avec Zod, ce qui fait que l'interface n'a jamais à deviner ce qu'un modèle voulait dire, et que je n'ai jamais à analyser de la prose à la main.\n\nÇa tourne sous Next.js et TypeScript, avec le Vercel AI SDK qui orchestre les appels, Zustand qui tient la session côté client et Tailwind qui porte le look war room. C'est moins un chatbot qu'un instrument de décision qui pense à voix haute.",
      },
      motif: "neon-grid",
      screenshot: "/projects/ai-strategy-table.png",
    },
    {
      id: "aero-amp",
      title: { en: "Aero Amp", es: "Aero Amp", fr: "Aero Amp" },
      blurb: {
        en: "A classic Winamp, rebuilt for the browser. Brushed-metal chrome, a green segmented LCD with a scrolling marquee and live spectrum analyzer, a real 10-band equalizer, a dockable playlist, and switchable skins, all streaming real audio through the Web Audio API.",
        es: "Un Winamp clásico, reconstruido para el navegador. Chasis de metal cepillado, un LCD verde segmentado con marquesina y analizador de espectro en vivo, un ecualizador real de 10 bandas, una lista de reproducción acoplable y skins intercambiables, todo transmitiendo audio real por la Web Audio API.",
        fr: "Un Winamp classique, reconstruit pour le navigateur. Châssis en métal brossé, un LCD vert segmenté avec marquee défilant et analyseur de spectre en direct, un vrai égaliseur 10 bandes, une playlist ancrable et des skins interchangeables, le tout diffusant du vrai audio via la Web Audio API.",
      },
      status: "shipped",
      tags: ["Web Audio API", "React", "TypeScript"],
      icon: "🎧",
      from: "#3b424c",
      to: "#12b866",
      links: [
        { label: { en: "Open the player", es: "Abrir el reproductor", fr: "Ouvrir le lecteur" }, href: "/?app=music" },
      ],
      year: 2026,
      tagline: {
        en: "A classic Winamp, rebuilt in the browser.",
        es: "Un Winamp clásico, reconstruido en el navegador.",
        fr: "Un Winamp classique, reconstruit dans le navigateur.",
      },
      writeup: {
        en: "Aero Amp is the media player living inside RicardoOS, and it's an unapologetic love letter to Winamp 2.x. Instead of the soft, glassy Frutiger-Aero panel the rest of the OS wears, it's dark brushed metal, a green segmented LCD, and beveled transport buttons. It's a deliberate retro break that still feels native to the desktop.\n\nUnderneath the nostalgia it's a real player. It streams actual audio files through an HTML audio element wired into the Web Audio API, so the spectrum analyzer dancing across the LCD is reading the live signal, not faking it. The 10-band graphic equalizer is a genuine chain of biquad filters sitting between the source and the analyser, the position and volume sliders do what they say, and the playlist docks and undocks like the real thing.\n\nLike Winamp, it wears skins. A small data-driven registry powers Classic, a Frutiger-Aero \"egg\" alternate, and an Amber CRT look, each just a set of CSS tokens, with your choice persisted across visits. The whole thing floats as its own chromeless window you can drag by the titlebar and resize from the corner grip, because a music player should never be locked to one spot on the desktop.",
        es: "Aero Amp es el reproductor multimedia que vive dentro de RicardoOS, y es una carta de amor sin disculpas a Winamp 2.x. En lugar del panel suave y cristalino Frutiger-Aero que lleva el resto del sistema, es metal cepillado oscuro, un LCD verde segmentado y botones de transporte biselados. Es una ruptura retro deliberada que aún se siente nativa del escritorio.\n\nBajo la nostalgia es un reproductor de verdad. Transmite archivos de audio reales a través de un elemento audio conectado a la Web Audio API, así que el analizador de espectro que baila en el LCD lee la señal en vivo, no la finge. El ecualizador gráfico de 10 bandas es una cadena real de filtros biquad entre la fuente y el analizador, los deslizadores de posición y volumen hacen lo que dicen, y la lista de reproducción se acopla y desacopla como la de verdad.\n\nComo Winamp, lleva skins. Un pequeño registro basado en datos alimenta Classic, una alternativa \"egg\" Frutiger-Aero y un aspecto Amber CRT, cada uno solo un conjunto de tokens CSS, con tu elección guardada entre visitas. Todo flota como su propia ventana sin marco que puedes arrastrar por la barra de título y redimensionar desde la esquina, porque un reproductor de música nunca debería quedar fijo en un solo sitio del escritorio.",
        fr: "Aero Amp est le lecteur multimédia qui vit dans RicardoOS, et c'est une lettre d'amour assumée à Winamp 2.x. Au lieu du panneau doux et vitré Frutiger-Aero que porte le reste de l'OS, c'est du métal brossé sombre, un LCD vert segmenté et des boutons de transport biseautés. C'est une rupture rétro délibérée qui reste native au bureau.\n\nSous la nostalgie, c'est un vrai lecteur. Il diffuse de vrais fichiers audio via un élément audio branché sur la Web Audio API, donc l'analyseur de spectre qui danse sur le LCD lit le signal en direct, il ne le simule pas. L'égaliseur graphique 10 bandes est une véritable chaîne de filtres biquad placée entre la source et l'analyseur, les curseurs de position et de volume font ce qu'ils annoncent, et la playlist s'ancre et se désancre comme la vraie.\n\nComme Winamp, il porte des skins. Un petit registre piloté par les données alimente Classic, une alternative \"egg\" Frutiger-Aero et un look Amber CRT, chacun n'étant qu'un jeu de tokens CSS, ton choix étant conservé d'une visite à l'autre. Le tout flotte comme sa propre fenêtre sans cadre que tu peux déplacer par la barre de titre et redimensionner depuis le coin, parce qu'un lecteur de musique ne devrait jamais être bloqué à un seul endroit du bureau.",
      },
      motif: "led-green",
      screenshot: "/projects/aero-amp.png",
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
      motif: "bubbles",
    },
  ],
};
