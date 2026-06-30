import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Static export → ./out (deployable to Hostinger Single / any static host).
  output: "export",
  // Every route becomes a folder with index.html, which LiteSpeed/Apache serve
  // without rewrite rules.
  trailingSlash: true,
  // No server-side image optimizer in a static export (the app uses no
  // next/image today; this future-proofs it).
  images: { unoptimized: true },
};

export default nextConfig;
