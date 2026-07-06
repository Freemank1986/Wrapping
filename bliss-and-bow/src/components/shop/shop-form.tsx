"use client";

import { useMemo, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { shopProducts } from "@/lib/shop-products";
import {
  MAX_QUANTITY_PER_ITEM,
  SHIPPING_FEE_CENTS,
  calculateShopSubtotalCents,
  formatCents,
  type FulfillmentMethod,
} from "@/lib/shop-pricing";

const fieldClass =
  "w-full border border-gold/30 bg-white/60 px-4 py-3 text-charcoal placeholder:text-charcoal/40 focus:border-gold focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";
const labelClass = "text-xs uppercase tracking-wide text-charcoal/70";

export function ShopForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [quantities, setQuantities] = useState<Record<string, number>>(
    Object.fromEntries(shopProducts.map((p) => [p.id, 0])),
  );
  const [fulfillment, setFulfillment] = useState<FulfillmentMethod>("pickup");

  const submitting = status === "submitting";

  const items = useMemo(
    () =>
      shopProducts
        .map((product) => ({ productId: product.id, quantity: quantities[product.id] ?? 0 }))
        .filter((item) => item.quantity > 0),
    [quantities],
  );

  const subtotalCents = useMemo(() => calculateShopSubtotalCents(items), [items]);
  const shippingCents = fulfillment === "shipping" ? SHIPPING_FEE_CENTS : 0;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (items.length === 0) {
      setError("Please select at least one item.");
      return;
    }

    setStatus("submitting");

    const form = e.currentTarget;
    const field = (name: string) =>
      (form.elements.namedItem(name) as HTMLInputElement | null)?.value ?? "";

    const data = {
      name: field("name"),
      email: field("email"),
      items,
      fulfillment,
      shippingAddress:
        fulfillment === "shipping"
          ? {
              line1: field("line1"),
              line2: field("line2"),
              city: field("city"),
              state: field("state"),
              postalCode: field("postalCode"),
            }
          : undefined,
      company: field("company"),
    };

    try {
      const res = await fetch("/api/shop/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();

      if (!res.ok) {
        setError(json.error ?? "Couldn't start checkout. Please try again.");
        setStatus("error");
        return;
      }

      window.location.href = json.url;
    } catch {
      setError("Something went wrong reaching the server. Please try again.");
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} aria-busy={submitting} className="space-y-8">
      {/* Honeypot field: hidden from real users, left for bots to fill in. */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="space-y-4">
        {shopProducts.map((product) => (
          <div
            key={product.id}
            className="flex items-center justify-between gap-4 border border-gold/30 bg-white/60 p-4"
          >
            <div>
              <p className="font-serif text-lg text-charcoal">{product.name}</p>
              <p className="text-sm text-charcoal/70">{product.description}</p>
              <p className="mt-1 text-sm text-burgundy">
                {formatCents(product.priceCents)} {product.unitLabel}
              </p>
            </div>
            <div>
              <label htmlFor={`qty-${product.id}`} className={labelClass}>
                Qty
              </label>
              <input
                id={`qty-${product.id}`}
                type="number"
                min={0}
                max={MAX_QUANTITY_PER_ITEM}
                disabled={submitting}
                value={quantities[product.id] ?? 0}
                onChange={(e) =>
                  setQuantities((q) => ({ ...q, [product.id]: Number(e.target.value) }))
                }
                className={`mt-2 w-20 ${fieldClass}`}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Name
          </label>
          <input id="name" name="name" type="text" required disabled={submitting} className={`mt-2 ${fieldClass}`} />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            Email
          </label>
          <input id="email" name="email" type="email" required disabled={submitting} className={`mt-2 ${fieldClass}`} />
        </div>
      </div>

      <div>
        <p className={labelClass}>Fulfillment</p>
        <div className="mt-2 flex gap-8">
          <label className="flex items-center gap-2 text-sm text-charcoal">
            <input
              type="radio"
              name="fulfillment"
              checked={fulfillment === "pickup"}
              disabled={submitting}
              onChange={() => setFulfillment("pickup")}
              className="h-4 w-4 accent-gold"
            />
            Local pickup (free)
          </label>
          <label className="flex items-center gap-2 text-sm text-charcoal">
            <input
              type="radio"
              name="fulfillment"
              checked={fulfillment === "shipping"}
              disabled={submitting}
              onChange={() => setFulfillment("shipping")}
              className="h-4 w-4 accent-gold"
            />
            Ship to me (+{formatCents(SHIPPING_FEE_CENTS)})
          </label>
        </div>
      </div>

      {fulfillment === "shipping" && (
        <div className="space-y-4">
          <div>
            <label htmlFor="line1" className={labelClass}>
              Street address
            </label>
            <input id="line1" name="line1" type="text" required disabled={submitting} className={`mt-2 ${fieldClass}`} />
          </div>
          <div>
            <label htmlFor="line2" className={labelClass}>
              Apt / suite (optional)
            </label>
            <input id="line2" name="line2" type="text" disabled={submitting} className={`mt-2 ${fieldClass}`} />
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label htmlFor="city" className={labelClass}>
                City
              </label>
              <input id="city" name="city" type="text" required disabled={submitting} className={`mt-2 ${fieldClass}`} />
            </div>
            <div>
              <label htmlFor="state" className={labelClass}>
                State
              </label>
              <input id="state" name="state" type="text" required disabled={submitting} className={`mt-2 ${fieldClass}`} />
            </div>
            <div>
              <label htmlFor="postalCode" className={labelClass}>
                ZIP
              </label>
              <input id="postalCode" name="postalCode" type="text" required disabled={submitting} className={`mt-2 ${fieldClass}`} />
            </div>
          </div>
        </div>
      )}

      <div className="space-y-2 border-t border-gold/30 pt-6">
        <div className="flex items-center justify-between text-sm text-charcoal/70">
          <span>Subtotal</span>
          <span>{formatCents(subtotalCents)}</span>
        </div>
        {fulfillment === "shipping" && (
          <div className="flex items-center justify-between text-sm text-charcoal/70">
            <span>Shipping</span>
            <span>{formatCents(shippingCents)}</span>
          </div>
        )}
        <div className="flex items-center justify-between text-sm text-charcoal/70">
          <span>Sales tax</span>
          <span>Calculated at checkout</span>
        </div>
        <div className="flex items-center justify-between pt-2">
          <span className="font-serif text-lg text-charcoal">Estimated total</span>
          <span className="font-serif text-2xl text-burgundy">
            {formatCents(subtotalCents + shippingCents)} + tax
          </span>
        </div>
      </div>

      <Button type="submit" variant="primary" disabled={submitting} className="w-full">
        {submitting ? "Redirecting…" : "Continue to Payment"}
      </Button>

      {error && (
        <p role="alert" aria-live="assertive" className="text-sm text-burgundy">
          {error}
        </p>
      )}
    </form>
  );
}
