import type { CanonicalBusinessEvent, TimelineObjectRef } from "../domain/contracts";
import type { CorrelationExploration } from "../projections/live-contracts";

export class TimelineCorrelationService {
  explore(events: readonly CanonicalBusinessEvent[], correlationId: string): CorrelationExploration {
    const chain = events.filter(event => event.correlationId === correlationId).sort((a, b) => a.occurredAt.localeCompare(b.occurredAt) || a.sequence - b.sequence);
    const ids = new Set(chain.map(event => event.eventId));
    const objects = new Map<string, TimelineObjectRef>();
    chain.forEach(event => [event.subject, ...event.relatedObjects.map(link => link.object)].forEach(object => objects.set(`${object.objectType}:${object.objectId}`, object)));
    return {
      correlationId,
      nodes: chain.map((event, index) => ({ event, depth: index, relation: index === 0 ? "origin" : event.causationId && ids.has(event.causationId) ? "caused" : "correlated" })),
      relatedObjects: [...objects.values()],
      complete: chain.every((event, index) => index === 0 || !event.causationId || ids.has(event.causationId)),
    };
  }
}
