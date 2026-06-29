import { cn } from "@/lib/utils";
import type { TilePalette } from "@/data";
import { Tile } from "./Tile";

interface WindowProps {
  title: string;
  icon: string;
  palette: TilePalette;
  /** Position + size utilities (e.g. "left-1/2 top-24 w-[420px]"). */
  className?: string;
  children: React.ReactNode;
}

/**
 * Static glass window with aqua chrome: jellybean traffic lights, glossy title
 * bar, and a scrollable body. Drag/resize/focus arrive with the window manager
 * in phase 3 — this validates the chrome styling only.
 */
export function Window({ title, icon, palette, className, children }: WindowProps) {
  return (
    <section
      className={cn(
        "os-glass absolute z-[100] flex max-h-[80vh] min-w-[280px] flex-col overflow-hidden rounded-os",
        className,
      )}
    >
      <div className="os-titlebar flex h-[42px] flex-none items-center gap-2.5 px-3">
        <div className="flex gap-2" aria-hidden="true">
          <span className="os-light os-light--close" />
          <span className="os-light os-light--min" />
          <span className="os-light os-light--max" />
        </div>
        <Tile icon={icon} palette={palette} className="h-[22px] w-[22px] rounded-[7px] text-[13px]" />
        <h3 className="font-brand text-sm font-bold tracking-tight">{title}</h3>
      </div>
      <div className="flex-1 overflow-auto p-[22px] text-[15px] leading-relaxed text-ink">
        {children}
      </div>
    </section>
  );
}
