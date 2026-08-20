import { describe, expect, it } from "vitest";
import {
  DELIVERY_FEE_CENTS,
  RUSH_FEE_CENTS,
  calculateOrderTotalCents,
  formatCents,
  getTierBaseCents,
  getTierName,
  isValidTier,
} from "./order-pricing";

describe("isValidTier", () => {
  it("accepts known tiers", () => {
    expect(isValidTier("essentials")).toBe(true);
    expect(isValidTier("signature")).toBe(true);
    expect(isValidTier("luxe")).toBe(true);
  });

  it("rejects unknown values", () => {
    expect(isValidTier("deluxe")).toBe(false);
    expect(isValidTier(undefined)).toBe(false);
    expect(isValidTier(null)).toBe(false);
  });
});

describe("getTierBaseCents / getTierName", () => {
  it("returns the per-gift price and display name for each tier", () => {
    expect(getTierBaseCents("essentials")).toBeGreaterThan(0);
    expect(getTierName("essentials")).toBe("Essentials");
    expect(getTierName("signature")).toBe("Signature");
    expect(getTierName("luxe")).toBe("Luxe");
  });
});

describe("calculateOrderTotalCents", () => {
  it("multiplies the base price by quantity", () => {
    const base = getTierBaseCents("essentials");
    const total = calculateOrderTotalCents({
      tier: "essentials",
      quantity: 3,
      rush: false,
      delivery: false,
    });
    expect(total).toBe(base * 3);
  });

  it("adds the rush fee once regardless of quantity", () => {
    const base = getTierBaseCents("essentials");
    const total = calculateOrderTotalCents({
      tier: "essentials",
      quantity: 2,
      rush: true,
      delivery: false,
    });
    expect(total).toBe(base * 2 + RUSH_FEE_CENTS);
  });

  it("adds the delivery fee once regardless of quantity", () => {
    const base = getTierBaseCents("signature");
    const total = calculateOrderTotalCents({
      tier: "signature",
      quantity: 4,
      rush: false,
      delivery: true,
    });
    expect(total).toBe(base * 4 + DELIVERY_FEE_CENTS);
  });

  it("stacks rush and delivery fees together", () => {
    const base = getTierBaseCents("luxe");
    const total = calculateOrderTotalCents({
      tier: "luxe",
      quantity: 1,
      rush: true,
      delivery: true,
    });
    expect(total).toBe(base + RUSH_FEE_CENTS + DELIVERY_FEE_CENTS);
  });
});

describe("formatCents", () => {
  it("formats whole dollars", () => {
    expect(formatCents(1500)).toBe("$15.00");
  });

  it("formats fractional cents", () => {
    expect(formatCents(1599)).toBe("$15.99");
  });

  it("formats zero", () => {
    expect(formatCents(0)).toBe("$0.00");
  });
});
