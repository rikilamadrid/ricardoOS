import { Wallpaper } from "./Wallpaper";
import { MenuBar } from "./MenuBar";
import { DesktopIcons } from "./DesktopIcons";
import { Dock } from "./Dock";
import { Window } from "./Window";

/** The RicardoOS desktop shell — composes the static chrome for phase 1. */
export function Desktop() {
  return (
    <main className="relative h-full w-full overflow-hidden">
      <Wallpaper />
      <MenuBar />
      <DesktopIcons />
      <Window
        title="Main"
        icon="🪟"
        palette="sky"
        className="left-1/2 top-24 w-[min(420px,90vw)] -translate-x-1/2"
      >
        <h2 className="font-brand text-2xl">Main</h2>
      </Window>
      <Dock />
    </main>
  );
}
