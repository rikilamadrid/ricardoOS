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
export { projects } from "./projects";
export { playground } from "./playground";
export { aeroFm } from "./music";
export { terminal } from "./terminal";
export { apps, menuBar, statusBar, branding, desktop } from "./os";
export type { AppDefinition, TilePalette } from "./os";
