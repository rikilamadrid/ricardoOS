import { getAllPosts, getPost } from "@/lib/posts";
import { OG_SIZE, OG_CONTENT_TYPE, renderOgImage } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Writing · RicardoOS";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  return renderOgImage({
    badge: "Writing",
    title: post?.meta.title ?? "Writing",
    subtitle: post?.meta.summary,
  });
}
