import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import Link from "next/link";

type Variant = "primary" | "secondary";

const base =
  "inline-flex items-center justify-center px-6 py-3 text-sm tracking-wide transition-colors duration-200";

const variants: Record<Variant, string> = {
  primary: "bg-gold text-charcoal hover:bg-gold/90",
  secondary:
    "border border-burgundy text-burgundy hover:bg-burgundy hover:text-cream",
};

type ButtonAsButton = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  href?: never;
};

type ButtonAsLink = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant;
  href: string;
};

type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button({ variant = "primary", className = "", ...rest }: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${className}`;

  if ("href" in rest && rest.href) {
    const linkProps = rest as AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
    return <Link className={classes} {...linkProps} />;
  }

  return <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)} />;
}
