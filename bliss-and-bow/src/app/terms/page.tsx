import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Service",
  description: "Terms of Service for Bliss & Bow Gift Wrapping Co.",
  path: "/terms",
  noIndex: true,
});

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" updated="[DATE — placeholder]">
      <section>
        <h2 className="font-serif text-xl text-charcoal">1. Acceptance of Terms</h2>
        <p className="mt-3">
          By booking a wrapping order, scheduling a membership, or otherwise
          using the services of Bliss &amp; Bow Gift Wrapping Co.
          (&ldquo;Bliss &amp; Bow,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;),
          you agree to these Terms of Service. If you do not agree, please
          do not use our services.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-xl text-charcoal">2. Services</h2>
        <p className="mt-3">
          Bliss &amp; Bow provides gift-wrapping services on a per-item and
          membership basis, as described on our Pricing page. Pricing,
          tiers, and features are subject to change; the pricing in effect
          at the time of your order applies to that order.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-xl text-charcoal">3. Payments &amp; Memberships</h2>
        <p className="mt-3">
          Payments are processed securely through Stripe. Monthly
          memberships renew automatically until canceled; you can manage or
          cancel your membership at any time via the &ldquo;Manage
          membership&rdquo; link in the site footer, which opens Stripe&apos;s
          billing portal.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-xl text-charcoal">4. Drop-Off, Delivery &amp; Item Care</h2>
        <p className="mt-3">
          You are responsible for describing the items you bring or ship to
          us accurately, including size and fragility. While we handle every
          item with care, Bliss &amp; Bow&apos;s liability for loss or damage
          to items in our possession is limited as described in a section
          to be drafted by counsel.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-xl text-charcoal">5. Cancellations &amp; Refunds</h2>
        <p className="mt-3">
          [Placeholder — describe your actual cancellation window, refund
          eligibility for per-gift orders, and membership cancellation/
          rollover policy here.]
        </p>
      </section>

      <section>
        <h2 className="font-serif text-xl text-charcoal">6. Limitation of Liability</h2>
        <p className="mt-3">
          [Placeholder — standard limitation-of-liability language to be
          drafted by counsel.]
        </p>
      </section>

      <section>
        <h2 className="font-serif text-xl text-charcoal">7. Governing Law</h2>
        <p className="mt-3">
          [Placeholder — specify the state/jurisdiction whose laws govern
          these terms.]
        </p>
      </section>

      <section>
        <h2 className="font-serif text-xl text-charcoal">8. Changes to These Terms</h2>
        <p className="mt-3">
          We may update these terms from time to time. Continued use of our
          services after changes take effect constitutes acceptance of the
          revised terms.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-xl text-charcoal">9. Contact</h2>
        <p className="mt-3">
          Questions about these terms can be sent through our{" "}
          <a href="/contact" className="text-burgundy underline underline-offset-2">
            Contact page
          </a>
          .
        </p>
      </section>
    </LegalPage>
  );
}
