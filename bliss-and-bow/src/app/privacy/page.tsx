import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: "Privacy Policy for Bliss & Bow Gift Wrapping Co.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="July 5, 2026" placeholder={false}>
      <p>
        Bliss &amp; Bow (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or
        &ldquo;our&rdquo;) respects your privacy. This Privacy Policy explains
        what information we collect through our website blissandbow.com, how
        we use it, and your choices. It applies to both our gift-wrapping
        services and any products we sell. By using our website, placing an
        order, or purchasing a product, you agree to this Policy.
      </p>

      <section>
        <h2 className="font-serif text-xl text-charcoal">1. Information We Collect</h2>
        <p className="mt-3">
          We collect information you provide directly when you place a
          service order, purchase a product, or contact us. This may include
          your name, email address, phone number, billing address, delivery
          or shipping address, order and product details, and any messages
          you send us.
        </p>
        <p className="mt-3">
          When you make a payment, your payment card information is collected
          and processed directly by our third-party payment provider,
          Stripe. We do not receive or store your full card number.
        </p>
        <p className="mt-3">
          We may also automatically collect basic technical information when
          you visit our website, such as your device type, browser, and
          general usage data, through standard web tools and any analytics we
          use.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-xl text-charcoal">2. How We Use Your Information</h2>
        <p className="mt-3">We use your information to:</p>
        <ul className="mt-3 list-disc space-y-1 pl-5">
          <li>Process, prepare, and fulfill your service orders and product purchases</li>
          <li>Communicate with you about your order, including scheduling pickup, delivery, or shipping</li>
          <li>Handle returns, exchanges, and refunds</li>
          <li>Respond to your questions and requests</li>
          <li>Send you updates or promotions, only if you have agreed to receive them</li>
          <li>Improve our website, services, and products</li>
          <li>Meet our legal, tax, and accounting obligations</li>
        </ul>
      </section>

      <section>
        <h2 className="font-serif text-xl text-charcoal">3. How We Share Your Information</h2>
        <p className="mt-3">
          We do not sell your personal information. We share it only as
          needed to run our business, including with:
        </p>
        <ul className="mt-3 list-disc space-y-1 pl-5">
          <li>Our payment provider, Stripe, to process payments</li>
          <li>Shipping carriers and delivery services, to fulfill product orders</li>
          <li>Service providers who help us operate our website or business, under confidentiality obligations</li>
          <li>Authorities or others when required by law or to protect our rights</li>
        </ul>
      </section>

      <section>
        <h2 className="font-serif text-xl text-charcoal">4. Payment Security</h2>
        <p className="mt-3">
          Payments are handled by Stripe, which uses industry-standard
          security to protect your information. Because we do not store your
          full payment details, your card data is not held on our systems.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-xl text-charcoal">5. Data Retention</h2>
        <p className="mt-3">
          We keep your information only as long as needed to fulfill your
          orders, handle returns, meet legal and tax requirements, and
          resolve any disputes. When it is no longer needed, we take
          reasonable steps to delete or de-identify it.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-xl text-charcoal">6. Your Choices</h2>
        <p className="mt-3">You may:</p>
        <ul className="mt-3 list-disc space-y-1 pl-5">
          <li>Ask us what personal information we hold about you</li>
          <li>Ask us to correct or delete your information, subject to any legal record-keeping requirements</li>
          <li>Opt out of promotional messages at any time by contacting us or using the unsubscribe option</li>
        </ul>
        <p className="mt-3">
          To make any of these requests, contact us using the details below.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-xl text-charcoal">7. Cookies and Analytics</h2>
        <p className="mt-3">
          Our website may use cookies or similar technologies to help it
          function, remember items in your cart, and understand how visitors
          use it. You can usually control cookies through your browser
          settings. Disabling cookies may affect how parts of the website
          work, including checkout.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-xl text-charcoal">8. Children&rsquo;s Privacy</h2>
        <p className="mt-3">
          Our services and products are intended for adults. We do not
          knowingly collect personal information from children under 13. If
          you believe a child has provided us information, please contact us
          and we will delete it.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-xl text-charcoal">9. Third-Party Links</h2>
        <p className="mt-3">
          Our website may link to other sites, such as our payment provider,
          shipping carriers, or social media pages. We are not responsible
          for the privacy practices of those sites, and we encourage you to
          review their policies.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-xl text-charcoal">10. Changes to This Policy</h2>
        <p className="mt-3">
          We may update this Privacy Policy from time to time. The updated
          version will be posted on this page with a revised &ldquo;Last
          updated&rdquo; date.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-xl text-charcoal">11. Contact Us</h2>
        <p className="mt-3">
          If you have any questions about this Privacy Policy or your
          information, contact us at:
          <br />
          Bliss &amp; Bow
          <br />
          <a
            href="mailto:Blissandbowwrapco@gmail.com"
            className="text-burgundy underline underline-offset-2"
          >
            Blissandbowwrapco@gmail.com
          </a>
          <br />
          University City, Missouri
        </p>
      </section>
    </LegalPage>
  );
}
