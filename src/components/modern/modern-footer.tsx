import Link from "next/link";
import { LogoMark } from "@/components/brand/logo-mark";
import { BRAND } from "@/lib/brand";

const columns = [
  {
    title: "Services",
    links: [
      { href: "/pricing", label: "Pricing" },
      { href: "/book", label: "Book a wrap" },
      { href: "/workshops", label: "Workshops" },
    ],
  },
  {
    title: "Business",
    links: [{ href: "/partners", label: "Boutique & retail partners" }],
  },
  {
    title: "Account",
    links: [
      { href: "/login", label: "Log in" },
      { href: "/signup", label: "Create an account" },
    ],
  },
];

export function ModernFooter() {
  return (
    <footer className="border-t border-border bg-card/60">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <LogoMark id="modern-footer-bow" className="h-8 w-8" letterColor="var(--foreground)" />
            <span className="font-script text-3xl leading-none">{BRAND.name}</span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            {BRAND.tagline} — beautifully wrapped gifts without the tape, the tears, or the
            time.
          </p>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              {col.title}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-foreground/80 transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {BRAND.name}. All gifts handled with care.
      </div>
    </footer>
  );
}
