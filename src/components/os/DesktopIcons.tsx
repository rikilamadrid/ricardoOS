"use client";

import {
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { cn } from "@/lib/utils";
import { apps, t, type AppDefinition } from "@/data";
import { Tile } from "./Tile";
import { useLocale } from "./locale-store";
import { useWindowStore } from "@/lib/window-store";
import { useDesktopIconsStore, type IconPos } from "@/lib/desktop-icons-store";

/** Auto-layout column geometry (matches the tidy default in px). */
const ICON_W = 92; // w-[92px]
const BASE_X = 14; // left-3.5
const BASE_Y = 48; // top-12
const CELL = 92; // grid pitch + default vertical spacing
const MENU_BAR_H = 44; // top bound (below the menu bar)
const DOCK_RESERVE = 120; // bottom bound (keep clear of the dock)
const DRAG_THRESHOLD = 4; // px before a press counts as a drag (vs. a click)

/** Tidy default position for an icon that hasn't been dragged yet. */
function defaultPos(index: number): IconPos {
  return { x: BASE_X, y: BASE_Y + index * CELL };
}

/**
 * Keep a position inside the visible desktop (below the menu bar, above the
 * dock, on-screen). Used both while dragging and to rescue icons after the
 * viewport shrinks (e.g. landscape → portrait) so they can never end up
 * off-screen and unreachable.
 */
function clampToViewport(pos: IconPos): IconPos {
  const maxX = Math.max(4, window.innerWidth - ICON_W - 4);
  const maxY = Math.max(MENU_BAR_H, window.innerHeight - DOCK_RESERVE);
  return {
    x: Math.min(Math.max(4, pos.x), maxX),
    y: Math.min(Math.max(MENU_BAR_H, pos.y), maxY),
  };
}

/**
 * Column of launchable desktop icons. Icons are absolutely positioned and can be
 * dragged anywhere (persisted to localStorage) at every screen size. Before mount
 * they render at their tidy defaults — which is also what SSR renders — so there's
 * no hydration mismatch.
 */
export function DesktopIcons() {
  const { locale } = useLocale();
  const openApp = useWindowStore((s) => s.openApp);
  const positions = useDesktopIconsStore((s) => s.positions);
  const setPosition = useDesktopIconsStore((s) => s.setPosition);
  const icons = apps.filter((app) => app.onDesktop);

  // Drag works at every size. We only gate reading *saved* positions until after
  // mount so the first client render matches SSR (which has none), avoiding a
  // hydration mismatch; un-moved icons render at their tidy defaults meanwhile.
  const [hydrated, setHydrated] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect -- one-shot mount flag
  useEffect(() => setHydrated(true), []);

  // Safety net: if the viewport shrinks (rotate landscape → portrait, or a
  // smaller window), pull any saved icon back into view so it's never stranded
  // off-screen. Reads/writes the store directly to avoid re-subscribing.
  useEffect(() => {
    const rescue = () => {
      const saved = useDesktopIconsStore.getState().positions;
      for (const [id, pos] of Object.entries(saved)) {
        const c = clampToViewport(pos);
        if (c.x !== pos.x || c.y !== pos.y) setPosition(id, c);
      }
    };
    rescue();
    window.addEventListener("resize", rescue);
    window.addEventListener("orientationchange", rescue);
    return () => {
      window.removeEventListener("resize", rescue);
      window.removeEventListener("orientationchange", rescue);
    };
  }, [setPosition]);

  return (
    <div className="pointer-events-none fixed inset-0 z-10">
      {icons.map((app, index) => (
        <DraggableIcon
          key={app.id}
          app={app}
          index={index}
          label={t(app.title, locale)}
          saved={hydrated ? positions[app.id] : undefined}
          onOpen={() => openApp(app.id)}
          onCommit={(pos) => setPosition(app.id, pos)}
        />
      ))}
    </div>
  );
}

function DraggableIcon({
  app,
  index,
  label,
  saved,
  onOpen,
  onCommit,
}: {
  app: AppDefinition;
  index: number;
  label: string;
  saved: IconPos | undefined;
  onOpen: () => void;
  onCommit: (pos: IconPos) => void;
}) {
  const base = saved ?? defaultPos(index);
  const start = useRef<{ px: number; py: number } | null>(null);
  const dragged = useRef(false);
  // Live drag offset from `base`; null when not dragging (transform-based, so no
  // layout thrash — left/top stay put and we translate during the drag).
  const [delta, setDelta] = useState<{ dx: number; dy: number } | null>(null);

  const onPointerDown = (e: ReactPointerEvent<HTMLButtonElement>) => {
    if (e.button !== 0) return; // left button / touch / pen primary only
    start.current = { px: e.clientX, py: e.clientY };
    dragged.current = false;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLButtonElement>) => {
    const s = start.current;
    if (!s) return;
    const dx = e.clientX - s.px;
    const dy = e.clientY - s.py;
    if (!dragged.current && Math.hypot(dx, dy) < DRAG_THRESHOLD) return;
    dragged.current = true;
    const c = clampToViewport({ x: base.x + dx, y: base.y + dy });
    setDelta({ dx: c.x - base.x, dy: c.y - base.y });
  };

  const onPointerUp = (e: ReactPointerEvent<HTMLButtonElement>) => {
    if (!start.current) return;
    start.current = null;
    if (e.currentTarget.hasPointerCapture?.(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    if (dragged.current && delta) {
      // Drop exactly where released (already clamped on-screen) — no grid snap.
      onCommit({ x: base.x + delta.dx, y: base.y + delta.dy });
    }
    setDelta(null);
    // `dragged` stays true so the click fired right after a drag is swallowed.
  };

  const onClick = () => {
    if (dragged.current) {
      dragged.current = false;
      return;
    }
    onOpen();
  };

  const dragging = delta !== null;
  // Follow the pointer 1:1 while dragging; no scale, and crucially no CSS
  // transition on transform (that made the icon overshoot/bounce on drop).
  const transform = delta
    ? `translate3d(${delta.dx}px, ${delta.dy}px, 0)`
    : undefined;

  return (
    <button
      type="button"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onClick={onClick}
      onDoubleClick={onOpen}
      style={{ left: base.x, top: base.y, transform, zIndex: dragging ? 50 : undefined }}
      className={cn(
        "pointer-events-auto absolute flex w-[92px] touch-none flex-col items-center gap-1.5 rounded-[14px] px-1 pb-1.5 pt-2 text-center transition-colors hover:bg-white/20",
        dragging ? "cursor-grabbing" : "cursor-grab",
      )}
    >
      <Tile icon={app.icon} palette={app.tile} className="h-12 w-12 text-2xl" />
      <span className="text-xs font-semibold leading-tight text-white [text-shadow:0_1px_3px_rgba(10,40,90,0.7)]">
        {label}
      </span>
    </button>
  );
}
