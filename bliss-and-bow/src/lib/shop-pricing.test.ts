import { describe, expect, it } from "vitest";
import { calculateShopSubtotalCents, formatCents } from "./shop-pricing";
import { shopProducts } from "./shop-products";

describe("calculateShopSubtotalCents", () => {
  it("returns 0 for an empty cart", () => {
    expect(calculateShopSubtotalCents([])).toBe(0);
  });

  it("multiplies unit price by quantity for a single item", () => {
    const [product] = shopProducts;
    const total = calculateShopSubtotalCents([{ productId: product.id, quantity: 3 }]);
    expect(total).toBe(product.priceCents * 3);
  });

  it("sums multiple line items", () => {
    const [first, second] = shopProducts;
    const total = calculateShopSubtotalCents([
      { productId: first.id, quantity: 2 },
      { productId: second.id, quantity: 1 },
    ]);
    expect(total).toBe(first.priceCents * 2 + second.priceCents * 1);
  });

  it("ignores unknown product ids rather than throwing", () => {
    const total = calculateShopSubtotalCents([{ productId: "not-a-real-product", quantity: 5 }]);
    expect(total).toBe(0);
  });
});

describe("formatCents", () => {
  it("formats cents as a dollar string", () => {
    expect(formatCents(1800)).toBe("$18.00");
  });
});
