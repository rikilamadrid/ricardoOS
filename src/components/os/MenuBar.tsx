"use client";

import { useEffect, useState } from "react";
import { DropdownMenu as Menu, Popover } from "radix-ui";
import { toast } from "sonner";
import { branding, menuBar, t, LOCALE_LABELS } from "@/data";
import { useTheme } from "./theme-store";
import { useLocale } from "./locale-store";
import { useWindowStore } from "@/lib/window-store";

/** 12-hour live clock; placeholder until mounted to keep hydration stable. */
function useClock() {
  const [time, setTime] = useState("--:--");

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      let h = now.getHours();
      const m = now.getMinutes();
      const meridiem = h >= 12 ? "PM" : "AM";
      h = h % 12 || 12;
      setTime(`${h}:${String(m).padStart(2, "0")} ${meridiem}`);
    };
    tick();
    const id = setInterval(tick, 20000);
    return () => clearInterval(id);
  }, []);

  return time;
}

/** Live translucent menu bar: logo menu, nav, theme toggle, status popovers, clock. */
export function MenuBar() {
  const { theme, setTheme, colorblind, toggleColorblind } = useTheme();
  const { locale, cycleLocale } = useLocale();
  const openApp = useWindowStore((s) => s.openApp);
  const time = useClock();
  const isNight = theme === "night";

  const flipTheme = () => {
    const next = isNight ? "day" : "night";
    setTheme(next);
    toast(next === "night" ? "🌙 Night mode" : "☀️ Day mode");
  };

  const flipColorblind = () => {
    toggleColorblind();
    toast(colorblind ? "👓 Colorblind-safe off" : "👓 Colorblind-safe on");
  };

  const flipLanguage = () => {
    cycleLocale();
    const order = Object.keys(LOCALE_LABELS) as (keyof typeof LOCALE_LABELS)[];
    const next = order[(order.indexOf(locale) + 1) % order.length];
    const label = LOCALE_LABELS[next];
    toast(`${label.flag} ${label.native}`);
  };

  return (
    <header className="os-menubar fixed inset-x-0 top-0 z-[9000] flex h-[34px] flex-nowrap items-center gap-1.5 overflow-hidden px-2 text-[13px] text-ink sm:px-3">
      {/* OS logo menu */}
      <Menu.Root>
        <Menu.Trigger className="font-brand shrink-0 whitespace-nowrap rounded-[9px] px-2 py-1 text-[15px] font-bold tracking-tight outline-none transition-colors hover:bg-white/55 data-[state=open]:bg-white/55 sm:px-2.5">
          {branding.name}
          <span className="text-aqua-deep">{branding.suffix}</span>
        </Menu.Trigger>
        <Menu.Portal>
          <Menu.Content
            align="start"
            sideOffset={4}
            className="os-glass os-menu os-pop-in z-[9100] text-ink"
          >
            <Menu.Item disabled className="os-menu-item opacity-100">
              <span>About this Ricardo</span>
              <small>v2.0</small>
            </Menu.Item>
            <Menu.Separator className="os-menu-sep" />
            <Menu.Item className="os-menu-item" onSelect={flipTheme}>
              Toggle day / night
            </Menu.Item>
            <Menu.Item className="os-menu-item" onSelect={flipColorblind}>
              <span>Colorblind-safe</span>
              <small>{colorblind ? "On" : "Off"}</small>
            </Menu.Item>
            <Menu.Item
              className="os-menu-item"
              onSelect={() => toast("✨ Powered by curiosity — 100%")}
            >
              About this machine
            </Menu.Item>
            <Menu.Separator className="os-menu-sep" />
            <Menu.Item
              className="os-menu-item"
              onSelect={() => window.location.reload()}
            >
              <span>Restart RicardoOS</span>
              <small>⟳</small>
            </Menu.Item>
          </Menu.Content>
        </Menu.Portal>
      </Menu.Root>

      {/* Section nav — hidden on mobile, where the dock + desktop icons launch apps */}
      <nav className="hidden items-center gap-1 sm:flex">
        {menuBar.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => openApp(item.target)}
            className="rounded-[9px] px-2.5 py-1 font-semibold transition-colors hover:bg-white/55"
          >
            {t(item.label, locale)}
          </button>
        ))}
      </nav>

      <div className="min-w-0 flex-1" />

      <div className="flex shrink-0 items-center gap-0.5">
        {/* Day / night toggle */}
        <button
          type="button"
          onClick={flipTheme}
          aria-label="Toggle day or night"
          title="Day / Night"
          className="os-glyph"
        >
          {isNight ? "🌙" : "☀️"}
        </button>

        {/* Colorblind-safe palette toggle */}
        <button
          type="button"
          onClick={flipColorblind}
          aria-label="Toggle colorblind-safe palette"
          aria-pressed={colorblind}
          title={`Colorblind-safe: ${colorblind ? "on" : "off"}`}
          className="os-glyph"
          style={{ opacity: colorblind ? 1 : undefined }}
        >
          👓
        </button>

        {/* Language — cycles EN → ES → FR */}
        <button
          type="button"
          onClick={flipLanguage}
          aria-label={`Language: ${LOCALE_LABELS[locale].english}`}
          title={`Language: ${LOCALE_LABELS[locale].native}`}
          className="os-glyph"
        >
          {LOCALE_LABELS[locale].flag}
        </button>

        {/* Network + battery — hidden on mobile to keep the bar from overflowing */}
        <div className="hidden items-center gap-0.5 sm:flex">
          <StatusPopover icon="📶" label="Network" title="Network">
            <div>
              Connected to <strong>the open web</strong>
            </div>
            <div className="os-meter">
              <i style={{ width: "96%" }} />
            </div>
            <small className="opacity-60">Signal: excellent</small>
          </StatusPopover>

          <StatusPopover icon="🔋" label="Battery" title="Power">
            <div>
              Running on <strong>pure curiosity</strong>
            </div>
            <div className="os-meter">
              <i style={{ width: "100%", background: "var(--color-grass)" }} />
            </div>
            <small className="opacity-60">100% — never needs charging</small>
          </StatusPopover>
        </div>

        <span className="min-w-[58px] shrink-0 whitespace-nowrap text-center font-semibold tabular-nums">{time}</span>
      </div>
    </header>
  );
}

interface StatusPopoverProps {
  icon: string;
  label: string;
  title: string;
  children: React.ReactNode;
}

/** A glyph button that opens a small frosted status popover. */
function StatusPopover({ icon, label, title, children }: StatusPopoverProps) {
  return (
    <Popover.Root>
      <Popover.Trigger aria-label={label} title={label} className="os-glyph">
        {icon}
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          align="end"
          sideOffset={6}
          className="os-glass os-pop-in z-[9100] w-[230px] rounded-[14px] p-[14px] text-[13px] text-ink"
        >
          <h4 className="os-popover-title">{title}</h4>
          {children}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
