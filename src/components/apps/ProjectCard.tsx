"use client";

import Link from "next/link";
import { toast } from "sonner";
import { t, projectSlug, type Project } from "@/data";
import { useLocale } from "@/components/os/locale-store";
import { AquaButton } from "@/components/ui/AquaButton";

/** "Open details" CTA copy per locale. */
const OPEN_LABEL: Record<"en" | "es" | "fr", string> = {
  en: "Open",
  es: "Abrir",
  fr: "Ouvrir",
};

/** Status pill copy + palette per lifecycle. */
const STATUS: Record<Project["status"], { cls: string; label: Record<"en" | "es" | "fr", string> }> = {
  shipped: { cls: "os-pill--live", label: { en: "Live", es: "En vivo", fr: "En ligne" } },
  building: { cls: "os-pill--build", label: { en: "Building", es: "En curso", fr: "En cours" } },
  placeholder: { cls: "os-pill--lab", label: { en: "Soon", es: "Pronto", fr: "Bientôt" } },
};

/** A product-like project card: gradient thumbnail, status pill, tags, actions. */
export function ProjectCard({ project }: { project: Project }) {
  const { locale } = useLocale();
  const status = STATUS[project.status];
  /** First link (if any) is the primary live/demo target, opened in a new tab. */
  const liveLink = project.links[0];
  const demoLabel = locale === "es" ? "Demo" : locale === "fr" ? "Démo" : "Live demo";

  return (
    <article className="os-card">
      <div
        className="os-thumb"
        style={{ ["--c1" as string]: project.from, ["--c2" as string]: project.to }}
      >
        <span aria-hidden="true">{project.icon}</span>
      </div>
      <div className="os-card-body">
        <h4 className="flex items-center justify-between gap-2 font-brand text-base">
          {t(project.title, locale)}
          <span className={`os-pill ${status.cls}`}>{status.label[locale]}</span>
        </h4>
        <p className="mt-1.5 text-[13px] text-ink-soft">{t(project.blurb, locale)}</p>
        {project.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span key={tag} className="os-tag">
                {tag}
              </span>
            ))}
          </div>
        )}
        <div className="mt-3 flex gap-1.5">
          <Link
            href={`/projects/${projectSlug(project)}`}
            className="os-gel os-gel--primary !px-3 !py-1.5 !text-[12.5px]"
          >
            {OPEN_LABEL[locale]} →
          </Link>
          {liveLink ? (
            <AquaButton
              variant="ghost"
              href={liveLink.href}
              target="_blank"
              rel="noopener noreferrer"
              className="!px-3 !py-1.5 !text-[12.5px]"
            >
              {demoLabel} ↗
            </AquaButton>
          ) : (
            <AquaButton
              variant="ghost"
              className="!px-3 !py-1.5 !text-[12.5px]"
              onClick={() => toast("↗ Demo coming soon")}
            >
              {demoLabel}
            </AquaButton>
          )}
        </div>
      </div>
    </article>
  );
}
