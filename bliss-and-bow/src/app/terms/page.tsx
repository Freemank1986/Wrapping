import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Service",
  description: "Terms of Service for Bliss & Bow Gift Wrapping Co.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" updated="July 5, 2026" placeholder={false}>
      <p>
        Welcome to Bliss &amp; Bow (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or
        &ldquo;our&rdquo;). These Terms of Service (&ldquo;Terms&rdquo;) govern
        your use of our website blissandbow.com, the gift-wrapping services we
        provide, and any products we sell. By placing an order, purchasing a
        product, or using our website, you agree to these Terms. If you do not
        agree, please do not use our website, services, or products.
      </p>

      <section>
        <h2 className="font-serif text-xl text-charcoal">1. Our Services and Products</h2>
        <p className="mt-3">
          Bliss &amp; Bow provides gift-wrapping services for customers in and
          around the St. Louis / University City area of Missouri. Services
          may include wrapping items you provide, materials and decorative
          accents, and optional local pickup or delivery.
        </p>
        <p className="mt-3">
          We may also offer physical products for sale, which may include
          wrapping paper, ribbon (including our own branded or logo ribbon),
          gift-wrapping kits, supplies, and pre-assembled or pre-wrapped gift
          items (&ldquo;Products&rdquo;). The specific services, products,
          tiers, and pricing are described on our website and are subject to
          change at any time.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-xl text-charcoal">2. Placing a Service Order</h2>
        <p className="mt-3">
          When you place a service order, you agree to provide accurate and
          complete information, including the items to be wrapped, your
          selected wrapping tier, delivery or pickup preference, the date you
          need the order completed, and your contact details.
        </p>
        <p className="mt-3">
          A service order is not confirmed until we accept it and, where
          applicable, payment or a deposit has been received. We reserve the
          right to decline any order at our discretion, including orders we
          cannot complete in the requested time frame.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-xl text-charcoal">3. Purchasing Products</h2>
        <p className="mt-3">
          When you purchase Products, you agree to provide accurate order and
          delivery information. A product order is confirmed once payment is
          received and we send an order confirmation. Title and risk of loss
          for Products pass to you upon delivery to the carrier or, for local
          pickup, when the Products are handed to you or your representative.
        </p>
        <p className="mt-3">
          We make reasonable efforts to display Products, colors, and details
          accurately, but we do not guarantee that your screen will show
          colors exactly as they appear in person. We may limit quantities,
          correct pricing or descriptive errors, and cancel or refuse any
          order, including after an order has been submitted, if an error is
          discovered. If we cancel a paid order for this reason, we will
          refund you in full.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-xl text-charcoal">4. Pricing and Payment</h2>
        <p className="mt-3">
          All prices for services and Products are listed on our website and
          may include per-item charges, package rates, product prices,
          shipping or delivery fees, and rush fees where applicable. Prices
          are subject to change, but the price quoted and confirmed at the
          time of your order will apply to that order.
        </p>
        <p className="mt-3">
          Payment is processed securely through our third-party payment
          provider, Stripe. We do not store your full payment card details.
          By providing payment, you authorize us to charge the total shown at
          checkout, including any applicable taxes and fees.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-xl text-charcoal">5. Taxes</h2>
        <p className="mt-3">
          Gift-wrapping labor and services are not subject to Missouri sales
          tax, and we do not charge sales tax on our wrapping services.
        </p>
        <p className="mt-3">
          Sales of tangible Products, including wrapping paper, ribbon, kits,
          supplies, and pre-assembled gift items, are subject to Missouri
          state and applicable local sales tax. Where required by law, sales
          tax on Products will be calculated based on our business location
          and shown at checkout. You are responsible for any applicable taxes
          on taxable Products.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-xl text-charcoal">6. Rush Orders</h2>
        <p className="mt-3">
          Service orders requested for completion within 24 hours are
          considered rush orders and are subject to an additional rush fee as
          shown at checkout or quoted to you. Rush orders are accepted only
          when we have capacity to complete them, and acceptance is confirmed
          by us in writing (including by email or text message).
        </p>
      </section>

      <section>
        <h2 className="font-serif text-xl text-charcoal">7. Pickup, Delivery, and Shipping</h2>
        <p className="mt-3">
          For services, you may drop off and pick up your items or, where
          offered, use our local pickup and delivery service for the
          applicable fee.
        </p>
        <p className="mt-3">
          For Products, we may offer local pickup, local delivery, or
          shipping. Shipping and delivery fees, methods, and estimated
          timeframes are shown at checkout or on our website. Delivery and
          shipping estimates are not guarantees. We are not responsible for
          delays caused by carriers, inaccurate address information, missed
          pickups, or circumstances beyond our reasonable control.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-xl text-charcoal">8. Your Items (Services)</h2>
        <p className="mt-3">
          You are responsible for delivering the items to be wrapped to us in
          good condition and for ensuring they are legal, safe to handle, and
          not prohibited. We are not responsible for the contents of items
          you provide. While we take reasonable care with your items, our
          liability for any loss or damage is limited as described in Section
          12.
        </p>
        <p className="mt-3">
          We reserve the right to decline to wrap any item we consider
          unsafe, excessively fragile, illegal, or otherwise inappropriate.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-xl text-charcoal">9. Service Cancellations and Refunds</h2>
        <p className="mt-3">
          You may cancel or change a service order up to 48 hours before the
          agreed completion or delivery date for a full refund of any amount
          paid, minus any non-refundable deposit or the cost of materials
          already used on your order.
        </p>
        <p className="mt-3">
          Because rush orders and custom work begin quickly, rush orders and
          orders already in progress may be non-refundable once work has
          started. If we are unable to complete your order, we will offer a
          full refund of amounts paid for the uncompleted work.
        </p>
        <p className="mt-3">
          Refunds are issued to your original payment method and may take
          several business days to process.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-xl text-charcoal">10. Product Returns and Refunds</h2>
        <p className="mt-3">
          Unused Products in their original condition and packaging may be
          returned within 14 days of delivery for a refund of the product
          price, excluding original shipping charges, unless the Product
          arrived damaged or defective or the return is due to our error.
          Return shipping costs are your responsibility unless the return is
          due to our error or a defective Product.
        </p>
        <p className="mt-3">
          Certain Products may be non-returnable for hygiene, safety, or
          customization reasons, including custom, personalized, or
          made-to-order items such as logo or branded ribbon produced
          specifically for you. Any such restrictions will be noted on the
          Product or at checkout.
        </p>
        <p className="mt-3">
          If a Product arrives damaged, defective, or incorrect, contact us
          within 7 days of delivery and we will arrange a replacement or
          refund at our discretion. Approved refunds are issued to your
          original payment method and may take several business days to
          process.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-xl text-charcoal">11. Satisfaction</h2>
        <p className="mt-3">
          We take pride in our work. If you are not satisfied with a
          completed service, please contact us within 3 days and we will work
          with you in good faith to make it right, which may include
          re-wrapping or a partial or full refund at our discretion.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-xl text-charcoal">12. Limitation of Liability</h2>
        <p className="mt-3">
          To the fullest extent permitted by law, our total liability for any
          claim arising out of or relating to our services, Products, or
          these Terms is limited to the amount you paid for the specific
          order or Product giving rise to the claim. We are not liable for
          indirect, incidental, or consequential damages. Nothing in these
          Terms limits liability that cannot be limited under applicable law,
          including any implied warranties that cannot be disclaimed.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-xl text-charcoal">13. Intellectual Property</h2>
        <p className="mt-3">
          All content on our website, including photographs of our work,
          product images, text, logos, and any branded designs such as logo
          ribbon or wrapping paper, is owned by Bliss &amp; Bow and may not be
          copied, reproduced, resold, or used without our permission.
          Purchasing a Product does not grant you any right to reproduce or
          commercially reuse our branded designs.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-xl text-charcoal">14. Governing Law</h2>
        <p className="mt-3">
          These Terms are governed by the laws of the State of Missouri,
          without regard to its conflict-of-law rules. Any dispute arising
          under these Terms will be handled in the state or county courts
          located in St. Louis County, Missouri.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-xl text-charcoal">15. Changes to These Terms</h2>
        <p className="mt-3">
          We may update these Terms from time to time. The updated version
          will be posted on this page with a revised &ldquo;Last
          updated&rdquo; date. Your continued use of our website, services,
          or Products after changes take effect constitutes acceptance of the
          updated Terms.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-xl text-charcoal">16. Contact Us</h2>
        <p className="mt-3">
          If you have any questions about these Terms, contact us at:
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
