"use client";

import { useEffect, useRef } from "react";

/**
 * A subtle star field painted to a canvas, faded in only under the night theme
 * (opacity is driven by `.dark .os-stars` in globals.css). Repaints on resize.
 */
export function Stars() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < 90; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height * 0.7;
        ctx.globalAlpha = Math.random() * 0.8 + 0.2;
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(x, y, Math.random() * 1.3, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    draw();
    window.addEventListener("resize", draw);
    return () => window.removeEventListener("resize", draw);
  }, []);

  return <canvas ref={ref} className="os-stars" aria-hidden="true" />;
}
