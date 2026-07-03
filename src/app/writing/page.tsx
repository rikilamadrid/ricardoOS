import type { Metadata } from "next";
import { Suspense } from "react";
import { getAllPosts } from "@/lib/posts";
import { ContentPage } from "@/components/content/ContentPage";
import { WritingIndexContent } from "@/components/content/WritingIndexContent";

const INTRO =
  "Notes on craft, engineering, and building calm software — not strictly technical, never a content treadmill.";

export const metadata: Metadata = {
  title: "Field Notes · RicardoOS",
  description: INTRO,
  alternates: { canonical: "/writing" },
  openGraph: { title: "Field Notes · RicardoOS", description: INTRO, url: "/writing" },
};

/** Crawlable fallback index for the Writing app — links to each MDX post. */
export default function WritingIndexPage() {
  const posts = getAllPosts();

  return (
    <ContentPage>
      <Suspense fallback={null}>
        <WritingIndexContent posts={posts} />
      </Suspense>
    </ContentPage>
  );
}
