"use client";

import { motion } from "framer-motion";
import { Gift, Truck, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

const steps = [
  {
    icon: Gift,
    title: "Choose your tier",
    description:
      "Simple, Standard, or Elaborate — pick the level of finish your gifts deserve.",
  },
  {
    icon: Truck,
    title: "Drop off or schedule",
    description:
      "Bring your gifts to us, or have us pick up and deliver on your schedule.",
  },
  {
    icon: Sparkles,
    title: "Pick up perfection",
    description:
      "Every box wrapped, ribboned, and ready — beautiful down to the last detail.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-24">
      <Container>
        <SectionHeading eyebrow="How it works" title="Three Steps to Beautiful" />
        <div className="mt-16 grid gap-10 md:grid-cols-3">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
              className="flex flex-col items-center gap-4 border border-gold/30 bg-white/50 px-8 py-12 text-center"
            >
              <step.icon className="h-8 w-8 text-burgundy" strokeWidth={1.5} />
              <h3 className="font-serif text-xl font-semibold text-charcoal">
                {step.title}
              </h3>
              <p className="text-sm text-charcoal/70">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
