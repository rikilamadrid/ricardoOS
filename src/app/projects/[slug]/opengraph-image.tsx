import { getProject, projectList, projectSlug } from "@/data";
import { OG_SIZE, OG_CONTENT_TYPE, renderOgImage } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Project · RicardoOS";

export function generateStaticParams() {
  return projectList().map((p) => ({ slug: projectSlug(p) }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  return renderOgImage({
    badge: "Project",
    title: project?.title.en ?? "Project",
    subtitle: project ? (project.tagline ?? project.blurb).en : undefined,
  });
}
