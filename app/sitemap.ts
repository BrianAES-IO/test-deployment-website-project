import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { services } from "@/config/offers";
import { getArticleSlugs } from "@/lib/insights";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.siteUrl;

  const staticRoutes = [
    "",
    "/services",
    ...services.map((s) => s.href),
    "/assessment/dpa",
    "/assessment/security",
    "/insights",
    "/briefing",
    "/about",
    "/book",
    "/privacy",
    "/terms",
  ].map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
  }));

  const articleRoutes = getArticleSlugs().map((slug) => ({
    url: `${base}/insights/${slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...articleRoutes];
}
