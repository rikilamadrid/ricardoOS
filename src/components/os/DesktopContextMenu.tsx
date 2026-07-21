"use client";

import { type ReactNode } from "react";
import { ContextMenu } from "radix-ui";
import { toast } from "sonner";
import { t } from "@/data";
import { wallpaperList, wallpapers } from "@/content/wallpapers";
import { useTheme } from "./theme-store";
import { useLocale } from "./locale-store";
import { useDesktopIconsStore } from "@/lib/desktop-icons-store";

/**
 * Right-click anywhere on the desktop for the aqua context menu: pick a
 * wallpaper or flip day/night. Wraps the desktop surface as the trigger.
 */
export function DesktopContextMenu({ children }: { children: ReactNode }) {
  const { theme, setTheme, wallpaper, setWallpaper, colorblind, toggleColorblind } = useTheme();
  const { locale } = useLocale();
  const cleanUpIcons = useDesktopIconsStore((s) => s.cleanUp);
  const active = wallpapers[wallpaper];

  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger asChild>
        <div className="relative h-full w-full">{children}</div>
      </ContextMenu.Trigger>
      <ContextMenu.Portal>
        <ContextMenu.Content className="os-glass os-menu os-pop-in z-[9500] text-ink">
          <ContextMenu.Sub>
            <ContextMenu.SubTrigger className="os-menu-item">
              <span>Wallpaper</span>
              <span className="wp-swatch" style={{ background: active.swatch }} />
            </ContextMenu.SubTrigger>
            <ContextMenu.Portal>
              <ContextMenu.SubContent
                className="os-glass os-menu os-menu-grid os-pop-in z-[9500] text-ink"
                sideOffset={4}
              >
                {wallpaperList.map((wp) => (
                  <ContextMenu.Item
                    key={wp.id}
                    className="os-swatch-item"
                    data-active={wp.id === wallpaper || undefined}
                    onSelect={() => {
                      setWallpaper(wp.id);
                      toast(`🖼️ ${t(wp.label, locale)} wallpaper`);
                    }}
                  >
                    <span className="wp-swatch wp-swatch--lg" style={{ background: wp.swatch }} />
                    <span>{t(wp.label, locale)}</span>
                  </ContextMenu.Item>
                ))}
              </ContextMenu.SubContent>
            </ContextMenu.Portal>
          </ContextMenu.Sub>
          <ContextMenu.Separator className="os-menu-sep" />
          <ContextMenu.Item
            className="os-menu-item"
            onSelect={() => {
              const next = theme === "day" ? "night" : "day";
              setTheme(next);
              toast(next === "night" ? "🌙 Night mode" : "☀️ Day mode");
            }}
          >
            Toggle day / night
          </ContextMenu.Item>
          <ContextMenu.Item
            className="os-menu-item"
            onSelect={() => {
              toggleColorblind();
              toast(colorblind ? "👓 Colorblind-safe off" : "👓 Colorblind-safe on");
            }}
          >
            <span>Colorblind-safe</span>
            <small>{colorblind ? "On" : "Off"}</small>
          </ContextMenu.Item>
          <ContextMenu.Separator className="os-menu-sep" />
          <ContextMenu.Item
            className="os-menu-item"
            onSelect={() => {
              cleanUpIcons();
              toast("🧹 Icons cleaned up");
            }}
          >
            Clean Up Icons
          </ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  );
}
