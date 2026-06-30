import { create } from "zustand";
import { apps, type AppDefinition } from "@/data";

/** A window's pixel rectangle on the desktop. */
export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface WindowState {
  id: string;
  rect: Rect;
  z: number;
  minimized: boolean;
  maximized: boolean;
  /** Rect to restore to when un-maximizing. */
  restoreRect?: Rect;
}

interface WindowStore {
  windows: Record<string, WindowState>;
  zTop: number;
  /** Meditations "zen mode": a desktop-level overlay, not a window. */
  zenMode: boolean;
  openApp: (id: string) => void;
  closeApp: (id: string) => void;
  focus: (id: string) => void;
  minimize: (id: string) => void;
  toggleMax: (id: string) => void;
  setRect: (id: string, rect: Partial<Rect>) => void;
  setZen: (open: boolean) => void;
}

const MIN_W = 280;
const MIN_H = 200;

function viewport() {
  if (typeof window === "undefined") return { w: 1280, h: 800 };
  return { w: window.innerWidth, h: window.innerHeight };
}

const isMobile = () => viewport().w <= 720;

/** Initial placement: near-fullscreen on mobile, else the app's % offset + px size. */
function initialRect(app: AppDefinition): Rect {
  const { w, h } = viewport();
  if (isMobile()) {
    return { x: w * 0.02, y: 46, width: w * 0.96, height: h * 0.78 };
  }
  const width = Math.min(app.window.width, w - 40);
  const height = Math.min(app.window.height, Math.round(h * 0.8));
  const x = Math.max(20, Math.min((w * app.window.x) / 100, w - width - 20));
  const y = Math.max(44, Math.min((h * app.window.y) / 100, h - 120));
  return { x, y, width, height };
}

function maximizedRect(): Rect {
  const { w, h } = viewport();
  return { x: 20, y: 44, width: w - 40, height: h - 76 };
}

export const useWindowStore = create<WindowStore>((set, get) => ({
  windows: {},
  zTop: 100,
  zenMode: false,

  openApp: (id) => {
    const app = apps.find((a) => a.id === id);
    if (!app) return;
    // Meditations is a mode, not a window: entering it dims the whole desktop.
    if (app.kind === "meditations") {
      set({ zenMode: true });
      return;
    }
    const z = get().zTop + 1;
    const existing = get().windows[id];
    if (existing) {
      // Single instance: focus + un-minimize.
      set((s) => ({
        zTop: z,
        windows: { ...s.windows, [id]: { ...existing, z, minimized: false } },
      }));
      return;
    }
    set((s) => ({
      zTop: z,
      windows: {
        ...s.windows,
        [id]: { id, rect: initialRect(app), z, minimized: false, maximized: false },
      },
    }));
  },

  closeApp: (id) =>
    set((s) => {
      const next = { ...s.windows };
      delete next[id];
      return { windows: next };
    }),

  focus: (id) => {
    const win = get().windows[id];
    if (!win) return;
    const z = get().zTop + 1;
    set((s) => ({ zTop: z, windows: { ...s.windows, [id]: { ...win, z } } }));
  },

  minimize: (id) =>
    set((s) => {
      const win = s.windows[id];
      if (!win) return s;
      return { windows: { ...s.windows, [id]: { ...win, minimized: true } } };
    }),

  toggleMax: (id) =>
    set((s) => {
      const win = s.windows[id];
      if (!win) return s;
      if (win.maximized) {
        return {
          windows: {
            ...s.windows,
            [id]: {
              ...win,
              maximized: false,
              rect: win.restoreRect ?? win.rect,
              restoreRect: undefined,
            },
          },
        };
      }
      return {
        windows: {
          ...s.windows,
          [id]: { ...win, maximized: true, restoreRect: win.rect, rect: maximizedRect() },
        },
      };
    }),

  setRect: (id, rect) =>
    set((s) => {
      const win = s.windows[id];
      if (!win) return s;
      const merged = { ...win.rect, ...rect };
      merged.width = Math.max(MIN_W, merged.width);
      merged.height = Math.max(MIN_H, merged.height);
      return { windows: { ...s.windows, [id]: { ...win, rect: merged } } };
    }),

  setZen: (open) => set({ zenMode: open }),
}));

export { MIN_W, MIN_H };
