import type { Metadata } from "next";
import { PricingSection } from "@/components/pricing/pricing-section";

export const metadata: Metadata = {
  title: "Pricing — Bliss & Bow",
  description: "Simple per-gift pricing or a monthly wrapping membership.",
};

export default function PricingPage() {
  return (
    <main className="pt-24">
      <PricingSection />
    </main>
  );
}
