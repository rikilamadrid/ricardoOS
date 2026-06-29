"use client";

import { t, type AppDefinition } from "@/data";
import { useLocale } from "./locale-store";
import { AboutApp } from "@/components/apps/AboutApp";
import { ProjectsApp } from "@/components/apps/ProjectsApp";
import { ExperienceApp } from "@/components/apps/ExperienceApp";
import { ContactApp } from "@/components/apps/ContactApp";
import { ResumeApp } from "@/components/apps/ResumeApp";

/**
 * Routes a window to its app component by `kind`. The four core apps (About,
 * Projects, Experience, Contact) are real, data-driven content. The remaining
 * kinds (playground, terminal, music, link) still show a placeholder until
 * their phases land.
 */
const PLACEHOLDER: Partial<Record<AppDefinition["kind"], string>> = {
  playground: "Half-baked experiments with no obligation to become anything.",
  terminal: "A toy shell. Type 'help' once it's wired up.",
  music: "Aero FM — soft synth pads on tap.",
  link: "Opens elsewhere once the pages exist.",
};

export function WindowContent({ app }: { app: AppDefinition }) {
  switch (app.kind) {
    case "about":
      return <AboutApp />;
    case "projects":
      return <ProjectsApp />;
    case "experience":
      return <ExperienceApp />;
    case "resume":
      return <ResumeApp />;
    case "contact":
      return <ContactApp />;
    default:
      return <Placeholder app={app} />;
  }
}

function Placeholder({ app }: { app: AppDefinition }) {
  const { locale } = useLocale();
  return (
    <div>
      <div className="os-eyebrow">{app.kind}</div>
      <h2 className="font-brand text-2xl tracking-tight">{t(app.title, locale)}</h2>
      <p className="mt-1.5 text-ink-soft">{PLACEHOLDER[app.kind] ?? "Coming soon."}</p>
      <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/45 px-3 py-1.5 text-[13px] font-semibold text-ink-soft">
        ✨ Content arrives in a later phase
      </p>
    </div>
  );
}
