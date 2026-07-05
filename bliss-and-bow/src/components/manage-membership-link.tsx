"use client";

import { useState } from "react";

export function ManageMembershipLink() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/portal", { method: "POST" });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Couldn't open your billing portal.");
        return;
      }
      window.location.href = data.url;
    } catch {
      setError("Something went wrong reaching the billing portal.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="inline-flex flex-col items-center gap-1">
      <button
        onClick={handleClick}
        disabled={loading}
        className="text-xs uppercase tracking-wide text-charcoal/60 underline-offset-4 hover:text-burgundy hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Opening…" : "Manage membership"}
      </button>
      {error && (
        <p role="alert" aria-live="assertive" className="text-xs text-burgundy">
          {error}
        </p>
      )}
    </div>
  );
}
