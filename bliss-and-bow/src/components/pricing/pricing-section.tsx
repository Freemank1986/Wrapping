"use client";

import { useState } from "react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { BillingToggle } from "@/components/pricing/billing-toggle";
import { PricingCard } from "@/components/pricing/pricing-card";
import { pricingTiers, type BillingPeriod } from "@/lib/pricing-plans";

export function PricingSection() {
  const [billing, setBilling] = useState<BillingPeriod>("perGift");

  return (
    <section className="py-24">
      <Container>
        <SectionHeading eyebrow="Pricing" title="Wrapped to Your Liking" />

        <div className="mt-10 flex justify-center">
          <BillingToggle value={billing} onChange={setBilling} />
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3 md:items-start">
          {pricingTiers.map((tier, i) => (
            <PricingCard key={tier.id} tier={tier} billing={billing} index={i} />
          ))}
        </div>

        {billing === "perGift" && (
          <p className="mt-10 text-center text-xs text-charcoal/60">
            Standard-size boxes. Oversized items +$5–15 — we&apos;ll confirm
            before wrapping.
          </p>
        )}
      </Container>
    </section>
  );
}
