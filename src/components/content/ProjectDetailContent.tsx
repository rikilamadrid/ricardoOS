import Link from "next/link";
import { t, type Locale, type Localized, type Project } from "@/data";
import { ContentPage } from "@/components/content/ContentPage";

const COPY: Record<string, Localized<string>> = {
  back: {
    en: "← Back to RicardoOS",
    es: "← Volver a RicardoOS",
    fr: "← Retour à RicardoOS",
  },
  open: {
    en: "Open in RicardoOS",
    es: "Abrir en RicardoOS",
    fr: "Ouvrir dans RicardoOS",
  },
};

const STATUS_LABEL: Record<Project["status"], Localized<string>> = {
  shipped: { en: "Live", es: "En vivo", fr: "En ligne" },
  building: { en: "Building", es: "En curso", fr: "En cours" },
  placeholder: { en: "In progress", es: "En progreso", fr: "En cours" },
};

const STATUS_CLASS: Record<Project["status"], string> = {
  shipped: "os-pill--live",
  building: "os-pill--build",
  placeholder: "os-pill--lab",
};

function desktopHref(locale: Locale): string {
  return locale === "en" ? "/?app=projects" : `/?app=projects&locale=${locale}`;
}

export function ProjectDetailContent({
  project,
  locale,
}: {
  project: Project;
  locale: Locale;
}) {
  const tagline = t(project.tagline ?? project.blurb, locale);
  const paragraphs = t(project.writeup ?? project.blurb, locale).split("\n\n");

  return (
    <ContentPage back={{ href: desktopHref(locale), label: t(COPY.back, locale) }}>
      <article className="content-article" lang={locale} data-motif={project.motif || undefined}>
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
            {t(STATUS_LABEL[project.status], locale)}
          </span>
          {project.year != null && (
            <span className="text-[13px] font-semibold text-ink-soft">{project.year}</span>
          )}
        </div>

        <h1 className="content-title">{t(project.title, locale)}</h1>
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
                {t(link.label, locale)}
              </a>
            ))}
          </div>
        )}

        <div className="content-footer">
          <Link href={desktopHref(locale)} className="os-gel os-gel--ghost">
            {t(COPY.open, locale)}
          </Link>
        </div>
      </article>
    </ContentPage>
  );
}
