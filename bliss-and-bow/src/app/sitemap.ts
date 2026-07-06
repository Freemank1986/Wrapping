import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-config";

// Excludes /checkout/success, /checkout/cancel (transactional, noIndex).
const routes = [
  "",
  "/pricing",
  "/shop",
  "/book",
  "/gallery",
  "/about",
  "/contact",
  "/terms",
  "/privacy",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
  }));
}
