import { DEFAULT_LOCALE, type Locale, type Localized } from "./types";

/**
 * Resolve a localized value for the active locale, falling back to the
 * default locale if a translation is missing. Keeps components terse:
 *
 *   t(profile.title, locale)
 */
export function t<T>(value: Localized<T>, locale: Locale): T {
  return value[locale] ?? value[DEFAULT_LOCALE];
}
