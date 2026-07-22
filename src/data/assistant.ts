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
};
