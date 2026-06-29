"use client";

import { experienceContent, t } from "@/data";
import { useLocale } from "@/components/os/locale-store";

/** Experience — told as impact-focused chapters. No job list, no timeline. */
export function ExperienceApp() {
  const { locale } = useLocale();

  return (
    <div>
      <div className="os-eyebrow">{t(experienceContent.eyebrow, locale)}</div>
      <h2 className="font-brand text-2xl tracking-tight">{t(experienceContent.heading, locale)}</h2>
      <p className="mt-1.5 text-ink-soft">{t(experienceContent.intro, locale)}</p>
      <div className="mt-4">
        {experienceContent.chapters.map((chapter) => (
          <div key={chapter.id} className="os-row">
            <div className="os-when">{t(chapter.when, locale)}</div>
            <div>
              <h4 className="font-brand text-base">{t(chapter.title, locale)}</h4>
              <p className="mt-0.5 text-[13px] text-ink-soft">{t(chapter.impact, locale)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
