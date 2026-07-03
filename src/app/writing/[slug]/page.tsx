import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { t } from "@/data";
import { getAllPosts, getPost } from "@/lib/posts";
import { WritingPostContent } from "@/components/content/WritingPostContent";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post || post.meta.draft) return { title: "Post not found · RicardoOS" };

  const title = `${t(post.meta.title, "en")} · RicardoOS`;
  const description = t(post.meta.summary, "en");
  const url = `/writing/${slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      publishedTime: post.meta.date,
      tags: post.meta.tags,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function WritingPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post || post.meta.draft) notFound();

  return <WritingPostContent post={post} locale="en" />;
}
