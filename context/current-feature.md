# Current Feature: Phase 22 — Blip real-LLM fallback (guardrailed, free-tier)

## Status

🚧 **Code complete, awaiting deployment.** On branch
`feature/blip-llm-fallback`. Plan approved 2026-07-22, implemented the same
day. `npm run lint` + `npm run build` pass; `npx tsc --noEmit` clean in
`contact-endpoint/`. Not yet committed.

**Still to do (all dashboard work, see "Deployment" below):** Google AI
Studio key, Vercel project link, env vars, `NEXT_PUBLIC_CHAT_ENDPOINT` in CI.
Until then the fallback is inert and Blip behaves exactly as it did in
v1.6.0, which is why this is safe to merge now.

This is the **Phase 20C** track, explicitly deferred when Blip first shipped
and again when the Phase 21 FAQ bank shipped as v1.6.0 (see "Recently
landed" below). The FAQ bank still answers instantly and for free when it
matches; this phase adds a real LLM as a fallback for everything else,
scoped to "questions about this website" via a guardrailing system prompt.
**Provider: Google Gemini** (free tier via Google AI Studio) — chosen over
Groq/OpenRouter for quality-per-cost. Deliberately bypasses Vercel AI
Gateway (which meters against the Vercel account regardless of a provider's
own free tier) in favor of calling `@ai-sdk/google` directly.

**`contact-endpoint/` IS deployed** — verified live 2026-07-22 (earlier notes
in this file claiming it was never linked to Vercel were stale and wrong).
The Vercel project is **`ricardo-os`** at **`ricardo-os-brown.vercel.app`**,
with Root Directory `contact-endpoint`. `/api/contact` answers 405 on GET and
204 on OPTIONS; its URL is inlined in the live site's JS via the
`NEXT_PUBLIC_CONTACT_ENDPOINT` secret already wired into `deploy.yml`.

So `api/chat.ts` deploys to that **same existing project** — no new project
needed. It goes live at `https://ricardo-os-brown.vercel.app/api/chat` as
soon as this branch reaches a deployed branch. Remaining work is just the
Google AI Studio key + `NEXT_PUBLIC_CHAT_ENDPOINT`. Until that's done,
`ask()`'s fetch fails closed and Blip uses the static fallback line, so this
is safe to merge beforehand.

## Goals

- `contact-endpoint/api/chat.ts` (new): same conventions as the existing
  `api/contact.ts` (origin check, OPTIONS preflight, per-IP sliding-window
  rate limit), plus a daily total-request cap to protect the free-tier
  quota. System prompt built from `src/data/*` (about, profile, skills,
  experience, projects, contact), low temperature, short `maxOutputTokens`.
  Single-shot `generateText()`, not streaming — matches Blip's existing
  "one string, timed display" UX.
- `ask()` in `src/lib/assistant-brain.ts` becomes async: shows a `thinking`
  line, fetches `NEXT_PUBLIC_CHAT_ENDPOINT`, displays the answer on success,
  falls back to the existing static `faqFallback` line on any failure
  (network error, timeout, non-2xx, or the env var being unset). A small
  per-session call cap on top of the server's rate limit. `Brain`'s public
  shape (`{ text, poke, ask }`) is unchanged.
- `src/data/assistant.ts`: new `lines.thinking` pool.

Full design detail: `/Users/ricardolamadrid/.claude/plans/i-mean-what-would-wiggly-twilight.md`.

## What shipped (and where it deviates from the plan)

- **Model:** `gemini-2.5-flash-lite`, overridable via a `CHAT_MODEL` env var
  so the free-tier model can be swapped without a code change. The daily cap
  is likewise `CHAT_DAILY_MAX` (default 300) — both were added for tuning
  without a redeploy, and the cap being configurable is what made it
  testable.
- **The system prompt's knowledge is hand-curated, not imported.**
  `contact-endpoint/` deploys as its own project and can't import `src/data/*`,
  so `chat.ts` holds a `KNOWLEDGE` digest of profile/about/skills/experience/
  projects/contact. **This needs updating by hand when that content changes
  meaningfully** — the one real maintenance cost of this design.
- **Locale is sent with the question** (not in the original plan). Blip is
  trilingual, so the endpoint takes `{ question, locale }` and instructs the
  model to reply in that language. The answer comes back as one string and
  fills all three `Localized` slots, so flipping language mid-answer won't
  retranslate it — the alternative was three round-trips per question.
- **Race guard:** `ask()` stamps a sequence number before the fetch, so a slow
  answer to an abandoned question can't overwrite a newer one's bubble.
- **Prompt-injection guard:** the system prompt explicitly tells the model to
  ignore instructions embedded in the visitor's question.

## Verification done

- `npm run lint`, `npm run build` (main site) and `npx tsc --noEmit`
  (`contact-endpoint/`) all pass.
- Endpoint guard paths exercised directly with a throwaway `tsx` harness
  (Playwright isn't installed here, and these paths don't need a browser):
  OPTIONS → 204, GET → 405, cross-origin → 403, empty/missing/over-long
  question → 400, missing API key → 500, per-IP rate limit → 5 allowed then
  429, and the daily cap → 429 once exceeded. All pass.
- **Not yet verified — needs the deployed endpoint:** a real on-topic answer,
  an off-topic refusal, and the end-to-end thinking-line → answer flow in the
  browser. Do these once the deployment steps below are done.

## Deployment (manual, user-driven)

The Vercel project already exists (`ricardo-os`, Root Directory
`contact-endpoint`), so there is no project to create — only a key to add and
the site to rewire.

1. Create a Google AI Studio API key (<https://aistudio.google.com/apikey>).
2. Add `GOOGLE_GENERATIVE_AI_API_KEY` to the **existing** `ricardo-os` Vercel
   project. `ALLOWED_ORIGIN` is already handled (and defaults correctly to
   `https://ricardolamadrid.com` even if unset). Optionally `CHAT_MODEL` /
   `CHAT_DAILY_MAX`.
3. Push/merge this branch so Vercel redeploys that project and `/api/chat`
   stops 404ing.
4. Verify with curl **before** touching the site — an on-topic question should
   answer, an off-topic one ("write me a poem about cats") should decline.
5. Add repo secret `NEXT_PUBLIC_CHAT_ENDPOINT` =
   `https://ricardo-os-brown.vercel.app/api/chat`, and pass it through in
   `deploy.yml`'s build step next to `NEXT_PUBLIC_CONTACT_ENDPOINT`.
6. Rebuild the site — the var is inlined at build time, so setting the secret
   alone does nothing.

## Notes

- Size: **L**. Touches `contact-endpoint/api/chat.ts` (new),
  `contact-endpoint/package.json`, `src/lib/assistant-brain.ts`,
  `src/data/assistant.ts`.
- Version impact: **MINOR** (once deployment is wired up and the fallback
  actually activates; the code landing alone is invisible/no-op until then).
- Branch name: `feature/blip-llm-fallback`.
- No changes to `Assistant.tsx`'s public props/JSX — the ask panel already
  works off `text`/`poke`/`ask` without knowing why Blip is talking.

---

## Iteration 3 track — Phases 17–20

Planned 2026-07-21. Four independent features, ordered smallest-first so each
one is a self-contained branch. **Phase 16 (contact form) is parked** — it's
blocked on Hostinger/Titan support, not on code. Its notes are preserved
further down.

## Order & rationale

| Phase | Feature | Size | Why here |
| --- | --- | --- | --- |
| 17 | Retire Playground | XS | ✅ **Shipped** in v1.2.0 (merge `fac0417`) |
| 18 | Field Notes post — agentic workflow / context windows | S | ✅ **Shipped** in v1.3.0 (merge `96f6836`) |
| 19 | Backdrop system + 4 new scenes | M | ✅ **Shipped** in v1.4.0 (merge `dbc8612`) |
| 20 | Desktop assistant (bubble mascot) | L | ✅ **Shipped** in v1.5.0 (merge `c0bba8c`) |

---

## Phase 18 — Field Notes post: agentic workflow & context windows

✅ **Merged** (`96f6836`; feature commit `0a40e87`). See "Recently landed" below.

---

## Phase 19 — Backdrop system + 4 new scenes

✅ **Merged** (`dbc8612`; feature commit `72b9a86`). See "Recently landed" below.

---

## Phase 20 — Desktop assistant (bubble mascot)

**Decisions:** scripted brain first (**20C real LLM is explicitly out of scope
for now**). Mascot is a **cute bubble character** — Frutiger Aero glass
sphere with eyes and a smile, playing the Clippy role without being Clippy.
Original character, not a Microsoft reproduction.

Not an app window. A desktop-level floating character — sibling of
`ZenOverlay` / `FooterCredit`, above the desktop but below open windows.

**20A — Character + shell.**

- SVG bubble with the existing bubble gloss language (see `.os-bubble` in
  `globals.css`) — specular highlight, rim light, soft drop shadow — plus
  eyes, a smile, and a small idle wobble.
- Glass speech bubble using `os-glass`, tail pointing at the character.
- Draggable, dismissible, position + dismissed state persisted (follow
  `lib/desktop-icons-store.ts`).
- Idle animation, blink, `prefers-reduced-motion` honored (drop the wobble,
  keep the speech).
- Decide how it's re-summoned once dismissed: dock item, menu-bar item, or
  desktop context menu.

**20B — Scripted brain.**

- New `src/data/assistant.ts` — localized (`Localized<T>`) lines keyed to real
  OS state, never a random-quote generator.
- Triggers: first visit, app opened (per-app line), long idle, Terminal
  opened, wallpaper changed, all windows closed.
- Rules: never interrupt twice in a row, never repeat a line in a session,
  never block a click. Charm depends on restraint.

**20C — Real LLM (deferred, not scheduled).** Same UI, brain swapped: a
`/api/chat` function added to the existing `contact-endpoint/` Vercel project,
system prompt built from `src/data/*`, streaming, rate limit + spend cap.
Revisit only if visitors should actually be able to ask about his work.

**Verify:** keyboard reachable, screen-reader sane (`role="status"` /
`aria-live` on the bubble), touch-friendly on mobile, doesn't fight window
drag or the desktop context menu.

---

## Notes on this track

- Branch per phase per the usual workflow (`fix/remove-playground`,
  `feature/field-notes-agentic-workflow`, `feature/backdrop-scenes`,
  `feature/desktop-assistant`). Ask before branching into implementation.
- Version impact: 17 = MINOR (shipped as v1.2.0), 18 = MINOR, 19 = MINOR,
  20 = MINOR.

---

## Parked — Phase 16: Contact form + email

Blocked on Hostinger/Titan support, not on code. Resume by checking Gmail
filters, then contacting Hostinger. All prior findings retained below.

## 16D goals (code done, on branch `feature/contact-form-ui`)

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

**2026-07-14 resume, round 3:** confirmed via `dig titan3._domainkey.ricardolamadrid.com
TXT` against both `ns1.dns-parking.com` and `ns2.dns-parking.com` that the
corrected record is live and correct on both authoritative nameservers.
Titan's dashboard now shows DKIM as verified for `titan3._domainkey`. DKIM
setup is done — unblocks the rest of 16A.

Next: confirm whether `ricardo@ricardolamadrid.com` is a real, actively used
Titan mailbox or just a stale MX/SPF leftover with no real inbox behind it.
That decides the forwarding approach (configure forwarding inside the real
mailbox, vs. decommission Titan MX and use Porkbun's free email forwarding
instead). Then send a test email to `ricardo@ricardolamadrid.com` and confirm
it lands in `riki.lamadrid@gmail.com`.

**2026-07-14 resume, round 4 — new blocker.** Confirmed via Hostinger's Titan
webmail (`hostinger.titan.email/mail/`) that `ricardo@ricardolamadrid.com` is
a real, active Titan mailbox (Hostinger-provided, empty inbox, own setup
checklist) — not a stale leftover. Set up forwarding the low-risk way (no DNS
changes): Titan Settings → Forwarding → "Forward emails out" →
`riki.lamadrid@gmail.com`, with "keep a copy in Titan inbox" left on. The UI
shows the rule as active (entry present, "Stop forwarding" + "keep a copy:
Yes", no pending/verification state surfaced).

Despite that, **two separate test emails to `ricardo@ricardolamadrid.com`
both landed in Titan but never forwarded to Gmail** — and a broad Gmail
search (`from:titan.email`, `in:anywhere verify`, covering all
folders/spam/trash) turns up nothing at all, not even a verification email.
Next self-serve check: Gmail Settings → Filters and Blocked Addresses, to
rule out a filter silently dropping mail from `ricardolamadrid.com` /
`titan.email`. If that's clean, this looks like a Hostinger/Titan-side
forwarding bug (feature shows configured in the UI but isn't actually
delivering) and needs Hostinger support, not further DNS/dashboard
troubleshooting from here.

Resume by checking Gmail filters first, then contacting Hostinger support if
still stuck.

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

## Phase 16 sub-phases

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

**Code done and DEPLOYED.** Live at `https://ricardo-os-brown.vercel.app/api/contact`
(Vercel project `ricardo-os`, Root Directory `contact-endpoint`), with
`NEXT_PUBLIC_CONTACT_ENDPOINT` already wired into `deploy.yml`. Verified
2026-07-22. The "not yet deployed" note that used to sit here was stale.

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

**Phase 21 — Blip FAQ (typed question → canned answer).** ✅ Merged to
`main` (merge `c9b958c`; feature commit `01d4b3d`) and shipped as **v1.6.0**
on 2026-07-22. A small "?" toggle beside Blip's dismiss orb opens a glass
input panel; typed questions are keyword-matched against a new `faq` bank in
`src/data/assistant.ts` (stack, hiring, contact, best project, background,
résumé, experience, how the site's built), answered through the existing
`Speech` bubble, with several answers also opening the relevant app via
`openApp()`. Unmatched questions get a static `faqFallback` line. Still no
LLM, no backend — pure keyword substring matching, staying inside the
static-export constraint (that's Phase 22/20C, tracked separately). Verified
live with a headless Playwright pass rather than manual clicking, which
caught a real bug: `ask()` could force-interrupt a line still mid-display,
leaving stale text visible/announced for ~450ms — fixed by clearing the
current line immediately in `display()` when force-interrupting.

**Phase 20 — Desktop assistant (bubble mascot), "Blip".** ✅ Merged to `main`
(merge `c0bba8c`; feature commit `1c65081`) and shipped as **v1.5.0** on
2026-07-22. Both 20A (character + shell) and 20B (scripted brain) landed in
one commit; 20C (real LLM) stays explicitly out of scope, with the brain kept
behind a `useAssistantBrain({ locale, active, wallpaper }) → { text, poke }`
seam so it could later be swapped for a streaming LLM without touching the
character. Always present by default; dismiss via a jellybean `×` orb,
restore via a `Show Blip` desktop-context-menu item (dismissing teaches this
path via a toast). Deviates from spec on z-layering: Blip sits at `z-[7500]`,
*above* windows rather than below, so it can still deliver per-app lines when
a window covers the desktop. Triggers: first visit vs. return, app opened
(per-app line), last window closed, wallpaper changed, 75s idle, and click
("poke"). Restraint rules: 18s gap between unprompted lines, never repeats a
line in a session, never blocks a click. Verified live post-ship against the
full checklist (drag persistence, dismiss/restore, trigger pacing, zen-mode
silence, reduced motion, mobile touch targets) — all passed.

---

**Phase 19 — Backdrop system + 4 new scenes.** ✅ Merged to `main` (merge
`dbc8612`; feature commit `72b9a86`). A wallpaper now names a `scene` and
toggles the ambient layers it wants (`sun` / `rays` / `bubbles`), with the
foreground layer moved into a new `WallpaperScene.tsx`. The four existing
wallpapers keep `scene: "hill"` with every toggle on and emit the same DOM as
before. Four new scenes in CSS/SVG: Brushed Metal, Skyline, Deep Water, Chrome
Bubble, each with day, `.dark` and `.cb` treatments. Wallpapers moved into a
context submenu laid out as a swatch grid. Two extensions beyond the spec: a
fifth scene id `orb` (the spec's union was one slot short for four *new*
wallpapers), and a `base` field for the final sky stop, which was hardcoded to
a green haze that only made sense under the hill. Shipped as **v1.4.0**
(`3f6203e`).

---

**Phase 18 — Field Notes post: "The machine forgets".** ✅ Merged to `main`
(merge `96f6836`; feature commit `0a40e87`). New post at
`src/content/posts/the-machine-forgets.mdx`, dated 2026-07-21, EN/ES/FR.
Drop-in as expected: only the `.mdx` and `CHANGELOG.md` changed. Shipped as
**v1.3.0** (`e2bedc1`).

---

**Phase 17 — Retire Playground.** ✅ Merged to `main` (merge `fac0417`; feature
commit `5807a12`) and shipped as **v1.2.0**. Removed the Playground app
entirely — registry entry, window route, lazy import, component, content
module, barrel exports, docs rows, and the dead `.os-play-*` CSS. The terminal's
fake `ls` was re-laid out 3×3 so it doesn't show a hole. `?app=playground`
needed no fallback work: `DeepLinkOpener` already gates on the registry.

---

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
