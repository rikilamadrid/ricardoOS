# Ricardo OS — mock data

Seed/mock content for the portfolio, kept apart from UI so phases can build
against stable data. Sourced from the 2026 résumés (EN/ES) and the Aqua-style
desktop mockups. French is translated and ready for the language toggle.

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
| `skills.ts`     | Skill groups + 1–5 levels                                           |
| `experience.ts` | Work history with localized highlights                              |
| `education.ts`  | Degrees + spoken-language proficiency                               |
| `about.ts`      | "About Me" window copy ("Hi, I'm Ricardo 👋")                       |
| `projects.ts`   | "Projects" window (placeholders for now)                            |
| `playground.ts` | "Playground" experiments                                            |
| `music.ts`      | "Aero Amp" mini player                                              |
| `terminal.ts`   | Fake-shell command registry                                         |
| `os.ts`         | App registry, dock, desktop icons, menu bar, status bar, wallpaper  |
| `index.ts`      | Barrel — import everything from `@/data`                            |

## Notes for later phases

- Content is real; UI placement values in `os.ts` (`window`, `gradient`) are
  starting guesses — tune them when the shell is built.
- Placeholder projects have `status: "placeholder"`; flip to `building` /
  `shipped` and fill `links` as work lands.
- Audio (`music.ts` `src`) and experiment components (`playground.ts`
  `experiment` keys) are referenced by key but not implemented yet.
