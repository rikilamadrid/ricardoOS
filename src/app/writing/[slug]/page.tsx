import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPost } from "@/lib/posts";
import { ContentPage } from "@/components/content/ContentPage";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post || post.meta.draft) return { title: "Post not found · RicardoOS" };

  const title = `${post.meta.title} · RicardoOS`;
  const description = post.meta.summary;
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

  const { meta, content } = post;

  return (
    <ContentPage back={{ href: "/writing", label: "← All writing" }}>
      <article className="content-article">
        <div className="mt-5 flex flex-wrap items-center gap-2 text-[13px] font-semibold text-ink-soft">
          <time dateTime={meta.date}>{formatDate(meta.date)}</time>
          {meta.tags.map((tag) => (
            <span key={tag} className="os-tag">
              {tag}
            </span>
          ))}
        </div>

        <h1 className="content-title">{meta.title}</h1>
        <p className="content-lede">{meta.summary}</p>

        <div className="content-prose content-mdx">
          <MDXRemote source={content} />
        </div>

        <div className="content-footer">
          <Link href="/?app=writing" className="os-gel os-gel--ghost">
            Open in RicardoOS
          </Link>
        </div>
      </article>
    </ContentPage>
  );
}
