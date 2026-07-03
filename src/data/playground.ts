import type { Localized } from "./types";

/**
 * Content for the "Playground" window ("Half-baked on purpose").
 * Interactive experiments — each `experiment` maps to a component to mount
 * in later phases. Copy/order here; behavior lives in the components.
 */
export interface PlaygroundContent {
  eyebrow: Localized<string>;
  heading: Localized<string>;
  intro: Localized<string>;
  experiments: Experiment[];
}

export interface Experiment {
  id: string;
  title: Localized<string>;
  blurb: Localized<string>;
  /** Key the renderer uses to mount the matching interactive component. */
  experiment: string;
  icon: string;
}

export const playground: PlaygroundContent = {
  eyebrow: { en: "HALF-BAKED ON PURPOSE", es: "A MEDIO HACER A PROPÓSITO", fr: "À MOITIÉ FAIT, EXPRÈS" },
  heading: { en: "Playground", es: "Patio de Juegos", fr: "Bac à Sable" },
  intro: {
    en: "Experiments with no obligation to become anything. Click around. It's mostly noise and joy.",
    es: "Experimentos sin obligación de convertirse en nada. Haz clic por ahí. Es sobre todo ruido y alegría.",
    fr: "Des expériences sans obligation de devenir quoi que ce soit. Cliquez un peu partout. C'est surtout du bruit et de la joie.",
  },
  experiments: [
    {
      id: "bubble-field",
      title: { en: "Bubble field", es: "Campo de burbujas", fr: "Champ de bulles" },
      blurb: {
        en: "Drifting Aqua bubbles that pop when you poke them.",
        es: "Burbujas Aqua a la deriva que estallan cuando las tocas.",
        fr: "Des bulles Aqua qui dérivent et éclatent quand on les touche.",
      },
      experiment: "bubble-field",
      icon: "🫧",
    },
    {
      id: "glass-toy",
      title: { en: "Glass toy", es: "Juguete de cristal", fr: "Jouet de verre" },
      blurb: {
        en: "A draggable pane of frosted glass with live refraction.",
        es: "Un panel de cristal esmerilado arrastrable con refracción en vivo.",
        fr: "Un panneau de verre dépoli déplaçable avec réfraction en direct.",
      },
      experiment: "glass-toy",
      icon: "🔮",
    },
    {
      id: "synth-pad",
      title: { en: "Synth pad", es: "Pad de sintetizador", fr: "Pad de synthé" },
      blurb: {
        en: "Tap cells to layer a soft ambient loop.",
        es: "Toca celdas para superponer un bucle ambiental suave.",
        fr: "Touchez des cellules pour superposer une boucle ambient douce.",
      },
      experiment: "synth-pad",
      icon: "🎹",
    },
  ],
};
