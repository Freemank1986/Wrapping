import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ShopForm } from "@/components/shop/shop-form";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Shop",
  description:
    "Custom wrapping paper and ribbon, made to order — pick it up locally or have it shipped.",
  path: "/shop",
});

export default function ShopPage() {
  return (
    <main className="py-24">
      <Container>
        <SectionHeading eyebrow="Shop" title="Custom Paper & Ribbon" />
        <div className="mx-auto mt-16 max-w-xl">
          <ShopForm />
        </div>
      </Container>
    </main>
  );
}
