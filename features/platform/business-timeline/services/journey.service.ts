import type { CanonicalBusinessEvent } from "../domain/contracts";
import type { JourneyStep } from "../projections/live-contracts";

export class TimelineJourneyService {
  build(events: readonly CanonicalBusinessEvent[]): readonly JourneyStep[] {
    const ordered = [...events].sort((a, b) => a.occurredAt.localeCompare(b.occurredAt) || a.sequence - b.sequence);
    return ordered.map((event, index) => ({
      event,
      stage: index === 0 ? "origin" : index === ordered.length - 1 && isOutcome(event) ? "outcome" : index === ordered.length - 1 ? "current" : "intermediate",
    }));
  }
}

function isOutcome(event: CanonicalBusinessEvent) {
  return event.severity === "success" || /(?:completed|closed|won|lost|approved|rejected|cancelled|outcome)$/i.test(event.eventName);
}
