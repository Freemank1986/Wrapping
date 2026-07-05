import { Suspense } from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { BookForm } from "@/components/book/book-form";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Book Your Wrapping",
  description:
    "Tell us about your gift — tier, quantity, style preferences, and timing — and check out securely with Stripe.",
  path: "/book",
});

export default function BookPage() {
  return (
    <main className="py-24">
      <Container>
        <SectionHeading eyebrow="Book" title="Tell Us About Your Gift" />
        <div className="mx-auto mt-16 max-w-xl">
          <Suspense fallback={null}>
            <BookForm />
          </Suspense>
        </div>
      </Container>
    </main>
  );
}
