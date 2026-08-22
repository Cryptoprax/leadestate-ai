import type { MetadataRoute } from "next";
import { DocumentationService } from "@/features/platform/knowledge/services/documentation.service";
import { MarketingAssetsService } from "@/features/marketing/services/marketing-assets.service";
const routes = [
  "",
  "/product",
  "/features",
  "/solutions",
  "/ai-workforce",
  "/crm",
  "/properties",
  "/deals",
  "/communications",
  "/calendar",
  "/workflows",
  "/integrations",
  "/security",
  "/enterprise",
  "/pricing",
  "/customers",
  "/resources",
  "/blog",
  "/docs",
  "/developers",
  "/about",
  "/careers",
  "/contact",
  "/privacy",
  "/terms",
  "/trust-center",
  "/demo",
  "/compare",
  "/roi-calculator",
  "/sales-assets",
  "/media-kit",
  "/investors",
] as const;
export default function sitemap(): MetadataRoute.Sitemap {
  const documentation = new DocumentationService()
    .all()
    .map((article) => `/docs/${article.slug}`);
  const assets = new MarketingAssetsService().catalog(),
    marketing = [
      ...assets.comparisons.map((x) => `/compare/${x.slug}`),
      ...assets.assets.map((x) => `/sales-assets/${x.slug}`),
      ...assets.stories.map((x) => `/customers/${x.slug}`),
    ];
  return [...routes, ...documentation, ...marketing].map((path) => ({
    url: `https://vayon.app${path}`,
    changeFrequency: path === "/blog" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/product" ? 0.9 : 0.7,
  }));
}
