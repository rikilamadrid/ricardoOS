/**
 * Shared types for all Ricardo OS mock data.
 *
 * Everything user-facing is localized through the `Localized<T>` helper so the
 * language toggle (EN / ES / FR) can swap content without touching components.
 * Locale-independent facts (emails, levels, dates, ids) stay as plain values.
 */

export const LOCALES = ["en", "es", "fr"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

/** Human-readable label for each locale, shown in the language toggle. */
export const LOCALE_LABELS: Record<Locale, { native: string; english: string; flag: string }> = {
  en: { native: "English", english: "English", flag: "🇬🇧" },
  es: { native: "Español", english: "Spanish", flag: "🇪🇸" },
  fr: { native: "Français", english: "French", flag: "🇫🇷" },
};

/** A value that exists in every supported language. */
export type Localized<T> = Record<Locale, T>;

/** Skill / language proficiency on the resume's 5-segment bar. */
export type Level = 1 | 2 | 3 | 4 | 5;

export interface ContactLink {
  id: string;
  /** Localized human label (e.g. "Email", "Correo"). */
  label: Localized<string>;
  /** Display value — usually locale-independent. */
  value: string;
  /** Actionable href (mailto:, tel:, https://). */
  href: string;
  /** Emoji or icon key used by the UI. */
  icon: string;
}

export interface Profile {
  name: string;
  initials: string;
  title: Localized<string>;
  /** Short one-liner, handy for meta tags / the menu bar. */
  tagline: Localized<string>;
  summary: Localized<string>;
  contact: ContactLink[];
}

export interface SkillGroup {
  id: string;
  category: Localized<string>;
  skills: Skill[];
}

export interface Skill {
  /** Mostly brand names, so a single label is fine; localized for edge cases. */
  name: Localized<string>;
  level: Level;
}

export interface Experience {
  id: string;
  company: string;
  location: Localized<string>;
  role: Localized<string>;
  /** Localized date range as printed on the resume. */
  period: Localized<string>;
  /** Sortable start date, ISO `YYYY-MM`. */
  startDate: string;
  /** ISO `YYYY-MM`, or null when current. */
  endDate: string | null;
  highlights: ExperienceHighlight[];
}

export interface ExperienceHighlight {
  /** Marker style from the resume: ▸ feature, ⚡ AI, ✓ outcome. */
  kind: "feature" | "ai" | "outcome";
  text: Localized<string>;
}

export interface Education {
  id: string;
  degree: Localized<string>;
  institution: string;
}

export interface LanguageProficiency {
  id: string;
  name: Localized<string>;
  level: Level;
  /** CEFR-ish note for tooltips. */
  note: Localized<string>;
}
