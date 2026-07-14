import type { Localized } from "./types";

/**
 * Content for the "Contact" window: intro/footnote copy plus the message
 * form. `profile.contact` (email/socials) is used elsewhere, e.g. ResumeApp.
 */
export interface ContactContent {
  eyebrow: Localized<string>;
  heading: Localized<string>;
  intro: Localized<string>;
  footnote: Localized<string>;
  form: ContactFormContent;
}

export interface ContactFormContent {
  nameLabel: Localized<string>;
  namePlaceholder: Localized<string>;
  emailLabel: Localized<string>;
  emailPlaceholder: Localized<string>;
  messageLabel: Localized<string>;
  messagePlaceholder: Localized<string>;
  submit: Localized<string>;
  submitting: Localized<string>;
  successToast: Localized<string>;
  errorToast: Localized<string>;
  validationNameToast: Localized<string>;
  validationEmailToast: Localized<string>;
  validationMessageToast: Localized<string>;
}

export const contact: ContactContent = {
  eyebrow: { en: "SAY HELLO", es: "SALUDA", fr: "DITES BONJOUR" },
  heading: { en: "Let's talk", es: "Hablemos", fr: "Discutons" },
  intro: {
    en: "Send a message below — I read all of it and write back.",
    es: "Envíame un mensaje abajo — lo leo todo y respondo.",
    fr: "Envoyez un message ci-dessous — je lis tout et je réponds.",
  },
  footnote: {
    en: "Based wherever the wifi is good. Always up for interesting conversations and good problems to chew on.",
    es: "Ubicado donde haya buen wifi. Siempre dispuesto a conversaciones interesantes y buenos problemas que masticar.",
    fr: "Basé là où le wifi est bon. Toujours partant pour de bonnes conversations et de bons problèmes à ronger.",
  },
  form: {
    nameLabel: { en: "Name", es: "Nombre", fr: "Nom" },
    namePlaceholder: { en: "Your name", es: "Tu nombre", fr: "Votre nom" },
    emailLabel: { en: "Email", es: "Correo", fr: "E-mail" },
    emailPlaceholder: { en: "you@example.com", es: "tu@correo.com", fr: "vous@exemple.com" },
    messageLabel: { en: "Message", es: "Mensaje", fr: "Message" },
    messagePlaceholder: {
      en: "What's on your mind?",
      es: "¿Qué tienes en mente?",
      fr: "Qu'avez-vous en tête ?",
    },
    submit: { en: "Send message", es: "Enviar mensaje", fr: "Envoyer le message" },
    submitting: { en: "Sending…", es: "Enviando…", fr: "Envoi…" },
    successToast: {
      en: "✉️ Message sent — thanks for reaching out!",
      es: "✉️ Mensaje enviado — ¡gracias por escribir!",
      fr: "✉️ Message envoyé — merci de m'avoir écrit !",
    },
    errorToast: {
      en: "Couldn't send that — please try again in a moment.",
      es: "No se pudo enviar — intenta de nuevo en un momento.",
      fr: "Échec de l'envoi — veuillez réessayer dans un instant.",
    },
    validationNameToast: {
      en: "Add your name first.",
      es: "Agrega tu nombre primero.",
      fr: "Ajoutez d'abord votre nom.",
    },
    validationEmailToast: {
      en: "That email doesn't look right.",
      es: "Ese correo no parece válido.",
      fr: "Cette adresse e-mail semble invalide.",
    },
    validationMessageToast: {
      en: "Say a little more before sending.",
      es: "Escribe un poco más antes de enviar.",
      fr: "Écrivez-en un peu plus avant d'envoyer.",
    },
  },
};
