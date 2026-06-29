import { branding, menuBar, statusBar, t, DEFAULT_LOCALE } from "@/data";

// Phase 1 is display-only; the live clock ships in phase 2.
const STATIC_TIME = "10:09 AM";

/** Translucent top menu bar: OS logo, nav, status glyphs, and a clock. */
export function MenuBar() {
  return (
    <header className="os-menubar fixed inset-x-0 top-0 z-[9000] flex h-[34px] items-center gap-1.5 px-3 text-[13px] text-ink">
      <span className="font-brand px-2.5 text-[15px] font-bold tracking-tight">
        {branding.name}
        <span className="text-aqua-deep">{branding.suffix}</span>
      </span>

      <nav className="flex items-center gap-1">
        {menuBar.map((item) => (
          <button
            key={item.id}
            type="button"
            className="rounded-[9px] px-2.5 py-1 font-semibold transition-colors hover:bg-white/55"
          >
            {t(item.label, DEFAULT_LOCALE)}
          </button>
        ))}
      </nav>

      <div className="flex-1" />

      <div className="flex items-center gap-0.5">
        {statusBar
          .filter((item) => item.icon)
          .map((item) => (
            <span
              key={item.id}
              className="grid h-6 w-[30px] place-items-center rounded-lg opacity-90"
            >
              {item.icon}
            </span>
          ))}
        <span className="min-w-[64px] text-center font-semibold tabular-nums">{STATIC_TIME}</span>
      </div>
    </header>
  );
}
