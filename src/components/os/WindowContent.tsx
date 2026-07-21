"use client";

import dynamic from "next/dynamic";
import { type AppDefinition } from "@/data";
import { AboutApp } from "@/components/apps/AboutApp";
import { ProjectsApp } from "@/components/apps/ProjectsApp";
import { ExperienceApp } from "@/components/apps/ExperienceApp";
import { ContactApp } from "@/components/apps/ContactApp";
import { ResumeApp } from "@/components/apps/ResumeApp";
import { WritingApp } from "@/components/apps/WritingApp";

/**
 * Routes a window to its app component by `kind`. Core content apps load
 * eagerly; the phase-6 easter-egg apps (Terminal, Aero Amp, Recycle Bin) are
 * lazy-loaded via `next/dynamic` so their code only ships when a user
 * first opens them. Meditations isn't here — it's a desktop-level zen overlay.
 */
const loading = () => <div className="os-app-loading">Opening…</div>;

const TerminalApp = dynamic(
  () => import("@/components/apps/TerminalApp").then((m) => m.TerminalApp),
  { loading },
);
const MusicApp = dynamic(
  () => import("@/components/apps/MusicApp").then((m) => m.MusicApp),
  { loading },
);
const TrashApp = dynamic(
  () => import("@/components/apps/TrashApp").then((m) => m.TrashApp),
  { loading },
);

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
    case "writing":
      return <WritingApp />;
    case "terminal":
      return <TerminalApp />;
    case "music":
      return <MusicApp />;
    case "trash":
      return <TrashApp />;
    default:
      return null;
  }
}
