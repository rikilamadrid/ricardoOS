"use client";

import Link from "next/link";
import { usePosts } from "@/components/os/posts-store";
import { useLocale } from "@/components/os/locale-store";
import { t, type Localized } from "@/data";

const COPY: Record<string, Localized<string>> = {
  eyebrow: {
    en: "WORDS BETWEEN BUILDS",
    es: "PALABRAS ENTRE BUILDS",
    fr: "DES MOTS ENTRE DEUX BUILDS",
  },
  heading: { en: "Field Notes", es: "Notas de Campo", fr: "Notes de Terrain" },
  intro: {
    en: "Notes on craft, engineering, and building calm software.",
    es: "Apuntes sobre oficio, ingeniería y hacer software con calma.",
    fr: "Des notes sur le métier, l'ingénierie et la création de logiciels sereins.",
  },
  empty: {
    en: "Nothing published yet — soon.",
    es: "Aún no hay nada publicado. Pronto.",
    fr: "Rien de publié pour l'instant. Bientôt.",
  },
};

function formatDate(iso: string, locale: string): string {
  return new Date(iso).toLocaleDateString(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/** Writing — lists MDX posts (newest first), each opening its own page. */
export function WritingApp() {
  const posts = usePosts();
  const { locale } = useLocale();

  return (
    <div>
      <div className="os-eyebrow">{t(COPY.eyebrow, locale)}</div>
      <h2 className="font-brand text-2xl tracking-tight">{t(COPY.heading, locale)}</h2>
      <p className="mt-1.5 text-ink-soft">{t(COPY.intro, locale)}</p>

      {posts.length === 0 ? (
        <p className="mt-4 text-ink-soft">{t(COPY.empty, locale)}</p>
      ) : (
        <ul className="mt-4 flex flex-col gap-2.5">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/writing/${post.slug}`} className="os-post-row">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-semibold">{post.title}</span>
                  <time
                    dateTime={post.date}
                    className="shrink-0 whitespace-nowrap text-[12px] font-semibold text-ink-soft"
                  >
                    {formatDate(post.date, locale)}
                  </time>
                </div>
                <p className="mt-1 text-[13px] text-ink-soft">{post.summary}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
