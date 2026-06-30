import { ImageResponse } from "next/og";

/** Shared dimensions/content-type for every generated Open Graph image. */
export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

/**
 * Renders a Frutiger-Aero Open Graph card (1200×630). Used by the
 * `opengraph-image` files for the desktop, project, and writing pages.
 * Satori (next/og) needs explicit `display: flex` on multi-child nodes and
 * inline styles only — no Tailwind, no external fonts.
 */
export function renderOgImage({
  title,
  subtitle,
  badge,
}: {
  title: string;
  subtitle?: string;
  badge: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          color: "#0a2540",
          backgroundImage:
            "radial-gradient(120% 90% at 80% -10%, rgba(255,255,255,0.95), rgba(255,255,255,0) 45%), radial-gradient(120% 90% at 10% 120%, rgba(126,217,87,0.5), rgba(126,217,87,0) 55%), linear-gradient(160deg, #4fa8f5 0%, #bfe3ff 60%, #eaf7ff 100%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: "30px",
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            Ricardo<span style={{ color: "#1c8ce0" }}>OS</span>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "20px",
              fontWeight: 600,
              padding: "6px 16px",
              borderRadius: "999px",
              background: "rgba(255,255,255,0.55)",
              color: "#1c8ce0",
            }}
          >
            {badge}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div
            style={{
              display: "flex",
              fontSize: "70px",
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            {title}
          </div>
          {subtitle ? (
            <div
              style={{
                display: "flex",
                fontSize: "30px",
                color: "#41607e",
                lineHeight: 1.3,
              }}
            >
              {subtitle}
            </div>
          ) : null}
        </div>
      </div>
    ),
    { ...OG_SIZE },
  );
}
