import {
  auroraBusinessActivity,
  auroraContacts,
  auroraDeals,
  auroraEmployees,
  auroraLeads,
  auroraProperties,
} from "@/features/vayon/demo-workspace";
import type {
  DemoInventory,
  DemoRecord,
  DemoRepository,
} from "../domain/contracts";

const frozen = <T>(value: T): T => Object.freeze(value);
export class AuroraDemoRepository implements DemoRepository {
  load(): DemoInventory {
    const properties = auroraProperties.map((item) =>
      frozen<DemoRecord>({
        id: item.id,
        kind: "properties",
        title: item.name,
        subtitle: `${item.locality}, ${item.city}`,
        status: item.status,
        meta: [
          item.propertyType.replaceAll("-", " "),
          item.priceRange.label,
          `${item.areaSquareFeet.toLocaleString("en-IN")} sq ft`,
          item.assignedSalesTeam,
        ],
        image: item.thumbnailPlaceholder,
      }),
    );
    const leads = Array.from({ length: 520 }, (_, index) => {
      const source = auroraLeads[index % auroraLeads.length]!,
        contact = auroraContacts.find((item) => item.id === source.contactId)!,
        property = auroraProperties.find(
          (item) => item.id === source.preferredPropertyId,
        )!;
      return frozen<DemoRecord>({
        id: `demo-lead-${index + 1}`,
        kind: "leads",
        title:
          index < auroraLeads.length
            ? contact.name
            : `${contact.name} · Portfolio ${Math.floor(index / auroraLeads.length) + 1}`,
        subtitle: `${contact.email} · ${contact.phone}`,
        status: source.status,
        meta: [
          source.priority,
          source.budgetRange,
          source.source.replaceAll("-", " "),
          property.name,
          source.buyingTimeline.replaceAll("-", " "),
        ],
      });
    });
    const deals = auroraDeals.map((item) => {
      const property = auroraProperties.find(
          (property) => property.id === item.propertyId,
        )!,
        contact = auroraContacts.find(
          (contact) => contact.id === item.primaryContactId,
        )!;
      return frozen<DemoRecord>({
        id: item.id,
        kind: "deals",
        title: property.name,
        subtitle: contact.name,
        status: item.stage,
        meta: [
          property.priceRange.label,
          property.city,
          auroraEmployees.find((person) => person.id === item.salesAgentId)
            ?.name ?? "Assigned sales team",
        ],
      });
    });
    const whatsappBase = auroraBusinessActivity.communications.filter(
      (item) => item.channel === "whatsapp",
    );
    const communications = Array.from({ length: 240 }, (_, index) => {
      const item = whatsappBase[index % whatsappBase.length]!,
        contact = auroraContacts.find((value) => value.id === item.contactId)!;
      return frozen<DemoRecord>({
        id: `demo-whatsapp-${index + 1}`,
        kind: "communications",
        title: contact.name,
        subtitle: item.preview,
        status:
          index % 7 === 0 ? "unread" : index % 19 === 0 ? "typing" : "replied",
        meta: [item.direction, item.subject],
        occurredAt: item.occurredAt,
      });
    });
    const activity = auroraBusinessActivity.timeline.events
      .slice(-720)
      .reverse()
      .map((item) =>
        frozen<DemoRecord>({
          id: item.eventId,
          kind: "activity",
          title: item.summary,
          subtitle: item.eventName,
          status: item.severity,
          meta: [item.category, item.priority, item.source.module],
          occurredAt: item.occurredAt,
        }),
      );
    return frozen({
      organization: "Aurora Realty Group",
      persistence: "seeded-json-fixtures",
      readOnly: true,
      properties: frozen(properties),
      leads: frozen(leads),
      deals: frozen(deals),
      communications: frozen(communications),
      activity: frozen(activity),
    });
  }
}
