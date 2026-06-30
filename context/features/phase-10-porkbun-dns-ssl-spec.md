# Phase 10 — Porkbun DNS & SSL Cutover

> Point `ricardolamadrid.com` (DNS managed at Porkbun) at the Hostinger server, get SSL live on the real domain, and switch traffic from the old site to the new one — safely.

Context: @context/features/deployment-overview.md · Prereq: Phase 9 site serves from `public_html`; you have the **Hostinger server IP**.

## Goal

`https://ricardolamadrid.com` (and `www`) resolve to Hostinger, serve the new static site over a valid certificate, with HTTPS+www redirects working — and **email/other records left intact**.

## Pre-flight

- [ ] Record the **current** Porkbun DNS records (screenshot the whole zone). Especially note `MX`, any `TXT` (SPF/DKIM/DMARC, verifications), and where the root `A`/`ALIAS` currently points (the old host).
- [ ] Have the **Hostinger server IP** (Phase 9). Confirm whether Hostinger also wants a `www` record (A to same IP, or CNAME to root).
- [ ] Pick a **low-traffic window** — propagation can take minutes to a few hours.

## Requirements

### 1. Decide the DNS strategy (we keep DNS at Porkbun)

Two valid approaches — **A is recommended** since you chose to keep DNS at Porkbun:

- **A — Point records at Hostinger (keep Porkbun DNS):**
  - `A` record: host `@` (root) → **Hostinger IP**.
  - `A` record: host `www` → **Hostinger IP** (or `CNAME www → ricardolamadrid.com` if you prefer; with Porkbun you can also use `ALIAS`/`CNAME` flattening on root if ever needed).
  - **Leave `MX` and email `TXT` untouched** so mail keeps working.
- **B — Hand DNS to Hostinger (only if you'd rather manage DNS in hPanel):** change nameservers at Porkbun to Hostinger's, then recreate all records (incl. MX/TXT) in hPanel. More moving parts; not needed for your goal.

### 2. Apply the records at Porkbun

- Porkbun → Domain → **DNS / Edit records**.
- Update/replace the root `A` (and `www`) to the Hostinger IP. Lower the **TTL** to ~300s **before** the change if you can, so mistakes propagate out fast (raise it back to ~3600s after it's verified).
- Save. Do **not** delete `MX`/`TXT` records.

### 3. SSL on the live domain

- Once DNS resolves to Hostinger: hPanel → **Security → SSL** → issue/confirm **Let's Encrypt** for `ricardolamadrid.com` **and** `www.` (Let's Encrypt validates over HTTP, so it needs DNS pointing here first).
- Confirm auto-renewal is on. Verify the `.htaccess` HTTPS redirect (Phase 9) now fires on the real domain.

### 4. Replace the old site

- The old site is "replaced" automatically the moment DNS points at Hostinger's `public_html` (which now holds the new build). Keep the Phase 9 backup until you've confirmed the new site is fully healthy (Phase 11).

## Verification

```bash
dig +short ricardolamadrid.com          # → Hostinger IP
dig +short www.ricardolamadrid.com      # → Hostinger IP (or CNAME → root)
curl -sI https://ricardolamadrid.com    # → 200, valid TLS
curl -sI http://ricardolamadrid.com     # → 301 → https
curl -sI https://www.ricardolamadrid.com# → 301 → root
```

- [ ] Browser shows the **new** site at `https://ricardolamadrid.com` with a valid padlock.
- [ ] `http→https` and `www→root` redirects both work on the live domain.
- [ ] Email still flows (send yourself a test if a mailbox/forward exists) — confirms MX untouched.
- [ ] Check propagation from a couple of networks (e.g. phone on cellular) before declaring done.
- [ ] Raise TTL back up once stable.

## Rollback

- Revert the Porkbun `A`/`www` records to the previously-recorded values (old host) — fastest path back.
- The old site files remain in the Phase 9 backup zip if you also need to restore content.

## Out of scope

- Live content/SEO/perf QA and analytics (Phase 11).

## Deliverable

`ricardolamadrid.com` live on Hostinger over HTTPS with correct redirects and intact email — the new RicardoOS officially replacing the old site.
