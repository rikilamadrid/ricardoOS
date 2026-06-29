"use client";

import { useEffect, useState, type CSSProperties } from "react";

interface Bubble {
  size: number;
  left: number;
  drift: number;
  duration: number;
  delay: number;
}

function spawn(): Bubble[] {
  const count = window.innerWidth < 720 ? 8 : 16;
  return Array.from({ length: count }, () => ({
    size: 20 + Math.random() * 70,
    left: Math.random() * 100,
    drift: Math.random() * 120 - 60,
    duration: 14 + Math.random() * 16,
    delay: -Math.random() * 20,
  }));
}

/**
 * Drifting translucent bubbles. Generated on the client only (random values
 * would otherwise mismatch on hydration) and rendered solely when ambient
 * motion is enabled — see the parent <Wallpaper>.
 */
export function Bubbles() {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  // Generate on the client only — random positions would mismatch on hydration.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setBubbles(spawn());
  }, []);

  return (
    <div className="os-bubbles" aria-hidden="true">
      {bubbles.map((b, i) => (
        <span
          key={i}
          className="os-bubble"
          style={
            {
              width: `${b.size}px`,
              height: `${b.size}px`,
              left: `${b.left}vw`,
              animationDuration: `${b.duration}s`,
              animationDelay: `${b.delay}s`,
              "--drift": `${b.drift}px`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
