import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * Persisted desktop-icon positions (phase 14). Maps an app id to the `{x, y}`
 * pixel spot the user dragged its desktop icon to. An id with no entry falls
 * back to the tidy auto-layout column, so this only stores icons that have been
 * moved. `cleanUp` clears everything → back to auto-layout.
 *
 * Browser storage is a deliberate, documented exception to the project's
 * "no browser storage in v1" rule: this feature *is* "remember where I put my
 * icons," which is meaningless without persistence.
 */
export interface IconPos {
  x: number;
  y: number;
}

interface DesktopIconsStore {
  positions: Record<string, IconPos>;
  setPosition: (id: string, pos: IconPos) => void;
  cleanUp: () => void;
}

export const useDesktopIconsStore = create<DesktopIconsStore>()(
  persist(
    (set) => ({
      positions: {},
      setPosition: (id, pos) =>
        set((s) => ({ positions: { ...s.positions, [id]: pos } })),
      cleanUp: () => set({ positions: {} }),
    }),
    { name: "ricardo-os:desktop-icons" },
  ),
);
