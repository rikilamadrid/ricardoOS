import type { Localized } from "./types";

/**
 * Copy for the "About Me" window (the WHOAMI panel in the mockup).
 * Paragraphs render in order; `lead` is the big "Hi, I'm Ricardo 👋" heading.
 */
export interface AboutContent {
  eyebrow: Localized<string>;
  heading: Localized<string>;
  /** Body paragraphs in display order. */
  paragraphs: Localized<string>[];
  /** Inline emphasized hook inside the first paragraph. */
  hook: Localized<string>;
  cta: {
    label: Localized<string>;
    /** App id the CTA opens. */
    target: string;
  };
}

export const about: AboutContent = {
  eyebrow: { en: "WHOAMI", es: "WHOAMI", fr: "WHOAMI" },
  heading: { en: "Hi, I'm Ricardo 👋", es: "Hola, soy Ricardo 👋", fr: "Salut, moi c'est Ricardo 👋" },
  hook: {
    en: "what if I just… built this?",
    es: "¿y si simplemente… lo construyo?",
    fr: "et si je le construisais, tout simplement ?",
  },
  paragraphs: [
    {
      en: "A software engineer who never quite grew out of taking things apart to see how they work. I've shipped real products for years — but the thing that actually keeps me up at night is the same one from when I was a kid: what if I just… built this?",
      es: "Un ingeniero de software que nunca dejó del todo de desarmar las cosas para ver cómo funcionan. Llevo años lanzando productos reales — pero lo que de verdad me quita el sueño es lo mismo de cuando era niño: ¿y si simplemente… lo construyo?",
      fr: "Un ingénieur logiciel qui n'a jamais vraiment perdu l'habitude de tout démonter pour comprendre comment ça marche. Je livre de vrais produits depuis des années — mais ce qui me tient éveillé la nuit, c'est la même question que quand j'étais enfant : et si je le construisais, tout simplement ?",
    },
    {
      en: "I like calm software, glassy interfaces, tiny delightful details, and ideas that are slightly too ambitious. Outside the editor you'll find me deep in a video game, cooking something I probably shouldn't attempt, or sketching the next thing I want to make exist.",
      es: "Me gusta el software tranquilo, las interfaces de cristal, los pequeños detalles encantadores y las ideas un poco demasiado ambiciosas. Fuera del editor me encontrarás metido en un videojuego, cocinando algo que probablemente no debería intentar, o bocetando la próxima cosa que quiero hacer existir.",
      fr: "J'aime les logiciels apaisés, les interfaces de verre, les petits détails délicieux et les idées un peu trop ambitieuses. En dehors de l'éditeur, vous me trouverez plongé dans un jeu vidéo, en train de cuisiner quelque chose que je ne devrais sans doute pas tenter, ou à esquisser la prochaine chose que je veux faire exister.",
    },
    {
      en: "This site isn't a résumé. It's a little operating system — a place to wander around the things I'm building and the way I think. Click around. Some of it talks back.",
      es: "Este sitio no es un currículum. Es un pequeño sistema operativo — un lugar para pasear entre las cosas que estoy construyendo y mi forma de pensar. Haz clic por ahí. Algunas cosas responden.",
      fr: "Ce site n'est pas un CV. C'est un petit système d'exploitation — un endroit pour flâner parmi les choses que je construis et ma façon de penser. Cliquez un peu partout. Certaines choses vous répondent.",
    },
  ],
  cta: {
    label: {
      en: "See what I'm building →",
      es: "Mira lo que estoy construyendo →",
      fr: "Voyez ce que je construis →",
    },
    target: "projects",
  },
};
