"use client";

import { useEffect } from "react";
import { AnimatePresence } from "motion/react";
import { useWindowStore } from "@/lib/window-store";
import { Window } from "./Window";

/** Renders every open window from the store, with enter/exit animations. */
export function WindowManager() {
  const windows = useWindowStore((s) => s.windows);

  // Escape closes the frontmost window — unless zen mode or a Radix menu/popover
  // (which own their own Escape) is open.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      const state = useWindowStore.getState();
      if (state.zenMode) return;
      if (document.querySelector("[data-radix-popper-content-wrapper]")) return;
      const open = Object.values(state.windows).filter((w) => !w.minimized);
      if (open.length === 0) return;
      const top = open.reduce((a, b) => (a.z > b.z ? a : b));
      state.closeApp(top.id);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <AnimatePresence>
      {Object.values(windows).map((win) => (
        <Window key={win.id} win={win} />
      ))}
    </AnimatePresence>
  );
}
