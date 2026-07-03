import Link from "next/link";
import { Gift } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 font-serif text-lg font-semibold">
            <Gift className="h-5 w-5 text-accent" aria-hidden />
            Wrapt
          </div>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            The evening back, the presentation handled. Local gift wrapping for people who
            have better things to do than fight with tape.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Services</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link href="/pricing" className="hover:text-foreground">
                Pricing
              </Link>
            </li>
            <li>
              <Link href="/book" className="hover:text-foreground">
                Book a wrap
              </Link>
            </li>
            <li>
              <Link href="/workshops" className="hover:text-foreground">
                Workshops
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Business</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link href="/partners" className="hover:text-foreground">
                Boutique &amp; retail partners
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Account</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link href="/login" className="hover:text-foreground">
                Log in
              </Link>
            </li>
            <li>
              <Link href="/signup" className="hover:text-foreground">
                Create an account
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Wrapt. All gifts handled with care.
      </div>
    </footer>
  );
}
