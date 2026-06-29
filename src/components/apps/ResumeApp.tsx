"use client";

import { toast } from "sonner";
import {
  profile,
  experiences,
  education,
  languageProficiency,
  skillGroups,
  t,
  type Locale,
} from "@/data";
import { useLocale } from "@/components/os/locale-store";
import { AquaButton } from "@/components/ui/AquaButton";

/** Per-language résumé PDF in /public/resume. */
const RESUME_PDF: Record<Locale, string> = {
  en: "/resume/Ricardo_Lamadrid_Resume_en.pdf",
  es: "/resume/Ricardo_Lamadrid_Resume_es.pdf",
  fr: "/resume/Ricardo_Lamadrid_Resume_fr.pdf",
};

const SECTION: Record<string, Record<Locale, string>> = {
  summary: { en: "Summary", es: "Resumen", fr: "Résumé" },
  experience: { en: "Experience", es: "Experiencia", fr: "Expérience" },
  education: { en: "Education", es: "Educación", fr: "Formation" },
  skills: { en: "Skills", es: "Habilidades", fr: "Compétences" },
  languages: { en: "Languages", es: "Idiomas", fr: "Langues" },
  download: { en: "Download PDF", es: "Descargar PDF", fr: "Télécharger le PDF" },
  open: { en: "Open in new tab", es: "Abrir en pestaña nueva", fr: "Ouvrir dans un onglet" },
};

/** Marker per highlight kind (▸ feature, ⚡ AI, ✓ outcome) — matches the resume. */
const MARK = { feature: "▸", ai: "⚡", outcome: "✓" } as const;

/** Résumé — a clean, on-brand document rendered from typed data, plus a
 *  per-language PDF download. No iframe, so it stays responsive on mobile. */
export function ResumeApp() {
  const { locale } = useLocale();
  const pdf = RESUME_PDF[locale];

  return (
    <div className="text-[14px]">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="font-brand text-2xl tracking-tight">{profile.name}</h2>
          <p className="mt-0.5 text-[13px] font-semibold text-aqua-deep">{t(profile.title, locale)}</p>
        </div>
        <div className="flex flex-none gap-2">
          <AquaButton
            variant="primary"
            href={pdf}
            download
            onClick={() => toast("⬇ Downloading résumé…")}
          >
            ⬇ {SECTION.download[locale]}
          </AquaButton>
          <AquaButton
            variant="ghost"
            href={pdf}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={SECTION.open[locale]}
            title={SECTION.open[locale]}
          >
            ↗
          </AquaButton>
        </div>
      </div>

      {/* Contact row */}
      <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[12.5px] text-ink-soft">
        {profile.contact.map((c) => (
          <a key={c.id} href={c.href} className="hover:text-aqua-deep" target="_blank" rel="noopener noreferrer">
            <span aria-hidden="true">{c.icon}</span> {c.value}
          </a>
        ))}
      </div>

      <Section label={SECTION.summary[locale]}>
        <p className="text-ink-soft">{t(profile.summary, locale)}</p>
      </Section>

      <Section label={SECTION.experience[locale]}>
        <div className="flex flex-col gap-3.5">
          {experiences.map((job) => (
            <div key={job.id}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                <h4 className="font-brand text-[15px]">
                  {t(job.role, locale)} · <span className="text-ink-soft">{job.company}</span>
                </h4>
                <span className="text-[12px] font-semibold tabular-nums text-aqua-deep">
                  {t(job.period, locale)}
                </span>
              </div>
              <ul className="mt-1 flex flex-col gap-1">
                {job.highlights.map((h, i) => (
                  <li key={i} className="flex gap-2 text-[13px] text-ink-soft">
                    <span aria-hidden="true" className="select-none text-aqua-deep">
                      {MARK[h.kind]}
                    </span>
                    <span>{t(h.text, locale)}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section label={SECTION.skills[locale]}>
        <div className="flex flex-col gap-2">
          {skillGroups.map((group) => (
            <div key={group.id}>
              <div className="text-[12px] font-bold uppercase tracking-[0.1em] text-ink-soft">
                {t(group.category, locale)}
              </div>
              <div className="mt-1 flex flex-wrap gap-1.5">
                {group.skills.map((s) => (
                  <span key={t(s.name, "en")} className="os-tag">
                    {t(s.name, locale)}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Section label={SECTION.education[locale]} flush>
          <div className="flex flex-col gap-1.5">
            {education.map((e) => (
              <div key={e.id}>
                <div className="font-semibold">{t(e.degree, locale)}</div>
                <div className="text-[13px] text-ink-soft">{e.institution}</div>
              </div>
            ))}
          </div>
        </Section>
        <Section label={SECTION.languages[locale]} flush>
          <div className="flex flex-col gap-1">
            {languageProficiency.map((l) => (
              <div key={l.id} className="text-[13px]">
                <span className="font-semibold">{t(l.name, locale)}</span>
                <span className="text-ink-soft"> — {t(l.note, locale)}</span>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
}

function Section({
  label,
  children,
  flush,
}: {
  label: string;
  children: React.ReactNode;
  flush?: boolean;
}) {
  return (
    <section className={flush ? "" : "mt-5 border-t border-[color:var(--glass-edge)] pt-4"}>
      <div className="os-eyebrow">{label}</div>
      {children}
    </section>
  );
}
