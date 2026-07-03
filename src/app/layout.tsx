import type { Metadata } from "next";
import { Fraunces, Inter, Manrope, Alex_Brush } from "next/font/google";
import { Toaster } from "sonner";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ModernHeader } from "@/components/modern/modern-header";
import { ModernFooter } from "@/components/modern/modern-footer";
import { GiftPageTransition } from "@/components/modern/gift-page-transition";
import { getTheme } from "@/lib/theme";
import { BRAND } from "@/lib/brand";
import "./globals.css";

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  axes: ["opsz"],
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

const modernSans = Manrope({
  variable: "--font-modern-sans",
  subsets: ["latin"],
});

const script = Alex_Brush({
  variable: "--font-script",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: `${BRAND.name} — ${BRAND.tagline}`,
  description:
    "Beautifully wrapped gifts without the tape, the tears, or the time. Schedule a pickup or delivery and get back the evening you were going to lose to wrapping paper.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = await getTheme();
  const isModern = theme === "modern";

  return (
    <html
      lang="en"
      data-theme={theme}
      className={`${display.variable} ${body.variable} ${modernSans.variable} ${script.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        {isModern ? <ModernHeader theme={theme} /> : <SiteHeader theme={theme} />}
        {isModern ? (
          <GiftPageTransition>
            <main className="flex-1 flex flex-col">{children}</main>
          </GiftPageTransition>
        ) : (
          <main className="flex-1 flex flex-col">{children}</main>
        )}
        {isModern ? <ModernFooter /> : <SiteFooter />}
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
