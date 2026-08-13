import type { CanonicalBusinessEvent } from "../domain/contracts";
import type { LiveTimelineFilters, TimelineProjectionView, WorkspaceTimelineScope } from "./live-contracts";

export class LiveTimelineProjectionService {
  workspace(events: readonly CanonicalBusinessEvent[], organizationId: string, workspaceId: string, scope: WorkspaceTimelineScope = { kind: "workspace" }, filters: LiveTimelineFilters = {}): TimelineProjectionView {
    const scoped = events.filter(event => event.organizationId === organizationId && event.workspaceId === workspaceId).filter(event => {
      if (scope.kind === "department") return event.owner.kind === "team" && event.owner.id === scope.departmentId;
      if (scope.kind === "user") return event.actor.id === scope.userId || event.owner.kind === "user" && event.owner.id === scope.userId;
      if (scope.kind === "category") return event.category === scope.category;
      return true;
    });
    return this.render(scoped, filters);
  }

  object(events: readonly CanonicalBusinessEvent[], organizationId: string, object: NonNullable<LiveTimelineFilters["object"]>, filters: LiveTimelineFilters = {}): TimelineProjectionView {
    return this.render(events.filter(event => event.organizationId === organizationId && matchesObject(event, object)), { ...filters, object });
  }

  render(events: readonly CanonicalBusinessEvent[], filters: LiveTimelineFilters = {}): TimelineProjectionView {
    const result = events.filter(event => matchesFilters(event, filters)).sort(compareChronologically);
    return { events: result, order: "chronological", watermark: result.at(-1)?.recordedAt, empty: result.length === 0 };
  }
}

function matchesObject(event: CanonicalBusinessEvent, object: NonNullable<LiveTimelineFilters["object"]>) {
  return event.subject.objectId === object.objectId && event.subject.objectType === object.objectType || event.relatedObjects.some(link => link.object.objectId === object.objectId && link.object.objectType === object.objectType);
}

function matchesFilters(event: CanonicalBusinessEvent, filters: LiveTimelineFilters) {
  return (!filters.from || event.occurredAt >= filters.from)
    && (!filters.to || event.occurredAt <= filters.to)
    && (!filters.categories?.length || filters.categories.includes(event.category))
    && (!filters.priorities?.length || filters.priorities.includes(event.priority))
    && (!filters.severities?.length || filters.severities.includes(event.severity))
    && (!filters.actorId || event.actor.id === filters.actorId)
    && (!filters.workspaceId || event.workspaceId === filters.workspaceId)
    && (!filters.correlationId || event.correlationId === filters.correlationId)
    && (!filters.object || matchesObject(event, filters.object));
}

function compareChronologically(a: CanonicalBusinessEvent, b: CanonicalBusinessEvent) {
  return a.occurredAt.localeCompare(b.occurredAt) || a.sequence - b.sequence || a.eventId.localeCompare(b.eventId);
}
