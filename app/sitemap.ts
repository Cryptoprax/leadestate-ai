import type { MetadataRoute } from "next";
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
  "/about",
  "/careers",
  "/contact",
  "/privacy",
  "/terms",
  "/trust-center",
  "/demo",
] as const;
export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((path) => ({
    url: `https://vayon.app${path}`,
    changeFrequency: path === "/blog" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/product" ? 0.9 : 0.7,
  }));
}
