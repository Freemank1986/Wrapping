import Link from "next/link";
import { CheckCircle2, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getPricingConfig } from "@/lib/pricing-config";
import { formatCents } from "@/lib/pricing";

export const metadata = { title: "Pricing — Bliss & Bow" };

export default async function PricingPage() {
  const config = await getPricingConfig();

  const tierRows = [
    {
      name: "Simple",
      price: config.simplePricePerItem,
      description: "Clean paper, ribbon, a gift tag.",
      features: ["Coordinated paper", "Ribbon finish", "Gift tag"],
    },
    {
      name: "Standard",
      price: config.standardPricePerItem,
      description: "Our most popular — coordinated and finished.",
      features: ["Premium paper + ribbon", "Bow or embellishment", "Gift tag", "Corners you won't wince at"],
      featured: true,
    },
    {
      name: "Elaborate",
      price: config.elaboratePricePerItem,
      description: "Statement presentation for gifts that need to impress.",
      features: ["Layered textures", "Designer embellishments", "Premium ribbon & bow", "Gift tag", "Photo-ready finish"],
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="font-serif text-4xl font-semibold">Pricing</h1>
        <p className="mt-3 text-muted-foreground">
          Priced per item by presentation level, not by materials. A beautifully wrapped
          gift is worth more than the paper it&apos;s made of — that&apos;s what
          you&apos;re paying for.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {tierRows.map((tier) => (
          <Card key={tier.name} className={tier.featured ? "border-accent shadow-md" : ""}>
            <CardHeader>
              {tier.featured && (
                <Badge variant="accent" className="mb-2 w-fit">
                  Most popular
                </Badge>
              )}
              <CardTitle>{tier.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{tier.description}</p>
            </CardHeader>
            <CardContent>
              <p className="font-serif text-3xl font-semibold">
                {formatCents(tier.price)}
                <span className="text-base font-normal text-muted-foreground"> / item</span>
              </p>
              <ul className="mt-6 space-y-2 text-sm">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button className="mt-6 w-full" asChild>
                <Link href="/book">Book this tier</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Card>
          <CardContent className="flex items-start gap-4 pt-6">
            <Info className="mt-1 h-5 w-5 shrink-0 text-accent" />
            <div>
              <h3 className="font-serif text-lg font-semibold">Minimum order: {formatCents(config.minimumOrder)}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Every order has a {formatCents(config.minimumOrder)}{" "}
                minimum. A single small item still takes setup, materials, and care — the
                minimum makes sure it&apos;s worth doing right.
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-serif text-lg font-semibold">Fees</h3>
            <dl className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Pickup &amp; delivery</dt>
                <dd className="font-medium">+{formatCents(config.deliveryFee)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Rush turnaround</dt>
                <dd className="font-medium">+{formatCents(config.rushFee)}</dd>
              </div>
            </dl>
            <p className="mt-3 text-xs text-muted-foreground">
              Drop off and pick up yourself and the delivery fee doesn&apos;t apply. Need it
              back faster than our standard turnaround? Add rush — we&apos;ll confirm we can
              hit your date before anything is booked.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8 border-accent bg-secondary/40">
        <CardContent className="flex flex-col items-start gap-6 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Badge variant="accent" className="mb-2">
              Flat rate
            </Badge>
            <h3 className="font-serif text-2xl font-semibold">Holiday Bundle — {formatCents(config.holidayBundlePrice)}</h3>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">{config.holidayBundleNote}</p>
          </div>
          <Button size="lg" asChild>
            <Link href="/book">Book the bundle</Link>
          </Button>
        </CardContent>
      </Card>

      <div className="mt-12 text-center">
        <h2 className="font-serif text-2xl font-semibold">Bringing a big pile?</h2>
        <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
          If you&apos;re not sure whether per-item or the Holiday Bundle makes more sense,
          just start the booking — we&apos;ll show you both before you confirm anything.
        </p>
        <Button size="lg" variant="outline" className="mt-6" asChild>
          <Link href="/book">Start your order</Link>
        </Button>
      </div>
    </div>
  );
}
