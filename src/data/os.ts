import type { Localized } from "./types";

/**
 * The OS shell: window/app registry, dock, desktop icons, menu-bar nav, and
 * status bar. This is the chrome around the content apps (about, projects,
 * playground, terminal, music). Matches the Aqua-style mockups.
 */

/** Glossy app-tile color palette (maps to .os-tile--* in globals.css). */
export type TilePalette = "blue" | "sky" | "green" | "violet" | "teal" | "pink" | "graphite";

export interface AppDefinition {
  id: string;
  title: Localized<string>;
  icon: string;
  /** Glossy tile gradient palette used in the dock and on the desktop. */
  tile: TilePalette;
  /** Which content module renders inside the window. */
  kind: "about" | "projects" | "playground" | "terminal" | "music" | "contact" | "resume" | "link";
  /** Default window placement (% of viewport) + size in px. Tweak per phase. */
  window: { x: number; y: number; width: number; height: number };
  /** Shown on the desktop as a launchable icon. */
  onDesktop: boolean;
  /** Shown in the dock. */
  inDock: boolean;
  /** Open automatically on first load (the mockup shows several open). */
  openOnBoot: boolean;
  /** External URL for kind: "link" apps. */
  href?: string;
}

export const apps: AppDefinition[] = [
  {
    id: "about",
    title: { en: "About Me", es: "Sobre Mí", fr: "À Propos" },
    icon: "😄",
    tile: "blue",
    kind: "about",
    window: { x: 36, y: 16, width: 660, height: 720 },
    onDesktop: true,
    inDock: true,
    openOnBoot: true,
  },
  {
    id: "projects",
    title: { en: "Projects", es: "Proyectos", fr: "Projets" },
    icon: "🧩",
    tile: "sky",
    kind: "projects",
    window: { x: 19, y: 24, width: 620, height: 640 },
    onDesktop: true,
    inDock: true,
    openOnBoot: true,
  },
  {
    id: "playground",
    title: { en: "Playground", es: "Patio de Juegos", fr: "Bac à Sable" },
    icon: "🧪",
    tile: "green",
    kind: "playground",
    window: { x: 2, y: 6, width: 640, height: 760 },
    onDesktop: true,
    inDock: true,
    openOnBoot: true,
  },
  {
    id: "blog",
    title: { en: "Notes", es: "Notas", fr: "Notes" },
    icon: "✍️",
    tile: "violet",
    kind: "link",
    window: { x: 30, y: 20, width: 600, height: 640 },
    onDesktop: false,
    inDock: true,
    openOnBoot: false,
    href: "/notes",
  },
  {
    id: "resume",
    title: { en: "Résumé", es: "Currículum", fr: "CV" },
    icon: "📖",
    tile: "teal",
    kind: "resume",
    window: { x: 28, y: 14, width: 720, height: 800 },
    onDesktop: false,
    inDock: true,
    openOnBoot: false,
  },
  {
    id: "contact",
    title: { en: "Contact", es: "Contacto", fr: "Contact" },
    icon: "✉️",
    tile: "blue",
    kind: "contact",
    window: { x: 34, y: 22, width: 520, height: 520 },
    onDesktop: false,
    inDock: true,
    openOnBoot: false,
  },
  {
    id: "music",
    title: { en: "Aero FM", es: "Aero FM", fr: "Aero FM" },
    icon: "🎵",
    tile: "pink",
    kind: "music",
    window: { x: 70, y: 12, width: 380, height: 560 },
    onDesktop: false,
    inDock: true,
    openOnBoot: true,
  },
  {
    id: "terminal",
    title: { en: "Terminal", es: "Terminal", fr: "Terminal" },
    icon: "⌨️",
    tile: "graphite",
    kind: "terminal",
    window: { x: 4, y: 44, width: 560, height: 460 },
    onDesktop: false,
    inDock: true,
    openOnBoot: true,
  },
];

/** Top menu-bar navigation links (the "About / Projects / Playground" row). */
export const menuBar: { id: string; label: Localized<string>; target: string }[] = [
  { id: "nav-about", label: { en: "About", es: "Sobre Mí", fr: "À Propos" }, target: "about" },
  { id: "nav-projects", label: { en: "Projects", es: "Proyectos", fr: "Projets" }, target: "projects" },
  { id: "nav-playground", label: { en: "Playground", es: "Patio de Juegos", fr: "Bac à Sable" }, target: "playground" },
];

/**
 * Right-side status bar items. `kind` tells the UI what to render:
 * a theme toggle, the language switcher, live-ish indicators, and a clock.
 */
export const statusBar: { id: string; kind: "theme" | "language" | "signal" | "battery" | "clock"; icon?: string }[] = [
  { id: "theme", kind: "theme", icon: "🌙" },
  { id: "language", kind: "language", icon: "🌐" },
  { id: "signal", kind: "signal", icon: "📶" },
  { id: "battery", kind: "battery", icon: "🔋" },
  { id: "clock", kind: "clock" },
];

/** Branding shown at the top-left of the menu bar. */
export const branding = {
  name: "Ricardo",
  suffix: "OS",
};

/** Desktop wallpaper — Aqua "Bliss"-style gradient with drifting bubbles. */
export const desktop = {
  wallpaper: {
    id: "aqua-hill",
    label: { en: "Aqua Hill", es: "Colina Aqua", fr: "Colline Aqua" } as Localized<string>,
    /** Used until a real asset exists. */
    gradient: "linear-gradient(180deg, #2a6fd6 0%, #6fb0f0 45%, #bfe0ff 70%, #3f7a2f 70%, #1f4d18 100%)",
  },
  /** Decorative drifting bubbles seen in the mockups. */
  bubbles: true,
};
