import type { Localized } from "./types";

/**
 * "Recycle Bin" — an easter egg. Holds the relics of the old portfolio.
 * "Empty bin" never actually deletes anything; it just judges the past
 * fondly with a playful toast.
 */
export interface TrashItem {
  id: string;
  name: string;
  icon: string;
  note: Localized<string>;
}

export interface TrashContent {
  eyebrow: Localized<string>;
  heading: Localized<string>;
  intro: Localized<string>;
  items: TrashItem[];
  emptyLabel: Localized<string>;
  /** Toast shown when "empty bin" is clicked. */
  emptyToast: Localized<string>;
}

export const trash: TrashContent = {
  eyebrow: { en: "DON'T LOOK TOO CLOSELY", es: "NO MIRES MUY DE CERCA", fr: "NE REGARDE PAS DE TROP PRÈS" },
  heading: { en: "Recycle Bin", es: "Papelera", fr: "Corbeille" },
  intro: {
    en: "Where the old portfolio rests. We don't talk about it — but we keep it, fondly.",
    es: "Donde descansa el portafolio viejo. No hablamos de él — pero lo guardamos, con cariño.",
    fr: "Où repose l'ancien portfolio. On n'en parle pas — mais on le garde, tendrement.",
  },
  items: [
    {
      id: "old-portfolio",
      name: "old-portfolio.html",
      icon: "📄",
      note: {
        en: "A résumé pretending to be a website. Static. Beige. Forgiven.",
        es: "Un currículum fingiendo ser un sitio web. Estático. Beige. Perdonado.",
        fr: "Un CV se faisant passer pour un site. Statique. Beige. Pardonné.",
      },
    },
    {
      id: "skills-bar",
      name: "skill-bars.css",
      icon: "📊",
      note: {
        en: '"jQuery ▓▓▓▓▓▓▓░░ 87%" — we know better now.',
        es: '"jQuery ▓▓▓▓▓▓▓░░ 87%" — ahora sabemos mejor.',
        fr: '"jQuery ▓▓▓▓▓▓▓░░ 87%" — on sait mieux maintenant.',
      },
    },
    {
      id: "stock-photo",
      name: "developer-at-desk.jpg",
      icon: "🖼️",
      note: {
        en: "Stock photo of someone pointing at a screen. Not me. Never was.",
        es: "Foto de archivo de alguien señalando una pantalla. No soy yo. Nunca lo fui.",
        fr: "Photo d'archive de quelqu'un pointant un écran. Pas moi. Jamais.",
      },
    },
  ],
  emptyLabel: { en: "Empty bin", es: "Vaciar papelera", fr: "Vider la corbeille" },
  emptyToast: {
    en: "🗑️ Some things are better kept. Bin restored.",
    es: "🗑️ Algunas cosas es mejor conservarlas. Papelera restaurada.",
    fr: "🗑️ Certaines choses valent mieux gardées. Corbeille restaurée.",
  },
};
