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
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <LogoMark className="h-8 w-8" letterColor="var(--primary-foreground)" />
            <span className="font-script text-3xl leading-none">{BRAND.name}</span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-primary-foreground/70">
            {BRAND.tagline} — beautifully wrapped gifts without the tape, the tears, or the
            time.
          </p>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground/50">
              {col.title}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-primary-foreground/80 transition-colors hover:text-primary-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-primary-foreground/10 py-5 text-center text-xs text-primary-foreground/60">
        © {new Date().getFullYear()} {BRAND.name}. All gifts handled with care.
      </div>
    </footer>
  );
}
