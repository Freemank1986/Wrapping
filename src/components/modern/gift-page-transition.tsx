"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { GiftUnwrapOverlay } from "./gift-unwrap-overlay";

export function GiftPageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [previousPathname, setPreviousPathname] = useState(pathname);
  const [playing, setPlaying] = useState(false);

  // Adjust state during render in response to the prop (pathname) changing,
  // per https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes
  if (pathname !== previousPathname) {
    setPreviousPathname(pathname);
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!prefersReducedMotion) {
      setPlaying(true);
    }
  }

  useEffect(() => {
    if (!playing) return;
    const timeout = setTimeout(() => setPlaying(false), 850);
    return () => clearTimeout(timeout);
  }, [playing]);

  return (
    <>
      {playing && <GiftUnwrapOverlay />}
      <div
        key={pathname}
        style={playing ? undefined : { animation: "bb-content-reveal 0.4s ease-out" }}
      >
        {children}
      </div>
    </>
  );
}
