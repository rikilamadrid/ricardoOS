import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProject, LOCALES, projectList, projectSlug, t, type Locale } from "@/data";
import { ProjectDetailContent } from "@/components/content/ProjectDetailContent";

function isLocale(value: string): value is Locale {
  return LOCALES.includes(value as Locale);
}

export function generateStaticParams() {
  return projectList().flatMap((project) =>
    LOCALES.map((locale) => ({ slug: projectSlug(project), locale })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug, locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) return { title: "Project not found · RicardoOS" };

  const project = getProject(slug);
  if (!project) return { title: "Project not found · RicardoOS" };

  const title = `${t(project.title, rawLocale)} · RicardoOS`;
  const description = t(project.tagline ?? project.blurb, rawLocale);
  const url = rawLocale === "en" ? `/projects/${slug}` : `/projects/${slug}/${rawLocale}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "article" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function LocalizedProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();

  const project = getProject(slug);
  if (!project) notFound();

  return <ProjectDetailContent project={project} locale={rawLocale} />;
}
