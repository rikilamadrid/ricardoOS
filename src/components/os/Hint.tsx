"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/** A one-time hint pill teaching the desktop context menu; fades out on its own. */
export function Hint() {
  const [phase, setPhase] = useState<"shown" | "fading" | "done">("shown");

  useEffect(() => {
    const fade = setTimeout(() => setPhase("fading"), 6000);
    const done = setTimeout(() => setPhase("done"), 6800);
    return () => {
      clearTimeout(fade);
      clearTimeout(done);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div className={cn("os-hint", phase === "fading" && "os-hint--gone")} aria-hidden="true">
      ✨ Tip: right-click the desktop to change the wallpaper
    </div>
  );
}
