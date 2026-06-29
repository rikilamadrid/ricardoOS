"use client";

import { about, t } from "@/data";
import { useLocale } from "@/components/os/locale-store";
import { useWindowStore } from "@/lib/window-store";
import { AquaButton } from "@/components/ui/AquaButton";

/** About Me — a short, human intro. Curiosity, building, learning, games. */
export function AboutApp() {
  const { locale } = useLocale();
  const openApp = useWindowStore((s) => s.openApp);

  return (
    <div>
      <div className="os-eyebrow">{t(about.eyebrow, locale)}</div>
      <h2 className="font-brand text-2xl tracking-tight">{t(about.heading, locale)}</h2>
      {about.paragraphs.map((p, i) => (
        <p key={i} className="mt-3 text-ink-soft">
          {t(p, locale)}
        </p>
      ))}
      <AquaButton
        variant="primary"
        className="mt-5"
        onClick={() => openApp(about.cta.target)}
      >
        {t(about.cta.label, locale)}
      </AquaButton>
    </div>
  );
}
