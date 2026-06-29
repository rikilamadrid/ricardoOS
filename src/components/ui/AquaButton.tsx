import {
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

type AquaVariant = "default" | "primary" | "ghost";

interface Common {
  variant?: AquaVariant;
  className?: string;
  children?: ReactNode;
}

type AquaButtonProps =
  | (Common & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined })
  | (Common & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string });

/**
 * Reusable aqua-gel button — pill shape, vertical gradient, top gloss
 * highlight, inner light + soft drop shadow. Ported from the prototype's
 * `.gel` button. Renders an anchor when `href` is set (downloads / links),
 * otherwise a button. Used across About, Projects, Contact, and Résumé.
 */
export function AquaButton({ variant = "default", className, ...props }: AquaButtonProps) {
  const classes = cn(
    "os-gel",
    variant === "primary" && "os-gel--primary",
    variant === "ghost" && "os-gel--ghost",
    className,
  );

  if ("href" in props && props.href !== undefined) {
    return <a className={classes} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)} />;
  }

  const { type = "button", ...rest } = props as ButtonHTMLAttributes<HTMLButtonElement>;
  return <button type={type} className={classes} {...rest} />;
}
