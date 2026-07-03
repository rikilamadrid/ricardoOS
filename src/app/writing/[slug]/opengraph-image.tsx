import { getAllPosts, getPost } from "@/lib/posts";
import { OG_SIZE, OG_CONTENT_TYPE, renderOgImage } from "@/lib/og";

// Prerender to a static PNG at build time (required for `output: export`).
export const dynamic = "force-static";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Field Notes · RicardoOS";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  return renderOgImage({
    badge: "Field Notes",
    title: post?.meta.title ?? "Field Notes",
    subtitle: post?.meta.summary,
  });
}
