import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";

export type SiteTheme = "classic" | "modern";

export const THEME_COOKIE = "bb-theme";

export const getTheme = cache(async (): Promise<SiteTheme> => {
  const store = await cookies();
  const value = store.get(THEME_COOKIE)?.value;
  return value === "classic" ? "classic" : "modern";
});
