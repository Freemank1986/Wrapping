"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const OCCASIONS = ["Birthday", "Wedding", "Holiday", "Corporate", "Other"];

const fieldClass =
  "w-full border border-gold/30 bg-white/60 px-4 py-3 text-charcoal placeholder:text-charcoal/40 focus:border-gold focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";
const labelClass = "text-xs uppercase tracking-wide text-charcoal/70";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const submitting = status === "submitting";

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      occasion: (form.elements.namedItem("occasion") as HTMLSelectElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
      // Honeypot — invisible to real visitors, bots tend to fill every field.
      company: (form.elements.namedItem("company") as HTMLInputElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();

      if (!res.ok) {
        setError(json.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setError("Something went wrong reaching the server. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="border border-gold/30 bg-white/60 px-8 py-12 text-center"
      >
        <p className="font-serif text-2xl text-charcoal">Message sent</p>
        <p className="mt-2 text-charcoal/70">
          Thank you for reaching out — we typically reply within one business
          day.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} aria-busy={submitting} className="space-y-6">
      {/* Honeypot field: hidden from real users, left for bots to fill in. */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div>
        <label htmlFor="name" className={labelClass}>
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          disabled={submitting}
          className={`mt-2 ${fieldClass}`}
        />
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          disabled={submitting}
          className={`mt-2 ${fieldClass}`}
        />
      </div>

      <div>
        <label htmlFor="occasion" className={labelClass}>
          Occasion
        </label>
        <select
          id="occasion"
          name="occasion"
          required
          disabled={submitting}
          defaultValue=""
          className={`mt-2 ${fieldClass}`}
        >
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
        <label htmlFor="message" className={labelClass}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          disabled={submitting}
          rows={5}
          className={`mt-2 ${fieldClass}`}
        />
      </div>

      <Button type="submit" variant="primary" disabled={submitting} className="w-full">
        {submitting ? "Sending…" : "Send Message"}
      </Button>

      {error && (
        <p role="alert" aria-live="assertive" className="text-sm text-burgundy">
          {error}
        </p>
      )}
    </form>
  );
}
