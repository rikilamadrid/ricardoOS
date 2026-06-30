# Deploying RicardoOS

The site is a **static export** hosted on **Hostinger Single Web Hosting** and served by LiteSpeed. There is no server to run — deploying = rebuild + reupload files.

Live: <https://ricardolamadrid.com>

## Hosting facts

| Thing | Value |
| --- | --- |
| Host | Hostinger Single Web Hosting |
| Server IP | `191.101.79.132` |
| Web root | `public_html` |
| Registrar | Porkbun |
| Nameservers | `ns1.dns-parking.com` / `ns2.dns-parking.com` (**Hostinger** — DNS is managed in hPanel, not Porkbun) |
| SSL | Let's Encrypt (auto-renew) |
| Redirects | http→https, www→root (via `deploy/.htaccess`) |

## Redeploy (every update)

1. Make changes via the normal feature → branch → build → merge flow.
2. Build the static export:
   ```bash
   npm run build            # → ./out
   ```
3. Package it with the server config:
   ```bash
   cp deploy/.htaccess out/.htaccess
   (cd out && zip -rq ../ricardo-os-deploy.zip . -x '*.DS_Store')
   ```
4. Upload in hPanel → **File Manager**:
   - Open `public_html`.
   - **Back up first** if the change is risky (select all → download, or hPanel Backups).
   - Delete the old contents of `public_html` (not the folder itself; leave `.well-known/`).
   - **Upload** `ricardo-os-deploy.zip` → right-click → **Extract** into `public_html`.
   - Confirm `index.html`, `_next/`, `projects/`, `.htaccess` sit directly in `public_html`. Delete the zip.
5. Hard-refresh the site and confirm the change is live.

> `ricardo-os-deploy.zip` is gitignored. `deploy/.htaccess` is version-controlled — keep it in sync if you change server rules.

## Verify a deploy from the CLI

```bash
# Against the live domain:
for p in / /projects/ /writing/ /sitemap.xml /robots.txt /opengraph-image; do
  echo "$p -> $(curl -s -o /dev/null -w '%{http_code} %{content_type}' https://ricardolamadrid.com$p)"
done
# Expect: 200 text/html (pages), 200 application/xml (sitemap),
#         200 text/plain (robots), 200 image/png (OG image)
```

To test a build **before** DNS/by IP (bypasses DNS):

```bash
curl -sk --resolve ricardolamadrid.com:443:191.101.79.132 -L https://ricardolamadrid.com/ | grep -o '<title>[^<]*</title>'
```

## Notes / gotchas

- **OG images** export as extensionless files named `opengraph-image`; the `.htaccess` `ForceType image/png` rule makes them serve correctly. Don't drop that rule.
- **`output: export`** means metadata routes (OG images, robots, sitemap) need `export const dynamic = "force-static"` — already set. New metadata routes need the same.
- No `next/image` runtime optimization (static host) — `images.unoptimized` is on. Use plain optimized assets.
- Want server features later (live forms, ISR, runtime OG)? That needs a Hostinger Cloud/VPS plan running `next start`, or an external serverless function — not a rewrite.
