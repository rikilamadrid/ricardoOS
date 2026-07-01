# RicardoOS — Project Overview

> **A personal site that behaves like a beautifully crafted operating system — Frutiger Aero, glassy, alive, and fun to explore.**

---

## Table of Contents

- [Vision](#vision)
- [Target Audience](#target-audience)
- [The Core Concept](#the-core-concept)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Content Models (TypeScript)](#content-models-typescript)
- [The "Apps" (Sections)](#the-apps-sections)
- [Design System](#design-system)
- [Window Manager](#window-manager)
- [Motion](#motion)
- [UI / UX](#ui--ux)
- [Routing & Deep Links](#routing--deep-links)
- [Accessibility](#accessibility)
- [Performance](#performance)
- [SEO & Metadata](#seo--metadata)
- [Build Phases](#build-phases)
- [Conventions & Rules](#conventions--rules)
- [Things To Avoid](#things-to-avoid)
- [Reference Prototype](#reference-prototype)

---

## Vision

The current site (`ricardolamadrid.com`) reads like a generic developer résumé: static, uninspiring, forgettable. This rebuild replaces it with an experience.

When someone lands, they don't read a page — they **boot into RicardoOS**, a tiny operating system. They explore a glossy desktop, open apps, drag windows around, change the wallpaper, and stumble on little surprises. The takeaway should be: *"This doesn't feel like a portfolio. This feels like something built by a person who genuinely loves making things."*

| Goal | Description |
| --- | --- |
| **Memorable** | Visitors remember the experience after closing the tab |
| **Exploratory** | Rewards curiosity with discoverable details and easter eggs |
| **Premium & calm** | Elegant, soft, intentional — never loud or gimmicky |
| **Alive** | Reflects what Ricardo is *building*, not where he's worked |
| **Personal** | Communicates curiosity, craft, and personality over a skills checklist |

The emotional target is the intersection of **Of the old Windows Vista Aero / macOS Aqua era** — not as copies, but as a shared standard of attention to detail.

---

## Target Audience

| Persona | What they should feel |
| --- | --- |
| **Engineering managers / recruiters** | "This person has serious taste and craft." |
| **Founders / indie hackers** | "I want to build something with them." |
| **Senior engineers / designers** | "The details here are deliberate and impressive." |
| **Discoverers** | People who arrive via Ricardo's projects, videos, or writing |

Primary measure of success: **time spent exploring** and **delight**, not bounce-optimized conversion.

---

## The Core Concept

The entire site is a **desktop operating system metaphor** called **RicardoOS**.

- **Sections become apps.** About, Projects, Playground, Writing, Experience, Contact, and "Meditations Between Quests" are launchable apps.
- **Apps open in glassy, draggable, resizable windows** with authentic aqua-gel chrome.
- **A magnification-free dock** at the bottom launches apps and shows which are running.
- **A translucent menu bar** at the top holds the OS logo menu, live clock, status popovers, and the day/night theme toggle.
- **The desktop itself is interactive:** right-click to change wallpaper, double-click icons, discover easter eggs.
- **Easter eggs reward exploration:** a working terminal, an ambient music player, a recycle bin that judges the old portfolio, and more.

> The OS framing is the product. Every feature decision should ask: *"Does this make RicardoOS feel more like a real, delightful operating system?"*

---

## Tech Stack

| Layer | Technology |
| --- | --- |
| **Framework** | Next.js (App Router, latest stable) |
| **UI Runtime** | React 19 |
| **Language** | TypeScript (strict mode) |
| **Styling** | Tailwind CSS v4 + CSS custom properties for design tokens |
| **Components** | shadcn/ui where appropriate (Radix primitives for menus, dialogs, popovers) |
| **Motion** | Framer Motion |
| **State** | Zustand (window manager store) |
| **Content** | Local typed TS data + MDX for writing (no database in v1) |
| **Icons** | Custom SVG aqua tiles (primary) + Lucide for utility glyphs |
| **Fonts** | Hanken Grotesk (UI workhorse) + Quicksand (OS branding) via `next/font` |
| **Deployment** | Vercel |

> **Version rule:** Always verify the current stable version of each dependency before installing (use the package's official docs). Do not assume versions from memory.

> **No-database rule:** v1 ships fully static/SSG. All content lives in version-controlled TS/MDX files. A headless CMS is an explicit *future* consideration, not a v1 requirement.

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx                 # Root layout, fonts, theme provider, PWA/appleWebApp metadata
│   ├── page.tsx                   # The desktop shell (boot → desktop)
│   ├── globals.css                # Tailwind + token imports
│   ├── manifest.ts                # Web app manifest (installable home-screen icons)
│   ├── icon.svg                   # Bubble-R favicon (source for PWA PNG icons)
│   ├── projects/
│   │   ├── page.tsx               # Deep-link fallback → opens Projects app
│   │   └── [slug]/page.tsx        # Dedicated SSR project page
│   ├── writing/
│   │   ├── page.tsx               # Deep-link fallback → opens Writing app
│   │   └── [slug]/page.tsx        # MDX post page
│   └── api/                       # (only if needed later, e.g. contact)
│
├── components/
│   ├── os/                        # The operating system shell
│   │   ├── BootScreen.tsx
│   │   ├── Desktop.tsx
│   │   ├── Wallpaper.tsx          # Sky, sun, rays, bubbles, hill, stars
│   │   ├── MenuBar.tsx
│   │   ├── Dock.tsx
│   │   ├── DesktopIcons.tsx
│   │   ├── ContextMenu.tsx
│   │   ├── Window.tsx             # Chrome, traffic lights, drag, resize
│   │   ├── WindowManager.tsx      # Renders open windows from store
│   │   └── Toast.tsx
│   ├── apps/                      # One component per app
│   │   ├── AboutApp.tsx
│   │   ├── ProjectsApp.tsx
│   │   ├── PlaygroundApp.tsx
│   │   ├── WritingApp.tsx
│   │   ├── MeditationsApp.tsx
│   │   ├── ExperienceApp.tsx
│   │   ├── ContactApp.tsx
│   │   ├── TerminalApp.tsx
│   │   ├── MusicApp.tsx
│   │   └── TrashApp.tsx
│   └── ui/                        # shadcn/ui components
│
├── content/
│   ├── apps.ts                    # App registry (id, title, icon, colors)
│   ├── projects.ts
│   ├── experiments.ts
│   ├── experience.ts
│   ├── meditations.ts
│   ├── contact.ts
│   ├── wallpapers.ts
│   └── posts/                     # MDX files (one per article)
│
├── lib/
│   ├── window-store.ts            # Zustand: windows, z-order, focus, theme
│   ├── theme.ts                   # Day/night + wallpaper logic
│   └── utils.ts
│
├── hooks/
│   ├── useDrag.ts
│   ├── useResize.ts
│   ├── useMediaQuery.ts
│   └── useReducedMotion.ts
│
└── styles/
    └── tokens.css                 # All design tokens as CSS variables
```

---

## Content Models (TypeScript)

All content is strongly typed. These interfaces are the single source of truth; UI renders from them.

```ts
// content/apps.ts ─────────────────────────────────────────────
export type AppId =
  | "about" | "projects" | "playground" | "writing"
  | "meditations" | "experience" | "contact"
  | "terminal" | "music" | "trash";

export interface AppDefinition {
  id: AppId;
  title: string;
  icon: string;              // emoji or custom SVG id
  tileLight: string;         // gradient top color (hex)
  tileDark: string;          // gradient bottom color (hex)
  inDock: boolean;
  onDesktop: boolean;        // shown as a desktop icon
  defaultWidth?: number;     // px; falls back to 420
  kind: "content" | "terminal" | "music" | "zen" | "trash";
}

// content/projects.ts ─────────────────────────────────────────
export type ProjectStatus = "live" | "building" | "experiment";

export interface Project {
  slug: string;              // → /projects/[slug]
  title: string;
  tagline: string;
  description: string;       // long form, supports markdown
  thumbnail: { icon: string; from: string; to: string }; // gradient tile
  cover?: string;            // optional hero image for detail page
  tech: string[];
  status: ProjectStatus;
  links: { demo?: string; github?: string; writeup?: string };
  featured: boolean;
  year: number;
}

// content/experiments.ts ──────────────────────────────────────
export interface Experiment {
  id: string;
  title: string;
  icon: string;
  blurb: string;
  href?: string;             // optional live sandbox / codepen
}

// content/experience.ts ───────────────────────────────────────
export interface ExperienceChapter {
  when: string;              // "Now", "2021–2023", etc. (no rigid timeline UI)
  title: string;             // e.g. "The scale chapter"
  impact: string;            // one paragraph, impact-focused, no bullet lists
}

// content/posts (MDX frontmatter) ─────────────────────────────
export interface PostMeta {
  slug: string;              // → /writing/[slug]
  title: string;
  summary: string;
  date: string;              // ISO
  tags: string[];
  draft: boolean;
}

// content/meditations.ts ──────────────────────────────────────
export interface Meditation {
  verse: string;             // short reflective line shown in the zen space
}

// content/contact.ts ──────────────────────────────────────────
export interface ContactLink {
  label: string;
  icon: string;
  href: string;              // mailto: or https:
}

// content/wallpapers.ts ───────────────────────────────────────
export interface Wallpaper {
  id: "sky" | "sunset" | "aurora" | "lavender";
  label: string;
  top: string; mid: string; low: string;  // sky gradient stops
  grass: number;                            // 0–1 intensity of the green hill
}
```

---

## The "Apps" (Sections)

| App | Maps to | Behavior |
| --- | --- | --- |
| **About** 😄 | About | Short, human intro. Curiosity, building, learning, games. CTA → Projects. |
| **Projects** 🧩 | Projects (the heart) | Grid of product-like cards. Each expands into a dedicated `/projects/[slug]` page. |
| **Playground** 🧪 | Playground | Grid of small experiments / prototypes / UI concepts. |
| **Writing** ✍️ | Writing | List of MDX posts → `/writing/[slug]`. Not strictly technical. |
| **Meditations Between Quests** 🌙 | Reflective space | Opening it **dims the desktop** and enters a calm, minimal "other space" with a breathing orb and a rotating verse. |
| **Experience** 📖 | Experience | Presented as **chapters**, impact-focused. No job-list, no timeline, no bullets. |
| **Contact** ✉️ | Contact | Elegant link buttons. No giant forms. |
| **Terminal** ⌨️ | Easter egg | Real command parser: `help`, `about`, `projects`, `whoami`, `ls`, `theme [day\|night]`, `joke`, `sudo`, `clear`, `contact`, `exit`. |
| **Aero FM** 🎵 | Easter egg | Ambient player with equalizer; soft Web Audio synth pad on user click. |
| **Recycle Bin** 🗑️ | Easter egg | Contains `old-portfolio.html`. "Empty bin" → playful toast. |

> Apps are registered in `content/apps.ts` and rendered by id. Adding a new app = add a registry entry + an `apps/*.tsx` component. The system must stay data-driven.

---

## Design System

The visual language is **"Future Aero"** — Frutiger Aero (glossy, translucent, optimistic techno-naturalism) elevated with modern restraint.

### Core Tokens (`styles/tokens.css`)

```css
:root {
  /* Sky / brand */
  --sky-top:#1E6FD9;  --sky-mid:#4FA8F5;  --sky-low:#BFE3FF;
  --aqua:#00C2FF;     --aqua-deep:#1C8CE0; --grass:#7ED957;

  /* Ink */
  --ink:#0A2540;      --ink-soft:#41607E;

  /* Glass */
  --glass:rgba(255,255,255,.45);
  --glass-strong:rgba(255,255,255,.62);
  --glass-line:rgba(255,255,255,.85);
  --glass-edge:rgba(120,170,225,.45);

  /* Form */
  --radius:18px;
  --shadow:0 22px 50px -18px rgba(13,52,99,.55);
}
```

### Color Direction

| Use | Direction |
| --- | --- |
| **Mode** | Light/day primary; dark/night must feel equally polished (deep aurora, not "hacker dark") |
| **Allowed** | White, soft gray, glass, subtle blues, hints of lavender & cyan, one touch of Bliss-green |
| **Forbidden** | Neon, rainbow gradients, heavy saturation, dark-terminal clichés |

### Typography

| Role | Font | Notes |
| --- | --- | --- |
| **OS branding / window titles** | Quicksand (600–700) | Rounded, bubbly, Aqua-era — used sparingly |
| **UI & body** | Hanken Grotesk (400–700) | Humanist, close to Frutiger / Segoe UI; readable, breathes |

Strong hierarchy, generous spacing, plenty of whitespace.

### Signature Surfaces

- **Frosted glass panels:** `backdrop-filter: blur(28px) saturate(185%)` over translucent white/navy.
- **Aqua-gel buttons:** pill shape, vertical gradient, a top **gloss highlight** (`::before`), inner light + soft drop shadow.
- **Glossy app tiles:** rounded squares with per-app hue gradient + white top-gloss + symbol.
- **Window chrome:** glossy title bar (top-half highlight), jellybean traffic lights (red/amber/green orbs with specular dot).
- **Living wallpaper:** layered sky gradient, soft sun glow, slow light rays, drifting translucent bubbles, a glossy green hill (Bliss nod), night stars.

---

## Window Manager

A Zustand store owns all window state. Windows are not page navigations — they're managed UI objects.

```ts
interface WinState {
  id: AppId;
  open: boolean;
  minimized: boolean;
  maximized: boolean;
  z: number;
  rect: { x: number; y: number; w: number; h: number };
}

interface WindowStore {
  windows: Record<AppId, WinState>;
  zTop: number;
  theme: "day" | "night";
  wallpaper: Wallpaper["id"];
  openApp(id: AppId): void;     // open or focus; bounce dock icon
  closeApp(id: AppId): void;
  focus(id: AppId): void;       // raise z-index
  minimize(id: AppId): void;
  toggleMax(id: AppId): void;
  setRect(id: AppId, rect): void;
  setTheme(t): void;
  setWallpaper(id): void;
}
```

Requirements:

- **Drag** by the title bar (Pointer Events; works for mouse + touch).
- **Resize** from a bottom-right grip (Pointer Events). Min 280×200, capped to viewport. **Must work on mobile too.**
- **Focus** on any pointer-down raises the window's z-index.
- **Open** once per app; re-launching focuses (and un-minimizes) the existing window.
- **Minimize / maximize / close** via traffic lights, each with its own animation.
- **Mobile:** windows open near-fullscreen (≈96vw, top ≈46px) but remain draggable/resizable. Sizing is set in JS, never locked with `!important`.

---

## Motion

Motion is core, but **every animation must have intention** — never motion for its own sake. Use Framer Motion.

| Element | Motion |
| --- | --- |
| **Boot** | Breathing orb + progress bar, then fade to desktop |
| **Window open** | Scale + fade up from rest (spring, ~0.26s) |
| **Window close** | Quick scale-down + fade |
| **Minimize** | Shrink toward the dock |
| **Dock icon** | Subtle single-icon lift on hover (**no neighbor magnification**), bounce on launch |
| **Cards** | Gentle lift + shadow bloom on hover |
| **Wallpaper** | Slow drifting bubbles, rotating light rays, theme crossfade (~1.1s) |
| **Meditations** | Slow overlay fade-in, 7s breathing orb |
| **Page transitions** | Soft blur/fade between desktop and dedicated project/post pages |

> **Reduced motion:** honor `prefers-reduced-motion`. Disable ambient loops (bubbles, rays), keep essential state-change feedback instant.

---

## UI / UX

### Desktop Layout

```
┌──────────────────────────────────────────────────────────────┐
│ ● RicardoOS  About  Projects  Playground        ☀ 📶 🔋 12:30 │ ← menu bar (glass)
├──────────────────────────────────────────────────────────────┤
│ [icon] About                                                  │
│ [icon] Projects                  ☀ living sky · bubbles · rays │
│ [icon] Playground                                             │
│                                                               │
│              ┌─────────────────────────────┐                  │
│              │ ● ● ●   Projects            │ ← glass window    │
│              │─────────────────────────────│   (drag/resize)   │
│              │  ┌─────┐ ┌─────┐ ┌─────┐    │                   │
│              │  │card │ │card │ │card │    │                   │
│              │  └─────┘ └─────┘ └─────┘  ◢ │ ← resize grip     │
│              └─────────────────────────────┘                   │
│                                            🟩 glossy green hill │
│        ┌───────────────────────────────────────────┐          │
│        │ 😄 🧩 🧪 ✍️ 🌙 📖 ✉️ │ 🎵 ⌨️ 🗑️ │ ← dock (scrolls)  │
│        └───────────────────────────────────────────┘          │
└──────────────────────────────────────────────────────────────┘
```

### Design Principles

- Modern, soft, playful, premium, calm, curious, interactive, beautiful.
- Almost-physical surfaces: glass, depth, blur, translucency, reflections, light.
- Alive without being distracting. Every pixel intentional.

### Micro-Interactions

- Toasts for actions (copy email, "demo coming soon", wallpaper changed).
- Hover states on every interactive surface.
- Live clock; status popovers ("Powered by curiosity — 100%").
- Right-click desktop → wallpaper switcher + day/night toggle.
- Dock running-indicators (dots) and launch bounce.

### Responsive

| Breakpoint | Behavior |
| --- | --- |
| **Desktop** | Full OS: floating draggable/resizable windows, desktop icons left column |
| **≤720px** | Desktop icons reflow to a wrapping row; dock scrolls horizontally; windows open near-fullscreen but stay draggable & resizable |

---

## Routing & Deep Links

The app is a single desktop, but key content also has **real, shareable, SSR pages** for SEO and linking.

| Route | Description |
| --- | --- |
| `/` | The desktop (boot → OS shell) |
| `/?app=projects` | Desktop with the Projects app auto-opened (query-param deep link) |
| `/projects` | Fallback index; opens Projects app (and is crawlable) |
| `/projects/[slug]` | Dedicated, SSR project page (hero, write-up, links) |
| `/writing` | Fallback index; opens Writing app |
| `/writing/[slug]` | MDX article page |

> Projects "expand into dedicated pages" (per the brief). The in-window card → push to `/projects/[slug]` with a smooth transition, while the desktop remains the home base.

---

## Accessibility

- Keyboard operable: every app launch, window control, and link reachable via keyboard; visible focus rings.
- Use Radix/shadcn primitives for menus, popovers, dialogs (focus trapping, ARIA handled).
- Respect `prefers-reduced-motion`.
- Maintain AA contrast for text over glass (test both day & night).
- Windows expose proper roles/labels; Escape closes focused window/menu.
- All interactive emoji/icon tiles have accessible names.

---

## Performance

> The site must feel **incredibly fast**. Animation must never hurt it.

- Static-generate everything possible (SSG); ship minimal JS to first paint.
- **Lazy-load app components** (`next/dynamic`) — an app's code loads when first opened.
- Limit `backdrop-filter` layers; cap simultaneous blurred surfaces.
- Cap bubble/particle counts; pause ambient loops when tab hidden and under reduced motion.
- Use GPU-friendly transforms/opacity for motion; avoid layout thrash on drag/resize (transform-based where possible).
- Optimize images via `next/image`; subset fonts via `next/font`.
- Budget: keep Lighthouse Performance ≥ 95 on desktop.

---

## SEO & Metadata

- Per-page `generateMetadata` (title, description, canonical) for `/projects/[slug]` and `/writing/[slug]`.
- Open Graph + Twitter cards; generate OG images (can use `@vercel/og`).
- Sitemap + robots; semantic headings inside app content.
- The desktop `/` still needs solid default metadata and a meaningful `<noscript>` fallback summary.

---

## Build Phases

| Phase | Deliverable |
| --- | --- |
| **1 — OS shell** | Boot, wallpaper, menu bar, dock, window manager (open/close/focus/drag/resize/min/max), theming + wallpapers |
| **2 — Core apps** | About, Projects (cards), Experience, Contact wired to typed content |
| **3 — Content pages** | `/projects/[slug]` + `/writing/[slug]` (MDX), deep links, transitions |
| **4 — Special + fun** | Meditations (zen mode), Playground, Terminal, Aero FM, Recycle Bin |
| **5 — Polish** | Motion pass, a11y pass, performance pass, SEO/OG, responsive QA |

---

## Conventions & Rules

- **Production quality:** component-driven, typed (strict), accessible, responsive, maintainable.
- **Data-driven:** sections/apps come from `content/*`; never hardcode lists inside components.
- **Tokens, not magic numbers:** colors, radii, shadows, blur live in `tokens.css` / Tailwind theme.
- **One app = one component** in `components/apps/`, registered in `content/apps.ts`.
- **No browser storage in v1** unless a feature truly needs it; prefer URL/query state for shareable UI.
- **Verify dependency versions** against official docs before installing.
- **Keep the OS illusion intact:** new features should feel native to a real, delightful operating system.

---

## Things To Avoid

(From the original brief — these are hard "no"s.)

- Another portfolio template.
- Skill bars, percentage charts, star ratings for languages, timelines.
- Walls of text, "About Me" essays.
- Listing every technology ever touched.
- Loud gradients, neon, cyberpunk, over-the-top 3D, dark-hacker aesthetic.
- Gimmicks and animation with no purpose.
- Generic developer clichés.

> Quality over quantity. The result should make other developers want to build better personal sites.

---

## Reference Prototype

A working single-file prototype (`ricardo-os.html`) already demonstrates the intended look and interactions: boot sequence, living Frutiger Aero wallpaper, glass menu bar, scrolling dock, draggable/resizable aqua windows, day/night + wallpaper switching, Meditations zen mode, Terminal, Aero FM, and Recycle Bin.

**Treat the prototype as the visual & interaction source of truth.** It doesn't have to be matched pixel-for-pixel — port its design tokens, chrome, and feel into the production Next.js + Tailwind + Framer Motion architecture described above, then refine.
