import { Suspense } from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { OrderLookupForm } from "@/components/order-lookup/order-lookup-form";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Order Lookup",
  description: "Look up the status of a Bliss & Bow order or booking.",
  path: "/order-lookup",
  noIndex: true,
});

export default function OrderLookupPage() {
  return (
    <main className="py-24">
      <Container>
        <SectionHeading eyebrow="Orders" title="Look Up Your Order" />
        <div className="mx-auto mt-16 max-w-md">
          <Suspense fallback={null}>
            <OrderLookupForm />
          </Suspense>
        </div>
      </Container>
    </main>
  );
}
