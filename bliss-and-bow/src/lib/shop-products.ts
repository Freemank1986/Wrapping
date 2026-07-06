export interface ShopProduct {
  id: string;
  name: string;
  description: string;
  unitLabel: string;
  // PLACEHOLDER pricing — replace with real prices before launch.
  priceCents: number;
}

export const shopProducts: ShopProduct[] = [
  {
    id: "custom-wrapping-paper",
    name: "Custom Wrapping Paper",
    description: "A full roll of our custom-printed wrapping paper, made to order.",
    unitLabel: "per roll",
    priceCents: 1800,
  },
  {
    id: "custom-ribbon",
    name: "Custom Ribbon",
    description: "A spool of our custom or branded ribbon, made to order.",
    unitLabel: "per spool",
    priceCents: 1200,
  },
];

export function getShopProduct(id: string): ShopProduct | undefined {
  return shopProducts.find((product) => product.id === id);
}

export function isValidProductId(id: unknown): id is string {
  return typeof id === "string" && shopProducts.some((product) => product.id === id);
}
