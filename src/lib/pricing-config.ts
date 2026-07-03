import "server-only";
import { cache } from "react";
import { prisma } from "@/lib/prisma";

export const getPricingConfig = cache(async () => {
  const config = await prisma.pricingConfig.findFirst();
  if (!config) {
    throw new Error(
      "No pricing config found. Run `npx prisma db seed` to create the default pricing.",
    );
  }
  return config;
});
