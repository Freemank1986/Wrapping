"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { RibbonBow } from "@/components/ribbon-bow";
import { Button } from "@/components/ui/button";

type SessionInfo = {
  mode: "payment" | "subscription";
  customerEmail: string | null;
};

export function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [session, setSession] = useState<SessionInfo | null>(null);

  useEffect(() => {
    if (!sessionId) return;
    fetch(`/api/checkout/session?session_id=${encodeURIComponent(sessionId)}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => data && setSession(data))
      .catch(() => {});
  }, [sessionId]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 py-24 text-center">
      <RibbonBow />

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
        className="mt-8 font-serif text-4xl font-semibold text-charcoal md:text-5xl"
      >
        You&apos;re All Wrapped Up
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65, duration: 0.5, ease: "easeOut" }}
        className="mt-4 max-w-md text-charcoal/80"
      >
        {session?.mode === "subscription"
          ? "Your membership is active. "
          : "Your payment went through. "}
        We&apos;ll see you soon — book your drop-off time whenever you&apos;re ready.
        {session?.customerEmail && (
          <span className="mt-2 block text-sm text-charcoal/60">
            A receipt is on its way to {session.customerEmail}.
          </span>
        )}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5, ease: "easeOut" }}
        className="mt-10"
      >
        <Button href="/book" variant="primary">
          Book Your Drop-Off
        </Button>
      </motion.div>
    </main>
  );
}
