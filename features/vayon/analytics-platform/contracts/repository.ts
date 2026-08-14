import type { AnalyticsRawSnapshot } from "../domain/models";
export interface AnalyticsRepository {
  readonly provider: "supabase" | "aurora";
  load(): Promise<AnalyticsRawSnapshot>;
}
