import type { Locale } from "@/data/types";
import { SITE_URL } from "@/lib/site";

export function writingPostPath(slug: string, locale: Locale): string {
  const slugSegment = encodeURIComponent(slug);
  return locale === "en"
    ? `/writing/${slugSegment}/`
    : `/writing/${slugSegment}/${locale}/`;
}

export function writingPostUrl(slug: string, locale: Locale): string {
  return new URL(writingPostPath(slug, locale), SITE_URL).toString();
}
