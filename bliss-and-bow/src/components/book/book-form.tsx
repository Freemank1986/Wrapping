"use client";

import { useMemo, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { OCCASIONS } from "@/lib/occasions";
import { pricingTiers } from "@/lib/pricing-plans";
import {
  DELIVERY_FEE_CENTS,
  MAX_QUANTITY,
  RUSH_FEE_CENTS,
  calculateOrderTotalCents,
  formatCents,
  type TierId,
} from "@/lib/order-pricing";

const fieldClass =
  "w-full border border-gold/30 bg-white/60 px-4 py-3 text-charcoal placeholder:text-charcoal/40 focus:border-gold focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";
const labelClass = "text-xs uppercase tracking-wide text-charcoal/70";

function todayISO() {
  return new Date().toISOString().split("T")[0];
}

export function BookForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const [tier, setTier] = useState<TierId>("signature");
  const [quantity, setQuantity] = useState(1);
  const [rush, setRush] = useState(false);
  const [delivery, setDelivery] = useState(false);

  const submitting = status === "submitting";

  const totalCents = useMemo(
    () => calculateOrderTotalCents({ tier, quantity: quantity || 1, rush, delivery }),
    [tier, quantity, rush, delivery],
  );

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);

    const form = e.currentTarget;
    const field = (name: string) =>
      (form.elements.namedItem(name) as HTMLInputElement | HTMLTextAreaElement | null)?.value ??
      "";

    const data = {
      name: field("name"),
      email: field("email"),
      phone: field("phone"),
      tier,
      quantity,
      styleNotes: field("styleNotes"),
      giftMessage: field("giftMessage"),
      occasion: field("occasion"),
      completionDate: field("completionDate"),
      rush,
      delivery,
      deliveryAddress: field("deliveryAddress"),
      specialInstructions: field("specialInstructions"),
      company: field("company"),
    };

    try {
      const res = await fetch("/api/book/checkout", {
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
    <form onSubmit={handleSubmit} aria-busy={submitting} className="space-y-6">
      {/* Honeypot field: hidden from real users, left for bots to fill in. */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
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
        <label htmlFor="phone" className={labelClass}>
          Phone
        </label>
        <input id="phone" name="phone" type="tel" required disabled={submitting} className={`mt-2 ${fieldClass}`} />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="tier" className={labelClass}>
            Wrap tier
          </label>
          <select
            id="tier"
            name="tier"
            required
            disabled={submitting}
            value={tier}
            onChange={(e) => setTier(e.target.value as TierId)}
            className={`mt-2 ${fieldClass}`}
          >
            {pricingTiers.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name} — {t.perGift.price}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="quantity" className={labelClass}>
            Quantity
          </label>
          <input
            id="quantity"
            name="quantity"
            type="number"
            min={1}
            max={MAX_QUANTITY}
            required
            disabled={submitting}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className={`mt-2 ${fieldClass}`}
          />
        </div>
      </div>

      <div>
        <label htmlFor="styleNotes" className={labelClass}>
          Style preferences (bow style, ribbon color, box or bag)
        </label>
        <textarea
          id="styleNotes"
          name="styleNotes"
          rows={3}
          disabled={submitting}
          placeholder="e.g. gold satin bow, deep green ribbon, presentation box"
          className={`mt-2 ${fieldClass}`}
        />
      </div>

      <div>
        <label htmlFor="giftMessage" className={labelClass}>
          Gift message
        </label>
        <textarea id="giftMessage" name="giftMessage" rows={2} disabled={submitting} className={`mt-2 ${fieldClass}`} />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="occasion" className={labelClass}>
            Occasion
          </label>
          <select id="occasion" name="occasion" required disabled={submitting} defaultValue="" className={`mt-2 ${fieldClass}`}>
            <option value="" disabled>
              Select an occasion
            </option>
            {OCCASIONS.map((occasion) => (
              <option key={occasion} value={occasion}>
                {occasion}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="completionDate" className={labelClass}>
            Requested completion date
          </label>
          <input
            id="completionDate"
            name="completionDate"
            type="date"
            min={todayISO()}
            required
            disabled={submitting}
            className={`mt-2 ${fieldClass}`}
          />
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:gap-8">
        <label className="flex items-center gap-2 text-sm text-charcoal">
          <input
            type="checkbox"
            checked={rush}
            disabled={submitting}
            onChange={(e) => setRush(e.target.checked)}
            className="h-4 w-4 accent-gold"
          />
          Rush service (+{formatCents(RUSH_FEE_CENTS)})
        </label>
        <label className="flex items-center gap-2 text-sm text-charcoal">
          <input
            type="checkbox"
            checked={delivery}
            disabled={submitting}
            onChange={(e) => setDelivery(e.target.checked)}
            className="h-4 w-4 accent-gold"
          />
          Local delivery (+{formatCents(DELIVERY_FEE_CENTS)})
        </label>
      </div>

      {delivery && (
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
          <label htmlFor="deliveryAddress" className={labelClass}>
            Delivery address
          </label>
          <textarea
            id="deliveryAddress"
            name="deliveryAddress"
            rows={2}
            required={delivery}
            disabled={submitting}
            className={`mt-2 ${fieldClass}`}
          />
        </motion.div>
      )}

      <div>
        <label htmlFor="specialInstructions" className={labelClass}>
          Special instructions
        </label>
        <textarea
          id="specialInstructions"
          name="specialInstructions"
          rows={2}
          disabled={submitting}
          className={`mt-2 ${fieldClass}`}
        />
      </div>

      <div className="flex items-center justify-between border-t border-gold/30 pt-6">
        <span className="font-serif text-lg text-charcoal">Estimated total</span>
        <span className="font-serif text-2xl text-burgundy">{formatCents(totalCents)}</span>
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
