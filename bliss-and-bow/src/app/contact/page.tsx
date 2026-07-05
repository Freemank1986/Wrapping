import type { Metadata } from "next";
import { MapPin, Phone, Clock } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ContactForm } from "@/components/contact/contact-form";
import { pageMetadata } from "@/lib/seo";
import { businessInfo, formatHoursSummary } from "@/lib/business-info";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Get in touch with Bliss & Bow for birthdays, weddings, holidays, and corporate gifting inquiries. We typically reply within one business day.",
  path: "/contact",
});

export default function ContactPage() {
  const { address, telephone } = businessInfo;

  return (
    <main className="py-24">
      <Container>
        <SectionHeading eyebrow="Get in Touch" title="Let's Talk Wrapping" />
        <div className="mx-auto mt-16 max-w-xl space-y-10">
          <div className="grid gap-4 border border-gold/30 bg-white/60 p-6 text-sm text-charcoal/80 sm:grid-cols-3">
            <div className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.5} />
              <span>
                {address.streetAddress}
                <br />
                {address.addressLocality}, {address.addressRegion} {address.postalCode}
              </span>
            </div>
            <div className="flex items-start gap-2">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.5} />
              <a href={`tel:${telephone.replace(/[^\d+]/g, "")}`} className="hover:text-burgundy">
                {telephone}
              </a>
            </div>
            <div className="flex items-start gap-2">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.5} />
              <span>{formatHoursSummary()}</span>
            </div>
          </div>

          <ContactForm />
        </div>
      </Container>
    </main>
  );
}
