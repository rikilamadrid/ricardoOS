# Phase 11 — Go-Live QA & Maintenance

> Verify the live production site is correct, fast, and shareable — then lock in a repeatable redeploy + backup routine so future updates are boring.

Context: @context/features/deployment-overview.md · Prereq: Phase 10 — `ricardolamadrid.com` live on Hostinger over HTTPS.

## Goal

Production is confirmed healthy across content, SEO, social sharing, performance, and mobile; you have a documented one-command-ish way to ship updates and recover.

## Requirements

### 1. Production smoke + content QA

- [ ] Boot, dock, every app opens; windows drag/resize/min/max; theme + wallpaper + colorblind + language all work on the live URL.
- [ ] Each route loads by **direct URL** (shareable deep links): `/`, `/projects/`, `/projects/<slug>/`, `/writing/`, `/writing/<slug>/`.
- [ ] No console errors; no mixed-content (all assets over HTTPS).
- [ ] Skim content for placeholder leftovers (this is also when real project/writing content should be in — see "Content" below).

### 2. SEO live checks

- [ ] `https://ricardolamadrid.com/sitemap.xml` and `/robots.txt` load and list correct **https** URLs.
- [ ] Canonicals + `metadataBase` resolve to the production origin (view-source).
- [ ] Submit the sitemap in **Google Search Console** (verify ownership via DNS TXT at Porkbun or an HTML file).

### 3. Social / OG validation

- [ ] Run the homepage + a project + a post through a card validator (e.g. opengraph.xyz, or platform debuggers) — image, title, description render.
- [ ] Confirm `og:image` URLs are absolute `https://ricardolamadrid.com/...` and return 200.

### 4. Performance (the Phase 7 tail, now on prod)

- [ ] Lighthouse (desktop) on the live URL — target **Performance ≥ 95**, plus good A11y/Best-Practices/SEO.
- [ ] Confirm caching headers from `.htaccess` are applied (DevTools → Network → `Cache-Control` on JS/CSS vs HTML).
- [ ] Confirm fonts/assets are gzip/brotli-compressed by LiteSpeed.

### 5. Mobile / cross-browser (also the Phase 7 tail)

- [ ] Real phone (≤720px): windows open near-fullscreen, draggable/resizable on touch, dock scrolls, icons reflow.
- [ ] Glass/`backdrop-filter` renders in Safari (incl. iOS), Chrome, Firefox.

### 6. Maintenance: redeploy workflow

Document this in the repo (e.g. a short `DEPLOY.md` at root) so it's not tribal knowledge:

```bash
# 1. Make changes via the normal feature → branch → build → merge flow.
# 2. Build the static export:
npm run build               # → ./out
# 3. Ship it to Hostinger public_html:
#    - File Manager: zip ./out, upload, extract, replace; OR
#    - SFTP/rsync: rsync -avz --delete out/ USER@HOST:/home/USER/public_html/
# 4. Hard-refresh; confirm the change is live.
```

- Note the canonical host, the Hostinger IP, and which upload method you use.
- Keep `.htaccess` in version control (copy it into the repo, e.g. `deploy/.htaccess`) so it's not lost on a re-extract.

### 7. Backups & safety net

- [ ] Keep the Phase 9 backup of the **old** site until you're 100% happy.
- [ ] Confirm Hostinger weekly backups are on; know how to restore from hPanel.
- [ ] The site itself is reproducible from git (`npm run build`), so git is your real backup — confirm everything is pushed.

### 8. Optional niceties

- Privacy-light **analytics** (e.g. Plausible/Umami script, or Cloudflare/Hostinger stats) — only if you want metrics; keep it lightweight to protect Lighthouse.
- Porkbun **email forwarding** so `you@ricardolamadrid.com` works.
- A `security.txt` / `humans.txt` for fun, on-brand with the OS theme.

## Content (the real non-code gap — surface it here)

Independent of deployment, the site still ships **seed/placeholder content**. Before or right after go-live, replace in `src/data/*` and `src/content/posts/*`:

- Real **projects** (links, taglines, covers; demo buttons currently toast "coming soon").
- Real **writing** (the 3 MDX posts are samples).
- Verify **About / Experience / Contact** copy and the **résumé PDFs** are current.

(Each content change = rebuild + redeploy via the workflow above.)

## Deliverable

A verified-healthy production site at `https://ricardolamadrid.com`, a documented `DEPLOY.md` + version-controlled `.htaccess`, and a clear list of any remaining real-content swaps.
