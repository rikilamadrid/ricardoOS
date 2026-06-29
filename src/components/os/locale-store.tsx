"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { DEFAULT_LOCALE, LOCALES, type Locale } from "@/data";

/**
 * Active UI language (EN / ES / FR). All localized strings resolve through
 * `t(value, locale)`, so flipping this swaps the menu bar, dock, and desktop
 * icon labels live. Persisted to localStorage and mirrored onto <html lang>.
 */
interface LocaleStore {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  cycleLocale: () => void;
}

const LocaleContext = createContext<LocaleStore | null>(null);

const STORAGE_KEY = "ricardo-os:locale";

function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  // Hydrate after mount so SSR and the first client render agree.
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (saved && isLocale(saved)) setLocaleState(saved);
    } catch {
      // ignore (private mode / storage disabled)
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, locale);
    } catch {
      // ignore
    }
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback((next: Locale) => setLocaleState(next), []);
  const cycleLocale = useCallback(
    () =>
      setLocaleState((cur) => LOCALES[(LOCALES.indexOf(cur) + 1) % LOCALES.length]),
    [],
  );

  return (
    <LocaleContext.Provider value={{ locale, setLocale, cycleLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale(): LocaleStore {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within <LocaleProvider>");
  return ctx;
}
