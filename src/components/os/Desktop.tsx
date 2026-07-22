import type { PostMeta } from "@/lib/posts";
import { ThemeProvider } from "./theme-store";
import { LocaleProvider } from "./locale-store";
import { PostsProvider } from "./posts-store";
import { BootScreen } from "./BootScreen";
import { Wallpaper } from "./Wallpaper";
import { MenuBar } from "./MenuBar";
import { DesktopIcons } from "./DesktopIcons";
import { Dock } from "./Dock";
import { FooterCredit } from "./FooterCredit";
import { DesktopContextMenu } from "./DesktopContextMenu";
import { WindowManager } from "./WindowManager";
import { ZenOverlay } from "./ZenOverlay";
import { DeepLinkOpener } from "./DeepLinkOpener";
import { Hint } from "./Hint";
import { Assistant } from "./Assistant";
import { Toaster } from "@/components/ui/sonner";

/**
 * The RicardoOS desktop shell — phase 2 "living desktop": boot sequence,
 * animated wallpaper, live menu bar, day/night + wallpaper theming, and the
 * desktop right-click menu. Window management + app content land in phases 3–4.
 */
export function Desktop({ posts = [] }: { posts?: PostMeta[] }) {
  return (
    <ThemeProvider>
      <LocaleProvider>
        <PostsProvider posts={posts}>
        <DesktopContextMenu>
          <main className="relative h-full w-full overflow-hidden">
            <Wallpaper />
            <MenuBar />
            <DesktopIcons />
            <WindowManager />
            <DeepLinkOpener />
            <Dock />
            <FooterCredit className="fixed bottom-[92px] left-1/2 z-[7000] -translate-x-1/2 sm:bottom-4 sm:left-auto sm:right-4 sm:translate-x-0" />
            <Hint />
            <Assistant />
            <ZenOverlay />
          </main>
        </DesktopContextMenu>
        </PostsProvider>
      </LocaleProvider>
      <BootScreen />
      <Toaster position="bottom-center" offset={96} />
    </ThemeProvider>
  );
}
