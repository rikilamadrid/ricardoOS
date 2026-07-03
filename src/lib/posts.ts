import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

/**
 * Filesystem-backed Writing content. MDX files in `src/content/posts/*.mdx`
 * are the single source of truth; frontmatter is parsed with gray-matter into
 * typed `PostMeta`. Server-only (uses `node:fs`) — the desktop Writing app
 * receives the metas as props from the server.
 */
export interface PostMeta {
  slug: string;
  title: string;
  summary: string;
  /** ISO date string. */
  date: string;
  tags: string[];
  draft: boolean;
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

function normalizeMeta(slug: string, data: Record<string, unknown>): PostMeta {
  return {
    slug,
    title: typeof data.title === "string" ? data.title : slug,
    summary: typeof data.summary === "string" ? data.summary : "",
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

/** A single post's meta + raw MDX body, or null if it doesn't exist. */
export function getPost(slug: string): { meta: PostMeta; content: string } | null {
  try {
    const { data, content } = readRaw(slug);
    return { meta: normalizeMeta(slug, data), content };
  } catch {
    return null;
  }
}
