/**
 * Ricardo OS — mock data barrel.
 *
 * Single import surface for every content + chrome module. Import from
 * `@/data` and pull what you need:
 *
 *   import { profile, apps, t } from "@/data";
 *
 * All user-facing strings are `Localized<T>` (en / es / fr); resolve them
 * with `t(value, locale)` from `./i18n`.
 */

export * from "./types";
export * from "./i18n";

export { profile } from "./profile";
export { skillGroups } from "./skills";
export { experiences } from "./experience";
export { education, languageProficiency } from "./education";
export { about } from "./about";
export { projects, projectList, getProject, projectSlug } from "./projects";
export { experienceContent } from "./chapters";
export type { ExperienceChapter, ExperienceContent } from "./chapters";
export { contact } from "./contact";
export type { ContactContent } from "./contact";
export type { Project, ProjectsContent } from "./projects";
export type { AboutContent } from "./about";
export { aeroAmp } from "./music";
export type { MusicStation, Track } from "./music";
export { skins, DEFAULT_SKIN } from "./skins";
export type { Skin, SkinId } from "./skins";
export { terminal } from "./terminal";
export type { TerminalContent, TerminalCommand } from "./terminal";
export { meditations } from "./meditations";
export type { MeditationsContent } from "./meditations";
export { trash } from "./trash";
export type { TrashContent, TrashItem } from "./trash";
export { assistant } from "./assistant";
export type { AssistantContent, AssistantLinePool } from "./assistant";
export { apps, menuBar, statusBar, branding, desktop } from "./os";
export type { AppDefinition, TilePalette } from "./os";
