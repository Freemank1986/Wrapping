import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

const base =
  "inline-flex items-center justify-center px-6 py-3 text-sm tracking-wide transition-colors duration-200";

const variants = {
  primary: "bg-gold text-charcoal hover:bg-gold/90",
  secondary:
    "border border-burgundy text-burgundy hover:bg-burgundy hover:text-cream",
};

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
