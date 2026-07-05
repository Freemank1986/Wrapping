"use client";

import { motion, useReducedMotion } from "framer-motion";

export function RibbonBow() {
  const reducedMotion = useReducedMotion();
  const instant = { duration: reducedMotion ? 0 : undefined };

  return (
    <svg
      viewBox="0 0 200 140"
      className="h-32 w-48"
      aria-hidden="true"
    >
      <motion.ellipse
        cx="62"
        cy="60"
        rx="55"
        ry="34"
        fill="#C9A96E"
        initial={{ opacity: 0, x: -50, rotate: -70 }}
        animate={{ opacity: 1, x: 0, rotate: -22 }}
        transition={{ type: "spring", stiffness: 120, damping: 12, ...instant }}
        style={{ transformOrigin: "100px 60px" }}
      />
      <motion.ellipse
        cx="138"
        cy="60"
        rx="55"
        ry="34"
        fill="#C9A96E"
        initial={{ opacity: 0, x: 50, rotate: 70 }}
        animate={{ opacity: 1, x: 0, rotate: 22 }}
        transition={{ type: "spring", stiffness: 120, damping: 12, ...instant }}
        style={{ transformOrigin: "100px 60px" }}
      />
      <motion.path
        d="M100 45 L120 90 L100 80 L80 90 Z"
        fill="#6B2737"
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: reducedMotion ? 0 : 0.35, duration: reducedMotion ? 0 : 0.4, ease: "easeOut" }}
      />
      <motion.rect
        x="86"
        y="42"
        width="28"
        height="34"
        rx="6"
        fill="#6B2737"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 14,
          delay: reducedMotion ? 0 : 0.25,
          duration: instant.duration,
        }}
        style={{ transformOrigin: "100px 59px" }}
      />
    </svg>
  );
}
