import { cn } from "@/lib/utils";

/**
 * "Lamadrid Labs © 2026" credit line. A quiet, translucent Bliss-green mark in
 * Hanken Grotesk — rendered fixed on the desktop and inside each window's chrome
 * (above the resize grip). Never intercepts pointer events.
 */
export function FooterCredit({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "pointer-events-none select-none whitespace-nowrap font-sans text-[0.75rem] leading-none tracking-tight text-[rgba(126,217,87,0.7)]",
        className,
      )}
    >
      Lamadrid Labs © 2026
    </span>
  );
}
