"use client";

import { cn } from "@/lib/utils";
import { useAmbientMotion } from "@/hooks/use-ambient-motion";
import { wallpapers } from "@/content/wallpapers";
import { useTheme } from "./theme-store";
import { Bubbles } from "./Bubbles";
import { Stars } from "./Stars";
import { WallpaperScene } from "./WallpaperScene";

/**
 * The living wallpaper: crossfading day/night sky, then whatever the active
 * wallpaper's scene layer is (green hill, skyline, brushed metal, deep water),
 * plus optional sun glow, light rays, night stars and drifting bubbles. Which
 * of those ambient layers appear is per-wallpaper — rays over brushed metal
 * would read as a mistake. Ambient loops pause when the user prefers reduced
 * motion or the tab is hidden.
 */
export function Wallpaper() {
  const animate = useAmbientMotion();
  const { wallpaper } = useTheme();
  const wp = wallpapers[wallpaper];

  return (
    <div className={cn("os-scene z-0", !animate && "os-scene--still")} aria-hidden="true">
      <div className="os-sky os-sky--day" />
      <div className="os-sky os-sky--night" />
      {wp.sun && <div className="os-sun" />}
      {wp.rays && <div className="os-rays" />}
      <Stars />
      <WallpaperScene scene={wp.scene} />
      {wp.bubbles && animate && <Bubbles />}
    </div>
  );
}
