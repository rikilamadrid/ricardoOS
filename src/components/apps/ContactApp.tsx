"use client";

import { toast } from "sonner";
import { contact, t } from "@/data";
import { useLocale } from "@/components/os/locale-store";
import { AquaButton } from "@/components/ui/AquaButton";

/** Contact — elegant link buttons. Email copies to clipboard; links open out. */
export function ContactApp() {
  const { locale } = useLocale();

  const handle = (href: string, value: string, label: string) => {
    if (href.startsWith("mailto:")) {
      navigator.clipboard?.writeText(value).then(
        () => toast(`📋 Copied ${value}`),
        () => toast(`✉️ ${value}`),
      );
      return;
    }
    window.open(href, "_blank", "noopener,noreferrer");
    toast(`↗ Opening ${label}…`);
  };

  return (
    <div>
      <div className="os-eyebrow">{t(contact.eyebrow, locale)}</div>
      <h2 className="font-brand text-2xl tracking-tight">{t(contact.heading, locale)}</h2>
      <p className="mt-1.5 text-ink-soft">{t(contact.intro, locale)}</p>
      <div className="os-contact-grid mt-4">
        {contact.links.map((link) => (
          <AquaButton
            key={link.id}
            className="!justify-start !px-4 !py-3.5 !text-[14.5px]"
            onClick={() => handle(link.href, link.value, t(link.label, locale))}
          >
            <span aria-hidden="true">{link.icon}</span>
            {t(link.label, locale)}
          </AquaButton>
        ))}
      </div>
      <p className="mt-4 text-[13px] text-ink-soft">{t(contact.footnote, locale)}</p>
    </div>
  );
}
