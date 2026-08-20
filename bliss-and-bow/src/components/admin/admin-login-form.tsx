"use client";

import { useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

const fieldClass =
  "w-full border border-gold/30 bg-white/60 px-4 py-3 text-charcoal placeholder:text-charcoal/40 focus:border-gold focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";

export function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/admin";

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const password = (
      e.currentTarget.elements.namedItem("password") as HTMLInputElement
    ).value;

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const json = await res.json();

      if (!res.ok) {
        setError(json.error ?? "Couldn't log in.");
        setSubmitting(false);
        return;
      }

      router.push(next);
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="password" className="text-xs uppercase tracking-wide text-charcoal/70">
          Admin password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoFocus
          disabled={submitting}
          className={`mt-2 ${fieldClass}`}
        />
      </div>
      <Button type="submit" variant="primary" disabled={submitting} className="w-full">
        {submitting ? "Logging in…" : "Log In"}
      </Button>
      {error && (
        <p role="alert" aria-live="assertive" className="text-sm text-burgundy">
          {error}
        </p>
      )}
    </form>
  );
}
