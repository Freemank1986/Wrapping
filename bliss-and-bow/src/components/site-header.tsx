"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

const links = [
  { href: "/pricing", label: "Pricing" },
  { href: "/shop", label: "Shop" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-gold/20 bg-cream/90 backdrop-blur">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="font-serif text-lg text-charcoal">
            Bliss &amp; Bow
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm tracking-wide transition-colors ${
                  pathname === link.href
                    ? "text-burgundy"
                    : "text-charcoal/70 hover:text-burgundy"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Button href="/book" variant="primary" className="px-5 py-2 text-xs">
              Book Now
            </Button>
          </nav>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="text-charcoal md:hidden"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {open && (
          <nav className="flex flex-col gap-1 border-t border-gold/20 py-4 md:hidden">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`px-2 py-2 text-sm tracking-wide ${
                  pathname === link.href ? "text-burgundy" : "text-charcoal/70"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/book"
              onClick={() => setOpen(false)}
              className={`px-2 py-2 text-sm tracking-wide ${
                pathname === "/book" ? "text-burgundy" : "text-charcoal/70"
              }`}
            >
              Book Now
            </Link>
          </nav>
        )}
      </Container>
    </header>
  );
}
