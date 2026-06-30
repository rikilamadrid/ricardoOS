"use client";

import { toast } from "sonner";
import { trash, t } from "@/data";
import { useLocale } from "@/components/os/locale-store";
import { AquaButton } from "@/components/ui/AquaButton";

/**
 * Recycle Bin — an easter egg holding relics of the old portfolio. Nothing is
 * ever really deleted: "empty bin" just judges the past fondly via a toast.
 */
export function TrashApp() {
  const { locale } = useLocale();

  return (
    <div>
      <div className="os-eyebrow">{t(trash.eyebrow, locale)}</div>
      <h2 className="font-brand text-2xl tracking-tight">{t(trash.heading, locale)}</h2>
      <p className="mt-1.5 text-ink-soft">{t(trash.intro, locale)}</p>

      <ul className="os-trash-list mt-4">
        {trash.items.map((item) => (
          <li key={item.id} className="os-trash-item">
            <span className="os-trash-icon" aria-hidden="true">
              {item.icon}
            </span>
            <span className="min-w-0">
              <span className="block font-semibold">{item.name}</span>
              <span className="block text-[13px] text-ink-soft">{t(item.note, locale)}</span>
            </span>
          </li>
        ))}
      </ul>

      <AquaButton
        className="mt-5"
        onClick={() => toast(t(trash.emptyToast, locale))}
      >
        🗑️ {t(trash.emptyLabel, locale)}
      </AquaButton>
    </div>
  );
}
