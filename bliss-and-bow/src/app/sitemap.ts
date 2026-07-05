import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-config";

// Excludes /checkout/success, /checkout/cancel (transactional, noIndex) and
// /terms, /privacy (placeholder legal text, noIndex until reviewed — add
// them here once real copy replaces the placeholders).
const routes = ["", "/pricing", "/book", "/gallery", "/about", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
  }));
}
