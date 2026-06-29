"use client";

import { cn } from "@/lib/utils";
import { useAmbientMotion } from "@/hooks/use-ambient-motion";
import { Bubbles } from "./Bubbles";
import { Stars } from "./Stars";

/**
 * The living wallpaper: crossfading day/night sky, soft sun glow, slow rotating
 * light rays, a green hill, a night star field, and drifting bubbles. Ambient
 * loops pause when the user prefers reduced motion or the tab is hidden.
 */
export function Wallpaper() {
  const animate = useAmbientMotion();

  return (
    <div className={cn("os-scene z-0", !animate && "os-scene--still")} aria-hidden="true">
      <div className="os-sky os-sky--day" />
      <div className="os-sky os-sky--night" />
      <div className="os-sun" />
      <div className="os-rays" />
      <Stars />
      <div className="os-hill" />
      {animate && <Bubbles />}
    </div>
  );
}
