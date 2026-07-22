import type { Localized } from "./types";

/**
 * Blip — the desktop assistant (phase 20).
 *
 * Blip is a floating bubble character, not an app. Every line below is keyed to
 * something that actually happened in the OS: an app opened, the wallpaper
 * changed, every window closed. This is deliberately *not* a random-quote
 * generator, and the brain (`src/lib/assistant-brain.ts`) never repeats a line
 * within a session, so a long visit gets quieter rather than louder.
 *
 * Pools hold more than one option only where a trigger can fire repeatedly.
 * Once a pool is exhausted Blip simply says nothing, which is the point.
 */

/** Interchangeable lines for one trigger. Picked in order, never reused. */
export type AssistantLinePool = Localized<string>[];

/**
 * One entry in Blip's FAQ bank (phase 21). `patterns` are lowercase
 * substrings checked against the visitor's typed question — first match
 * wins. `action.openApp` (an id from `src/data/os.ts`) is optional: some
 * answers are just words, others also open the relevant app.
 */
export interface FaqEntry {
  id: string;
  patterns: string[];
  answer: Localized<string>;
  action?: { openApp: string };
}

export interface AssistantContent {
  /** Character name — a proper noun, so deliberately not localized. */
  name: string;
  /** Accessible name for the character itself. */
  ariaLabel: Localized<string>;
  /** Accessible name for the little dismiss orb. */
  dismissLabel: Localized<string>;
  /** Context-menu item that brings Blip back. */
  summonLabel: Localized<string>;
  /** Toast on dismiss — teaches the re-summon path at the moment it's needed. */
  dismissToast: Localized<string>;
  /** Toast when Blip is brought back from the context menu. */
  summonToast: Localized<string>;
  /** Accessible name for the button that reveals the ask-a-question panel. */
  askToggleLabel: Localized<string>;
  /** Placeholder text for the ask-a-question input. */
  askPlaceholder: Localized<string>;
  /** Lines for OS-state triggers that aren't tied to a specific app. */
  lines: {
    firstVisit: AssistantLinePool;
    welcomeBack: AssistantLinePool;
    allWindowsClosed: AssistantLinePool;
    wallpaperChanged: AssistantLinePool;
    idle: AssistantLinePool;
    /** Said when the user clicks Blip directly. */
    poke: AssistantLinePool;
  };
  /** One line per app, keyed by app id from `src/data/os.ts`. */
  appLines: Record<string, AssistantLinePool>;
  /** Keyword-matched FAQ bank for the typed-question panel (phase 21). */
  faq: FaqEntry[];
  /** Shown when no `faq` entry matches the typed question. */
  faqFallback: Localized<string>;
}

export const assistant: AssistantContent = {
  name: "Blip",

  ariaLabel: {
    en: "Blip, the desktop assistant",
    es: "Blip, el asistente de escritorio",
    fr: "Blip, l'assistant de bureau",
  },

  dismissLabel: {
    en: "Hide Blip",
    es: "Ocultar a Blip",
    fr: "Masquer Blip",
  },

  summonLabel: {
    en: "Show Blip",
    es: "Mostrar a Blip",
    fr: "Afficher Blip",
  },

  dismissToast: {
    en: "👋 Blip went quiet. Right-click the desktop to bring it back.",
    es: "👋 Blip se ha callado. Haz clic derecho en el escritorio para traerlo de vuelta.",
    fr: "👋 Blip s'est tu. Clic droit sur le bureau pour le faire revenir.",
  },

  summonToast: {
    en: "🫧 Blip is back.",
    es: "🫧 Blip ha vuelto.",
    fr: "🫧 Blip est de retour.",
  },

  askToggleLabel: {
    en: "Ask Blip a question",
    es: "Pregúntale algo a Blip",
    fr: "Poser une question à Blip",
  },

  askPlaceholder: {
    en: "Ask me something…",
    es: "Pregúntame algo…",
    fr: "Demande-moi quelque chose…",
  },

  lines: {
    firstVisit: [
      {
        en: "Hi, I'm Blip. Drag me anywhere. I'll keep you company.",
        es: "Hola, soy Blip. Arrástrame a donde quieras, te haré compañía.",
        fr: "Salut, je suis Blip. Déplace-moi où tu veux, je te tiens compagnie.",
      },
    ],

    welcomeBack: [
      {
        en: "Oh good, you're back. Nothing moved while you were gone.",
        es: "Qué bien, has vuelto. Nada se ha movido mientras no estabas.",
        fr: "Ah, te revoilà. Rien n'a bougé pendant ton absence.",
      },
    ],

    allWindowsClosed: [
      {
        en: "All quiet. Just us and the wallpaper.",
        es: "Todo en calma. Solo nosotros y el fondo de pantalla.",
        fr: "Tout est calme. Juste nous et le fond d'écran.",
      },
    ],

    wallpaperChanged: [
      {
        en: "Good pick. That one suits the place.",
        es: "Buena elección. Ese le queda bien a la casa.",
        fr: "Bon choix. Celui-là va bien à la maison.",
      },
      {
        en: "New sky. I approve.",
        es: "Cielo nuevo. Lo apruebo.",
        fr: "Nouveau ciel. J'approuve.",
      },
    ],

    idle: [
      {
        en: "Still there? Try right-clicking the desktop. There's more to change than you'd think.",
        es: "¿Sigues ahí? Prueba a hacer clic derecho en el escritorio. Hay más cosas que cambiar de las que crees.",
        fr: "Toujours là ? Essaie un clic droit sur le bureau. Il y a plus à changer qu'on ne croit.",
      },
      {
        en: "Take your time. I float either way.",
        es: "Tómate tu tiempo. Yo floto igual.",
        fr: "Prends ton temps. Je flotte de toute façon.",
      },
    ],

    poke: [
      {
        en: "That tickles.",
        es: "Eso hace cosquillas.",
        fr: "Ça chatouille.",
      },
      {
        en: "Yes? I'm mostly decorative, but I'm listening.",
        es: "¿Sí? Soy sobre todo decorativo, pero te escucho.",
        fr: "Oui ? Je suis surtout décoratif, mais j'écoute.",
      },
    ],
  },

  appLines: {
    about: [
      {
        en: "That one was written by hand. No template.",
        es: "Eso está escrito a mano. Sin plantilla.",
        fr: "Ça a été écrit à la main. Sans modèle.",
      },
    ],
    projects: [
      {
        en: "The good stuff. Every card opens a real page.",
        es: "Lo bueno. Cada tarjeta abre una página de verdad.",
        fr: "Le meilleur. Chaque carte ouvre une vraie page.",
      },
    ],
    writing: [
      {
        en: "Field Notes. Longer thoughts, fewer bullet points.",
        es: "Notas de Campo. Ideas más largas, menos viñetas.",
        fr: "Notes de Terrain. Des idées plus longues, moins de puces.",
      },
    ],
    experience: [
      {
        en: "Chapters, not a timeline. That was on purpose.",
        es: "Capítulos, no una línea temporal. Fue a propósito.",
        fr: "Des chapitres, pas une frise. C'était volontaire.",
      },
    ],
    resume: [
      {
        en: "The formal version. It even prints.",
        es: "La versión formal. Hasta se puede imprimir.",
        fr: "La version formelle. Elle s'imprime même.",
      },
    ],
    contact: [
      {
        en: "Go on, say hello. Every message gets read.",
        es: "Anda, saluda. Todos los mensajes se leen.",
        fr: "Vas-y, dis bonjour. Tous les messages sont lus.",
      },
    ],
    music: [
      {
        en: "Aero Amp. Those are Ricardo's own tracks, by the way.",
        es: "Aero Amp. Por cierto, esos temas son de Ricardo.",
        fr: "Aero Amp. Au fait, ces morceaux sont de Ricardo.",
      },
    ],
    terminal: [
      {
        en: "There's a real parser in there. Try typing sudo.",
        es: "Ahí dentro hay un intérprete de verdad. Prueba a escribir sudo.",
        fr: "Il y a un vrai interpréteur là-dedans. Essaie de taper sudo.",
      },
    ],
    trash: [
      {
        en: "Careful. The old portfolio is in there.",
        es: "Cuidado. El portafolio antiguo está ahí dentro.",
        fr: "Attention. L'ancien portfolio est là-dedans.",
      },
    ],
  },

  faq: [
    {
      id: "stack",
      patterns: ["stack", "technolog", "tech ", "tecnolog", "technologie", "build with", "made with"],
      answer: {
        en: "Mostly React and Next.js, TypeScript everywhere, Node on the backend when there is one. Lately a lot of AI-augmented workflows too — Claude Code, MCP servers, context engineering.",
        es: "Sobre todo React y Next.js, TypeScript en todas partes, Node en el backend cuando lo hay. Últimamente también muchos flujos aumentados con IA: Claude Code, servidores MCP, ingeniería de contexto.",
        fr: "Surtout React et Next.js, TypeScript partout, Node côté serveur quand il y en a un. Ces derniers temps aussi beaucoup de workflows augmentés par l'IA : Claude Code, serveurs MCP, ingénierie de contexte.",
      },
    },
    {
      id: "hire",
      patterns: ["hire", "available", "freelance", "contratar", "disponib", "recrutement", "embauche"],
      answer: {
        en: "Depends on the project, but I'm always up for interesting conversations. The Contact app is the fastest way to find out.",
        es: "Depende del proyecto, pero siempre estoy abierto a conversaciones interesantes. La app de Contacto es la forma más rápida de averiguarlo.",
        fr: "Ça dépend du projet, mais je suis toujours partant pour une conversation intéressante. L'app Contact est le moyen le plus rapide de le savoir.",
      },
      action: { openApp: "contact" },
    },
    {
      id: "contact",
      patterns: ["contact", "reach", "email", "correo", "contacto", "e-mail", "courriel"],
      answer: {
        en: "Go on, say hello. Every message gets read.",
        es: "Anda, saluda. Todos los mensajes se leen.",
        fr: "Vas-y, dis bonjour. Tous les messages sont lus.",
      },
      action: { openApp: "contact" },
    },
    {
      id: "best-project",
      patterns: ["best project", "favorite project", "favourite project", "mejor proyecto", "proyecto favorito", "meilleur projet", "projet préféré"],
      answer: {
        en: "PokéPal is the one I'm proudest of — a whole app shipped end to end. Take a look.",
        es: "PokéPal es del que más orgulloso estoy: una app entera lanzada de principio a fin. Échale un vistazo.",
        fr: "PokéPal est celui dont je suis le plus fier : une app entière livrée de bout en bout. Jette un œil.",
      },
      action: { openApp: "projects" },
    },
    {
      id: "projects",
      patterns: ["project", "portfolio work", "built", "shipped", "proyecto", "construido", "projet", "construit"],
      answer: {
        en: "The good stuff. Every card opens a real page.",
        es: "Lo bueno. Cada tarjeta abre una página de verdad.",
        fr: "Le meilleur. Chaque carte ouvre une vraie page.",
      },
      action: { openApp: "projects" },
    },
    {
      id: "background",
      patterns: ["who are you", "background", "about you", "quién eres", "quien eres", "qui es-tu", "qui êtes-vous"],
      answer: {
        en: "A software engineer who never grew out of taking things apart to see how they work. The About app has the longer version.",
        es: "Un ingeniero de software que nunca dejó de desarmar las cosas para ver cómo funcionan. La app Sobre Mí tiene la versión larga.",
        fr: "Un ingénieur logiciel qui n'a jamais cessé de démonter les choses pour voir comment elles marchent. L'app À Propos a la version longue.",
      },
      action: { openApp: "about" },
    },
    {
      id: "resume",
      patterns: ["resume", "cv", "résumé", "curriculum", "currículum"],
      answer: {
        en: "The formal version. It even prints.",
        es: "La versión formal. Hasta se puede imprimir.",
        fr: "La version formelle. Elle s'imprime même.",
      },
      action: { openApp: "resume" },
    },
    {
      id: "experience",
      patterns: ["experience", "work history", "worked", "experiencia", "expérience", "travaillé"],
      answer: {
        en: "Chapters, not a timeline. That was on purpose.",
        es: "Capítulos, no una línea temporal. Fue a propósito.",
        fr: "Des chapitres, pas une frise. C'était volontaire.",
      },
      action: { openApp: "experience" },
    },
    {
      id: "how-built",
      patterns: ["how is this site", "how was this built", "how this site", "cómo está hecho", "como esta hecho", "comment ce site"],
      answer: {
        en: "Next.js and Tailwind, a Zustand window manager, no backend at all — it's a fully static export. Even I have to reload the page to change my mind.",
        es: "Next.js y Tailwind, un gestor de ventanas en Zustand, sin backend: es una exportación totalmente estática. Hasta yo tengo que recargar la página para cambiar de idea.",
        fr: "Next.js et Tailwind, un gestionnaire de fenêtres en Zustand, aucun backend : c'est un export entièrement statique. Même moi, je dois recharger la page pour changer d'avis.",
      },
    },
  ],

  faqFallback: {
    en: "I don't have an answer for that one. Try the dock, or ask me about my stack, my projects, or how to reach Ricardo.",
    es: "No tengo respuesta para eso. Prueba el dock, o pregúntame sobre mi stack, mis proyectos, o cómo contactar a Ricardo.",
    fr: "Je n'ai pas de réponse pour ça. Essaie le dock, ou demande-moi mon stack, mes projets, ou comment contacter Ricardo.",
  },
};
