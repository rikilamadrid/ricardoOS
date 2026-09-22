# Ricardo OS — mock data

Content for the portfolio, kept apart from UI so the interface can build
against stable data. Résumé content is sourced from the September 2026
résumés in English, Spanish, and French.

## Localization

Every user-facing string is `Localized<T>` = `{ en; es; fr }`. Resolve it with
`t(value, locale)`:

```ts
import { profile, t, type Locale } from "@/data";

const locale: Locale = "es";
profile.name;              // "Ricardo Lamadrid"  (locale-independent)
t(profile.title, locale);  // localized title string
```

Locales live in `types.ts`: `LOCALES`, `Locale`, `DEFAULT_LOCALE`,
`LOCALE_LABELS`. `t()` falls back to the default locale when a key is missing.

## Files

| File            | Contents                                                            |
| --------------- | ------------------------------------------------------------------- |
| `types.ts`      | Shared types, `Locale`, `Localized<T>`, `Level`                     |
| `i18n.ts`       | `t()` localization helper                                           |
| `profile.ts`    | Name, title, summary, contact links                                 |
| `skills.ts`     | Skill groups shown as unranked tags                                 |
| `experience.ts` | Work history with localized highlights                              |
| `education.ts`  | Degrees + spoken-language proficiency                               |
| `resume-projects.ts` | Selected projects shown in the Résumé app                     |
| `about.ts`      | "About Me" window copy ("Hi, I'm Ricardo 👋")                       |
| `projects.ts`   | "Projects" window (placeholders for now)                            |
| `music.ts`      | "Aero Amp" mini player                                              |
| `terminal.ts`   | Fake-shell command registry                                         |
| `os.ts`         | App registry, dock, desktop icons, menu bar, status bar, wallpaper  |
| `index.ts`      | Barrel — import everything from `@/data`                            |

## Notes for later phases

- Content is real; UI placement values in `os.ts` (`window`, `gradient`) are
  starting guesses — tune them when the shell is built.
- Placeholder projects have `status: "placeholder"`; flip to `building` /
  `shipped` and fill `links` as work lands.
- Audio (`music.ts` `src`) is referenced by key.
