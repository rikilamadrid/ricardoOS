import type { Metadata } from "next";
import { Hanken_Grotesk, Quicksand } from "next/font/google";
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
  title: "RicardoOS",
  description:
    "A personal site that behaves like a beautifully crafted operating system — glassy, alive, and fun to explore.",
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
      <body className="h-full overflow-hidden">{children}</body>
    </html>
  );
}
