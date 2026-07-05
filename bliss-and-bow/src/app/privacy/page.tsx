import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: "Privacy Policy for Bliss & Bow Gift Wrapping Co.",
  path: "/privacy",
  noIndex: true,
});

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="[DATE — placeholder]">
      <section>
        <h2 className="font-serif text-xl text-charcoal">1. Information We Collect</h2>
        <p className="mt-3">
          When you place an order, join a membership, or contact us, we
          collect information you provide directly — such as your name,
          email address, and message content — plus payment and billing
          details processed by Stripe on our behalf. We do not store full
          payment card numbers ourselves.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-xl text-charcoal">2. How We Use It</h2>
        <p className="mt-3">
          We use this information to fulfill orders, manage memberships,
          respond to inquiries, and send order-related communications (such
          as receipts and drop-off reminders). [Placeholder — add marketing-
          communications language here if you plan to send newsletters or
          promotions, along with an opt-out mechanism.]
        </p>
      </section>

      <section>
        <h2 className="font-serif text-xl text-charcoal">3. Third-Party Services</h2>
        <p className="mt-3">
          Payments and subscription billing are handled by Stripe, Inc.,
          which processes and stores payment information under its own
          privacy policy. [Placeholder — list any other third-party tools
          you use, such as analytics or email providers, once decided.]
        </p>
      </section>

      <section>
        <h2 className="font-serif text-xl text-charcoal">4. Cookies</h2>
        <p className="mt-3">
          We use a small, non-tracking cookie to remember which Stripe
          customer record belongs to your browser, so the &ldquo;Manage
          membership&rdquo; link works without requiring a separate login.
          [Placeholder — disclose any additional cookies/analytics once
          added.]
        </p>
      </section>

      <section>
        <h2 className="font-serif text-xl text-charcoal">5. Data Retention</h2>
        <p className="mt-3">
          [Placeholder — describe how long order, contact-form, and payment
          records are retained.]
        </p>
      </section>

      <section>
        <h2 className="font-serif text-xl text-charcoal">6. Your Rights</h2>
        <p className="mt-3">
          [Placeholder — describe applicable rights to access, correct, or
          delete personal information, based on where your customers are
          located (e.g., CCPA, GDPR) and reviewed by counsel.]
        </p>
      </section>

      <section>
        <h2 className="font-serif text-xl text-charcoal">7. Changes to This Policy</h2>
        <p className="mt-3">
          We may update this policy from time to time; the &ldquo;last
          updated&rdquo; date above will reflect the most recent revision.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-xl text-charcoal">8. Contact</h2>
        <p className="mt-3">
          Questions about this policy can be sent through our{" "}
          <a href="/contact" className="text-burgundy underline underline-offset-2">
            Contact page
          </a>
          .
        </p>
      </section>
    </LegalPage>
  );
}
