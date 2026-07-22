"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { assistant, t } from "@/data";
import { useLocale } from "./locale-store";
import { useTheme } from "./theme-store";
import { useWindowStore } from "@/lib/window-store";
import { useAssistantBrain } from "@/lib/assistant-brain";
import { useAssistantStore, type AssistantPos } from "@/lib/assistant-store";

/** Character box in px (matches .os-blip's width/height). */
const BLIP = 72;
const MENU_BAR_H = 44; // top bound — stay clear of the menu bar
const DOCK_RESERVE = 116; // bottom bound — stay clear of the dock
const EDGE = 16;
const DRAG_THRESHOLD = 4; // px before a press counts as a drag (vs. a click)
/** Blip arrives after the boot screen has finished (BootScreen ends at 3100ms). */
const ARRIVAL_MS = 3600;
/** Speech bubble flips below the character when it's perched near the top. */
const SPEECH_FLIP_Y = 190;

/** Default perch: bottom-right, above the dock and clear of the footer credit. */
function defaultPos(): AssistantPos {
  return {
    x: window.innerWidth - BLIP - EDGE - 8,
    y: window.innerHeight - DOCK_RESERVE - BLIP,
  };
}

/** Keep Blip inside the visible desktop, below the menu bar and above the dock. */
function clampToViewport(pos: AssistantPos): AssistantPos {
  const maxX = Math.max(EDGE, window.innerWidth - BLIP - EDGE);
  const maxY = Math.max(MENU_BAR_H, window.innerHeight - DOCK_RESERVE);
  return {
    x: Math.min(Math.max(EDGE, pos.x), maxX),
    y: Math.min(Math.max(MENU_BAR_H, pos.y), maxY),
  };
}

/**
 * Blip — a desktop-level floating character, not an app window. Lives alongside
 * `ZenOverlay` / `FooterCredit`: draggable, dismissible, and persisted.
 *
 * Phase 20A is the character + shell with one placeholder line; phase 20B swaps
 * the line for a trigger-driven scripted brain (`src/data/assistant.ts`).
 *
 * Layering note: the spec said "below open windows", but Blip sits *above* them
 * (below the dock and menu bar) — 20B's per-app lines fire when a window opens,
 * and a character hidden behind that window can't deliver them. It stays small,
 * corner-perched and draggable, so it never meaningfully covers your work.
 */
export function Assistant() {
  const { locale } = useLocale();
  const { wallpaper } = useTheme();
  const reduceMotion = useReducedMotion();
  const zenMode = useWindowStore((s) => s.zenMode);
  const dismissed = useAssistantStore((s) => s.dismissed);
  const setPos = useAssistantStore((s) => s.setPos);
  const setDismissed = useAssistantStore((s) => s.setDismissed);

  // Resolved on the client only — the default perch depends on the viewport, and
  // `savedPos` comes from localStorage. Rendering nothing until then keeps SSR
  // and the first client render identical (no hydration mismatch).
  const [pos, setLocalPos] = useState<AssistantPos | null>(null);
  const [arrived, setArrived] = useState(false);

  // What Blip says is entirely the brain's business — see `assistant-brain.ts`.
  // Zen mode covers the desktop, so Blip stays quiet behind it.
  const { text, poke } = useAssistantBrain({
    locale,
    active: arrived && !dismissed && !zenMode,
    wallpaper,
  });

  // Resolve the starting position, then let Blip float in after the boot screen.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-shot mount resolve
    setLocalPos(clampToViewport(useAssistantStore.getState().pos ?? defaultPos()));
    const arrive = setTimeout(() => setArrived(true), ARRIVAL_MS);
    return () => clearTimeout(arrive);
  }, []);

  // Follow the store when it changes elsewhere (e.g. re-summoned from the menu
  // after the viewport moved on), and rescue Blip if the viewport shrinks.
  useEffect(() => {
    const rescue = () => {
      setLocalPos((p) => (p ? clampToViewport(p) : p));
    };
    window.addEventListener("resize", rescue);
    window.addEventListener("orientationchange", rescue);
    return () => {
      window.removeEventListener("resize", rescue);
      window.removeEventListener("orientationchange", rescue);
    };
  }, []);

  const commit = useCallback(
    (next: AssistantPos) => {
      setLocalPos(next);
      setPos(next);
    },
    [setPos],
  );

  const onDismiss = useCallback(() => {
    setDismissed(true);
    toast(t(assistant.dismissToast, locale));
  }, [locale, setDismissed]);

  if (!pos || dismissed) return null;

  const speechBelow = pos.y < SPEECH_FLIP_Y;
  // Anchor the bubble to whichever side of the character has room.
  const speechRight = pos.x + BLIP / 2 > window.innerWidth / 2;

  return (
    <div className="pointer-events-none fixed inset-0 z-[7500]">
      {/* The live region is permanent and separate from the visual bubble.
          Screen readers reliably announce *changes* inside an existing live
          region, but often miss one that mounts with its text already in it —
          which is exactly what the animated bubble does on every line. */}
      <span className="sr-only" role="status" aria-live="polite">
        {text ?? ""}
      </span>
      <AnimatePresence>
        {arrived && (
          <motion.div
            className="absolute"
            style={{ left: pos.x, top: pos.y }}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.4, y: 18 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.5 }}
            transition={{ type: "spring", stiffness: 240, damping: 20 }}
          >
            <Character
              label={t(assistant.ariaLabel, locale)}
              dismissLabel={t(assistant.dismissLabel, locale)}
              basePos={pos}
              reduceMotion={Boolean(reduceMotion)}
              onCommit={commit}
              onPoke={poke}
              onDismiss={onDismiss}
            />
            <Speech
              text={text}
              below={speechBelow}
              alignRight={speechRight}
              reduceMotion={Boolean(reduceMotion)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/** The bubble itself: draggable, pokeable, with a hover-revealed dismiss orb. */
function Character({
  label,
  dismissLabel,
  basePos,
  reduceMotion,
  onCommit,
  onPoke,
  onDismiss,
}: {
  label: string;
  dismissLabel: string;
  basePos: AssistantPos;
  reduceMotion: boolean;
  onCommit: (pos: AssistantPos) => void;
  onPoke: () => void;
  onDismiss: () => void;
}) {
  const start = useRef<{ px: number; py: number } | null>(null);
  const dragged = useRef(false);
  const [delta, setDelta] = useState<{ dx: number; dy: number } | null>(null);

  const onPointerDown = (e: ReactPointerEvent<HTMLButtonElement>) => {
    if (e.button !== 0) return;
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
    const c = clampToViewport({ x: basePos.x + dx, y: basePos.y + dy });
    setDelta({ dx: c.x - basePos.x, dy: c.y - basePos.y });
  };

  const onPointerUp = (e: ReactPointerEvent<HTMLButtonElement>) => {
    if (!start.current) return;
    start.current = null;
    if (e.currentTarget.hasPointerCapture?.(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    if (dragged.current && delta) {
      onCommit({ x: basePos.x + delta.dx, y: basePos.y + delta.dy });
    }
    setDelta(null);
  };

  const onClick = () => {
    // Swallow the click that fires at the end of a drag.
    if (dragged.current) {
      dragged.current = false;
      return;
    }
    onPoke();
  };

  const dragging = delta !== null;

  return (
    <div
      className={cn("os-blip-holder", dragging && "is-dragging")}
      style={
        delta ? { transform: `translate3d(${delta.dx}px, ${delta.dy}px, 0)` } : undefined
      }
    >
      <button
        type="button"
        aria-label={label}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onClick={onClick}
        className={cn(
          "os-blip pointer-events-auto",
          dragging ? "cursor-grabbing" : "cursor-grab",
          !reduceMotion && !dragging && "os-blip--idle",
        )}
      >
        <BubbleFace animate={!reduceMotion} />
      </button>
      <button
        type="button"
        aria-label={dismissLabel}
        title={dismissLabel}
        onClick={onDismiss}
        className="os-blip-close pointer-events-auto"
      >
        <span aria-hidden="true">×</span>
      </button>
    </div>
  );
}

/**
 * The character art. An original glass sphere in the wallpaper's bubble gloss
 * language (see `.os-bubble`): specular highlight, cyan rim light, soft shadow —
 * plus eyes and a smile. Blinking is CSS so it costs nothing on the main thread.
 */
function BubbleFace({ animate }: { animate: boolean }) {
  return (
    <svg viewBox="0 0 100 100" className="os-blip-svg" aria-hidden="true">
      <defs>
        <radialGradient id="blip-body" cx="34%" cy="28%" r="78%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.98)" />
          <stop offset="26%" stopColor="rgba(226,244,255,0.62)" />
          <stop offset="66%" stopColor="rgba(126,204,255,0.42)" />
          <stop offset="100%" stopColor="rgba(52,142,224,0.58)" />
        </radialGradient>
        <radialGradient id="blip-under" cx="72%" cy="80%" r="46%">
          <stop offset="0%" stopColor="rgba(120,205,255,0.65)" />
          <stop offset="100%" stopColor="rgba(120,205,255,0)" />
        </radialGradient>
        <radialGradient id="blip-gloss" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
      </defs>

      {/* Body + rim light */}
      <circle cx="50" cy="50" r="46" fill="url(#blip-body)" />
      <circle cx="50" cy="50" r="46" fill="url(#blip-under)" />
      <circle
        cx="50"
        cy="50"
        r="45"
        fill="none"
        stroke="rgba(255,255,255,0.85)"
        strokeWidth="1.6"
      />

      {/* Face — grouped so a blink only touches the eyes */}
      <g className="os-blip-face">
        <g className={animate ? "os-blip-eyes os-blip-eyes--blink" : "os-blip-eyes"}>
          <ellipse cx="38" cy="47" rx="4.6" ry="5.6" fill="#0A2540" />
          <ellipse cx="62" cy="47" rx="4.6" ry="5.6" fill="#0A2540" />
          <circle cx="39.6" cy="45" r="1.5" fill="rgba(255,255,255,0.92)" />
          <circle cx="63.6" cy="45" r="1.5" fill="rgba(255,255,255,0.92)" />
        </g>
        <path
          d="M40 60 Q50 68 60 60"
          fill="none"
          stroke="#0A2540"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </g>

      {/* Specular highlight, last so it sits over the face like real glass */}
      <ellipse cx="35" cy="27" rx="15" ry="11" fill="url(#blip-gloss)" opacity="0.9" />
      <ellipse cx="66" cy="72" rx="7" ry="5" fill="rgba(255,255,255,0.4)" />
    </svg>
  );
}

/** Glass speech bubble with a tail pointing back at the character. */
function Speech({
  text,
  below,
  alignRight,
  reduceMotion,
}: {
  text: string | null;
  below: boolean;
  alignRight: boolean;
  reduceMotion: boolean;
}) {
  return (
    // `mode="wait"` so one line fully clears before the next animates in,
    // instead of two bubbles briefly overlapping in the same spot.
    <AnimatePresence mode="wait">
      {text && (
        <motion.div
          key={text}
          // Announced by the persistent live region above, not from here.
          aria-hidden="true"
          className={cn(
            "os-blip-speech os-glass pointer-events-none",
            below ? "os-blip-speech--below" : "os-blip-speech--above",
            alignRight ? "os-blip-speech--right" : "os-blip-speech--left",
          )}
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.88, y: below ? -6 : 6 }}
          animate={reduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
        >
          {text}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
