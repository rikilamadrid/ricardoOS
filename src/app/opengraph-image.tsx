import { SITE_DESCRIPTION } from "@/lib/site";
import { OG_SIZE, OG_CONTENT_TYPE, renderOgImage } from "@/lib/og";

// Prerender to a static PNG at build time (required for `output: export`).
export const dynamic = "force-static";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "RicardoOS — a personal site that behaves like an operating system";

export default function Image() {
  return renderOgImage({
    badge: "Portfolio",
    title: "RicardoOS",
    subtitle: SITE_DESCRIPTION,
  });
}
