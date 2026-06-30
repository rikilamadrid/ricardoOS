# RicardoOS — Deployment Overview & Strategy

> How we take the site we built and make it **live at `ricardolamadrid.com`**, replacing the current site — hosted on **Hostinger**, with DNS at **Porkbun**, deployed as a **static export**. No Vercel.

This document is the "why." The numbered phase specs (`phase-8` … `phase-11`) are the "how."

---

## The tools, and what each is actually for

| Tool | Role | What it does for us | What it does **not** do |
| --- | --- | --- | --- |
| **Porkbun** | Domain registrar + DNS | Owns `ricardolamadrid.com`; its nameservers answer "where does this domain live?" via DNS records (A / CNAME). Free WHOIS privacy, free SSL cert option, email forwarding. | It does **not** host or serve your website files. |
| **Hostinger** (Single Web Hosting) | Web host | Stores your files in `public_html` and serves them over HTTP(S) with the **LiteSpeed** web server (very fast at static files), free **Let's Encrypt SSL**, weekly backups, and `hPanel` to manage it all. | No Node.js runtime on the Single plan (Business/Cloud/VPS only) — so we can't run `next start`. We don't need to. |

**One-line mental model:** Porkbun is the *address book* (points the name at an IP). Hostinger is the *building* (holds and serves the files). They cooperate; they don't overlap.

### Getting the most out of them (you said you haven't explored them fully)

- **Porkbun**
  - Keep it as registrar — renewals are cheap and it includes free WHOIS privacy.
  - Manage DNS here (we keep DNS at Porkbun per your choice). The records that matter: `A` (root → Hostinger IP), `CNAME`/`ALIAS` (www → root), optional `TXT` (verification, email).
  - Turn on **email forwarding** (free) so `you@ricardolamadrid.com` lands in your real inbox without a paid mailbox.
- **Hostinger**
  - **hPanel → File Manager** for drag-and-drop deploys (upload a zip, extract). Good enough for this site.
  - **Free SSL** (auto via hPanel) — issue it once the domain points here; never pay for a cert.
  - **Weekly backups** are on by default — but we keep our own (the whole site is in git + a one-command rebuild).
  - **LiteSpeed cache + browser-cache headers** via `.htaccess` make a static site feel instant.
  - **`hPanel → Advanced → SSH/Git`**: availability varies by plan; if Single doesn't expose it, we use File Manager / SFTP. (Phase 9 covers both.)

---

## The architecture decision: static export

Our entire app compiles to **static + SSG** pages (verified in `next build`): no API routes, the contact app uses `mailto:`, and the only "dynamic" pieces (project/post pages, OG images) are prerendered at build via `generateStaticParams`. Nothing needs a server at request time.

So we set Next.js to **`output: "export"`**, which emits a plain `out/` folder of HTML/CSS/JS that any web server can host.

**Why this is the right call for you**

- ✅ Runs on **Single Web Hosting** as-is (no Node runtime required).
- ✅ **Fastest + cheapest + most reliable** — LiteSpeed serving static files, nothing to crash or patch.
- ✅ **Trivial rollback** — it's just files; keep the previous `out/` and you can revert in seconds.
- ⚠️ **Trade-off:** features that need a server *at request time* (live form handling, on-the-fly image optimization, ISR, runtime OG generation) aren't available without a rebuild. We use **none** of those today. If you ever need one, the escape hatch is a Hostinger Cloud/VPS plan running `next start`, or a small serverless function elsewhere — not a rewrite.

### The one thing to verify early (Phase 8)

Next.js generates the Open Graph share images (`opengraph-image.tsx`) with `next/og`'s `ImageResponse`. Under `output: "export"` these *should* prerender to static PNGs at build, but on **Next 16** this needs to be confirmed. Phase 8 tests it and, if it fails, swaps to **prebaked static OG images** (a single `og.png` per route in `/public`) — same result for crawlers, zero runtime.

---

## The redeploy workflow (after first launch)

Because there's no server, "deploying an update" = **rebuild + reupload**:

```bash
npm run build          # produces ./out (static export)
# then upload ./out to Hostinger public_html (File Manager zip, or SFTP/rsync)
```

Phase 9 turns this into a repeatable checklist (and, if your plan supports Git, an optional `git pull`-based deploy). Every change still goes through the normal feature → branch → build → merge flow first; deploy is the last step.

---

## Phase map

| Phase | File | Outcome |
| --- | --- | --- |
| **8 — Static Export Readiness** | `phase-8-static-export-spec.md` | App configured + verified to export to a correct `out/` folder locally (incl. OG images, 404, routing). No hosting yet. |
| **9 — Hostinger Deployment** | `phase-9-hostinger-deploy-spec.md` | `out/` uploaded to `public_html`, `.htaccess` (HTTPS/www/caching/404), site reachable on the Hostinger temp URL. |
| **10 — Porkbun DNS & SSL Cutover** | `phase-10-porkbun-dns-ssl-spec.md` | DNS at Porkbun points the domain at Hostinger; SSL issued; HTTPS + www redirects; old site safely replaced. |
| **11 — Go-Live QA & Maintenance** | `phase-11-go-live-qa-spec.md` | Live verification (pages, OG, sitemap/robots, Lighthouse, mobile), optional analytics, documented redeploy + backup routine. |

---

## What I'll need from you (and when)

- **Phase 9:** Hostinger hPanel access (you drive it, or app password / SFTP credentials if you want me to script the upload). The Hostinger **server IP** (hPanel shows it).
- **Phase 10:** Porkbun login (you drive the DNS panel; I'll give you exact record values). Confirmation of any current DNS records so we don't break email.
- Never paste full passwords into chat. Prefer scoped/app credentials, screen-share, or you click while I direct.

---

## Guardrails

- **Back up the current `ricardolamadrid.com` first** (download `public_html`) before replacing anything — Phase 9.
- **Don't touch unrelated DNS records** (especially `MX`/email `TXT`) during the A-record change — Phase 10.
- Plan the cutover for low-traffic time; DNS changes can take up to a few hours to propagate.
