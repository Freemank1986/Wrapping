export type BillingPeriod = "perGift" | "monthly";

export interface PricingTier {
  id: "essentials" | "signature" | "luxe";
  name: string;
  featured?: boolean;
  perGift: {
    price: string;
    priceId: string;
    features: string[];
  };
  monthly: {
    price: string;
    priceId: string;
    features: string[];
  };
}

// Placeholder Stripe Price IDs — replace with the real IDs from the
// Stripe dashboard before going live. Price IDs aren't secret, so it's
// fine for them to live here rather than in an env var.
export const pricingTiers: PricingTier[] = [
  {
    id: "essentials",
    name: "Essentials",
    perGift: {
      price: "$15/gift",
      priceId: "price_essentials_onetime",
      features: [
        "Quality wrapping paper",
        "Coordinated ribbon",
        "Simple bow",
        "Handwritten gift tag",
      ],
    },
    monthly: {
      price: "$39/month",
      priceId: "price_essentials_monthly",
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
      priceId: "price_signature_onetime",
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
      priceId: "price_signature_monthly",
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
      priceId: "price_luxe_onetime",
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
      priceId: "price_luxe_monthly",
      features: [
        "3 Luxe wraps per month (a $150 value)",
        "Free pickup & delivery",
        "Gift-date reminders",
        "Rollover one month",
      ],
    },
  },
];
