import type { Localized } from "./types";

export interface ShareContent {
  trigger: Localized<string>;
  panelTitle: Localized<string>;
  nativeShare: Localized<string>;
  copyLink: Localized<string>;
  copied: Localized<string>;
  copyFailed: Localized<string>;
  manualCopyLabel: Localized<string>;
  shareFailed: Localized<string>;
  linkedInCopied: Localized<string>;
  linkedInCopyFailed: Localized<string>;
  manualCaptionLabel: Localized<string>;
  linkedIn: Localized<string>;
  linkedInAria: Localized<string>;
  bluesky: Localized<string>;
  blueskyAria: Localized<string>;
}

export const sharing: ShareContent = {
  trigger: { en: "Share", es: "Compartir", fr: "Partager" },
  panelTitle: {
    en: "Share this note",
    es: "Compartir esta nota",
    fr: "Partager cette note",
  },
  nativeShare: {
    en: "Share with an app",
    es: "Compartir con una aplicación",
    fr: "Partager avec une application",
  },
  copyLink: { en: "Copy link", es: "Copiar enlace", fr: "Copier le lien" },
  copied: { en: "Link copied.", es: "Enlace copiado.", fr: "Lien copié." },
  copyFailed: {
    en: "Clipboard access failed. Copy the URL below.",
    es: "No se pudo acceder al portapapeles. Copia la URL de abajo.",
    fr: "Impossible d'accéder au presse-papiers. Copiez l'URL ci-dessous.",
  },
  manualCopyLabel: {
    en: "Article URL",
    es: "URL del artículo",
    fr: "URL de l'article",
  },
  shareFailed: {
    en: "The share sheet could not open. Choose another option.",
    es: "No se pudo abrir el menú de compartir. Elige otra opción.",
    fr: "Le menu de partage n'a pas pu s'ouvrir. Choisissez une autre option.",
  },
  linkedInCopied: {
    en: "Caption copied — paste it into LinkedIn.",
    es: "Texto copiado — pégalo en LinkedIn.",
    fr: "Texte copié — collez-le dans LinkedIn.",
  },
  linkedInCopyFailed: {
    en: "LinkedIn opened. Copy the caption below.",
    es: "LinkedIn se ha abierto. Copia el texto de abajo.",
    fr: "LinkedIn est ouvert. Copiez le texte ci-dessous.",
  },
  manualCaptionLabel: {
    en: "Suggested caption",
    es: "Texto sugerido",
    fr: "Texte suggéré",
  },
  linkedIn: { en: "LinkedIn", es: "LinkedIn", fr: "LinkedIn" },
  linkedInAria: {
    en: "Share on LinkedIn (opens in a new tab)",
    es: "Compartir en LinkedIn (se abre en una pestaña nueva)",
    fr: "Partager sur LinkedIn (s'ouvre dans un nouvel onglet)",
  },
  bluesky: { en: "Bluesky", es: "Bluesky", fr: "Bluesky" },
  blueskyAria: {
    en: "Share on Bluesky (opens in a new tab)",
    es: "Compartir en Bluesky (se abre en una pestaña nueva)",
    fr: "Partager sur Bluesky (s'ouvre dans un nouvel onglet)",
  },
};
