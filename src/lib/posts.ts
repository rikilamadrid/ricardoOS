import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { DEFAULT_LOCALE, LOCALES, type Locale, type Localized } from "@/data/types";

/**
 * Filesystem-backed Writing content. MDX files in `src/content/posts/*.mdx`
 * are the single source of truth; frontmatter is parsed with gray-matter into
 * typed `PostMeta`. Server-only (uses `node:fs`) — the desktop Writing app
 * receives the metas as props from the server.
 */
export interface PostMeta {
  slug: string;
  title: Localized<string>;
  summary: Localized<string>;
  /** ISO date string. */
  date: string;
  tags: string[];
  draft: boolean;
}

export interface Post {
  meta: PostMeta;
  content: Localized<string>;
}

const POSTS_DIR = path.join(process.cwd(), "src/content/posts");

/**
 * YAML parses an unquoted `date: 2024-11-19` into a `Date`, not a string, so we
 * coerce both forms to an ISO date string (`YYYY-MM-DD`) here.
 */
function normalizeDate(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  if (typeof value === "string") return value;
  return "1970-01-01";
}

function normalizeLocalizedString(value: unknown, fallback: string): Localized<string> {
  if (typeof value === "string") {
    return { en: value, es: value, fr: value };
  }

  if (value && typeof value === "object") {
    const source = value as Partial<Record<keyof Localized<string>, unknown>>;
    const defaultValue =
      typeof source[DEFAULT_LOCALE] === "string" ? source[DEFAULT_LOCALE] : fallback;

    return LOCALES.reduce(
      (localized, locale) => ({
        ...localized,
        [locale]: typeof source[locale] === "string" ? source[locale] : defaultValue,
      }),
      {} as Localized<string>,
    );
  }

  return { en: fallback, es: fallback, fr: fallback };
}

function normalizeLocalizedContent(content: string): Localized<string> {
  const parts = content.split(/^<!--\s*locale:(en|es|fr)\s*-->\s*$/gm);

  if (parts.length === 1) {
    return { en: content, es: content, fr: content };
  }

  const sections: Partial<Record<Locale, string>> = {};

  for (let i = 1; i < parts.length; i += 2) {
    const locale = parts[i] as Locale;
    const body = parts[i + 1]?.trim();
    if (LOCALES.includes(locale) && body) sections[locale] = body;
  }

  const defaultContent = sections[DEFAULT_LOCALE] ?? content.trim();

  return LOCALES.reduce(
    (localized, locale) => ({
      ...localized,
      [locale]: sections[locale] ?? defaultContent,
    }),
    {} as Localized<string>,
  );
}

function normalizeMeta(slug: string, data: Record<string, unknown>): PostMeta {
  return {
    slug,
    title: normalizeLocalizedString(data.title, slug),
    summary: normalizeLocalizedString(data.summary, ""),
    date: normalizeDate(data.date),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    draft: data.draft === true,
  };
}

function readRaw(slug: string) {
  const full = path.join(POSTS_DIR, `${slug}.mdx`);
  return matter(fs.readFileSync(full, "utf8"));
}

/** Published posts, newest first (drafts excluded). */
export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      return normalizeMeta(slug, readRaw(slug).data);
    })
    .filter((post) => !post.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
}

/** A single post's meta + localized MDX body, or null if it doesn't exist. */
export function getPost(slug: string): Post | null {
  try {
    const { data, content } = readRaw(slug);
    return { meta: normalizeMeta(slug, data), content: normalizeLocalizedContent(content) };
  } catch {
    return null;
  }
}
