"use client";

import { projects, t } from "@/data";
import { useLocale } from "@/components/os/locale-store";
import { ProjectCard } from "./ProjectCard";

/** Projects — a responsive grid of product-like cards from typed content. */
export function ProjectsApp() {
  const { locale } = useLocale();

  return (
    <div>
      <div className="os-eyebrow">{t(projects.eyebrow, locale)}</div>
      <h2 className="font-brand text-2xl tracking-tight">{t(projects.heading, locale)}</h2>
      <p className="mt-1.5 text-ink-soft">{t(projects.intro, locale)}</p>
      <div className="os-grid mt-4">
        {projects.items.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
