import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Checkout Canceled",
  description: "Your Bliss & Bow checkout was canceled — nothing was charged.",
  path: "/checkout/cancel",
  noIndex: true,
});

export default function CheckoutCancelPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 py-24 text-center">
      <h1 className="font-serif text-4xl font-semibold text-charcoal md:text-5xl">
        No charge made
      </h1>
      <p className="mt-4 max-w-md text-charcoal/80">
        Your checkout was canceled — nothing was charged. Whenever you&apos;re
        ready, your wrapping is waiting.
      </p>
      <div className="mt-10">
        <Button href="/pricing" variant="primary">
          Back to Pricing
        </Button>
      </div>
    </main>
  );
}
