"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function PayNowButton({ orderId }: { orderId: string }) {
  const [loading, setLoading] = useState(false);

  async function handlePay() {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId }),
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error ?? "Couldn't start checkout. Please try again.");
        return;
      }

      window.location.href = data.url;
    } catch {
      toast.error("Something went wrong reaching checkout.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button onClick={handlePay} disabled={loading}>
      {loading ? "Redirecting…" : "Pay now"}
    </Button>
  );
}
