"use client";

import { useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { formatCents } from "@/lib/order-pricing";

const fieldClass =
  "w-full border border-gold/30 bg-white/60 px-4 py-3 text-charcoal placeholder:text-charcoal/40 focus:border-gold focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";
const labelClass = "text-xs uppercase tracking-wide text-charcoal/70";

interface OrderResult {
  orderType: string;
  mode: string;
  status: string;
  amountTotal: number | null;
  created: number;
  metadata: Record<string, string>;
}

export function OrderLookupForm() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<OrderResult | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError(null);
    setResult(null);

    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const sessionId = (form.elements.namedItem("sessionId") as HTMLInputElement).value;

    try {
      const res = await fetch("/api/order-lookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, sessionId }),
      });
      const json = await res.json();

      if (!res.ok) {
        setError(json.error ?? "No matching order found.");
        setStatus("error");
        return;
      }

      setResult(json);
      setStatus("idle");
    } catch {
      setError("Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className={labelClass}>
            Email used at checkout
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            disabled={status === "loading"}
            className={`mt-2 ${fieldClass}`}
          />
        </div>
        <div>
          <label htmlFor="sessionId" className={labelClass}>
            Order ID (from your confirmation email link)
          </label>
          <input
            id="sessionId"
            name="sessionId"
            type="text"
            required
            defaultValue={searchParams.get("session_id") ?? ""}
            placeholder="cs_..."
            disabled={status === "loading"}
            className={`mt-2 ${fieldClass}`}
          />
        </div>
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full border border-gold bg-gold px-6 py-3 text-sm font-medium uppercase tracking-wide text-charcoal transition hover:bg-gold/90 disabled:opacity-50"
        >
          {status === "loading" ? "Looking up…" : "Look Up Order"}
        </button>
        {error && (
          <p role="alert" aria-live="assertive" className="text-sm text-burgundy">
            {error}
          </p>
        )}
      </form>

      {result && (
        <div className="border border-gold/30 bg-white/60 p-6 text-sm text-charcoal/80">
          <p className="font-serif text-lg text-charcoal">
            {result.orderType === "gift-wrap"
              ? "Gift-Wrap Order"
              : result.orderType === "shop"
                ? "Shop Order"
                : "Membership"}
          </p>
          <dl className="mt-4 space-y-2">
            <div className="flex justify-between">
              <dt>Status</dt>
              <dd className="capitalize">{result.status}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Total</dt>
              <dd>{formatCents(result.amountTotal ?? 0)}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Date</dt>
              <dd>{new Date(result.created * 1000).toLocaleDateString()}</dd>
            </div>
            {result.metadata.tier && (
              <div className="flex justify-between">
                <dt>Tier</dt>
                <dd>{result.metadata.tier}</dd>
              </div>
            )}
            {result.metadata.items && (
              <div className="flex justify-between">
                <dt>Items</dt>
                <dd className="text-right">{result.metadata.items}</dd>
              </div>
            )}
          </dl>
        </div>
      )}
    </div>
  );
}
