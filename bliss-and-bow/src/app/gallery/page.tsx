import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { GalleryGrid } from "@/components/gallery/gallery-grid";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Gallery",
  description:
    "Browse our gift-wrapping portfolio — ribbon work, bows, and presentation styles from real orders. See the craft before you book your local gift wrapper.",
  path: "/gallery",
});

export default function GalleryPage() {
  return (
    <main className="py-24">
      <Container>
        <SectionHeading eyebrow="Gallery" title="The Craft, Up Close" />
        <div className="mt-16">
          <GalleryGrid />
        </div>
      </Container>
    </main>
  );
}
