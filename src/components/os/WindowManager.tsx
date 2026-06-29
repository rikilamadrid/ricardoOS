"use client";

import { AnimatePresence } from "motion/react";
import { useWindowStore } from "@/lib/window-store";
import { Window } from "./Window";

/** Renders every open window from the store, with enter/exit animations. */
export function WindowManager() {
  const windows = useWindowStore((s) => s.windows);

  return (
    <AnimatePresence>
      {Object.values(windows).map((win) => (
        <Window key={win.id} win={win} />
      ))}
    </AnimatePresence>
  );
}
