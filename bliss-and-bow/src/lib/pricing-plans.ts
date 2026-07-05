export type BillingPeriod = "perGift" | "monthly";

export interface PricingTier {
  id: "essentials" | "signature" | "luxe";
  name: string;
  featured?: boolean;
  perGift: {
    price: string;
    priceCents: number;
    features: string[];
  };
  monthly: {
    price: string;
    priceId: string;
    features: string[];
  };
}

// Monthly membership Price IDs are real (from the Stripe test-mode Product
// catalog). Per-gift orders don't use a Price ID at all — /book computes
// pricing dynamically from priceCents below (see lib/order-pricing.ts).
export const pricingTiers: PricingTier[] = [
  {
    id: "essentials",
    name: "Essentials",
    perGift: {
      price: "$15/gift",
      priceCents: 1500,
      features: [
        "Quality wrapping paper",
        "Coordinated ribbon",
        "Simple bow",
        "Handwritten gift tag",
      ],
    },
    monthly: {
      price: "$39/month",
      priceId: "price_1TpxLQJaFSugmQmrNAsVl098",
      features: [
        "3 Essentials wraps per month (a $45 value)",
        "Unused wraps roll over one month",
      ],
    },
  },
  {
    id: "signature",
    name: "Signature",
    featured: true,
    perGift: {
      price: "$28/gift",
      priceCents: 2800,
      features: [
        "Premium paper",
        "Satin or velvet ribbon",
        "Handmade bow",
        "One embellishment (dried florals or wax seal)",
        "Handwritten gift tag",
      ],
    },
    monthly: {
      price: "$75/month",
      priceId: "price_1TpxLtJaFSugmQmr35jeKC22",
      features: [
        "3 Signature wraps per month (an $84 value)",
        "Priority scheduling",
        "Rollover one month",
      ],
    },
  },
  {
    id: "luxe",
    name: "Luxe",
    perGift: {
      price: "$50/gift",
      priceCents: 5000,
      features: [
        "Designer paper or fabric wrap",
        "Layered luxe ribbon",
        "Statement bow",
        "Custom embellishments",
        "Presentation box option",
        "Handwritten gift tag",
      ],
    },
    monthly: {
      price: "$129/month",
      priceId: "price_1TpxMLJaFSugmQmrKLcQukfV",
      features: [
        "3 Luxe wraps per month (a $150 value)",
        "Free pickup & delivery",
        "Gift-date reminders",
        "Rollover one month",
      ],
    },
  },
];
