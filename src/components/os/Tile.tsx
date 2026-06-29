import { cn } from "@/lib/utils";
import type { TilePalette } from "@/data";

interface TileProps {
  icon: string;
  palette: TilePalette;
  /** Size + font-size utilities for the tile (e.g. "h-12 w-12 text-2xl"). */
  className?: string;
}

/** Reusable glossy Aqua app tile — used by the dock, desktop icons, and windows. */
export function Tile({ icon, palette, className }: TileProps) {
  return (
    <span className={cn("os-tile", `os-tile--${palette}`, className)} aria-hidden="true">
      <span>{icon}</span>
    </span>
  );
}
