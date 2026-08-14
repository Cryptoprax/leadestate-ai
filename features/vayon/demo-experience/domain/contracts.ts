import type { ExecutiveDashboardData } from "@/features/vayon/dashboard/types";

export type DemoCollection =
  "properties" | "leads" | "deals" | "communications" | "activity";
export interface DemoRecord {
  readonly id: string;
  readonly kind: DemoCollection;
  readonly title: string;
  readonly subtitle: string;
  readonly status: string;
  readonly meta: readonly string[];
  readonly image?: string;
  readonly occurredAt?: string;
}
export interface DemoInventory {
  readonly organization: "Aurora Realty Group";
  readonly persistence: "seeded-json-fixtures";
  readonly readOnly: true;
  readonly properties: readonly DemoRecord[];
  readonly leads: readonly DemoRecord[];
  readonly deals: readonly DemoRecord[];
  readonly communications: readonly DemoRecord[];
  readonly activity: readonly DemoRecord[];
}
export interface DemoExperienceModel {
  readonly dashboard: ExecutiveDashboardData;
  readonly inventory: DemoInventory;
  readonly counts: {
    readonly users: number;
    readonly properties: number;
    readonly leads: number;
    readonly deals: number;
    readonly whatsapp: number;
    readonly activity: number;
  };
}
export interface DemoRepository {
  load(): DemoInventory;
}
