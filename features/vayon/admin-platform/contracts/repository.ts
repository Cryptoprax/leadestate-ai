import type { AdminSnapshot } from "../domain/models";
export interface AdminRepository {
  readonly provider: "supabase" | "aurora";
  load(): Promise<AdminSnapshot>;
}
