// Pure pricing engine — no DB or framework imports so it can run on the
// client (live quote preview) and the server (authoritative order total)
// from the exact same code path.

export type Tier = "SIMPLE" | "STANDARD" | "ELABORATE" | "HOLIDAY_BUNDLE";
export type DeliveryType = "PICKUP" | "DELIVERY";

export const TIERS: { value: Tier; label: string; description: string }[] = [
  {
    value: "SIMPLE",
    label: "Simple",
    description: "Clean paper, ribbon, a gift tag. Fast and tidy.",
  },
  {
    value: "STANDARD",
    label: "Standard",
    description: "Coordinated paper + ribbon, bow, and finishing touches.",
  },
  {
    value: "ELABORATE",
    label: "Elaborate",
    description: "Statement presentation — layered textures, embellishments, the works.",
  },
  {
    value: "HOLIDAY_BUNDLE",
    label: "Holiday Bundle",
    description: "Your whole pile, wrapped as one flat-rate project.",
  },
];

/** All amounts in cents to avoid floating point drift. */
export type PricingConfigValues = {
  simplePricePerItem: number;
  standardPricePerItem: number;
  elaboratePricePerItem: number;
  deliveryFee: number;
  rushFee: number;
  minimumOrder: number;
  holidayBundlePrice: number;
  holidayBundleNote: string;
};

export type PriceQuoteInput = {
  tier: Tier;
  itemCount: number;
  deliveryType: DeliveryType;
  rush: boolean;
};

export type PriceQuote = {
  perItemPrice: number | null;
  rawSubtotal: number;
  subtotal: number;
  minimumApplied: boolean;
  deliveryFee: number;
  rushFee: number;
  total: number;
};

function perItemPriceForTier(config: PricingConfigValues, tier: Tier): number | null {
  switch (tier) {
    case "SIMPLE":
      return config.simplePricePerItem;
    case "STANDARD":
      return config.standardPricePerItem;
    case "ELABORATE":
      return config.elaboratePricePerItem;
    case "HOLIDAY_BUNDLE":
      return null;
  }
}

export function calculateOrderPrice(
  config: PricingConfigValues,
  input: PriceQuoteInput,
): PriceQuote {
  const itemCount = Math.max(0, Math.floor(input.itemCount || 0));
  const perItemPrice = perItemPriceForTier(config, input.tier);

  const rawSubtotal =
    input.tier === "HOLIDAY_BUNDLE"
      ? config.holidayBundlePrice
      : (perItemPrice ?? 0) * itemCount;

  const minimumApplies = input.tier !== "HOLIDAY_BUNDLE" && rawSubtotal < config.minimumOrder;
  const subtotal = minimumApplies ? config.minimumOrder : rawSubtotal;

  const deliveryFee = input.deliveryType === "DELIVERY" ? config.deliveryFee : 0;
  const rushFee = input.rush ? config.rushFee : 0;

  return {
    perItemPrice,
    rawSubtotal,
    subtotal,
    minimumApplied: minimumApplies,
    deliveryFee,
    rushFee,
    total: subtotal + deliveryFee + rushFee,
  };
}

export function formatCents(cents: number): string {
  return (cents / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: cents % 100 === 0 ? 0 : 2,
  });
}

export function tierLabel(tier: Tier): string {
  return TIERS.find((t) => t.value === tier)?.label ?? tier;
}
