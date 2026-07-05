import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ContactForm } from "@/components/contact/contact-form";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Get in touch with Bliss & Bow for birthdays, weddings, holidays, and corporate gifting inquiries. We typically reply within one business day.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <main className="py-24">
      <Container>
        <SectionHeading eyebrow="Get in Touch" title="Let's Talk Wrapping" />
        <div className="mx-auto mt-16 max-w-xl">
          <ContactForm />
        </div>
      </Container>
    </main>
  );
}
