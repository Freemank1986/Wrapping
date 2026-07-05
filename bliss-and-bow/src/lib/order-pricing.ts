import { pricingTiers } from "@/lib/pricing-plans";

export const RUSH_FEE_CENTS = 1500;
export const DELIVERY_FEE_CENTS = 1000;
export const MAX_QUANTITY = 50;

export type TierId = "essentials" | "signature" | "luxe";

export interface OrderSelections {
  tier: TierId;
  quantity: number;
  rush: boolean;
  delivery: boolean;
}

export function isValidTier(tier: unknown): tier is TierId {
  return tier === "essentials" || tier === "signature" || tier === "luxe";
}

export function getTierBaseCents(tier: TierId): number {
  const found = pricingTiers.find((t) => t.id === tier);
  if (!found) throw new Error(`Unknown tier: ${tier}`);
  return found.perGift.priceCents;
}

export function getTierName(tier: TierId): string {
  const found = pricingTiers.find((t) => t.id === tier);
  return found?.name ?? tier;
}

export function calculateOrderTotalCents(selections: OrderSelections): number {
  const base = getTierBaseCents(selections.tier) * selections.quantity;
  const rush = selections.rush ? RUSH_FEE_CENTS : 0;
  const delivery = selections.delivery ? DELIVERY_FEE_CENTS : 0;
  return base + rush + delivery;
}

export function formatCents(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}
