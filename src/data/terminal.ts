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
  /** Optional side effect: open an app, switch theme/locale, clear, exit, etc. */
  action?: { type: "open" | "theme" | "locale" | "clear" | "exit"; payload?: string };
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
        en: ["Available: help, about, projects, whoami, ls, theme [day|night], joke, sudo, clear, contact, exit"],
        es: ["Disponibles: help, about, projects, whoami, ls, theme [day|night], joke, sudo, clear, contact, exit"],
        fr: ["Disponibles : help, about, projects, whoami, ls, theme [day|night], joke, sudo, clear, contact, exit"],
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
      name: "whoami",
      description: { en: "Print the current user", es: "Imprime el usuario actual", fr: "Affiche l'utilisateur actuel" },
      response: {
        en: ["ricardo — builder, tinkerer, perpetual student of the craft.", "Currently: making software that feels alive."],
        es: ["ricardo — constructor, manitas, eterno estudiante del oficio.", "Actualmente: haciendo software que se siente vivo."],
        fr: ["ricardo — bâtisseur, bricoleur, éternel étudiant du métier.", "Actuellement : je crée des logiciels qui semblent vivants."],
      },
    },
    {
      name: "ls",
      description: { en: "List the apps on this OS", es: "Lista las apps de este SO", fr: "Liste les apps de cet OS" },
      response: {
        en: ["about/      projects/   playground/   writing/", "experience/ resume/     contact/      music/", "meditations/ trash/"],
        es: ["about/      projects/   playground/   writing/", "experience/ resume/     contact/      music/", "meditations/ trash/"],
        fr: ["about/      projects/   playground/   writing/", "experience/ resume/     contact/      music/", "meditations/ trash/"],
      },
    },
    {
      name: "theme",
      description: { en: "Switch theme: theme [day|night]", es: "Cambia el tema: theme [day|night]", fr: "Change le thème : theme [day|night]" },
      response: null,
      action: { type: "theme" },
    },
    {
      name: "joke",
      description: { en: "Tell a developer joke", es: "Cuenta un chiste de programadores", fr: "Raconte une blague de dev" },
      response: {
        en: ["Why do programmers prefer dark mode?", "Because light attracts bugs. 🐛"],
        es: ["¿Por qué los programadores prefieren el modo oscuro?", "Porque la luz atrae a los bugs. 🐛"],
        fr: ["Pourquoi les développeurs préfèrent le mode sombre ?", "Parce que la lumière attire les bugs. 🐛"],
      },
    },
    {
      name: "sudo",
      description: { en: "Attempt elevated privileges", es: "Intenta privilegios elevados", fr: "Tente des privilèges élevés" },
      response: {
        en: ["Nice try. You already have all the privileges that matter here. 🙂"],
        es: ["Buen intento. Ya tienes todos los privilegios que importan aquí. 🙂"],
        fr: ["Bien essayé. Tu as déjà tous les privilèges qui comptent ici. 🙂"],
      },
    },
    {
      name: "clear",
      description: { en: "Clear the screen", es: "Limpia la pantalla", fr: "Efface l'écran" },
      response: null,
      action: { type: "clear" },
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
      name: "exit",
      description: { en: "Close the terminal", es: "Cierra la terminal", fr: "Ferme le terminal" },
      response: null,
      action: { type: "exit" },
    },
  ],
};
