import { Container } from "@/components/ui/container";
import { ManageMembershipLink } from "@/components/manage-membership-link";

export function SiteFooter() {
  return (
    <footer className="border-t border-gold/30 py-10">
      <Container>
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="font-serif text-lg text-charcoal">Bliss &amp; Bow</p>
          <ManageMembershipLink />
          <p className="text-xs text-charcoal/50">
            &copy; {new Date().getFullYear()} Bliss &amp; Bow Gift Wrapping Co.
          </p>
        </div>
      </Container>
    </footer>
  );
}
