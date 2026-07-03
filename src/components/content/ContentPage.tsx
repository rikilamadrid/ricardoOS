"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useReducedMotion } from "motion/react";
import { FooterCredit } from "@/components/os/FooterCredit";

/**
 * Full-screen, scrollable shell for the standalone content pages
 * (`/projects`, `/projects/[slug]`, and later `/writing`). The root layout
 * locks `<body>` to `overflow-hidden` for the desktop, so each page mounts its
 * own `fixed inset-0` scroll container. A soft Framer-Motion entrance gives the
 * desktop → page transition; reduced motion drops it to an instant fade.
 */
export function ContentPage({
  children,
  back = { href: "/", label: "← Back to RicardoOS" },
}: {
  children: React.ReactNode;
  back?: { href: string; label: string };
}) {
  const reduce = useReducedMotion();

  return (
    <div className="content-page fixed inset-0 overflow-y-auto overscroll-contain">
      <motion.main
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10, filter: "blur(8px)" }}
        animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: reduce ? 0.2 : 0.42, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto w-full max-w-[760px] px-5 py-10 sm:px-8 sm:py-16"
      >
        <Link href={back.href} className="content-back">
          {back.label}
        </Link>
        {children}
      </motion.main>
      <FooterCredit className="fixed bottom-4 right-4 z-[7000]" />
    </div>
  );
}
