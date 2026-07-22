"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { assistant, t, type AssistantLinePool, type Locale, type Localized } from "@/data";
import { useAssistantStore } from "./assistant-store";
import { useWindowStore } from "./window-store";

/** Lowercased, trimmed — the shape both a question and a pattern are compared in. */
function normalize(raw: string): string {
  return raw.trim().toLowerCase();
}

/**
 * Blip's brain (phase 20B) — a scripted one.
 *
 * Deliberately a seam: OS state goes in, one line comes out. `Assistant.tsx`
 * knows nothing about *why* Blip is talking, so phase 20C could swap this hook
 * for one that streams from an LLM without touching the character at all.
 *
 * Charm here depends entirely on restraint, so three rules are enforced:
 *   1. Never interrupt itself, and leave a real gap between unprompted lines.
 *   2. Never repeat a line within a session — pools run dry and Blip goes quiet.
 *   3. Never block a click (that one lives in CSS: the bubble is pointer-none).
 */

/** Quiet time required between two unprompted lines. */
const MIN_GAP_MS = 18_000;
/** No pointer or key activity for this long triggers the idle line. */
const IDLE_MS = 75_000;
/** Blip reacts a beat late, the way a person would. */
const REACT_MS = 450;
/** Re-arming the idle timer on every mousemove would be wasteful. */
const IDLE_REARM_THROTTLE_MS = 2_000;

/** Rough reading time for a line, floor 4s and ceiling 11s. */
function readMs(text: string): number {
  return Math.min(11_000, 4_000 + text.length * 45);
}

const { lines } = assistant;

export interface BrainInput {
  locale: Locale;
  /** Blip is on screen and allowed to talk (arrived, not dismissed, not in zen). */
  active: boolean;
  /** Current wallpaper id — a change is one of the triggers. */
  wallpaper: string;
}

export interface Brain {
  /** The line Blip is currently saying, or null when quiet. */
  text: string | null;
  /** Click handler for the character: hush if talking, else say something. */
  poke: () => void;
  /** Answer a typed question from the FAQ bank (phase 21). Always answers. */
  ask: (question: string) => void;
}

export function useAssistantBrain({ locale, active, wallpaper }: BrainInput): Brain {
  // The chosen line is held as its `Localized` source, not resolved text, so
  // flipping the language mid-sentence re-renders it in the new locale.
  const [line, setLine] = useState<Localized<string> | null>(null);

  const said = useRef<Set<string>>(new Set());
  const quietSince = useRef(0);
  const pending = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hideAt = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Read inside subscriptions and timeouts that must not re-bind on every change.
  const activeRef = useRef(active);
  const localeRef = useRef(locale);
  // Owned entirely by `say`/`hush`/the hide timer. It goes true the moment a
  // line is committed to, which is REACT_MS *before* `line` is set, so it must
  // never be derived from render state.
  const speaking = useRef(false);

  useEffect(() => {
    activeRef.current = active;
    localeRef.current = locale;
  }, [active, locale]);

  const hush = useCallback(() => {
    if (pending.current) clearTimeout(pending.current);
    if (hideAt.current) clearTimeout(hideAt.current);
    pending.current = null;
    hideAt.current = null;
    speaking.current = false;
    quietSince.current = Date.now();
    setLine(null);
  }, []);

  /**
   * Show `chosen` for a beat, then hide it and reopen the floor. Shared by
   * `say()` (pool-drawn lines) and `ask()` (dynamically matched FAQ answers) —
   * the only difference is how each arrives at `chosen`.
   */
  const display = useCallback((chosen: Localized<string>) => {
    speaking.current = true;
    if (pending.current) clearTimeout(pending.current);
    if (hideAt.current) clearTimeout(hideAt.current);
    // Clear whatever's showing now — `ask()` can force-interrupt a line that's
    // still mid-display, and without this the stale bubble/live-region text
    // would hang around for the REACT_MS beat below.
    setLine(null);
    // Deferred so Blip reacts a beat after the event rather than on the same frame.
    pending.current = setTimeout(() => {
      setLine(chosen);
      hideAt.current = setTimeout(() => {
        speaking.current = false;
        quietSince.current = Date.now();
        setLine(null);
      }, readMs(t(chosen, localeRef.current)));
    }, REACT_MS);
  }, []);

  /**
   * Say the first unused line from `pool`, or stay quiet if there isn't one.
   * `force` is for lines the user explicitly asked for (a greeting, a poke) —
   * those ignore the cooldown, because they aren't interruptions.
   */
  const say = useCallback(
    (key: string, pool: AssistantLinePool | undefined, force = false) => {
      if (!pool?.length || !activeRef.current) return;
      const now = Date.now();
      // Rule 1: don't talk over yourself, and don't interrupt twice in a row.
      if (!force && (speaking.current || now - quietSince.current < MIN_GAP_MS)) return;
      // Rule 2: first line of this pool that hasn't been used yet this session.
      const index = pool.findIndex((_, i) => !said.current.has(`${key}:${i}`));
      if (index === -1) return;
      said.current.add(`${key}:${index}`);
      display(pool[index]);
    },
    [display],
  );

  // Drop the current line and every pending timer the moment Blip leaves —
  // dismissed, zen mode opened, or unmounted. Written as a cleanup rather than
  // an `if (!active)` body so it also covers unmount in one place.
  useEffect(() => {
    if (!active) return;
    return () => hush();
  }, [active, hush]);

  // Trigger: first visit vs. a return. Forced, so the hello always lands.
  useEffect(() => {
    if (!active) return;
    const { seen, setSeen } = useAssistantStore.getState();
    setSeen();
    say(seen ? "welcomeBack" : "firstVisit", seen ? lines.welcomeBack : lines.firstVisit, true);
  }, [active, say]);

  // Triggers: an app opened (per-app line), and the last window closing.
  useEffect(() => {
    if (!active) return;
    return useWindowStore.subscribe((state, prev) => {
      if (state.zenMode) return;
      const ids = Object.keys(state.windows);
      const before = Object.keys(prev.windows);
      const opened = ids.find((id) => !before.includes(id));
      if (opened) {
        say(`app:${opened}`, assistant.appLines[opened]);
        return;
      }
      if (before.length > 0 && ids.length === 0) say("allClosed", lines.allWindowsClosed);
    });
  }, [active, say]);

  // Trigger: the wallpaper changed. Compared against a ref rather than keyed off
  // the effect deps, so Blip arriving doesn't read as a wallpaper change.
  const lastWallpaper = useRef(wallpaper);
  useEffect(() => {
    if (lastWallpaper.current === wallpaper) return;
    lastWallpaper.current = wallpaper;
    say("wallpaper", lines.wallpaperChanged);
  }, [wallpaper, say]);

  // Trigger: a long idle stretch with no pointer or keyboard activity.
  useEffect(() => {
    if (!active) return;
    let timer: ReturnType<typeof setTimeout>;
    let armedAt = 0;
    const arm = () => {
      const now = Date.now();
      if (now - armedAt < IDLE_REARM_THROTTLE_MS) return;
      armedAt = now;
      clearTimeout(timer);
      timer = setTimeout(() => say("idle", lines.idle), IDLE_MS);
    };
    armedAt = Date.now();
    timer = setTimeout(() => say("idle", lines.idle), IDLE_MS);
    const events = ["pointerdown", "pointermove", "keydown", "wheel"] as const;
    for (const e of events) window.addEventListener(e, arm, { passive: true });
    return () => {
      clearTimeout(timer);
      for (const e of events) window.removeEventListener(e, arm);
    };
  }, [active, say]);

  const poke = useCallback(() => {
    if (speaking.current) {
      hush();
      return;
    }
    say("poke", lines.poke, true);
  }, [hush, say]);

  /**
   * Answer a typed question. Unlike `say()`, this is an explicit user action —
   * it always answers (bypassing the cooldown and any in-flight line), and the
   * matched entry isn't tracked in `said`, since a question can be re-asked.
   */
  const ask = useCallback(
    (question: string) => {
      if (!activeRef.current) return;
      const normalized = normalize(question);
      if (!normalized) return;
      const match = assistant.faq.find((entry) =>
        entry.patterns.some((pattern) => normalized.includes(pattern)),
      );
      display(match?.answer ?? assistant.faqFallback);
      const openApp = match?.action?.openApp;
      if (openApp) {
        setTimeout(() => useWindowStore.getState().openApp(openApp), REACT_MS);
      }
    },
    [display],
  );

  return { text: line ? t(line, locale) : null, poke, ask };
}
