import { requireAdmin } from "@/lib/dal";
import { getPricingConfig } from "@/lib/pricing-config";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PricingForm } from "./pricing-form";

export const metadata = { title: "Pricing — Bliss & Bow Admin" };

export default async function AdminPricingPage() {
  await requireAdmin();
  const config = await getPricingConfig();

  return (
    <Card className="max-w-3xl">
      <CardHeader>
        <CardTitle>Pricing</CardTitle>
        <CardDescription>
          Changes apply immediately to the public pricing page and the booking form.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <PricingForm
          initial={{
            simplePrice: config.simplePricePerItem / 100,
            standardPrice: config.standardPricePerItem / 100,
            elaboratePrice: config.elaboratePricePerItem / 100,
            deliveryFee: config.deliveryFee / 100,
            rushFee: config.rushFee / 100,
            minimumOrder: config.minimumOrder / 100,
            holidayBundlePrice: config.holidayBundlePrice / 100,
            holidayBundleNote: config.holidayBundleNote,
          }}
        />
      </CardContent>
    </Card>
  );
}
