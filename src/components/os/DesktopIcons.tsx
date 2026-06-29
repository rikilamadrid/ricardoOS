"use client";

import { apps, t } from "@/data";
import { Tile } from "./Tile";
import { useLocale } from "./locale-store";

/** Column of launchable desktop icons (launching arrives in phase 3). */
export function DesktopIcons() {
  const { locale } = useLocale();
  const icons = apps.filter((app) => app.onDesktop);

  return (
    <div className="fixed left-3.5 top-12 z-10 flex flex-col gap-1.5 max-[720px]:inset-x-2 max-[720px]:flex-row max-[720px]:flex-wrap">
      {icons.map((app) => (
        <div
          key={app.id}
          className="flex w-[92px] flex-col items-center gap-1.5 rounded-[14px] px-1 pb-1.5 pt-2 text-center"
        >
          <Tile icon={app.icon} palette={app.tile} className="h-12 w-12 text-2xl" />
          <span className="text-xs font-semibold leading-tight text-white [text-shadow:0_1px_3px_rgba(10,40,90,0.7)]">
            {t(app.title, locale)}
          </span>
        </div>
      ))}
    </div>
  );
}
