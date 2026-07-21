import type { WallpaperScene as SceneId } from "@/content/wallpapers";

/** Distant towers — paler, thinner, no lit windows. [x, width, top] */
const FAR_TOWERS: [number, number, number][] = [
  [20, 70, 150], [100, 44, 110], [160, 58, 180], [232, 90, 96], [338, 52, 150],
  [404, 74, 128], [492, 40, 168], [546, 96, 104], [656, 60, 146], [730, 82, 120],
  [826, 46, 176], [886, 70, 132], [970, 54, 158], [1038, 88, 112], [1140, 60, 150],
];

/** Foreground towers — darker, wider, windows lit at night. [x, width, top] */
const NEAR_TOWERS: [number, number, number][] = [
  [0, 86, 236], [100, 58, 200], [172, 104, 258], [290, 66, 214], [370, 92, 246],
  [476, 54, 192], [544, 110, 252], [668, 72, 208], [754, 96, 240], [864, 60, 198],
  [938, 108, 244], [1060, 70, 206], [1144, 56, 232],
];

/** Towers catching a sun glint on their left edge (indices into NEAR_TOWERS). */
const GLINT_TOWERS = [2, 6, 8];

const VIEW_H = 400;

function Skyline() {
  return (
    <svg className="os-skyline" viewBox={`0 0 1200 ${VIEW_H}`} preserveAspectRatio="none">
      <defs>
        {/* One window cell, tiled across the near towers. Painting a second
            copy of the same rects with this pattern keeps the windows inside
            the silhouette without a clip path per tower. */}
        <pattern id="os-skyline-windows" width="20" height="28" patternUnits="userSpaceOnUse">
          <rect className="os-skyline-win" x="5" y="7" width="8" height="11" />
        </pattern>
      </defs>
      <g className="os-skyline-far">
        {FAR_TOWERS.map(([x, w, y]) => (
          <rect key={x} x={x} y={y} width={w} height={VIEW_H - y} />
        ))}
      </g>
      <g className="os-skyline-near">
        {NEAR_TOWERS.map(([x, w, y]) => (
          <rect key={x} x={x} y={y} width={w} height={VIEW_H - y} />
        ))}
      </g>
      <g className="os-skyline-glass" fill="url(#os-skyline-windows)">
        {NEAR_TOWERS.map(([x, w, y]) => (
          <rect key={x} x={x} y={y} width={w} height={VIEW_H - y} />
        ))}
      </g>
      <g className="os-skyline-glint">
        {GLINT_TOWERS.map((i) => {
          const [x, , y] = NEAR_TOWERS[i];
          return <rect key={x} x={x} y={y} width={5} height={VIEW_H - y} />;
        })}
      </g>
    </svg>
  );
}

/**
 * The foreground layer of the living wallpaper. Each scene is pure CSS/SVG —
 * no image assets — and carries its own day, night (`.dark`) and
 * colorblind-safe (`.cb`) treatments in globals.css.
 */
export function WallpaperScene({ scene }: { scene: SceneId }) {
  switch (scene) {
    case "hill":
      return <div className="os-hill" />;
    case "metal":
      return <div className="os-metal" />;
    case "water":
      return <div className="os-water" />;
    case "orb":
      return <div className="os-orb" />;
    case "skyline":
      return <Skyline />;
  }
}
