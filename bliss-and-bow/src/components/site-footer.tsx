import Link from "next/link";
import { Container } from "@/components/ui/container";
import { ManageMembershipLink } from "@/components/manage-membership-link";

const linkClass =
  "text-xs uppercase tracking-wide text-charcoal/70 hover:text-burgundy hover:underline underline-offset-4";

export function SiteFooter() {
  return (
    <footer className="border-t border-gold/30 py-10">
      <Container>
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="font-serif text-lg text-charcoal">Bliss &amp; Bow</p>
          <ManageMembershipLink />
          <div className="flex gap-6">
            <Link href="/terms" className={linkClass}>
              Terms
            </Link>
            <Link href="/privacy" className={linkClass}>
              Privacy
            </Link>
          </div>
          <p className="text-xs text-charcoal/70">
            &copy; {new Date().getFullYear()} Bliss &amp; Bow Gift Wrapping Co.
          </p>
        </div>
      </Container>
    </footer>
  );
}
