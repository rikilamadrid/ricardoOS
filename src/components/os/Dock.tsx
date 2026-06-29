"use client";

import { apps, t } from "@/data";
import { Tile } from "./Tile";
import { useLocale } from "./locale-store";

/** Centered glass dock with glossy app tiles (launching arrives in phase 3). */
export function Dock() {
  const { locale } = useLocale();
  const dockApps = apps.filter((app) => app.inDock);

  return (
    <div className="fixed inset-x-0 bottom-3.5 z-[8000] flex justify-center px-2">
      <nav
        aria-label="Dock"
        className="os-dock flex max-w-[96vw] items-end gap-2.5 overflow-x-auto rounded-3xl px-3 py-2.5 [scrollbar-width:none]"
      >
        {dockApps.map((app) => (
          <div key={app.id} className="flex-none" title={t(app.title, locale)}>
            <Tile icon={app.icon} palette={app.tile} className="h-[52px] w-[52px] text-[26px]" />
          </div>
        ))}
      </nav>
    </div>
  );
}
