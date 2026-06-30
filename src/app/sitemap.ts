import type { MetadataRoute } from "next";
import { projectList, projectSlug } from "@/data";
import { getAllPosts } from "@/lib/posts";
import { SITE_URL } from "@/lib/site";

// Emit a static sitemap.xml at build time (required for `output: export`).
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: SITE_URL, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/projects`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/writing`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    ...projectList().map((p) => ({
      url: `${SITE_URL}/projects/${projectSlug(p)}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...getAllPosts().map((post) => ({
      url: `${SITE_URL}/writing/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
