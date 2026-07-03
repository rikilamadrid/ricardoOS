import type { Metadata } from "next";
import Link from "next/link";
import { projectList, projects, projectSlug } from "@/data";
import { ContentPage } from "@/components/content/ContentPage";

export const metadata: Metadata = {
  title: "Projects · RicardoOS",
  description: projects.intro.en,
  alternates: { canonical: "/projects" },
  openGraph: { title: "Projects · RicardoOS", description: projects.intro.en, url: "/projects" },
};

/** Crawlable fallback index for the Projects app — links to each detail page. */
export default function ProjectsIndexPage() {
  return (
    <ContentPage>
      <p className="os-eyebrow">{projects.eyebrow.en}</p>
      <h1 className="content-title">{projects.heading.en}</h1>
      <p className="content-lede">{projects.intro.en}</p>

      <ul className="content-index">
        {projectList().map((project) => (
          <li key={project.id}>
            <Link
              href={`/projects/${projectSlug(project)}`}
              className="content-index-row"
              data-motif={project.motif || undefined}
            >
              <span
                className="content-index-thumb"
                data-motif={project.motif || undefined}
                data-shot={project.screenshot ? "" : undefined}
                style={{
                  ["--c1" as string]: project.from,
                  ["--c2" as string]: project.to,
                  ...(project.screenshot ? { ["--shot" as string]: `url(${project.screenshot})` } : {}),
                }}
                aria-hidden="true"
              >
                {project.screenshot && <span className="content-index-thumb-shot" />}
                <span className="content-index-thumb-emoji">{project.icon}</span>
              </span>
              <span className="min-w-0">
                <span className="content-index-title">
                  <span className="content-index-name">{project.title.en}</span>
                </span>
                <span className="content-index-blurb">
                  {(project.tagline ?? project.blurb).en}
                </span>
              </span>
              <span className="content-index-chevron" aria-hidden="true">
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="content-footer">
        <Link href="/?app=projects" className="os-gel os-gel--ghost">
          Open in RicardoOS
        </Link>
      </div>
    </ContentPage>
  );
}
