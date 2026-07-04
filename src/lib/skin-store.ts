import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DEFAULT_SKIN, type SkinId } from "@/data/skins";

/**
 * Persisted Winamp skin choice (phase 15B). Mirrors `desktop-icons-store`:
 * a deliberate, documented exception to the "no browser storage in v1" rule —
 * remembering which skin the player wears is meaningless without persistence.
 */
interface SkinStore {
  skin: SkinId;
  setSkin: (skin: SkinId) => void;
}

export const useSkinStore = create<SkinStore>()(
  persist(
    (set) => ({
      skin: DEFAULT_SKIN,
      setSkin: (skin) => set({ skin }),
    }),
    { name: "ricardo-os:winamp-skin" },
  ),
);
