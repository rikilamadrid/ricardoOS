import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { ContentPage } from "@/components/content/ContentPage";

const INTRO =
  "Notes on craft, engineering, and building calm software — not strictly technical, never a content treadmill.";

export const metadata: Metadata = {
  title: "Field Notes · RicardoOS",
  description: INTRO,
  alternates: { canonical: "/writing" },
  openGraph: { title: "Field Notes · RicardoOS", description: INTRO, url: "/writing" },
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/** Crawlable fallback index for the Writing app — links to each MDX post. */
export default function WritingIndexPage() {
  const posts = getAllPosts();

  return (
    <ContentPage>
      <p className="os-eyebrow">WORDS BETWEEN BUILDS</p>
      <h1 className="content-title">Field Notes</h1>
      <p className="content-lede">{INTRO}</p>

      {posts.length === 0 ? (
        <p className="content-prose">Nothing published yet — soon.</p>
      ) : (
        <ul className="content-index">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/writing/${post.slug}`} className="content-index-row">
                <span className="min-w-0">
                  <span className="content-index-title">{post.title}</span>
                  <span className="content-index-blurb">{post.summary}</span>
                </span>
                <time
                  dateTime={post.date}
                  className="ml-auto shrink-0 whitespace-nowrap text-[12px] font-semibold text-ink-soft"
                >
                  {formatDate(post.date)}
                </time>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <div className="content-footer">
        <Link href="/?app=writing" className="os-gel os-gel--ghost">
          Open in RicardoOS
        </Link>
      </div>
    </ContentPage>
  );
}
