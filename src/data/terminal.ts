import type { Localized } from "./types";

/**
 * "Terminal" app. Static command registry for the fake shell — each command
 * returns localized lines. `action` commands (open apps, theme) are handled
 * by the terminal component; `response` is the printed output.
 */
export interface TerminalContent {
  banner: Localized<string>;
  prompt: string;
  user: string;
  host: string;
  commands: TerminalCommand[];
}

export interface TerminalCommand {
  name: string;
  /** Shown by `help`. */
  description: Localized<string>;
  /** Printed lines, or null for action-only commands. */
  response: Localized<string[]> | null;
  /** Optional side effect: open an app, switch theme/locale, clear, etc. */
  action?: { type: "open" | "theme" | "locale" | "clear"; payload?: string };
}

export const terminal: TerminalContent = {
  banner: {
    en: "RicardoOS terminal — type 'help'",
    es: "Terminal de RicardoOS — escribe 'help'",
    fr: "Terminal RicardoOS — tapez 'help'",
  },
  prompt: "%",
  user: "ricardo",
  host: "os",
  commands: [
    {
      name: "help",
      description: { en: "List available commands", es: "Lista los comandos disponibles", fr: "Liste les commandes disponibles" },
      response: {
        en: ["Available: help, about, projects, playground, skills, contact, resume, theme, clear"],
        es: ["Disponibles: help, about, projects, playground, skills, contact, resume, theme, clear"],
        fr: ["Disponibles : help, about, projects, playground, skills, contact, resume, theme, clear"],
      },
    },
    {
      name: "about",
      description: { en: "Who is Ricardo?", es: "¿Quién es Ricardo?", fr: "Qui est Ricardo ?" },
      response: null,
      action: { type: "open", payload: "about" },
    },
    {
      name: "projects",
      description: { en: "Open the Projects window", es: "Abre la ventana de Proyectos", fr: "Ouvre la fenêtre Projets" },
      response: null,
      action: { type: "open", payload: "projects" },
    },
    {
      name: "playground",
      description: { en: "Open the Playground", es: "Abre el Patio de Juegos", fr: "Ouvre le Bac à Sable" },
      response: null,
      action: { type: "open", payload: "playground" },
    },
    {
      name: "contact",
      description: { en: "How to reach me", es: "Cómo contactarme", fr: "Comment me joindre" },
      response: {
        en: ["riki.lamadrid@gmail.com", "linkedin.com/in/rikilamadrid", "ricardolamadrid.com"],
        es: ["riki.lamadrid@gmail.com", "linkedin.com/in/rikilamadrid", "ricardolamadrid.com"],
        fr: ["riki.lamadrid@gmail.com", "linkedin.com/in/rikilamadrid", "ricardolamadrid.com"],
      },
    },
    {
      name: "theme",
      description: { en: "Toggle light / dark", es: "Alterna claro / oscuro", fr: "Bascule clair / sombre" },
      response: null,
      action: { type: "theme" },
    },
    {
      name: "clear",
      description: { en: "Clear the screen", es: "Limpia la pantalla", fr: "Efface l'écran" },
      response: null,
      action: { type: "clear" },
    },
  ],
};
