"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const TRANSITION_MS = 900;

export function RibbonReveal() {
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();
  const [show, setShow] = useState(false);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (reducedMotion) return;

    setShow(true);
    const timeout = setTimeout(() => setShow(false), TRANSITION_MS);
    return () => clearTimeout(timeout);
  }, [pathname, reducedMotion]);

  return (
    <AnimatePresence>
      {show && (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[100] overflow-hidden"
        >
          <motion.div
            className="ribbon-panel absolute inset-y-0 left-0 w-1/2"
            initial={{ x: "-100%" }}
            animate={{ x: ["-100%", "0%", "-100%"] }}
            transition={{
              duration: TRANSITION_MS / 1000,
              times: [0, 0.5, 1],
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="ribbon-panel absolute inset-y-0 right-0 w-1/2"
            initial={{ x: "100%" }}
            animate={{ x: ["100%", "0%", "100%"] }}
            transition={{
              duration: TRANSITION_MS / 1000,
              times: [0, 0.5, 1],
              ease: "easeInOut",
            }}
          />
        </div>
      )}
    </AnimatePresence>
  );
}
