"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { DEFAULT_LOCALE, LOCALES, t, type Locale, type Localized } from "@/data";
import type { PostMeta } from "@/lib/posts";

const STORAGE_KEY = "ricardo-os:locale";

const COPY: Record<string, Localized<string>> = {
  eyebrow: {
    en: "WORDS BETWEEN BUILDS",
    es: "PALABRAS ENTRE BUILDS",
    fr: "DES MOTS ENTRE DEUX BUILDS",
  },
  heading: { en: "Field Notes", es: "Notas de Campo", fr: "Notes de Terrain" },
  intro: {
    en: "Notes on craft, engineering, and building calm software — not strictly technical, never a content treadmill.",
    es: "Apuntes sobre oficio, ingeniería y hacer software con calma; no todo es técnico, y nada de cinta de contenido infinito.",
    fr: "Des notes sur le métier, l'ingénierie et la création de logiciels sereins; pas toujours technique, jamais une usine à contenu.",
  },
  empty: {
    en: "Nothing published yet — soon.",
    es: "Aún no hay nada publicado. Pronto.",
    fr: "Rien de publié pour l'instant. Bientôt.",
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

function isLocale(value: string | null): value is Locale {
  return value !== null && (LOCALES as readonly string[]).includes(value);
}

function postHref(slug: string, locale: Locale): string {
  return locale === "en" ? `/writing/${slug}` : `/writing/${slug}/${locale}`;
}

function desktopHref(locale: Locale): string {
  return locale === "en" ? "/?app=writing" : `/?app=writing&locale=${locale}`;
}

function formatDate(iso: string, locale: Locale): string {
  return new Date(`${iso}T12:00:00`).toLocaleDateString(DATE_LOCALE[locale], {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function WritingIndexContent({ posts }: { posts: PostMeta[] }) {
  const searchParams = useSearchParams();
  const queryLocale = searchParams.get("locale");
  const locale = isLocale(queryLocale) ? queryLocale : DEFAULT_LOCALE;

  useEffect(() => {
    if (locale === DEFAULT_LOCALE) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, locale);
    } catch {
      // ignore
    }
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <>
      <p className="os-eyebrow">{t(COPY.eyebrow, locale)}</p>
      <h1 className="content-title">{t(COPY.heading, locale)}</h1>
      <p className="content-lede">{t(COPY.intro, locale)}</p>

      {posts.length === 0 ? (
        <p className="content-prose">{t(COPY.empty, locale)}</p>
      ) : (
        <ul className="content-index">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={postHref(post.slug, locale)} className="content-index-row">
                <span className="min-w-0">
                  <span className="content-index-title">{t(post.title, locale)}</span>
                  <span className="content-index-blurb">{t(post.summary, locale)}</span>
                </span>
                <time
                  dateTime={post.date}
                  className="ml-auto shrink-0 whitespace-nowrap text-[12px] font-semibold text-ink-soft"
                >
                  {formatDate(post.date, locale)}
                </time>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <div className="content-footer">
        <Link href={desktopHref(locale)} className="os-gel os-gel--ghost">
          {t(COPY.open, locale)}
        </Link>
      </div>
    </>
  );
}
