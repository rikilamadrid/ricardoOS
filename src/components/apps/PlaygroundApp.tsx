"use client";

import { toast } from "sonner";
import { playground, t } from "@/data";
import { useLocale } from "@/components/os/locale-store";

/**
 * Playground — a grid of half-baked experiments. Each experiment is a toy with
 * no obligation to become anything; clicking one fires a playful toast (until a
 * real interactive sandbox is wired in a later pass).
 */
export function PlaygroundApp() {
  const { locale } = useLocale();

  return (
    <div>
      <div className="os-eyebrow">{t(playground.eyebrow, locale)}</div>
      <h2 className="font-brand text-2xl tracking-tight">{t(playground.heading, locale)}</h2>
      <p className="mt-1.5 text-ink-soft">{t(playground.intro, locale)}</p>

      <div className="os-grid mt-4">
        {playground.experiments.map((exp) => (
          <button
            key={exp.id}
            type="button"
            className="os-card os-play-card"
            onClick={() => toast(`${exp.icon} ${t(exp.title, locale)}`, { description: t(exp.blurb, locale) })}
          >
            <span className="os-play-icon" aria-hidden="true">
              {exp.icon}
            </span>
            <span className="os-card-body">
              <span className="font-semibold">{t(exp.title, locale)}</span>
              <span className="mt-1 block text-[13px] text-ink-soft">{t(exp.blurb, locale)}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
