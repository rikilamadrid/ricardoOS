"use client";

import { useEffect } from "react";
import { apps, LOCALES, type Locale } from "@/data";
import { useLocale } from "./locale-store";
import { useWindowStore } from "@/lib/window-store";

function isLocale(value: string | null): value is Locale {
  return value !== null && (LOCALES as readonly string[]).includes(value);
}

/**
 * Honors the `?app=<id>` deep link: on load (and on client navigations back to
 * the desktop, e.g. "Open in RicardoOS" from a detail page) it opens/focuses the
 * matching app. Reads `window.location` in an effect so the desktop needs no
 * Suspense boundary. Renders nothing.
 */
export function DeepLinkOpener() {
  const openApp = useWindowStore((s) => s.openApp);
  const { setLocale } = useLocale();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("app");
    const locale = params.get("locale");
    if (isLocale(locale)) setLocale(locale);
    if (id && apps.some((a) => a.id === id)) openApp(id);
  }, [openApp, setLocale]);

  return null;
}
