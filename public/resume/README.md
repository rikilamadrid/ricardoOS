# Résumé PDFs

The Résumé app (`src/components/apps/ResumeApp.tsx`) serves a per-language PDF
based on the active locale. Drop your files here with these exact names:

- `Ricardo_Lamadrid_Resume_en.pdf` — English
- `Ricardo_Lamadrid_Resume_es.pdf` — Spanish
- `Ricardo_Lamadrid_Resume_fr.pdf` — French

The "Download PDF" / "Open in new tab" buttons link to `/resume/<file>` and the
download keeps the language suffix in the filename. To change names or paths,
edit the `RESUME_PDF` map in `ResumeApp.tsx`.
