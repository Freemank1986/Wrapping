import { Suspense } from "react";
import type { Metadata } from "next";
import { SuccessContent } from "@/components/checkout/success-content";

export const metadata: Metadata = {
  title: "You're All Wrapped Up — Bliss & Bow",
};

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={null}>
      <SuccessContent />
    </Suspense>
  );
}
