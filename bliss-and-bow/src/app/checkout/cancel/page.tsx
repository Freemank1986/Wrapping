import type { Metadata } from "next";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Checkout Canceled — Bliss & Bow",
};

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
