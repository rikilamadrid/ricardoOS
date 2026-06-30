import type { Metadata } from "next";
import Link from "next/link";
import { Hanken_Grotesk, Quicksand } from "next/font/google";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/site";
import "./globals.css";

// UI workhorse — humanist, close to Frutiger / Segoe UI.
const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
});

// OS branding / window titles — rounded, bubbly, Aqua-era.
const quicksand = Quicksand({
  variable: "--font-brand",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: "%s",
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Default theme is day / light; the theme store toggles `.dark` after mount.
    <html
      lang="en"
      className={`${hankenGrotesk.variable} ${quicksand.variable} h-full antialiased`}
    >
      <body className="h-full overflow-hidden">
        <noscript>
          <div
            style={{
              maxWidth: "640px",
              margin: "0 auto",
              padding: "48px 24px",
              fontFamily: "system-ui, sans-serif",
              color: "#0a2540",
            }}
          >
            <h1 style={{ fontSize: "28px", margin: 0 }}>{SITE_NAME}</h1>
            <p style={{ fontSize: "16px", lineHeight: 1.6 }}>{SITE_DESCRIPTION}</p>
            <p style={{ fontSize: "16px", lineHeight: 1.6 }}>
              RicardoOS is the personal site of Ricardo Lamadrid, a full-stack
              senior software engineer. The interactive desktop needs JavaScript,
              but you can browse the crawlable pages directly:{" "}
              <Link href="/projects" style={{ color: "#1c8ce0" }}>
                Projects
              </Link>
              .
            </p>
          </div>
        </noscript>
        {children}
      </body>
    </html>
  );
}
