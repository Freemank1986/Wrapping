"use client";

import { motion } from "framer-motion";
import type { BillingPeriod } from "@/lib/pricing-plans";

const options: { value: BillingPeriod; label: string }[] = [
  { value: "perGift", label: "Per Gift" },
  { value: "monthly", label: "Monthly Membership" },
];

export function BillingToggle({
  value,
  onChange,
}: {
  value: BillingPeriod;
  onChange: (value: BillingPeriod) => void;
}) {
  return (
    <div className="inline-flex rounded-full border border-gold/40 bg-white/60 p-1">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`relative rounded-full px-6 py-2 text-sm transition-colors duration-200 ${
            value === option.value ? "text-charcoal" : "text-charcoal/50"
          }`}
        >
          {value === option.value && (
            <motion.span
              layoutId="pricing-toggle-pill"
              className="absolute inset-0 -z-10 rounded-full bg-gold"
              transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
            />
          )}
          {option.label}
        </button>
      ))}
    </div>
  );
}
