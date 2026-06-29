"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { branding } from "@/data";

/**
 * First-load boot sequence: a breathing orb + filling progress bar, then a
 * fade-out that reveals the living desktop. Self-unmounts once it's gone.
 */
export function BootScreen() {
  const [phase, setPhase] = useState<"loading" | "fading" | "done">("loading");

  useEffect(() => {
    const fade = setTimeout(() => setPhase("fading"), 2300);
    const done = setTimeout(() => setPhase("done"), 3100);
    return () => {
      clearTimeout(fade);
      clearTimeout(done);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div className={cn("os-boot", phase === "fading" && "os-boot--gone")} aria-hidden="true">
      <div className="text-center">
        <div className="os-boot-orb mx-auto mb-[18px]" />
        <div className="font-brand text-[46px] font-bold tracking-wide [text-shadow:0_4px_20px_rgba(0,30,80,0.6)]">
          {branding.name}
          <b className="text-[#bfefff]">{branding.suffix}</b>
        </div>
        <div className="mt-1.5 text-sm uppercase tracking-[0.18em] opacity-80">
          build • play • repeat
        </div>
        <div className="os-boot-bar">
          <i />
        </div>
      </div>
    </div>
  );
}
