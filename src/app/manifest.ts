import type { MetadataRoute } from "next";
import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/site";

// Static export needs this metadata route pinned to static (same gotcha that
// hit the OG images, robots.ts, and sitemap.ts in phase 8).
export const dynamic = "force-static";

// Web app manifest so Android/Chrome "Add to Home Screen" uses the bubble-R tile
// and the "RicardoOS" name, launching standalone. iOS uses apple-icon.png +
// appleWebApp metadata (see layout.tsx).
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: SITE_NAME,
    description: SITE_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    // Aero tokens: glassy sky background + brand sky-top theme color.
    background_color: "#bfe3ff",
    theme_color: "#1e6fd9",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      {
        src: "/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
