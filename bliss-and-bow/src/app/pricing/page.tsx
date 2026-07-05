import type { Metadata } from "next";
import { PricingSection } from "@/components/pricing/pricing-section";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Pricing",
  description:
    "Simple per-gift pricing or a monthly wrapping membership — Essentials, Signature, and Luxe tiers for every occasion. Transparent gift-wrapping rates, no surprises.",
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <main className="pt-24">
      <PricingSection />
    </main>
  );
}
