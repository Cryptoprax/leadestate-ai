import type { CanonicalBusinessEvent } from "../domain/contracts";
import { BusinessTimelineService } from "../services/timeline.service";
import { CanonicalEventValidator } from "../services/validation.service";
import { InMemoryAppendOnlyTimelineStore } from "../storage/in-memory-timeline.store";
import { SalesHubEventAdapter } from "./adapters/sales-hub.adapter";
import { GrowthHubEventAdapter } from "./adapters/growth-hub.adapter";
import { CommunicationHubEventAdapter } from "./adapters/communication-hub.adapter";
import { CanonicalEventFactory } from "./event.factory";
import type { EventFactoryContext } from "./contracts";

export function createLocalTimelinePreview(): readonly CanonicalBusinessEvent[] {
  let sequence = 0;
  const store = new InMemoryAppendOnlyTimelineStore(() => `preview-event-${++sequence}`, () => new Date("2026-01-15T10:00:00.000Z"));
  const timeline = new BusinessTimelineService(store, new CanonicalEventValidator());
  const context = Object.freeze({
    organizationId: "preview-organization", workspaceId: "preview-workspace", partitionKey: "preview-workspace",
    actor: { id: "preview-user", kind: "user", displayHint: "Preview user" }, owner: { id: "preview-user", kind: "user" },
    source: { kind: "domain-service", producerId: "timeline-preview", module: "business-timeline", producerVersion: "1.3.0", trust: "system" },
  } satisfies EventFactoryContext);
  const validation = { organizationId: context.organizationId, workspaceId: context.workspaceId, allowedVisibilities: ["normal"] as const, allowedClassifications: ["internal"] as const };
  const factory = new CanonicalEventFactory();
  const sales = new SalesHubEventAdapter(factory, context), growth = new GrowthHubEventAdapter(factory, context), communication = new CommunicationHubEventAdapter(factory, context);
  const proposals = [
    sales.leadCreated({ objectId: "preview-lead", objectType: "lead", displayHint: "Preview lead" }, details("A preview lead entered the workspace", "lead-preview", "2026-01-15T09:00:00.000Z")),
    sales.propertyPublished({ objectId: "preview-property", objectType: "property", displayHint: "Preview property" }, { ...details("A preview property was published", "property-preview", "2026-01-15T09:12:00.000Z"), causationId: "preview-event-1" }),
    growth.campaignSaved({ objectId: "preview-campaign", objectType: "campaign", displayHint: "Preview campaign" }, { ...details("A preview campaign definition was saved", "campaign-preview", "2026-01-15T09:24:00.000Z"), causationId: "preview-event-2" }),
    communication.communicationRecorded({ objectId: "preview-communication", objectType: "communication", displayHint: "Preview conversation" }, { ...details("A preview communication was recorded", "communication-preview", "2026-01-15T09:36:00.000Z"), causationId: "preview-event-3" }),
    sales.meetingScheduled({ objectId: "preview-calendar", objectType: "calendar", displayHint: "Preview meeting" }, { ...details("A preview meeting was scheduled", "meeting-preview", "2026-01-15T09:48:00.000Z"), causationId: "preview-event-4", severity: "success" }),
  ];
  proposals.forEach(proposal => timeline.append(proposal, validation));
  return Object.freeze(store.all());
}

function details(summary: string, idempotencyKey: string, occurredAt: string) { return { summary, idempotencyKey, occurredAt, correlationId: "preview-journey", payload: Object.freeze({ preview: true }) } as const }
