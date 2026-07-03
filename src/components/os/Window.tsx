"use client";

import { useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { apps, t } from "@/data";
import { useLocale } from "./locale-store";
import { useWindowStore, type WindowState, MIN_W, MIN_H } from "@/lib/window-store";
import { Tile } from "./Tile";
import { WindowContent } from "./WindowContent";
import { FooterCredit } from "./FooterCredit";

interface DragRef {
  pointerX: number;
  pointerY: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * An aqua-gel window: glossy title bar with jellybean traffic lights, a glass
 * body, pointer-event drag (title bar) + resize (corner grip), focus-on-press,
 * and Framer Motion open/close/minimize/maximize transitions.
 */
export function Window({ win }: { win: WindowState }) {
  const { locale } = useLocale();
  const { focus, closeApp, minimize, toggleMax, setRect } = useWindowStore();
  const app = apps.find((a) => a.id === win.id);
  const reduceMotion = useReducedMotion();
  const drag = useRef<DragRef | null>(null);
  const resize = useRef<DragRef | null>(null);
  // Enables a brief CSS transition on left/top/width/height for the max toggle.
  const [animatingRect, setAnimatingRect] = useState(false);

  if (!app) return null;
  const { rect } = win;

  const onTitlePointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest(".os-light")) return;
    if (win.maximized) return; // don't drag a maximized window
    focus(win.id);
    drag.current = {
      pointerX: e.clientX,
      pointerY: e.clientY,
      x: rect.x,
      y: rect.y,
      width: rect.width,
      height: rect.height,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onTitlePointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d) return;
    const nx = d.x + (e.clientX - d.pointerX);
    const ny = d.y + (e.clientY - d.pointerY);
    setRect(win.id, {
      x: Math.min(Math.max(-rect.width + 80, nx), window.innerWidth - 80),
      y: Math.max(36, ny),
    });
  };

  const endDrag = (e: ReactPointerEvent<HTMLElement>) => {
    drag.current = null;
    resize.current = null;
    if (e.currentTarget.hasPointerCapture?.(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  const onGripPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    e.stopPropagation();
    focus(win.id);
    resize.current = {
      pointerX: e.clientX,
      pointerY: e.clientY,
      x: rect.x,
      y: rect.y,
      width: rect.width,
      height: rect.height,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onGripPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const r = resize.current;
    if (!r) return;
    setRect(win.id, {
      width: Math.max(MIN_W, Math.min(window.innerWidth - r.x - 12, r.width + (e.clientX - r.pointerX))),
      height: Math.max(MIN_H, Math.min(window.innerHeight - r.y - 12, r.height + (e.clientY - r.pointerY))),
    });
  };

  const handleMax = () => {
    setAnimatingRect(true);
    toggleMax(win.id);
    window.setTimeout(() => setAnimatingRect(false), 220);
  };

  return (
    <motion.section
      role="dialog"
      aria-label={t(app.title, locale)}
      onPointerDown={() => focus(win.id)}
      initial={reduceMotion ? false : { opacity: 0, scale: 0.96, y: 14 }}
      animate={
        win.minimized
          ? reduceMotion
            ? { opacity: 0 }
            : { opacity: 0, scale: 0.2, y: 260 }
          : { opacity: 1, scale: 1, y: 0 }
      }
      exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 10 }}
      transition={
        reduceMotion
          ? { duration: 0.12 }
          : { duration: 0.26, ease: [0.2, 1.2, 0.4, 1] }
      }
      style={{
        left: rect.x,
        top: rect.y,
        width: rect.width,
        height: rect.height,
        zIndex: win.z,
        transformOrigin: "center bottom",
        pointerEvents: win.minimized ? "none" : "auto",
      }}
      className={cn(
        "os-glass os-window fixed flex min-w-[280px] flex-col overflow-hidden rounded-os",
        animatingRect && "transition-[left,top,width,height] duration-200 ease-out",
      )}
    >
      <div
        onPointerDown={onTitlePointerDown}
        onPointerMove={onTitlePointerMove}
        onPointerUp={endDrag}
        onDoubleClick={handleMax}
        className="os-titlebar relative flex h-[42px] flex-none cursor-grab touch-none select-none items-center gap-2.5 px-3 active:cursor-grabbing"
      >
        <div className="z-[1] flex gap-2">
          <button
            type="button"
            aria-label="Close"
            onClick={() => closeApp(win.id)}
            className="os-light os-light--close"
          />
          <button
            type="button"
            aria-label="Minimize"
            onClick={() => minimize(win.id)}
            className="os-light os-light--min"
          />
          <button
            type="button"
            aria-label="Zoom"
            onClick={handleMax}
            className="os-light os-light--max"
          />
        </div>
        <div className="pointer-events-none absolute inset-x-0 z-0 flex items-center justify-center gap-2 px-12">
          <Tile
            icon={app.icon}
            palette={app.tile}
            className="h-[22px] w-[22px] rounded-[7px] text-[13px]"
          />
          <h3 className="truncate font-brand text-sm font-bold tracking-tight">
            {t(app.title, locale)}
          </h3>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-[22px] text-[15px] leading-relaxed text-ink">
        <WindowContent app={app} />
      </div>

      <div className="pointer-events-none flex-none px-3 pb-1.5 pr-9 text-right sm:pr-7">
        <FooterCredit />
      </div>

      <div
        onPointerDown={onGripPointerDown}
        onPointerMove={onGripPointerMove}
        onPointerUp={endDrag}
        className="os-resize absolute bottom-0 right-0 h-8 w-8 cursor-nwse-resize touch-none sm:h-5 sm:w-5"
        aria-hidden="true"
      />
    </motion.section>
  );
}
