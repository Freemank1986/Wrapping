"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

export function AboutSection() {
  return (
    <section className="py-24">
      <Container>
        <div className="grid gap-12 md:grid-cols-2 md:items-center md:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative aspect-[3/4] w-full overflow-hidden"
          >
            <Image
              src="/assets/carmenlaezza9LC76jFqtaYunsplash.jpeg"
              alt="Hands carefully tying a raffia knot around a wrapped gift"
              fill
              className="object-cover"
              sizes="(min-width: 768px) 45vw, 100vw"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
          >
            <SectionHeading eyebrow="Our Story" title="Meet the Wrapper" />

            <div className="mt-8 space-y-5 text-charcoal/80">
              <p>
                Bliss &amp; Bow started at a kitchen table with a single
                spool of ribbon and a stack of gifts that all deserved
                better than gift-bag tissue paper. What began as wrapping
                presents for friends and neighbors during the holidays
                turned into a craft worth doing properly — and then a
                business worth building.
              </p>
              <p>
                Every order that comes through our door is treated the same
                way: measured twice, wrapped once, and finished with a bow
                that actually holds its shape. No shortcuts, no gift-bag
                substitutions when a box deserves paper.
              </p>
            </div>

            <blockquote className="mt-10 border-l-2 border-gold pl-6">
              <p className="font-serif text-2xl italic text-burgundy">
                &ldquo;A gift wrapped with care says the rest of the message
                before anyone opens the box.&rdquo;
              </p>
            </blockquote>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
