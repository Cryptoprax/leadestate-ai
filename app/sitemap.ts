import type { MetadataRoute } from "next";
import { DocumentationService } from "@/features/platform/knowledge/services/documentation.service";
const routes = [
  "",
  "/product",
  "/features",
  "/solutions",
  "/industries",
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
] as const;
export default function sitemap(): MetadataRoute.Sitemap {
  const documentation = new DocumentationService().all().map((article) => `/docs/${article.slug}`);
  return [...routes, ...documentation].map((path) => ({
    url: `https://vayon.app${path}`,
    changeFrequency: path === "/blog" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/product" ? 0.9 : 0.7,
  }));
}
