import type { MetadataRoute } from "next";
import { projectList, projectSlug } from "@/data";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: SITE_URL, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/projects`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    ...projectList().map((p) => ({
      url: `${SITE_URL}/projects/${projectSlug(p)}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
