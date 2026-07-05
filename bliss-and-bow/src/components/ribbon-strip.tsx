"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export function RibbonStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <div ref={ref} className="relative h-[40vh] w-full overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-x-0 -top-[15%] h-[130%]">
        <Image
          src="/assets/ribbon-strip.jpg"
          alt="Close-up of a silver ribbon bow"
          fill
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>
      <div className="absolute inset-0 bg-charcoal/10" />
    </div>
  );
}
