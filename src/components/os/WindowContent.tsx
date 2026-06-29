"use client";

import { t, type AppDefinition } from "@/data";
import { useLocale } from "./locale-store";

/**
 * Placeholder window body for phase 3 — enough to prove the chrome and window
 * manager. Real per-app content (About, Projects, Terminal, …) lands in phase 4.
 */
const BLURBS: Record<AppDefinition["kind"], string> = {
  about: "A little about who I am and how I think.",
  projects: "Things I'm building — live, cooking, and experimental.",
  playground: "Half-baked experiments with no obligation to become anything.",
  terminal: "A toy shell. Type 'help' once it's wired up.",
  music: "Aero FM — soft synth pads on tap.",
  contact: "No forms. Just pick whatever feels right.",
  resume: "The story so far, as chapters.",
  link: "Opens elsewhere once the pages exist.",
};

export function WindowContent({ app }: { app: AppDefinition }) {
  const { locale } = useLocale();

  return (
    <div>
      <div className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-aqua-deep">
        {app.kind}
      </div>
      <h2 className="font-brand text-2xl tracking-tight">{t(app.title, locale)}</h2>
      <p className="mt-1.5 text-ink-soft">{BLURBS[app.kind]}</p>
      <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/45 px-3 py-1.5 text-[13px] font-semibold text-ink-soft">
        ✨ Content arrives in phase 4
      </p>
    </div>
  );
}
