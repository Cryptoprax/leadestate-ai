import { eventTypes, type DomainEventType } from "../domain/event";
export interface EventDefinition {
  readonly type: DomainEventType;
  readonly version: 1;
  readonly description: string;
  readonly executionAllowed: false;
}
export class EventRegistry {
  private readonly definitions = new Map<DomainEventType, EventDefinition>(
    eventTypes.map((type) => [
      type,
      {
        type,
        version: 1,
        description: type.replace(/([A-Z])/g, " $1").trim(),
        executionAllowed: false,
      },
    ]),
  );
  list() {
    return Object.freeze([...this.definitions.values()]);
  }
  get(type: DomainEventType) {
    return this.definitions.get(type);
  }
  has(type: string): type is DomainEventType {
    return this.definitions.has(type as DomainEventType);
  }
}
