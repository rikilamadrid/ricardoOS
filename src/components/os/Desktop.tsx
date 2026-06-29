import { ThemeProvider } from "./theme-store";
import { LocaleProvider } from "./locale-store";
import { BootScreen } from "./BootScreen";
import { Wallpaper } from "./Wallpaper";
import { MenuBar } from "./MenuBar";
import { DesktopIcons } from "./DesktopIcons";
import { Dock } from "./Dock";
import { DesktopContextMenu } from "./DesktopContextMenu";
import { Hint } from "./Hint";
import { Toaster } from "@/components/ui/sonner";

/**
 * The RicardoOS desktop shell — phase 2 "living desktop": boot sequence,
 * animated wallpaper, live menu bar, day/night + wallpaper theming, and the
 * desktop right-click menu. Window management + app content land in phases 3–4.
 */
export function Desktop() {
  return (
    <ThemeProvider>
      <LocaleProvider>
        <DesktopContextMenu>
          <main className="relative h-full w-full overflow-hidden">
            <Wallpaper />
            <MenuBar />
            <DesktopIcons />
            <Dock />
            <Hint />
          </main>
        </DesktopContextMenu>
      </LocaleProvider>
      <BootScreen />
      <Toaster position="bottom-center" offset={96} />
    </ThemeProvider>
  );
}
