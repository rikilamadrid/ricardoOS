# Phase 9 — Hostinger Deployment

> Get the verified `out/` folder onto Hostinger's `public_html` with correct server config, reachable over the Hostinger temporary URL — **before** we touch the live domain's DNS.

Context: @context/features/deployment-overview.md · Prereq: Phase 8 produced a verified `out/`.

## Goal

The static site is live on Hostinger (via the temp/preview URL or the domain if it already points here), served over HTTPS, with HTTPS+www redirects, caching, and a working 404 — and the **old site is safely backed up** first.

## Requirements

### 0. Back up the current site FIRST (non-negotiable)

Before overwriting anything in `public_html`:

- hPanel → **File Manager** → select all of `public_html` → **download as zip**, OR use hPanel → **Backups** to create/download a fresh backup.
- Save it locally (e.g. `~/ricardolamadrid-backup-YYYYMMDD.zip`). This is the rollback.
- Note any existing files we must preserve (e.g. an existing `.well-known/`, email-related files, prior `.htaccess` rules).

### 1. Build the artifact

```bash
npm run build           # ./out is the deployable folder
cd out && zip -r ../ricardo-os-out.zip . && cd ..
```

### 2. Upload to `public_html`

Choose the path that matches what the Single plan exposes:

- **A — File Manager (simplest):** hPanel → File Manager → `public_html` → **empty it** (after backup) → **upload `ricardo-os-out.zip`** → **Extract** in place → delete the zip. Ensure files land directly in `public_html` (not `public_html/out/`).
- **B — SFTP (scriptable):** get SFTP host/port/user from hPanel → **Files → FTP Accounts**. Then e.g.:
  ```bash
  # rsync over SSH if SSH is available on the plan:
  rsync -avz --delete out/ USER@HOST:/home/USER/public_html/
  # or lftp for plain SFTP/FTPS:
  lftp -u USER,PASS sftp://HOST -e "mirror -R --delete out/ /public_html; bye"
  ```
- **C — Git (only if hPanel → Advanced → Git exists on the plan):** not guaranteed on Single; if present, it still needs a built `out/` (we don't build on the server). Usually A or B is simpler here.

> Use an **app-specific / FTP-account password**, never your main Hostinger login, if you want me to script B. Don't paste full credentials in chat — share via a secret method or run the command yourself with my template.

### 3. `.htaccess` (LiteSpeed/Apache config)

Place this in `public_html/.htaccess` (merge with any rules preserved from the backup):

```apache
# Serve the static 404
ErrorDocument 404 /404.html

# OG/Twitter images export as extensionless files named `opengraph-image`
# (Next metadata routes). Force the correct MIME or crawlers reject them.
<FilesMatch "(opengraph|twitter)-image$">
  ForceType image/png
</FilesMatch>

# Force HTTPS
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Redirect www → root (or flip if you prefer www as canonical)
RewriteCond %{HTTP_HOST} ^www\.(.+)$ [NC]
RewriteRule ^ https://%1%{REQUEST_URI} [L,R=301]

# Long-cache hashed static assets, revalidate HTML
<IfModule mod_headers.c>
  <FilesMatch "\.(js|css|woff2?|png|jpg|jpeg|gif|svg|ico)$">
    Header set Cache-Control "public, max-age=31536000, immutable"
  </FilesMatch>
  <FilesMatch "\.html$">
    Header set Cache-Control "public, max-age=0, must-revalidate"
  </FilesMatch>
</IfModule>
```

- Decide **canonical host** (root `ricardolamadrid.com` recommended; the rule above redirects www→root). Keep it consistent with `SITE_URL`.
- Because we used `trailingSlash: true`, folder URLs resolve to `index.html` natively — no SPA catch-all rewrite needed (and we *shouldn't* add one, or real 404s break).

### 4. Connect the domain in hPanel

- If `ricardolamadrid.com` is already attached to this hosting account, files in `public_html` serve it directly once DNS resolves here (Phase 10).
- If not, hPanel → **Websites / Add Website** (or **Domains**) → attach `ricardolamadrid.com` so the document root maps to `public_html`.
- Grab the **server IP** (hPanel → Websites → site → "Server IP" / "Details") — Phase 10 needs it for the Porkbun A record.

### 5. SSL

- hPanel → **Security → SSL** → ensure a free Let's Encrypt certificate is **issued and active** for the domain (and www). If DNS isn't pointed here yet, issuance may have to wait until Phase 10 — note it and revisit.

## Verification

- Visit the site via the **Hostinger preview/temp URL** (hPanel often provides one) or by temporarily mapping the IP in your local `hosts` file:
  ```
  # /etc/hosts  (temporary, for pre-DNS testing)
  <HOSTINGER_IP>  ricardolamadrid.com www.ricardolamadrid.com
  ```
- [ ] Home + a project page + a post page load directly (no 404).
- [ ] `https://` works; `http://` redirects to `https://`; `www.` redirects to root.
- [ ] `/sitemap.xml`, `/robots.txt`, a project `og:image` URL all return 200.
- [ ] A bogus path shows the on-brand 404.
- [ ] Remove the temporary `hosts` entry when done.

## Out of scope

- Public DNS cutover + final SSL on the live domain (Phase 10); live QA/analytics (Phase 11).

## Deliverable

Static site served correctly from `public_html` on Hostinger, validated via temp URL / hosts override, with the old site backed up and `.htaccess` in place — ready for DNS.
