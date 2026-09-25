import { t, type Locale, type Localized } from "@/data";

/** Typical adult silent-reading speed for non-fiction prose. */
const WORDS_PER_MINUTE = 230;

const LABEL: Localized<string> = {
  en: "min read",
  es: "min de lectura",
  fr: "min de lecture",
};

/**
 * Estimated minutes to read an MDX body. Counts prose only: fenced code,
 * images and HTML comments are skipped, since readers scan those rather than
 * read them word by word. Never less than one minute.
 */
export function readingMinutes(markdown: string): number {
  const prose = markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/<!--[\s\S]*?-->/g, " ");
  const words = prose.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

/** "4 min read" / "4 min de lectura" / "4 min de lecture". */
export function formatReadingTime(minutes: number, locale: Locale): string {
  return `${minutes} ${t(LABEL, locale)}`;
}
