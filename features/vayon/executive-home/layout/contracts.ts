import type { ExecutiveSectionId } from "../domain/contracts";
export type ExecutiveRole = "executive" | "sales-leader" | "operations-leader" | "custom";
export interface ExecutiveLayoutDefinition { readonly id: string; readonly name: string; readonly role: ExecutiveRole; readonly sections: readonly ExecutiveSectionId[]; readonly saved: boolean; readonly persistence: "unavailable" }
export interface ExecutiveLayoutEngine { defaultFor(role: ExecutiveRole): ExecutiveLayoutDefinition; save(layout: ExecutiveLayoutDefinition): { readonly accepted: false; readonly reason: "persistence-unavailable" } }
