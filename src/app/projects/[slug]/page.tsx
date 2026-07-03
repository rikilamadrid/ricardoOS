import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projectList, projectSlug, type Project } from "@/data";
import { ContentPage } from "@/components/content/ContentPage";

/** English status labels for the canonical (SEO) detail page. */
const STATUS_LABEL: Record<Project["status"], string> = {
  shipped: "Live",
  building: "Building",
  placeholder: "In progress",
};

const STATUS_CLASS: Record<Project["status"], string> = {
  shipped: "os-pill--live",
  building: "os-pill--build",
  placeholder: "os-pill--lab",
};

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

  const title = `${project.title.en} · RicardoOS`;
  const description = (project.tagline ?? project.blurb).en;
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

  const tagline = (project.tagline ?? project.blurb).en;
  const paragraphs = (project.writeup?.en ?? project.blurb.en).split("\n\n");

  return (
    <ContentPage>
      <article className="content-article" data-motif={project.motif || undefined}>
        <div
          className="content-hero"
          data-motif={project.motif || undefined}
          data-shot={project.screenshot ? "" : undefined}
          style={{
            ["--c1" as string]: project.from,
            ["--c2" as string]: project.to,
            ...(project.screenshot ? { ["--shot" as string]: `url(${project.screenshot})` } : {}),
          }}
        >
          {project.screenshot && <span className="content-hero-shot" aria-hidden="true" />}
          <span aria-hidden="true">{project.icon}</span>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <span className={`os-pill ${STATUS_CLASS[project.status]}`}>
            {STATUS_LABEL[project.status]}
          </span>
          {project.year != null && (
            <span className="text-[13px] font-semibold text-ink-soft">{project.year}</span>
          )}
        </div>

        <h1 className="content-title">{project.title.en}</h1>
        <p className="content-lede">{tagline}</p>

        {project.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span key={tag} className="os-tag">
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="content-prose">
          {paragraphs.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        {project.links.length > 0 && (
          <div className="mt-7 flex flex-wrap gap-2">
            {project.links.map((link) => (
              <a
                key={link.href}
                className="os-gel os-gel--primary"
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label.en}
              </a>
            ))}
          </div>
        )}

        <div className="content-footer">
          <Link href="/?app=projects" className="os-gel os-gel--ghost">
            Open in RicardoOS
          </Link>
        </div>
      </article>
    </ContentPage>
  );
}
