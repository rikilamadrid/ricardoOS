"use client";

import Link from "next/link";
import { usePosts } from "@/components/os/posts-store";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/** Writing — lists MDX posts (newest first), each opening its own page. */
export function WritingApp() {
  const posts = usePosts();

  return (
    <div>
      <div className="os-eyebrow">WORDS BETWEEN BUILDS</div>
      <h2 className="font-brand text-2xl tracking-tight">Field Notes</h2>
      <p className="mt-1.5 text-ink-soft">
        Notes on craft, engineering, and building calm software.
      </p>

      {posts.length === 0 ? (
        <p className="mt-4 text-ink-soft">Nothing published yet — soon.</p>
      ) : (
        <ul className="mt-4 flex flex-col gap-2.5">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/writing/${post.slug}`} className="os-post-row">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-semibold">{post.title}</span>
                  <time
                    dateTime={post.date}
                    className="shrink-0 whitespace-nowrap text-[12px] font-semibold text-ink-soft"
                  >
                    {formatDate(post.date)}
                  </time>
                </div>
                <p className="mt-1 text-[13px] text-ink-soft">{post.summary}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
