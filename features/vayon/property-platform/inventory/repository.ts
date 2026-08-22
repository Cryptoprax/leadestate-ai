import type { InventoryAuditEvent, InventoryDocument, InventoryProject, InventorySnapshot, InventoryTower, InventoryUnit, PriceRevision } from "./domain";

export interface InventoryRepository {
  readonly provider: "supabase" | "aurora";
  projects(): Promise<readonly InventoryProject[]>;
  towers(): Promise<readonly InventoryTower[]>;
  units(): Promise<readonly InventoryUnit[]>;
  prices(): Promise<readonly PriceRevision[]>;
  documents(): Promise<readonly InventoryDocument[]>;
  audit(): Promise<readonly InventoryAuditEvent[]>;
  transitionUnit(input: { unitId: string; expectedStatus: string; nextStatus: "available" | "reserved" | "booked"; buyerId?: string; opportunityRequested?: boolean }): Promise<void>;
}

export async function inventorySnapshot(repository: InventoryRepository): Promise<InventorySnapshot> {
  const [projects, towers, units, prices, documents, audit] = await Promise.all([
    repository.projects(), repository.towers(), repository.units(), repository.prices(), repository.documents(), repository.audit(),
  ]);
  return { projects, towers, units, prices, documents, audit, provider: repository.provider };
}
