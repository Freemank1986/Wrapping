import type { ReactNode } from "react";
import { RibbonReveal } from "@/components/ribbon-reveal";

export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <>
      <RibbonReveal />
      {children}
    </>
  );
}
