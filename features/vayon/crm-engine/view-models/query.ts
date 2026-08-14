import type { CrmLeadListQuery } from "../domain/contracts";

export function toCrmQuery(
  input: Record<string, string | string[] | undefined>,
): Partial<CrmLeadListQuery> {
  const value = (key: string) =>
    typeof input[key] === "string" ? input[key] : undefined;
  const page = Number(value("page"));
  const pageSize = Number(value("pageSize"));
  const sort = value("sort");
  const direction = value("direction");
  return {
    search: value("search"),
    status: value("status"),
    priority: value("priority"),
    source: value("source"),
    page: Number.isFinite(page) && page > 0 ? page : 1,
    pageSize: [10, 25, 50, 100].includes(pageSize) ? pageSize : 25,
    sort:
      sort === "created_at" ||
      sort === "name" ||
      sort === "lead_score" ||
      sort === "budget"
        ? sort
        : "updated_at",
    direction: direction === "asc" ? "asc" : "desc",
  };
}
