"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { meditations, t } from "@/data";
import { useLocale } from "./locale-store";
import { useWindowStore } from "@/lib/window-store";

const VERSE_MS = 9000;

/**
 * "Meditations Between Quests" — a desktop-level zen mode (not a window).
 * When `zenMode` is on it dims the whole desktop and enters a calm other-space:
 * a slow breathing orb, a rotating verse, and a gentle way back. Honors
 * reduced-motion (the orb holds still; verses still rotate). Escape returns.
 */
export function ZenOverlay() {
  const { locale } = useLocale();
  const zenMode = useWindowStore((s) => s.zenMode);
  const setZen = useWindowStore((s) => s.setZen);
  const reduceMotion = useReducedMotion();
  const [verse, setVerse] = useState(0);

  // Rotate verses while open.
  useEffect(() => {
    if (!zenMode) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVerse(Math.floor(Math.random() * meditations.verses.length));
    const id = setInterval(
      () => setVerse((v) => (v + 1) % meditations.verses.length),
      VERSE_MS,
    );
    return () => clearInterval(id);
  }, [zenMode]);

  // Escape returns to the desktop.
  useEffect(() => {
    if (!zenMode) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [zenMode, setZen]);

  return (
    <AnimatePresence>
      {zenMode && (
        <motion.div
          className="os-zen"
          role="dialog"
          aria-modal="true"
          aria-label={t(meditations.eyebrow, locale)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1 }}
        >
          <div className="os-zen-eyebrow">{t(meditations.eyebrow, locale)}</div>

          <motion.div
            className="os-zen-orb"
            animate={
              reduceMotion
                ? { scale: 1, opacity: 0.9 }
                : { scale: [1, 1.18, 1], opacity: [0.75, 1, 0.75] }
            }
            transition={
              reduceMotion
                ? undefined
                : { duration: 7, repeat: Infinity, ease: "easeInOut" }
            }
          />

          <AnimatePresence mode="wait">
            <motion.p
              key={verse}
              className="os-zen-verse"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.8 }}
            >
              {t(meditations.verses[verse], locale)}
            </motion.p>
          </AnimatePresence>

          <button type="button" className="os-zen-back" onClick={() => setZen(false)}>
            {t(meditations.back, locale)}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
