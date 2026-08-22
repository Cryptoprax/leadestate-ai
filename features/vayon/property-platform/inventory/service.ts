import "server-only";
import { operationsContext } from "@/features/vayon/operations/services/context";
import type { InventoryAIContext, InventoryFilters, InventoryMetrics, InventorySnapshot, InventoryUnit } from "./domain";
import type { InventoryRepository } from "./repository";
import { inventorySnapshot } from "./repository";
import { SupabaseInventoryRepository } from "./supabase.repository";
import { AuroraInventoryRepository } from "./aurora.repository";

export const inventoryGovernance = { tenantScoped: true, approvalRequiredForDiscountOverride: true, paymentProcessing: false, autonomousActions: false } as const;

export class InventoryService {
  constructor(private readonly repository: InventoryRepository) {}
  static async production() { const context = await operationsContext(); return new InventoryService(new SupabaseInventoryRepository(context.client, context.organizationId, context.workspaceId)); }
  static demo() { return new InventoryService(new AuroraInventoryRepository()); }
  snapshot() { return inventorySnapshot(this.repository); }
  filter(snapshot: InventorySnapshot, filters: InventoryFilters) {
    const term = filters.search?.trim().toLocaleLowerCase();
    const projectIds = new Set(snapshot.projects.filter((project) => (!term || [project.name, project.code, project.city, project.developer, project.projectType].some((value) => value.toLocaleLowerCase().includes(term))) && (!filters.city || project.city === filters.city) && (!filters.developer || project.developer === filters.developer) && (!filters.projectStatus || project.status === filters.projectStatus) && (!filters.possessionBefore || Boolean(project.possessionDate && project.possessionDate <= filters.possessionBefore))).map((project) => project.id));
    return snapshot.units.filter((unit) => projectIds.has(unit.projectId) && (!filters.unitStatus || unit.status === filters.unitStatus) && (!filters.bhk || unit.bhkType === filters.bhk) && (filters.minPrice == null || unit.price >= filters.minPrice) && (filters.maxPrice == null || unit.price <= filters.maxPrice) && (filters.minArea == null || unit.area >= filters.minArea) && (filters.maxArea == null || unit.area <= filters.maxArea));
  }
  metrics(snapshot: InventorySnapshot): InventoryMetrics {
    const count = (status: InventoryUnit["status"]) => snapshot.units.filter((unit) => unit.status === status).length;
    const realized = snapshot.units.filter((unit) => unit.status === "booked" || unit.status === "sold");
    const ranked = snapshot.projects.map((project) => ({ name: project.name, sold: snapshot.units.filter((unit) => unit.projectId === project.id && (unit.status === "sold" || unit.status === "booked")).length, value: snapshot.units.filter((unit) => unit.projectId === project.id).reduce((sum, unit) => sum + (unit.offerPrice ?? unit.price), 0) })).sort((a, b) => b.sold - a.sold);
    return { availableUnits: count("available"), reservedUnits: count("reserved"), bookedUnits: count("booked"), soldUnits: count("sold"), inventoryValue: snapshot.units.reduce((sum, unit) => sum + (unit.offerPrice ?? unit.price), 0), expectedRevenue: realized.reduce((sum, unit) => sum + (unit.offerPrice ?? unit.price), 0), occupancy: snapshot.units.length ? Math.round((realized.length / snapshot.units.length) * 100) : 0, fastestSellingProjects: ranked.slice(0, 3).map((item) => item.name), topPerformingProjects: [...ranked].sort((a, b) => b.value - a.value).slice(0, 3).map((item) => item.name), currency: snapshot.units[0]?.currency ?? "USD" };
  }
  aiContext(snapshot: InventorySnapshot, projectId: string): InventoryAIContext {
    return { projectId, availableUnits: snapshot.units.filter((unit) => unit.projectId === projectId && unit.status === "available").map(({ id, unitNumber, bhkType, area, areaUnit, price, offerPrice, currency, status }) => ({ id, unitNumber, bhkType, area, areaUnit, price, offerPrice, currency, status })), capabilities: ["recommend-properties", "find-alternatives", "suggest-upgrades", "suggest-cheaper-options", "detect-unavailable-inventory", "generate-summaries"], recommendationOnly: true, autonomousActions: false };
  }
  transitionUnit(input: { unitId: string; expectedStatus: string; action: "reserve" | "release" | "book"; buyerId?: string; opportunityRequested?: boolean }) {
    const nextStatus = input.action === "release" ? "available" : input.action === "reserve" ? "reserved" : "booked";
    if (input.action === "book" && !input.buyerId) throw new Error("A buyer is required before booking a unit.");
    return this.repository.transitionUnit({ unitId: input.unitId, expectedStatus: input.expectedStatus, nextStatus, buyerId: input.buyerId, opportunityRequested: input.opportunityRequested });
  }
}
