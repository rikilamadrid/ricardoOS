# RicardoOS — Phase 5 Spec: Content Pages, Writing (MDX), Routing & SEO

## Overview

This is phase 5 of 7. It adds real, shareable, SEO-friendly pages alongside the desktop: dedicated project detail pages, the Writing app backed by MDX, deep links into apps, and smooth transitions between the desktop and detail pages. The desktop at `/` remains the home base.

## Requirements for phase 5

- **MDX setup** for writing: `content/posts/*.mdx` with typed `PostMeta` frontmatter (`slug`, `title`, `summary`, `date`, `tags`, `draft`)
- **Writing app**: list of posts (title / summary / date) from frontmatter, linking to `/writing/[slug]`
- **Writing pages**: `/writing` index (crawlable) and `/writing/[slug]` article pages, statically generated
- **Project pages**: `/projects` fallback index + `/projects/[slug]` SSR detail pages (hero/cover, long write-up, tech, links)
- **In-window → page**: a project card's "expand" navigates to `/projects/[slug]` with a smooth page transition (Framer Motion); the desktop stays the home base
- **Deep links**:
  - `?app=<id>` auto-opens the matching app on load
  - visiting `/projects` or `/writing` directly opens the relevant app on the desktop
- **SEO & metadata**:
  - per-page `generateMetadata` (title, description, canonical) for project and post pages
  - Open Graph + Twitter cards; generate OG images (e.g. `@vercel/og`)
  - `sitemap.xml` + `robots.txt`
  - meaningful default metadata and a `<noscript>` summary for `/`

## Out of scope (handled later)

- Meditations, Playground, Terminal, Aero FM, Recycle Bin → phase 6
- Final motion / a11y / performance passes → phase 7

## References

- @context/project-overview.md
- @context/ricardo-os.html
- @src/content/posts/
- @src/app/projects/[slug]/page.tsx
- @src/app/writing/[slug]/page.tsx
- @context/features/phase-4-content-apps-spec.md
- @context/features/phase-6-easter-eggs-spec.md
