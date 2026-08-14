import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { AnalyticsRepository } from "../contracts/repository";
import type { AnalyticsRawSnapshot } from "../domain/models";
export class SupabaseAnalyticsRepository implements AnalyticsRepository {
  readonly provider = "supabase" as const;
  constructor(
    private c: SupabaseClient,
    private o: string,
    private w: string,
  ) {}
  async load(): Promise<AnalyticsRawSnapshot> {
    const names = [
        "leads",
        "deals",
        "properties",
        "meetings",
        "site_visits",
        "tasks",
        "communication_threads",
        "workflow_definitions",
      ] as const,
      errors: Record<string, string> = {};
    const rows = await Promise.all(
      names.map(async (name) => {
        const { data, error } = await this.c
          .from(name)
          .select("*")
          .eq("organization_id", this.o)
          .eq("workspace_id", this.w)
          .limit(5000);
        if (error) {
          errors[name] = error.message;
          return [];
        }
        return (data ?? []) as Record<string, unknown>[];
      }),
    );
    return {
      leads: rows[0],
      deals: rows[1],
      properties: rows[2],
      meetings: rows[3],
      visits: rows[4],
      tasks: rows[5],
      communications: rows[6],
      workflows: rows[7],
      providers: [],
      errors,
    };
  }
}
