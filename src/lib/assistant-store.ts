import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * Persisted state for Blip, the desktop assistant (phase 20). Mirrors the
 * `desktop-icons-store` pattern: where the user dragged the character, and
 * whether they dismissed it.
 *
 * Blip is present by default — `dismissed` only flips when the user clicks the
 * little close orb, and the desktop context menu brings it back. Persisting is
 * the point: "I moved it there" and "I told it to go away" are both promises
 * that have to survive a reload.
 */
export interface AssistantPos {
  x: number;
  y: number;
}

interface AssistantStore {
  /** Dragged-to spot in px, or null for the default bottom-right perch. */
  pos: AssistantPos | null;
  dismissed: boolean;
  /** False until Blip has greeted once, so returning visitors get a different hello. */
  seen: boolean;
  setPos: (pos: AssistantPos) => void;
  setDismissed: (dismissed: boolean) => void;
  setSeen: () => void;
}

export const useAssistantStore = create<AssistantStore>()(
  persist(
    (set) => ({
      pos: null,
      dismissed: false,
      seen: false,
      setPos: (pos) => set({ pos }),
      setDismissed: (dismissed) => set({ dismissed }),
      setSeen: () => set({ seen: true }),
    }),
    { name: "ricardo-os:assistant" },
  ),
);
