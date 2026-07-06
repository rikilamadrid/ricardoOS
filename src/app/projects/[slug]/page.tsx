import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProject, projectList, projectSlug, t } from "@/data";
import { ProjectDetailContent } from "@/components/content/ProjectDetailContent";

export function generateStaticParams() {
  return projectList().map((p) => ({ slug: projectSlug(p) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found · RicardoOS" };

  const title = `${t(project.title, "en")} · RicardoOS`;
  const description = t(project.tagline ?? project.blurb, "en");
  const url = `/projects/${slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "article" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return <ProjectDetailContent project={project} locale="en" />;
}
