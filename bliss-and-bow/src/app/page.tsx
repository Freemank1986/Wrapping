import type { Metadata } from "next";
import { Hero } from "@/components/hero";
import { RibbonStrip } from "@/components/ribbon-strip";
import { HowItWorks } from "@/components/how-it-works";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Bliss & Bow | Luxury Gift Wrapping Service Near You",
  description:
    "Bliss & Bow is your local gift-wrapping concierge — professional, beautifully wrapped gifts for birthdays, weddings, holidays, and corporate gifting. Drop off, ship, or schedule pickup.",
  path: "/",
});

export default function Home() {
  return (
    <main>
      <Hero />
      <RibbonStrip />
      <HowItWorks />
    </main>
  );
}
