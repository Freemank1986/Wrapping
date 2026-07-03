import { requireUser } from "@/lib/dal";
import { getPricingConfig } from "@/lib/pricing-config";
import { BookingForm } from "./booking-form";

export const metadata = { title: "Book a Wrap — Wrapt" };

export default async function BookPage() {
  const user = await requireUser();
  const config = await getPricingConfig();

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <div className="mb-10">
        <h1 className="font-serif text-3xl font-semibold sm:text-4xl">Book your wrap</h1>
        <p className="mt-2 text-muted-foreground">
          A few quick questions — tier, timing, and where to send it. You&apos;ll review
          everything before it&apos;s submitted.
        </p>
      </div>
      <BookingForm
        config={{
          simplePricePerItem: config.simplePricePerItem,
          standardPricePerItem: config.standardPricePerItem,
          elaboratePricePerItem: config.elaboratePricePerItem,
          deliveryFee: config.deliveryFee,
          rushFee: config.rushFee,
          minimumOrder: config.minimumOrder,
          holidayBundlePrice: config.holidayBundlePrice,
          holidayBundleNote: config.holidayBundleNote,
        }}
        user={{ name: user.name, email: user.email, phone: user.phone ?? "" }}
      />
    </div>
  );
}
