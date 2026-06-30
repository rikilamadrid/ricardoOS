"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { apps, t } from "@/data";
import { Tile } from "./Tile";
import { useLocale } from "./locale-store";
import { useWindowStore } from "@/lib/window-store";

/** Centered glass dock: launches apps, shows running dots, and bounces on launch. */
export function Dock() {
  const { locale } = useLocale();
  const toggleApp = useWindowStore((s) => s.toggleApp);
  const windows = useWindowStore((s) => s.windows);
  const zTop = useWindowStore((s) => s.zTop);
  const [bouncing, setBouncing] = useState<string | null>(null);

  const dockApps = apps.filter((app) => app.inDock);

  const launch = (id: string) => {
    // Clicking a frontmost app minimizes it — don't bounce in that case.
    const win = windows[id];
    const willMinimize = win && !win.minimized && win.z === zTop;
    toggleApp(id);
    if (!willMinimize) {
      setBouncing(id);
      window.setTimeout(() => setBouncing((cur) => (cur === id ? null : cur)), 520);
    }
  };

  return (
    <div className="fixed inset-x-0 bottom-3.5 z-[8000] flex justify-center px-2">
      <nav
        aria-label="Dock"
        className="os-dock flex max-w-[96vw] items-end gap-2.5 overflow-x-auto rounded-3xl px-3 py-2.5 [scrollbar-width:none]"
      >
        {dockApps.map((app) => (
          <button
            key={app.id}
            type="button"
            onClick={() => launch(app.id)}
            title={t(app.title, locale)}
            aria-label={t(app.title, locale)}
            className={cn(
              "os-dock-app",
              app.id in windows && "is-running",
              bouncing === app.id && "is-bouncing",
            )}
          >
            <Tile icon={app.icon} palette={app.tile} className="h-[52px] w-[52px] text-[26px]" />
            <span className="os-dock-dot" aria-hidden="true" />
          </button>
        ))}
      </nav>
    </div>
  );
}
