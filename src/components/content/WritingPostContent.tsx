import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { t, type Locale, type Localized } from "@/data";
import type { Post } from "@/lib/posts";
import { ContentPage } from "./ContentPage";

const COPY: Record<string, Localized<string>> = {
  back: {
    en: "← All writing",
    es: "← Todas las notas",
    fr: "← Toutes les notes",
  },
  open: {
    en: "Open in RicardoOS",
    es: "Abrir en RicardoOS",
    fr: "Ouvrir dans RicardoOS",
  },
};

const DATE_LOCALE: Record<Locale, string> = {
  en: "en-US",
  es: "es-ES",
  fr: "fr-FR",
};

function writingIndexHref(locale: Locale): string {
  return locale === "en" ? "/writing" : `/writing?locale=${locale}`;
}

function desktopHref(locale: Locale): string {
  return locale === "en" ? "/?app=writing" : `/?app=writing&locale=${locale}`;
}

function formatDate(iso: string, locale: Locale): string {
  return new Date(`${iso}T12:00:00`).toLocaleDateString(DATE_LOCALE[locale], {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function WritingPostContent({ post, locale }: { post: Post; locale: Locale }) {
  const { meta, content } = post;

  return (
    <ContentPage back={{ href: writingIndexHref(locale), label: t(COPY.back, locale) }}>
      <article className="content-article" lang={locale}>
        <div className="mt-5 flex flex-wrap items-center gap-2 text-[13px] font-semibold text-ink-soft">
          <time dateTime={meta.date}>{formatDate(meta.date, locale)}</time>
          {meta.tags.map((tag) => (
            <span key={tag} className="os-tag">
              {tag}
            </span>
          ))}
        </div>

        <h1 className="content-title">{t(meta.title, locale)}</h1>
        <p className="content-lede">{t(meta.summary, locale)}</p>

        <div className="content-prose content-mdx">
          <MDXRemote source={t(content, locale)} />
        </div>

        <div className="content-footer">
          <Link href={desktopHref(locale)} className="os-gel os-gel--ghost">
            {t(COPY.open, locale)}
          </Link>
        </div>
      </article>
    </ContentPage>
  );
}
