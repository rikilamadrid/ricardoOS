/**
 * Landing "cursor swarm builds the desktop" entrance.
 *
 * Progressive enhancement over a complete page. Every hidden or displaced state
 * exists only inside a running Web Animation, so cancelling them all (or never
 * starting) always leaves the real page untouched. Interactive elements are
 * never moved: only their inner visuals move, so hit-testing stays at the final
 * position and an interrupting click lands on what the visitor aimed at.
 */

const DURATION = 2000;
const MAX_START_LATENESS = 250;
const LONG_TASK_LIMIT = 150;
const MOBILE_WIDTH = 640;
const DESKTOP_CURSORS = 28;
const MOBILE_CURSORS = 8;
const CURSOR_COLORS = 6;
const BAR_DRAW = [240, 620];
const GUIDE_DRAW = [420, 900];
const OUTLINE_DRAW = [700, 1080];
const BUILD_BOX = 260;
const BUILD_LABEL = 80;
const ICON_BIRTH = 260;
const ICON_BIRTH_STAGGER = 60;
const ICON_MOVE = 820;
const ICON_MOVE_STAGGER = 60;
const ICON_DRAG = 440;
const TILE_BIRTH = 620;
const TILE_MOVE = 1040;
const TILE_STAGGER = 55;
const TILE_DRAG = 420;
const WORKSHOP_PITCH = 112;
const WORKSHOP_PITCH_MOBILE = 104;
const WORKSHOP_COLUMNS_MOBILE = 3;
const HILL_PUSH = [440, 1120];
const HILL_CREW = [0.3, 0.42, 0.58, 0.7];
const HILL_CREW_MOBILE = [0.32, 0.68];
const SUN_CLICK = 780;
const HINT_CARRY = [1040, 1500];
const CREDIT_TYPE = [1180, 1620];
const CURSOR_ARRIVAL = 400;
const CURSOR_EXIT = 320;
const REVEAL = 110;
const FADE_IN = 60;
const GLIDE = "cubic-bezier(0.3, 0, 0.2, 1)";
const POP = "cubic-bezier(0.3, 1.5, 0.6, 1)";

type Tool = "arrow" | "ibeam" | "cross";

const svg = (body: string) => `<svg viewBox="0 0 24 24" width="24" height="24">${body}</svg>`;
const TWO_TONE = (d: string) =>
  `<path d="${d}" fill="none" stroke="#fff" stroke-width="4.5" stroke-linecap="round"/><path d="${d}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`;

const TOOLS: Record<Tool, string> = {
  arrow: svg(
    '<path d="M3 2v17l5-4 3.5 7 3-1.5-3.5-6.5 7-.5z" fill="currentColor" stroke="#fff" stroke-width="1.5" stroke-linejoin="round"/>',
  ),
  ibeam: svg(TWO_TONE("M12 5v14M8.5 4c2 0 3.5.5 3.5 2 0-1.5 1.5-2 3.5-2M8.5 20c2 0 3.5-.5 3.5-2 0 1.5 1.5 2 3.5 2")),
  cross: svg(TWO_TONE("M12 4v16M4 12h16")),
};

interface Point {
  x: number;
  y: number;
}

interface Box {
  left: number;
  top: number;
  width: number;
  height: number;
}

/** A moment on a cursor's path; `press` shrinks it slightly while in contact. */
interface Stop extends Point {
  at: number;
  press?: boolean;
  /** Easing of the segment leaving this stop, when it differs from the cursor's default. */
  ease?: string;
}

export interface SwarmEntrance {
  dispose: () => void;
}

const INERT: SwarmEntrance = { dispose: () => {} };

/** Lives as long as the page, so a refresh replays but client-side navigation back doesn't. */
let played = false;

/** Whether this page load should even consider playing. */
function isEligible(): boolean {
  if (typeof Element.prototype.animate !== "function") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  if (new URLSearchParams(window.location.search).has("app")) return false;
  if (document.visibilityState !== "visible") return false;
  const nav = navigator as Navigator & {
    connection?: { saveData?: boolean };
    deviceMemory?: number;
  };
  if (nav.connection?.saveData) return false;
  if (nav.hardwareConcurrency !== undefined && nav.hardwareConcurrency <= 2) return false;
  if (nav.deviceMemory !== undefined && nav.deviceMemory <= 2) return false;
  // A desktop reached by client-side navigation isn't a load of the landing page.
  const [load] = performance.getEntriesByType("navigation");
  if (load && new URL(load.name).pathname !== window.location.pathname) return false;
  return !played;
}

function isVisible(rect: DOMRect): boolean {
  return (
    rect.width > 0 &&
    rect.height > 0 &&
    rect.right > 0 &&
    rect.bottom > 0 &&
    rect.left < window.innerWidth &&
    rect.top < window.innerHeight
  );
}

function center(rect: Box): Point {
  return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
}

function translate({ x, y }: Point, scale = 1): string {
  return `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
}

function offset(at: number): number {
  return Math.min(1, Math.max(0, at / DURATION));
}

const HOME = translate({ x: 0, y: 0 });

/** Builds and plays the choreography. Every Animation it creates lands in `running`. */
function play(layer: HTMLElement, running: Animation[]): void {
  const viewport = { w: window.innerWidth, h: window.innerHeight };
  const mobile = viewport.w < MOBILE_WIDTH;
  const maxCursors = mobile ? MOBILE_CURSORS : DESKTOP_CURSORS;
  const origin = { x: viewport.w / 2, y: viewport.h / 2 };
  let cursorCount = 0;

  const animate = (el: Element, frames: Keyframe[]): void => {
    running.push(el.animate(frames, { duration: DURATION }));
  };

  const decor = (className: string, box: Box): HTMLElement => {
    const el = document.createElement("div");
    el.className = className;
    el.style.left = `${box.left}px`;
    el.style.top = `${box.top}px`;
    el.style.width = `${box.width}px`;
    el.style.height = `${box.height}px`;
    layer.append(el);
    return el;
  };

  /** Fly out of a ring around the boot title, work through the stops, then leave the screen. */
  const cursor = (stops: Stop[], easing: string, tool: Tool = "arrow"): void => {
    if (cursorCount >= maxCursors) return;
    const index = cursorCount++;
    const el = document.createElement("div");
    el.className = `os-swarm-cursor os-swarm-cursor--${tool}`;
    el.style.color = `var(--swarm-${(index % CURSOR_COLORS) + 1})`;
    el.innerHTML = TOOLS[tool];
    layer.append(el);

    const angle = (index / maxCursors) * Math.PI * 2 - Math.PI / 2;
    const radius = (mobile ? 90 : 130) + (index % 3) * (mobile ? 26 : 44);
    const start = {
      x: origin.x + Math.cos(angle) * radius,
      y: origin.y + Math.sin(angle) * radius,
    };
    const last = stops[stops.length - 1];
    const away = Math.hypot(last.x - origin.x, last.y - origin.y) || 1;
    const exit = {
      x: last.x + ((last.x - origin.x) / away) * 300,
      y: last.y + ((last.y - origin.y) / away) * 300,
    };
    const leave = Math.max(FADE_IN, stops[0].at - CURSOR_ARRIVAL);
    const exitStart = Math.max(last.at, Math.min(last.at + 30, DURATION - CURSOR_EXIT));

    animate(el, [
      { offset: 0, opacity: 0, transform: translate(start) },
      { offset: offset(FADE_IN), opacity: 1, transform: translate(start) },
      { offset: offset(leave), opacity: 1, transform: translate(start), easing: GLIDE },
      ...stops.map((stop) => ({
        offset: offset(stop.at),
        opacity: 1,
        transform: translate(stop, stop.press ? 0.86 : 1),
        easing: stop.ease ?? easing,
      })),
      { offset: offset(exitStart), opacity: 1, transform: translate(last), easing: "ease-in" },
      { offset: offset(exitStart + CURSOR_EXIT), opacity: 0, transform: translate(exit) },
      { offset: 1, opacity: 0, transform: translate(exit) },
    ]);
  };

  /** Hold invisible until `at`, then appear; optionally pop up from a smaller size. */
  const reveal = (el: Element, at: number, pop = false): void => {
    const from = pop ? "scale(0.4)" : "none";
    animate(el, [
      { offset: 0, opacity: 0, transform: from },
      { offset: offset(at), opacity: 0, transform: from, easing: pop ? POP : "ease-out" },
      { offset: offset(at + REVEAL * (pop ? 2 : 1)), opacity: 1, transform: "none" },
      { offset: 1, opacity: 1, transform: "none" },
    ]);
  };

  /** Draw a line or box from its origin by scaling it along with a cursor, then fade it. */
  const draw = (el: Element, from: string, to: string, [start, end]: number[], hold: number): void => {
    animate(el, [
      { offset: 0, opacity: 0, transform: from },
      { offset: offset(start - 1), opacity: 0, transform: from },
      { offset: offset(start), opacity: 1, transform: from, easing: "linear" },
      { offset: offset(end), opacity: 1, transform: to },
      { offset: offset(end + hold), opacity: 1, transform: to },
      { offset: offset(end + hold + 200), opacity: 0, transform: to },
      { offset: 1, opacity: 0, transform: to },
    ]);
  };

  const ripple = ({ x, y }: Point, at: number): void => {
    const size = 44;
    const el = decor("os-swarm-ripple", { left: x - size / 2, top: y - size / 2, width: size, height: size });
    animate(el, [
      { offset: 0, opacity: 0, transform: "scale(0.3)" },
      { offset: offset(at - 1), opacity: 0, transform: "scale(0.3)" },
      { offset: offset(at), opacity: 0.9, transform: "scale(0.3)", easing: "ease-out" },
      { offset: offset(at + 300), opacity: 0, transform: "scale(1.3)" },
      { offset: 1, opacity: 0, transform: "scale(1.3)" },
    ]);
  };

  /** One cursor sweeps a row of items, each appearing the moment it is reached. */
  const sweep = (items: Element[], from: number, to: number, tool: Tool, pop = false, caret = false): void => {
    const points = items.map((el) => ({ el, point: center(el.getBoundingClientRect()) }));
    if (points.length === 0) return;
    const first = points[0].point;
    const end = points[points.length - 1].point;
    const span = end.x - first.x || 1;
    for (const { el, point } of points) {
      reveal(el, from + ((point.x - first.x) / span) * (to - from), pop);
    }
    cursor(
      [
        { ...first, at: from, press: true },
        { ...end, at: to, press: true },
      ],
      "linear",
      tool,
    );
    if (caret) {
      const el = decor("os-swarm-caret", { left: 0, top: first.y - 9, width: 2, height: 18 });
      draw(el, `translateX(${first.x}px)`, `translateX(${end.x}px)`, [from, to], 60);
    }
  };

  /** Where item `index` of `count` sits in the workshop in the middle of the screen. */
  const workshopSlot = (index: number, count: number, row: number): Point => {
    if (mobile) {
      const inRow = Math.min(WORKSHOP_COLUMNS_MOBILE, count - (index - (index % WORKSHOP_COLUMNS_MOBILE)));
      return {
        x: origin.x + ((index % WORKSHOP_COLUMNS_MOBILE) - (inRow - 1) / 2) * WORKSHOP_PITCH_MOBILE,
        y: origin.y + (Math.floor(index / WORKSHOP_COLUMNS_MOBILE) - 1) * WORKSHOP_PITCH_MOBILE,
      };
    }
    return {
      x: origin.x + (index - (count - 1) / 2) * WORKSHOP_PITCH,
      y: origin.y - 60 + row * WORKSHOP_PITCH,
    };
  };

  /** Pop into being at the workshop slot, wait, then ride to home and bounce on landing. */
  const build = (el: Element, delta: Point, born: number, move: number, drop: number, pop: boolean): void => {
    const small = translate(delta, pop ? 0.4 : 1);
    const held = translate(delta);
    animate(el, [
      { offset: 0, opacity: 0, transform: small },
      { offset: offset(born), opacity: 0, transform: small, easing: pop ? POP : "ease-out" },
      { offset: offset(born + REVEAL * (pop ? 2 : 1)), opacity: 1, transform: held },
      { offset: offset(move), opacity: 1, transform: held, easing: GLIDE },
      { offset: offset(drop), opacity: 1, transform: HOME },
      { offset: offset(drop + 70), opacity: 1, transform: translate({ x: 0, y: 0 }, 1.1) },
      { offset: offset(drop + 170), opacity: 1, transform: HOME },
      { offset: 1, opacity: 1, transform: HOME },
    ]);
  };

  /** Built in the workshop by two cursors, who then haul the icon out to its place. */
  const buildIcon = (button: Element, index: number, all: Element[]): void => {
    const rect = button.getBoundingClientRect();
    if (!isVisible(rect)) return;
    const target = center(rect);
    const slot = workshopSlot(index, all.length, 0);
    const delta = { x: slot.x - target.x, y: slot.y - target.y };
    const birth = ICON_BIRTH + index * ICON_BIRTH_STAGGER;
    const move = ICON_MOVE + index * ICON_MOVE_STAGGER;
    const drop = move + ICON_DRAG;
    const [tile, ...rest] = Array.from(button.children);
    if (tile) build(tile, delta, birth + BUILD_BOX, move, drop, true);
    rest.forEach((child) => build(child, delta, birth + BUILD_BOX + BUILD_LABEL, move, drop, false));

    cursor(
      [
        { ...slot, at: birth + BUILD_BOX, press: true },
        { ...slot, at: move, press: true },
        { ...target, at: drop, press: true },
      ],
      GLIDE,
    );
    ripple(target, drop);
    if (mobile) return;

    const topLeft = { x: rect.left + delta.x, y: rect.top + delta.y };
    const bottomRight = { x: rect.right + delta.x, y: rect.bottom + delta.y };
    cursor(
      [
        { ...topLeft, at: birth, press: true, ease: "linear" },
        { ...bottomRight, at: birth + BUILD_BOX, press: true },
        { ...bottomRight, at: move, press: true },
        { x: rect.right, y: rect.bottom, at: drop, press: true },
      ],
      GLIDE,
      "cross",
    );
    const selection = decor("os-swarm-selection", rect);
    const label = document.createElement("span");
    label.textContent = `${Math.round(rect.width)} × ${Math.round(rect.height)}`;
    selection.append(label);
    const collapsed = translate(delta, 0.01);
    const held = translate(delta);
    animate(selection, [
      { offset: 0, opacity: 0, transform: collapsed },
      { offset: offset(birth - 1), opacity: 0, transform: collapsed },
      { offset: offset(birth), opacity: 1, transform: collapsed, easing: "linear" },
      { offset: offset(birth + BUILD_BOX), opacity: 1, transform: held },
      { offset: offset(move), opacity: 1, transform: held, easing: GLIDE },
      { offset: offset(drop), opacity: 1, transform: HOME },
      { offset: offset(drop + 120), opacity: 0, transform: HOME },
      { offset: 1, opacity: 0, transform: HOME },
    ]);
  };

  /** A copy of a dock tile is made in the workshop and flown down; the real tile pops in on landing. */
  const placeTile = (tile: Element, index: number, all: Element[]): void => {
    const rect = tile.getBoundingClientRect();
    if (!isVisible(rect)) return;
    const target = center(rect);
    const slot = workshopSlot(index, all.length, 1);
    const delta = { x: slot.x - target.x, y: slot.y - target.y };
    const birth = TILE_BIRTH + index * TILE_STAGGER;
    const move = TILE_MOVE + index * TILE_STAGGER;
    const drop = move + TILE_DRAG;
    const ghost = decor("os-swarm-ghost", rect);
    ghost.append(tile.cloneNode(true));
    const small = translate(delta, 0.4);
    const held = translate(delta);
    animate(ghost, [
      { offset: 0, opacity: 0, transform: small },
      { offset: offset(birth), opacity: 0, transform: small, easing: POP },
      { offset: offset(birth + REVEAL * 2), opacity: 1, transform: held },
      { offset: offset(move), opacity: 1, transform: held, easing: GLIDE },
      { offset: offset(drop), opacity: 1, transform: HOME },
      { offset: offset(drop + 1), opacity: 0, transform: HOME },
      { offset: 1, opacity: 0, transform: HOME },
    ]);
    reveal(tile, drop, true);
    cursor(
      [
        { ...slot, at: birth, press: true },
        { ...slot, at: move, press: true },
        { ...target, at: drop, press: true },
      ],
      GLIDE,
    );
    ripple(target, drop);
  };

  /** A crew spread along the hill's crest shoves it up from below the screen. */
  const pushHill = (): void => {
    const hill = document.querySelector(".os-hill");
    if (!hill) return;
    const rect = hill.getBoundingClientRect();
    const rise = viewport.h - rect.top;
    const [start, end] = HILL_PUSH;
    animate(hill, [
      { offset: 0, translate: `0 ${rise}px` },
      { offset: offset(start), translate: `0 ${rise}px`, easing: GLIDE },
      { offset: offset(end), translate: "0 0" },
      { offset: 1, translate: "0 0" },
    ]);
    for (const along of mobile ? HILL_CREW_MOBILE : HILL_CREW) {
      const x = rect.left + rect.width * along;
      const y = rect.top + rect.height * (1 - Math.sqrt(1 - (2 * along - 1) ** 2));
      cursor(
        [
          { x, y: y + rise, at: start, press: true },
          { x, y, at: end, press: true },
        ],
        GLIDE,
      );
    }
  };

  /** One click turns the sun and its light rays on. */
  const switchOnSun = (): void => {
    const sun = document.querySelector(".os-sun");
    if (!sun) return;
    const target = center(sun.getBoundingClientRect());
    document.querySelectorAll(".os-sun, .os-rays").forEach((el) => {
      animate(el, [
        { offset: 0, opacity: 0 },
        { offset: offset(SUN_CLICK), opacity: 0, easing: "ease-out" },
        { offset: offset(SUN_CLICK + 300), opacity: 1 },
        { offset: 1, opacity: 1 },
      ]);
    });
    cursor([{ ...target, at: SUN_CLICK, press: true }], GLIDE);
    ripple(target, SUN_CLICK);
  };

  /** A pair of cursors hauls the tip pill up into position. */
  const haulHint = (): void => {
    const hint = document.querySelector(".os-hint");
    if (!hint) return;
    const rect = hint.getBoundingClientRect();
    const rise = 70;
    const [start, end] = HINT_CARRY;
    animate(hint, [
      { offset: 0, opacity: 0, translate: `0 ${rise}px` },
      { offset: offset(start - REVEAL), opacity: 0, translate: `0 ${rise}px` },
      { offset: offset(start), opacity: 1, translate: `0 ${rise}px`, easing: GLIDE },
      { offset: offset(end), opacity: 1, translate: "0 0" },
      { offset: 1, opacity: 1, translate: "0 0" },
    ]);
    for (const x of [rect.left + 10, rect.right - 10]) {
      cursor(
        [
          { x, y: rect.bottom + rise, at: start, press: true },
          { x, y: rect.bottom, at: end, press: true },
        ],
        GLIDE,
      );
    }
  };

  /** An I-beam writes the footer credit. */
  const typeCredit = (): void => {
    const credit = document.querySelector(".os-desktop-credit");
    if (!credit) return;
    const rect = credit.getBoundingClientRect();
    if (!isVisible(rect)) return;
    const y = rect.top + rect.height / 2;
    const [start, end] = CREDIT_TYPE;
    reveal(credit, (start + end) / 2);
    cursor(
      [
        { x: rect.left, y, at: start },
        { x: rect.right, y, at: end },
      ],
      "linear",
      "ibeam",
    );
    draw(
      decor("os-swarm-caret", { left: 0, top: y - 8, width: 2, height: 16 }),
      `translateX(${rect.left}px)`,
      `translateX(${rect.right}px)`,
      CREDIT_TYPE,
      40,
    );
  };

  const icons = Array.from(document.querySelectorAll("[data-swarm-icon]"));
  const tiles = Array.from(document.querySelectorAll(".os-dock .os-tile"));

  // The glass menu bar and dock are costly to recomposite, so phones keep them static
  // and only their tiles join in.
  if (mobile) {
    icons.forEach(buildIcon);
    sweep(tiles, 900, 1400, "arrow", true);
    pushHill();
    return;
  }

  const header = document.querySelector(".os-menubar");
  if (header) {
    const bar = header.getBoundingClientRect();
    const items = Array.from(header.querySelectorAll("button, span"))
      .filter((el) => !el.parentElement?.closest("button"))
      .filter((el) => isVisible(el.getBoundingClientRect()));
    const isLeft = (el: Element) => center(el.getBoundingClientRect()).x < viewport.w / 2;
    reveal(header, 400);
    draw(
      decor("os-swarm-line os-swarm-line--bar", { left: 0, top: bar.bottom - 2, width: viewport.w, height: 2 }),
      "scaleX(0)",
      "scaleX(1)",
      BAR_DRAW,
      80,
    );
    cursor(
      [
        { x: 0, y: bar.bottom, at: BAR_DRAW[0], press: true },
        { x: viewport.w, y: bar.bottom, at: BAR_DRAW[1], press: true },
      ],
      "linear",
      "cross",
    );
    sweep(items.filter(isLeft), 400, 800, "ibeam", false, true);
    sweep(items.filter((el) => !isLeft(el)).reverse(), 460, 820, "arrow");
  }

  const firstIcon = icons[0]?.getBoundingClientRect();
  if (firstIcon) {
    const x = center(firstIcon).x;
    const height = viewport.h - firstIcon.top;
    draw(
      decor("os-swarm-line os-swarm-line--guide", { left: x, top: firstIcon.top, width: 1, height }),
      "scaleY(0)",
      "scaleY(1)",
      GUIDE_DRAW,
      600,
    );
    cursor(
      [
        { x, y: firstIcon.top, at: GUIDE_DRAW[0], press: true },
        { x, y: firstIcon.top + height * 0.9, at: GUIDE_DRAW[1], press: true },
      ],
      "linear",
      "cross",
    );
  }

  const dock = document.querySelector(".os-dock");
  if (dock) {
    const rect = dock.getBoundingClientRect();
    draw(decor("os-swarm-outline", rect), "scale(0.01)", "scale(1)", OUTLINE_DRAW, 120);
    cursor(
      [
        { x: rect.left, y: rect.top, at: OUTLINE_DRAW[0], press: true },
        { x: rect.right, y: rect.bottom, at: OUTLINE_DRAW[1], press: true },
      ],
      "linear",
      "cross",
    );
    reveal(dock, OUTLINE_DRAW[1] - 60);
  }

  pushHill();
  switchOnSun();
  haulHint();
  typeCredit();
  icons.forEach(buildIcon);
  tiles.forEach(placeTile);
}

/**
 * Arms the entrance to begin `startDelay` ms from now (the moment the boot
 * screen starts fading). Any input before then, a late start, a hidden tab, or a
 * failure means the visitor simply gets the finished page.
 */
export function armSwarmEntrance(startDelay: number): SwarmEntrance {
  if (!isEligible()) return INERT;

  const running: Animation[] = [];
  const listeners = new AbortController();
  let layer: HTMLElement | null = null;
  let longTasks: PerformanceObserver | null = null;
  let timer: number | undefined;

  const settle = (): void => {
    window.clearTimeout(timer);
    listeners.abort();
    longTasks?.disconnect();
    longTasks = null;
    running.splice(0).forEach((animation) => animation.cancel());
    layer?.remove();
    layer = null;
  };

  const interrupt = (): void => {
    played = true;
    settle();
  };

  const start = (scheduledAt: number): void => {
    played = true;
    if (performance.now() - scheduledAt > MAX_START_LATENESS) {
      settle();
      return;
    }
    try {
      layer = document.createElement("div");
      layer.className = "os-swarm";
      layer.setAttribute("aria-hidden", "true");
      document.body.append(layer);
      play(layer, running);
      timer = window.setTimeout(settle, DURATION);
      if (PerformanceObserver.supportedEntryTypes?.includes("longtask")) {
        longTasks = new PerformanceObserver((list) => {
          if (list.getEntries().some((task) => task.duration >= LONG_TASK_LIMIT)) settle();
        });
        longTasks.observe({ type: "longtask" });
      }
    } catch {
      settle();
    }
  };

  const options = { capture: true, passive: true, signal: listeners.signal };
  for (const type of ["pointerdown", "touchstart", "wheel", "keydown", "scroll"]) {
    window.addEventListener(type, interrupt, options);
  }
  // Leaving or reshaping the page ends playback.
  window.addEventListener("resize", settle, options);
  window.addEventListener("orientationchange", settle, options);
  window.addEventListener("pagehide", settle, options);
  document.addEventListener(
    "visibilitychange",
    () => {
      if (document.visibilityState !== "visible") settle();
    },
    options,
  );

  const scheduledAt = performance.now() + startDelay;
  timer = window.setTimeout(() => start(scheduledAt), startDelay);

  return { dispose: settle };
}
