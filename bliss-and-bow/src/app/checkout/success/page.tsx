import { Suspense } from "react";
import type { Metadata } from "next";
import { SuccessContent } from "@/components/checkout/success-content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "You're All Wrapped Up",
  description: "Your Bliss & Bow order is confirmed.",
  path: "/checkout/success",
  noIndex: true,
});

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={null}>
      <SuccessContent />
    </Suspense>
  );
}
