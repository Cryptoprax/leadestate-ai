import type {
  DomainEvent,
  EventFilter,
  EventSubscriber,
} from "../domain/event";
import { EventRegistry } from "../registry/event.registry";
export interface EventPublisher {
  publish(event: DomainEvent): Promise<void>;
}
export class InMemoryEventBus implements EventPublisher {
  private events: DomainEvent[] = [];
  private subscribers = new Map<string, EventSubscriber>();
  constructor(private registry = new EventRegistry()) {}
  async publish(event: DomainEvent) {
    if (!this.registry.has(event.eventType))
      throw new Error(`Unregistered event type: ${event.eventType}`);
    if (this.events.some((x) => x.eventId === event.eventId)) return;
    const immutable = Object.freeze({
      ...event,
      payloadMetadata: Object.freeze({ ...event.payloadMetadata }),
    });
    this.events.push(immutable);
    for (const subscriber of this.subscribers.values())
      if (subscriber.eventTypes.includes(event.eventType))
        await subscriber.handle(immutable);
  }
  subscribe(subscriber: EventSubscriber) {
    this.subscribers.set(subscriber.id, subscriber);
    return () => this.subscribers.delete(subscriber.id);
  }
  history(filter: EventFilter = {}): readonly DomainEvent[] {
    const term = filter.search?.toLowerCase();
    return Object.freeze(
      this.events.filter(
        (x) =>
          (!filter.types || filter.types.includes(x.eventType)) &&
          (!filter.sourceModules ||
            filter.sourceModules.includes(x.sourceModule)) &&
          (!filter.severities || filter.severities.includes(x.severity)) &&
          (!filter.correlationId || x.correlationId === filter.correlationId) &&
          (!filter.from || x.timestamp >= filter.from) &&
          (!filter.to || x.timestamp <= filter.to) &&
          (!term ||
            [x.eventType, x.sourceModule, x.evidenceReference ?? ""].some((v) =>
              v.toLowerCase().includes(term),
            )),
      ),
    );
  }
  async replay(filter: EventFilter = {}, subscriberIds?: readonly string[]) {
    const targets = [...this.subscribers.values()].filter(
      (x) => !subscriberIds || subscriberIds.includes(x.id),
    );
    for (const event of this.history(filter))
      for (const subscriber of targets)
        if (subscriber.eventTypes.includes(event.eventType))
          await subscriber.handle(event);
  }
  snapshot() {
    return Object.freeze([...this.events]);
  }
}
