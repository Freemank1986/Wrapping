import type { Metadata } from "next";
import { AboutSection } from "@/components/about/about-section";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "Meet the hands behind Bliss & Bow — a local gift-wrapping studio devoted to ribbon, paper, and the art of a beautifully presented gift.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <main>
      <AboutSection />
    </main>
  );
}
