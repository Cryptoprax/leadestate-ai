import "server-only";
import type { InventoryRepository } from "./repository";
import type { InventoryAuditEvent, InventoryDocument, InventoryProject, InventoryTower, InventoryUnit, PriceRevision } from "./domain";

const projects: readonly InventoryProject[] = [
  { id: "aurora-heights", code: "AUR-HGT", name: "Aurora Heights", developer: "Northstar Habitat Private Limited", status: "active", description: "A fictional premium residential project used for governed product demonstrations.", address: "88 Meridian Avenue", city: "Bengaluru", state: "Karnataka", country: "India", zipCode: "560066", coordinates: { latitude: 12.9698, longitude: 77.7500 }, launchDate: "2025-09-15", possessionDate: "2027-12-01", projectType: "Residential", gallery: [], assignedSalesTeam: ["Residential Advisory"], constructionProgress: 62 },
  { id: "meridian-square", code: "MER-SQR", name: "Meridian Square", developer: "Bluehaven Developments Private Limited", status: "launching", description: "A fictional mixed-use development with commercial and residential inventory.", address: "14 Financial District Road", city: "Hyderabad", state: "Telangana", country: "India", zipCode: "500032", launchDate: "2026-10-01", possessionDate: "2029-03-31", projectType: "Mixed Use", gallery: [], assignedSalesTeam: ["Commercial Advisory", "Residential Advisory"], constructionProgress: 18 },
  { id: "cedar-reserve", code: "CDR-RSV", name: "Cedar Reserve", developer: "Verdant Landmark Works Private Limited", status: "active", description: "A fictional low-density villa community for enterprise inventory demonstrations.", address: "5 Lakeside Boulevard", city: "Pune", state: "Maharashtra", country: "India", zipCode: "411045", possessionDate: "2027-06-30", projectType: "Villas", gallery: [], assignedSalesTeam: ["Private Client Advisory"], constructionProgress: 79 },
] as const;

const towers: readonly InventoryTower[] = [
  { id: "aurora-a", projectId: "aurora-heights", name: "Tower A", floors: 24, totalUnits: 96, status: "under-construction", constructionProgress: 68, notes: "Structure complete through level 19." },
  { id: "aurora-b", projectId: "aurora-heights", name: "Tower B", floors: 22, totalUnits: 88, status: "under-construction", constructionProgress: 56 },
  { id: "meridian-east", projectId: "meridian-square", name: "East Block", floors: 18, totalUnits: 72, status: "launching", constructionProgress: 18 },
  { id: "cedar-villas", projectId: "cedar-reserve", name: "Villa Cluster", floors: 3, totalUnits: 42, status: "active", constructionProgress: 79 },
] as const;

const statuses = ["available", "reserved", "booked", "sold", "blocked", "cancelled"] as const;
const units: readonly InventoryUnit[] = towers.flatMap((tower, towerIndex) =>
  Array.from({ length: 12 }, (_, index): InventoryUnit => {
    const floor = tower.id === "cedar-villas" ? 1 : Math.floor(index / 4) + 2;
    const bedrooms = tower.id === "cedar-villas" ? 4 : (index % 3) + 2;
    const price = (tower.id === "cedar-villas" ? 38_000_000 : 12_500_000) + towerIndex * 1_250_000 + index * 175_000;
    return { id: `${tower.id}-${index + 1}`, projectId: tower.projectId, towerId: tower.id, unitNumber: `${floor}${String((index % 4) + 1).padStart(2, "0")}`, floor, bhkType: `${bedrooms} BHK`, bedrooms, bathrooms: Math.max(2, bedrooms - 1), area: tower.id === "cedar-villas" ? 3600 + index * 25 : 1320 + bedrooms * 180 + index * 12, areaUnit: "sqft", balcony: true, parking: bedrooms >= 4 ? 2 : 1, facing: index % 2 ? "East" : "North", view: index % 3 ? "Garden" : "City", price, offerPrice: index % 4 === 0 ? price - 350_000 : undefined, bookingAmount: Math.round(price * 0.1), currency: "INR", status: statuses[(index + towerIndex) % statuses.length]! };
  }),
);

const prices: readonly PriceRevision[] = units.slice(0, 16).flatMap((unit, index) => [
  { id: `${unit.id}-price-1`, projectId: unit.projectId, unitId: unit.id, effectiveFrom: "2026-01-01", basePrice: unit.price - 500_000, currency: unit.currency },
  { id: `${unit.id}-price-2`, projectId: unit.projectId, unitId: unit.id, effectiveFrom: "2026-07-01", basePrice: unit.price, offerPrice: unit.offerPrice, currency: unit.currency, discountRule: index % 4 === 0 ? "Launch-period offer" : undefined },
]);
const documents: readonly InventoryDocument[] = projects.flatMap((project) => [
  { id: `${project.id}-brochure`, projectId: project.id, title: `${project.name} brochure`, kind: "brochure", placeholder: false },
  { id: `${project.id}-master`, projectId: project.id, title: `${project.name} master plan`, kind: "master-plan", placeholder: false },
  { id: `${project.id}-tour`, projectId: project.id, title: "Virtual tour", kind: "video", placeholder: true },
]);
const audit: readonly InventoryAuditEvent[] = units.slice(0, 8).map((unit, index) => ({ id: `inventory-audit-${index + 1}`, projectId: unit.projectId, unitId: unit.id, action: index % 2 ? "availability.updated" : "price.revised", actorLabel: index % 2 ? "Sales Manager" : "Project Manager", occurredAt: new Date(Date.UTC(2026, 7, 12 - index)).toISOString() }));

export class AuroraInventoryRepository implements InventoryRepository {
  readonly provider = "aurora" as const;
  async projects() { return projects; }
  async towers() { return towers; }
  async units() { return units; }
  async prices() { return prices; }
  async documents() { return documents; }
  async audit() { return audit; }
  async transitionUnit(): Promise<void> { throw new Error("Demo inventory is read-only."); }
}
