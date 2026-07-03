"use server";

import { cookies } from "next/headers";
import { THEME_COOKIE, type SiteTheme } from "@/lib/theme";

export async function setTheme(theme: SiteTheme) {
  const store = await cookies();
  store.set(THEME_COOKIE, theme, {
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
    path: "/",
  });
}
