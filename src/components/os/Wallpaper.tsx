/**
 * Static living wallpaper: sky gradient + soft sun glow + glossy green hill.
 * Bubbles, light rays, and animation arrive in phase 2.
 */
export function Wallpaper() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="os-sky" />
      <div className="os-sun" />
      <div className="os-hill" />
    </div>
  );
}
