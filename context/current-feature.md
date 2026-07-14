# Current Feature: Phase 16D — Contact App Form UI

## Status

In Progress (on branch `feature/contact-form-ui`)

## Goals

- Extend `src/components/apps/ContactApp.tsx` with a minimal name/email/message
  form alongside the existing link buttons.
- Client-side validation + loading/success/error states via the existing
  sonner toast system.
- Localize all new copy (`Localized<T>` / `t()`).
- Update the `contact.ts` intro copy — it currently reads "No forms. Pick
  whatever feels right," which contradicts adding a form.
- Submit handler posts to a `NEXT_PUBLIC_CONTACT_ENDPOINT` env var — the
  actual serverless endpoint (Phase 16C) doesn't exist yet, so this wires the
  UI ahead of the backend. Submissions will fail until 16C ships and the env
  var is set; that's expected for now.

## 16A status — paused, unresolved

Started Phase 16A (Porkbun email forwarding) live with the user; hit a wall
adding the DKIM TXT record (`titan2._domainkey`) Hostinger/Titan requires
before enabling external forwarding to `riki.lamadrid@gmail.com`:

- Confirmed the domain's live nameservers are `ns1/ns2.dns-parking.com`,
  genuinely operated by Porkbun (registrar + NS match).
- Confirmed root A record, MX (`mx1/mx2.titan.email`), and SPF are all live
  and correct via direct `dig` against the authoritative servers — the site
  and existing mail routing are unaffected by anything done so far.
- Porkbun's newer "DNS Powered by Cloudflare" panel is a **decoupled, mostly
  empty zone** — it warned the domain isn't on Porkbun's default
  nameservers and offered to switch them. **Did not accept** — doing so
  would likely have dropped the live A/MX/SPF records and taken the site
  and mail down. Correctly backed out via "No, thank you."
- Switched to Porkbun's "classic view" DNS editor instead (the one actually
  serving the live zone) and added the DKIM TXT record there. It appears
  saved in that UI, but `dig` against both authoritative nameservers
  (`ns1`/`ns2.dns-parking.com`) still returns nothing for
  `titan2._domainkey.ricardolamadrid.com` after a wait — unresolved as of
  2026-07-13.

**2026-07-13 resume, round 2:** regenerated a fresh DKIM key in Titan
(`titan3._domainkey`, supersedes the dead `titan2._domainkey` attempt).
Found the actual root cause of the original failure: the record was first
saved with the whole "`titan3._domainkey / v=DKIM1; k=rsa; p=...`" line
pasted into the single **Answer/Value** field (Host left blank) — Titan's
copy panel displays host and value together, but Porkbun needs them split.
Corrected the entry (Host: `titan3._domainkey`, Value: `v=DKIM1; k=rsa;
p=...` only) — but confirmed via the domain's DNS Records screen that this
edit had again landed in Porkbun's **"DNS Powered by Cloudflare" panel**,
which is a decoupled/inactive zone (banner: "Your domain is not currently
using our default nameservers"), not the live zone served by
`ns1/ns2.dns-parking.com`. **Did not** accept its offer to switch
nameservers (would risk dropping live A/MX/SPF). Re-added the same
corrected record (Host `titan3._domainkey`, same value) in the **classic
view** editor instead, which is the one actually authoritative. Record may
take up to ~24h to propagate. Next step when resumed: `dig
titan3._domainkey.ricardolamadrid.com TXT` against both
`ns1`/`ns2.dns-parking.com` to confirm it's live before continuing with
Titan/Porkbun forwarding setup.

This is a known dangling thread — resume by re-running the `dig` checks
before touching DNS further.

### Domain & DNS facts (confirmed via whois/dig, 2026-07-13)

- Registrar: **Porkbun**. DNS is also managed at Porkbun (`ns1/ns2.dns-parking.com`
  — despite the name, this is Porkbun's own DNS hosting, not an unused-parking
  state).
- Root A record already points at the Hostinger box (`191.101.79.132`) — site
  hosting is unaffected by anything below.
- **Existing MX + SPF records already present**, pointing at `mx1/mx2.titan.email`
  (`v=spf1 include:spf.titan.email ~all`). Origin unknown — possibly a leftover
  Titan Mail add-on from Porkbun, never confirmed as an active mailbox. Must be
  checked in the Porkbun dashboard before doing anything else (Phase 16A).

### Architecture constraint

The site ships as a static export (`output: "export"`, no server, no API
routes, no database — see `CLAUDE.md`). Resend's API key is a private secret
and must never be embedded in client-side JS. Decision: add one small,
isolated serverless function (Vercel Function, separate from this repo's
static deploy) that holds the Resend key and relays form submissions. The
main site stays 100% static on Hostinger; only this one endpoint lives
elsewhere.

## Phases

### 16A — Email forwarding (no code, external dashboards)

- Log into Porkbun, inspect the existing Titan MX/SPF records — confirm
  whether a real mailbox exists or if it's stale/unused.
- If no real mailbox: remove or ignore the Titan MX records and set up
  Porkbun's free email forwarding for `ricardo@ricardolamadrid.com` →
  `riki.lamadrid@gmail.com`.
- If a real Titan mailbox exists: either configure a forwarding rule inside
  it, or decide to decommission it in favor of plain forwarding (cheaper,
  simpler — no mailbox to maintain if all mail should land in Gmail anyway).
- Send a test email to `ricardo@ricardolamadrid.com` and confirm it arrives
  at `riki.lamadrid@gmail.com`.

### 16B — Resend domain verification

- Create/confirm Resend account.
- Add a sending domain — likely a subdomain (e.g. `mail.ricardolamadrid.com`)
  to keep sending reputation isolated from the root domain's receiving MX.
- Add the DKIM/SPF/DMARC DNS records Resend requires, in Porkbun's DNS panel.
- Verify the domain in the Resend dashboard.

### 16C — Serverless contact endpoint

**Code done** (branch `feature/contact-endpoint`), **not yet deployed/linked
to Vercel** — that part needs the user (project creation + env vars are
dashboard actions).

- Scaffolded as its own small project at `contact-endpoint/` (own
  `package.json`/`tsconfig.json`, gitignored `node_modules`/`.vercel`) —
  lives in this repo's git history but is meant to be linked as a
  **separate Vercel project** with `contact-endpoint` as its Root
  Directory, so it deploys independently of the static-export site.
- `contact-endpoint/api/contact.ts` — a standard Vercel Function
  (`@vercel/node` req/res signature). Accepts `POST { name, email, message,
  company }`, validates server-side (name non-empty, email regex, message
  ≥5 chars), sends via `resend.emails.send`.
- Abuse protection implemented: honeypot (`company` — silently 200s if
  filled), `Origin` header checked against `ALLOWED_ORIGIN` (rejects
  cross-origin POSTs), and an in-memory sliding-window rate limit (5
  req/min per IP) — good enough as a basic deterrent; not a durable/
  distributed limiter, but Fluid Compute's instance reuse makes it useful
  in practice. `OPTIONS` preflight handled.
- Env vars the Vercel project will need once linked: `RESEND_API_KEY`
  (required — 500s without it), `CONTACT_TO_EMAIL` (defaults to
  `riki.lamadrid@gmail.com`), `CONTACT_FROM_EMAIL` (defaults to Resend's
  shared `onboarding@resend.dev` sender — **swap this to a
  `mail.ricardolamadrid.com` address once 16B's domain is verified**,
  since the shared sender has worse deliverability), `ALLOWED_ORIGIN`
  (defaults to `https://ricardolamadrid.com`).
- Dependency versions verified against npm at scaffold time: `resend@6.17.2`,
  `@vercel/node@5.8.24`, `typescript@7.0.2`. Typechecks clean
  (`npx tsc --noEmit` in `contact-endpoint/`). `npm audit` flags several
  moderate/high advisories, but they're all in `@vercel/node`'s transitive
  *build-time* tooling (`@vercel/build-utils`, `@vercel/python-analysis`,
  etc.) used only for local types/dev — not bundled into the deployed
  function — so left as-is rather than force-downgrading `@vercel/node`.
- `ContactApp.tsx`'s submit handler now actually sends the `company`
  honeypot value in the POST body (it was tracked in state but never sent
  before — small oversight fixed alongside this).
- Remaining before this can go live: create the Vercel project (link
  `contact-endpoint/` as Root Directory), set the env vars above, get the
  deployed function's URL, and set `NEXT_PUBLIC_CONTACT_ENDPOINT` as a repo
  secret/env var in the GitHub Actions workflow that builds and deploys the
  main site to Hostinger (the main site itself stays on Hostinger, not
  Vercel — only this one endpoint lives on Vercel).

### 16D — ContactApp form UI

- Extend `src/components/apps/ContactApp.tsx` with a minimal form (name,
  email, message) alongside the existing link buttons — keep it small and
  elegant per the project's "no giant forms" principle.
- Wire submission via `fetch()` to the Phase 16C endpoint.
- Client-side validation, loading/success/error states via existing toast
  system (sonner).
- Localize all form copy (`Localized<T>` / `t()`), matching the rest of the
  app.

### 16E — Test & polish

- End-to-end test: submit form → email lands in Gmail.
- Mobile/touch check, keyboard accessibility, reduced-motion check on any new
  animation.
- Update `CHANGELOG.md` under `[Unreleased]`, then append a summary to
  `context/history.md` once merged.

## Notes

- Each phase can be its own branch/PR (`feature/email-forwarding`,
  `feature/contact-form-resend`, etc.) per the usual workflow — ask before
  branching into implementation.
- Phase 16A and 16B involve external dashboards (Porkbun, Resend) that only
  the user can access; I'll walk through those steps live rather than execute
  them.

---

## Deferred — maintenance & live QA track

Resume after Phase 15 lands. Overview retained for reference:

- Run remaining live-site QA from `context/features/phase-11-go-live-qa-spec.md`
  (Lighthouse, mobile/touch, cross-browser, OG/social, Search Console + sitemap).
- Replace any remaining seed/demo copy in `src/data/*` and `src/content/posts/*`.
- Keep `CHANGELOG.md`, `context/history.md`, and this file aligned as slices land.

---

## Recently landed

**Project detail locale persistence.** ✅ Merged to `main` (`5d105ce`). Project
cards now preserve the selected language when opening detail pages: Spanish and
French routes use `/projects/<slug>/es` and `/projects/<slug>/fr`, detail copy
and metadata resolve through the active locale, and return links keep the
Projects app in that locale.

---

**Aero Amp mobile touch targets.** ✅ Merged to `main` (merge `a730640`, commit
`6d6ef64`). Touch-only (`pointer: coarse`) sizing for the Winamp player: bigger
seek/volume/EQ slider thumbs and tracks with `touch-action: none` so drags
don't fight page scroll, and an invisible tap-area extension around the tiny
minimize/close buttons — desktop mouse sizing untouched. Also finishes the
Aero FM → Aero Amp rename left over from Phase 15D, removes the unused shadcn
`dropdown-menu.tsx` scaffold, and backfills `context/history.md` with the
Phase 15A–15D entries that were never logged.

---

**Phase 15D — Aero Amp project card + RKY playlist.** ✅ Merged to `main`
(`969734d`; feature commits `7e4e99e`, `585ccd0`, `d47068f`). Adds the
`aero-amp` project entry and `/projects/aero-amp` detail page, superseding the
old "Aero FM" branding, and swaps the Winamp player's placeholder vaporwave
tracks for eight of Ricardo's own tracks (released as RKY). **Phase 15 —
Retro Winamp Media Player is now complete** (sub-features A–D all merged).

---

**Phase 15C — Docked Winamp playlist + 10-band EQ panels.** ✅ Merged to `main`
(`482d33f`; feature commit `1f5a733`). The PL and EQ chips toggle a dockable
playlist panel and a preamp + 10-band graphic equalizer wired into the audio
graph (lowshelf/peaking/highshelf biquad chain between source and analyser),
with a reset and skin-aware styling. Only sub-feature D (project card) remains.

---

**Phase 15B — Winamp skin system.** ✅ Merged to `main` (`ff06c04`). Token-driven
`--wa-*` chrome with Classic / Frutiger Aero / Amber CRT skins, persisted via
`lib/skin-store.ts`, selected from a labeled `SKIN` row of swatch tiles above the
playlist. Sub-features C (playlist/EQ) and D (project card) remain.

---

**Phase 15A — Winamp reskin + chromeless floating player.** ✅ Merged to `main`
(`86e69f0`). The media player now renders outside the aqua-glass frame as its own
draggable, resizable Winamp panel.

---

**Semantic versioning + changelog workflow.** Added `CHANGELOG.md`, version bump
scripts in `package.json`, and repo guidance so releases follow SemVer and Keep a
Changelog conventions.

---

**AI Strategy Table project + project chrome refresh.** ✅ Merged to `main`
(`5ca41fe`; feature commits `2d94b8b`, `82ecc73`). Adds
`/projects/ai-strategy-table`, screenshot-backed project peeks on cards/detail
pages, and the red PokéPal title accent.

---

**Lamadrid Labs footer credit.** ✅ Merged to `main` (`d88532b`; feature commit
`c39b763`). Added the footer credit to both the desktop shell and window views.

---

**Field Notes localization.** ✅ Merged to `main` (`3656421` and `29fa9db`;
feature commits `f2c88c4`, `a56b125`). Localized the Field Notes app chrome,
post metadata, article bodies, and locale-preserving article/index navigation.

---

## Iteration 2 — post-launch enhancements

A small enhancement track on top of the live site. Overview:
@context/features/iteration-2-overview.md

| Phase | Feature | Spec | State |
| --- | --- | --- | --- |
| 12 | Home-screen / installable icons (PWA manifest) | `phase-12-home-screen-icons-spec.md` | ✅ **Merged** (`dab63f4`), live |
| 13 | Desktop app set + desktop/dock separation (remove Bin, add Contact; desktop ≠ dock) | `phase-13-desktop-app-layout-spec.md` | ✅ **Merged** (`7c7ab06`), live |
| 14 | Draggable / rearrangeable desktop icons (persisted) | `phase-14-draggable-desktop-icons-spec.md` | ✅ **Merged** (`33ce629`), live |

---

## History & deployment

Completed-work log and live deployment facts live in @context/history.md.

**Live:** <https://ricardolamadrid.com> (Hostinger static export, CI auto-deploy
on push to `main`).
