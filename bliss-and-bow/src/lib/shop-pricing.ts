import { getShopProduct } from "@/lib/shop-products";

// PLACEHOLDER flat local shipping rate — replace with real carrier cost.
export const SHIPPING_FEE_CENTS = 800;
export const MAX_QUANTITY_PER_ITEM = 20;

export type FulfillmentMethod = "pickup" | "shipping";

export interface ShopLineSelection {
  productId: string;
  quantity: number;
}

export function calculateShopSubtotalCents(items: ShopLineSelection[]): number {
  return items.reduce((sum, item) => {
    const product = getShopProduct(item.productId);
    if (!product) return sum;
    return sum + product.priceCents * item.quantity;
  }, 0);
}

export function formatCents(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}
