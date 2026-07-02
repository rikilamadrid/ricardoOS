# Coding Standards

## TypeScript

- Strict mode enabled
- No `any` types - use proper typing or `unknown`
- Define interfaces for all props, API responses, and data models
- Use type inference where obvious, explicit types where helpful

## React

- Functional components only (no class components)
- Use hooks for state and side effects
- Keep components focused - one job per component
- Extract reusable logic into custom hooks

## Next.js

- **This app is a static export** (`output: "export"`) — no server at runtime,
  **no database, no Server Actions, no API routes.** Everything is SSG.
- Server components by default; only use `'use client'` when needed
  (interactivity, hooks, browser APIs — the whole OS shell is client-side).
- Content comes from typed TS in `src/data/*` (localized) and MDX in
  `src/content/posts/*`. Import data from the `@/data` barrel.
- Dynamic routes (`/projects/[slug]`, `/writing/[slug]`) use
  `generateStaticParams` + `generateMetadata`.
- Metadata routes (`sitemap.ts`, `robots.ts`, `manifest.ts`,
  `opengraph-image.tsx`) must export `const dynamic = "force-static"`.

## Tailwind CSS v4

**CRITICAL**: We are using Tailwind CSS v4, which uses CSS-based configuration.

- **DO NOT** create `tailwind.config.ts` or `tailwind.config.js` files (those are for v3)
- All theme configuration must be done in CSS using the `@theme` directive in `src/app/globals.css`
- Use CSS custom properties for colors, spacing, etc.
- No JavaScript-based config allowed

Example v4 configuration:

```css
@import "tailwindcss";

@theme {
  --color-primary: oklch(50% 0.2 250);
}
```

## File Organization

- OS shell components: `src/components/os/ComponentName.tsx`
- App components (one per app): `src/components/apps/AppNameApp.tsx`
- shadcn/ui + shared primitives: `src/components/ui/`
- Pages / routes: `src/app/[route]/page.tsx`
- Content data (typed, localized): `src/data/*.ts` (barrel: `@/data`)
- Stores / helpers: `src/lib/[utility].ts`
- Design tokens: `src/styles/tokens.css`

## Naming

- Components: PascalCase (`ItemCard.tsx`)
- Files: Match component name or kebab-case
- Functions: camelCase
- Constants: SCREAMING_SNAKE_CASE
- Types/Interfaces: PascalCase (no prefix)

## Styling

- Tailwind CSS for all styling
- Use shadcn/ui components where applicable
- No inline styles
- Dark mode first, light mode as option

## Data

- **No database.** All content is version-controlled typed TS in `src/data/*`
  (localized `Localized<T>`, resolved with `t(value, locale)`) plus MDX posts in
  `src/content/posts/*`.
- Sections/apps are data-driven from `src/data/*` — never hardcode lists inside
  components. Adding an app = a `src/data/os.ts` registry entry + an
  `apps/*.tsx` component.
- Client state lives in Zustand stores (`src/lib/*-store.ts`) and React context
  providers (`src/components/os/*-store.tsx`); persist to `localStorage` only when
  a feature genuinely needs it (e.g. desktop icon positions).

## Error Handling

- Wrap fallible browser/audio APIs in try/catch; surface user-facing errors via
  sonner toasts.

## Code Quality

- No commented-out code unless specified
- No unused imports or variables
- Keep functions under 50 lines when possible
