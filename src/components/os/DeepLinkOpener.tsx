"use client";

import { useEffect } from "react";
import { apps } from "@/data";
import { useWindowStore } from "@/lib/window-store";

/**
 * Honors the `?app=<id>` deep link: on load (and on client navigations back to
 * the desktop, e.g. "Open in RicardoOS" from a detail page) it opens/focuses the
 * matching app. Reads `window.location` in an effect so the desktop needs no
 * Suspense boundary. Renders nothing.
 */
export function DeepLinkOpener() {
  const openApp = useWindowStore((s) => s.openApp);

  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("app");
    if (id && apps.some((a) => a.id === id)) openApp(id);
  }, [openApp]);

  return null;
}
