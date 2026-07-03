import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LOCALES, t, type Locale } from "@/data";
import { WritingPostContent } from "@/components/content/WritingPostContent";
import { getAllPosts, getPost } from "@/lib/posts";

function isLocale(value: string): value is Locale {
  return LOCALES.includes(value as Locale);
}

export function generateStaticParams() {
  return getAllPosts().flatMap((post) =>
    LOCALES.map((locale) => ({ slug: post.slug, locale })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug, locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) return { title: "Post not found · RicardoOS" };

  const post = getPost(slug);
  if (!post || post.meta.draft) return { title: "Post not found · RicardoOS" };

  const title = `${t(post.meta.title, rawLocale)} · RicardoOS`;
  const description = t(post.meta.summary, rawLocale);
  const url = rawLocale === "en" ? `/writing/${slug}` : `/writing/${slug}/${rawLocale}`;

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

export default async function LocalizedWritingPostPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();

  const post = getPost(slug);
  if (!post || post.meta.draft) notFound();

  return <WritingPostContent post={post} locale={rawLocale} />;
}
