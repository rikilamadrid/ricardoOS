# Ricardo OS — agent guide

The full project guide lives in **[CLAUDE.md](./CLAUDE.md)** — read it for
orientation, architecture, conventions, and commands. This file exists so
AGENTS.md-aware tools find the same instructions.

Quick pointers:

- Deep context: `context/*.md`; per-feature specs: `context/features/`.
- Content is in `src/data/*` (localized, import from `@/data`), **not** a database
  — the app is a static export with no backend.
- Tailwind **v4** (CSS-only config, no `tailwind.config.*`).
- Dev server runs on **port 3001**; `npm run build` must pass and **ask before
  committing**.
