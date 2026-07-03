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
      en: "I'm a software engineer who never grew out of taking things apart to see how they work. I've shipped real products for years now, but the question that keeps me up at night is the same one I had as a kid: what if I just… built this?",
      es: "Soy un ingeniero de software que nunca dejó de desarmar las cosas para ver cómo funcionan. Llevo años lanzando productos de verdad, pero la pregunta que me quita el sueño es la misma que tenía de niño: ¿y si simplemente… lo construyo?",
      fr: "Je suis un ingénieur logiciel qui n'a jamais cessé de démonter les choses pour voir comment elles marchent. Je livre de vrais produits depuis des années, mais la question qui me tient éveillé la nuit est la même qu'à mes dix ans : et si je le construisais, tout simplement ?",
    },
    {
      en: "I like calm software, glassy interfaces, tiny delightful details, and ideas that are a little too ambitious for their own good. Away from the editor I'm usually deep in a video game, cooking something above my skill level, or sketching the next thing I want to make exist.",
      es: "Me gusta el software tranquilo, las interfaces de cristal, los pequeños detalles que dan gusto y las ideas un poco demasiado ambiciosas para su propio bien. Lejos del editor suelo estar metido en un videojuego, cocinando algo por encima de mis posibilidades, o bocetando la próxima cosa que quiero hacer existir.",
      fr: "J'aime les logiciels apaisés, les interfaces de verre, les petits détails qui font plaisir et les idées un peu trop ambitieuses pour leur bien. Loin de l'éditeur, je suis souvent plongé dans un jeu vidéo, en train de cuisiner un truc au-dessus de mon niveau, ou d'esquisser la prochaine chose que je veux faire exister.",
    },
    {
      en: "This site isn't a résumé. It's a little operating system, built for wandering around the things I make and the way I think. Click on things. Some of them click back.",
      es: "Este sitio no es un currículum. Es un pequeño sistema operativo, hecho para pasear entre las cosas que creo y mi forma de pensar. Haz clic en las cosas. Algunas te responden.",
      fr: "Ce site n'est pas un CV. C'est un petit système d'exploitation, fait pour flâner parmi les choses que je fabrique et ma façon de penser. Cliquez sur les choses. Certaines vous répondent.",
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
