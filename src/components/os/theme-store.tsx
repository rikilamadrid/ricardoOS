"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  DEFAULT_WALLPAPER,
  wallpapers,
  type WallpaperId,
} from "@/content/wallpapers";

/**
 * The living-desktop theme store (phase 2). Holds the day/night theme and the
 * active wallpaper, and projects them onto the DOM:
 *
 *  - `theme === "night"` toggles the `.dark` class on <html> (shadcn night tokens)
 *  - `colorblind` toggles the `.cb` class on <html> — a colorblind-safe palette
 *    that layers on top of either theme (orthogonal to day/night)
 *  - the active wallpaper sets the `--wp-*` custom properties consumed by
 *    `.os-sky--day` in globals.css
 *
 * State is persisted to localStorage; the boot screen hides any first-paint flash.
 */
export type Theme = "day" | "night";

interface ThemeStore {
  theme: Theme;
  wallpaper: WallpaperId;
  colorblind: boolean;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  setWallpaper: (wallpaper: WallpaperId) => void;
  setColorblind: (on: boolean) => void;
  toggleColorblind: () => void;
}

const ThemeContext = createContext<ThemeStore | null>(null);

const STORAGE_KEY = "ricardo-os:appearance";

interface Persisted {
  theme: Theme;
  wallpaper: WallpaperId;
  colorblind: boolean;
}

function readPersisted(): Partial<Persisted> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Partial<Persisted>) : {};
  } catch {
    return {};
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("day");
  const [wallpaper, setWallpaperState] = useState<WallpaperId>(DEFAULT_WALLPAPER);
  const [colorblind, setColorblindState] = useState(false);

  // Hydrate from storage after mount. This is deliberately an effect (not a lazy
  // initializer) so SSR and the first client render agree, avoiding a hydration
  // mismatch on the theme-dependent menu-bar glyph.
  useEffect(() => {
    const saved = readPersisted();
    /* eslint-disable react-hooks/set-state-in-effect */
    if (saved.theme === "day" || saved.theme === "night") setThemeState(saved.theme);
    if (saved.wallpaper && saved.wallpaper in wallpapers) setWallpaperState(saved.wallpaper);
    if (typeof saved.colorblind === "boolean") setColorblindState(saved.colorblind);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  // Project the theme onto the night-mode class.
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "night");
  }, [theme]);

  // Project the colorblind-safe palette onto the `.cb` class.
  useEffect(() => {
    document.documentElement.classList.toggle("cb", colorblind);
  }, [colorblind]);

  // Project the wallpaper onto the sky custom properties.
  useEffect(() => {
    const wp = wallpapers[wallpaper];
    const root = document.documentElement.style;
    root.setProperty("--wp-top", wp.top);
    root.setProperty("--wp-mid", wp.mid);
    root.setProperty("--wp-low", wp.low);
    root.setProperty("--wp-grass", String(wp.grass));
  }, [wallpaper]);

  // Persist.
  useEffect(() => {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ theme, wallpaper, colorblind }),
      );
    } catch {
      // ignore (private mode / storage disabled)
    }
  }, [theme, wallpaper, colorblind]);

  const setTheme = useCallback((next: Theme) => setThemeState(next), []);
  const toggleTheme = useCallback(
    () => setThemeState((t) => (t === "day" ? "night" : "day")),
    [],
  );
  const setWallpaper = useCallback((next: WallpaperId) => setWallpaperState(next), []);
  const setColorblind = useCallback((on: boolean) => setColorblindState(on), []);
  const toggleColorblind = useCallback(() => setColorblindState((c) => !c), []);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        wallpaper,
        colorblind,
        setTheme,
        toggleTheme,
        setWallpaper,
        setColorblind,
        toggleColorblind,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeStore {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within <ThemeProvider>");
  return ctx;
}
