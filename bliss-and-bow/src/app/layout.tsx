import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { PageTransition } from "@/components/page-transition";
import { SiteFooter } from "@/components/site-footer";
import { LocalBusinessJsonLd } from "@/components/local-business-jsonld";

const heading = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["500", "600", "700"],
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

// TODO: replace with the real production domain once one is registered —
// metadataBase resolves relative OG/Twitter image URLs into absolute ones.
export const metadata: Metadata = {
  metadataBase: new URL("https://blissandbow.com"),
  title: {
    default: "Bliss & Bow | Luxury Gift Wrapping Service Near You",
    template: "%s | Bliss & Bow",
  },
  description:
    "Bliss & Bow is your local gift-wrapping concierge — professional, beautifully wrapped gifts for birthdays, weddings, holidays, and corporate gifting. Drop off, ship, or schedule pickup.",
  keywords: [
    "gift wrapping service",
    "professional gift wrapper",
    "luxury gift wrapping",
    "holiday gift wrapping",
    "corporate gift wrapping",
    "wedding gift wrapping",
    "gift wrapping near me",
    "gift wrapping membership",
  ],
  openGraph: {
    title: "Bliss & Bow | Luxury Gift Wrapping Service Near You",
    description:
      "Professional, beautifully wrapped gifts for birthdays, weddings, holidays, and corporate gifting.",
    url: "/",
    siteName: "Bliss & Bow",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Bliss & Bow" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bliss & Bow | Luxury Gift Wrapping Service Near You",
    description:
      "Professional, beautifully wrapped gifts for birthdays, weddings, holidays, and corporate gifting.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${heading.variable} ${body.variable} bg-cream text-charcoal antialiased`}>
        <LocalBusinessJsonLd />
        <PageTransition>{children}</PageTransition>
        <SiteFooter />
      </body>
    </html>
  );
}
