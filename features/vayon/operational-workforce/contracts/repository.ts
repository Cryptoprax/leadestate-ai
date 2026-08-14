import type {
  WorkforceActivity,
  WorkforceEmployee,
  WorkforceTask,
} from "../domain/models";
export interface WorkforceRepository {
  readonly provider: "supabase" | "aurora";
  employees(): Promise<readonly WorkforceEmployee[]>;
  tasks(): Promise<readonly WorkforceTask[]>;
  activity(): Promise<readonly WorkforceActivity[]>;
}
