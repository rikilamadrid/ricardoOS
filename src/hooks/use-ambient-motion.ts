"use client";

import { useEffect, useState } from "react";

/**
 * Whether ambient looping animations (drifting bubbles, rotating light rays)
 * should run. Returns `false` when the user prefers reduced motion or when the
 * tab is hidden — so we disable the loops instead of burning cycles off-screen.
 *
 * SSR and the first client render return `true` to keep hydration consistent;
 * the real value lands after mount.
 */
export function useAmbientMotion(): boolean {
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(!media.matches && !document.hidden);

    update();
    media.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);

    return () => {
      media.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  return enabled;
}
