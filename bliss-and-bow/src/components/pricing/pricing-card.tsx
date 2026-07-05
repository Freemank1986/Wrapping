"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Ribbon } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { BillingPeriod, PricingTier } from "@/lib/pricing-plans";

export function PricingCard({
  tier,
  billing,
  index,
}: {
  tier: PricingTier;
  billing: BillingPeriod;
  index: number;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const plan = tier[billing];

  async function handleCheckout() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priceId: plan.priceId,
          mode: billing === "perGift" ? "payment" : "subscription",
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Couldn't start checkout. Please try again.");
        return;
      }
      window.location.href = data.url;
    } catch {
      setError("Something went wrong reaching checkout.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.15, ease: "easeOut" }}
      className={`relative flex flex-col border bg-white/60 p-8 ${
        tier.featured
          ? "border-gold shadow-xl md:-translate-y-4"
          : "border-gold/30"
      }`}
    >
      {tier.featured && (
        <span className="absolute -top-4 left-1/2 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-gold px-4 py-1.5 text-xs font-medium uppercase tracking-wide text-charcoal shadow">
          <Ribbon className="h-3.5 w-3.5" strokeWidth={1.5} />
          Most Loved
        </span>
      )}

      <h3 className="font-serif text-2xl font-semibold text-charcoal">
        {tier.name}
      </h3>

      <div style={{ perspective: 1000 }} className="mt-4 flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={billing}
            initial={{ rotateX: 90, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            exit={{ rotateX: -90, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <p className="font-serif text-3xl text-burgundy">{plan.price}</p>
            <ul className="mt-6 space-y-3 text-sm text-charcoal/80">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <Check
                    className="mt-0.5 h-4 w-4 shrink-0 text-gold"
                    strokeWidth={2}
                  />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-8">
        <Button
          variant={tier.featured ? "primary" : "secondary"}
          className="w-full"
          onClick={handleCheckout}
          disabled={loading}
        >
          {loading ? "Redirecting…" : `Choose ${tier.name}`}
        </Button>
        {error && (
          <p role="alert" aria-live="assertive" className="mt-2 text-xs text-burgundy">
            {error}
          </p>
        )}
      </div>
    </motion.div>
  );
}
