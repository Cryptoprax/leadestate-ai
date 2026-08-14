import type { DomainEvent } from "@/features/platform/event-bus/domain/event";
import type { NotificationRepository } from "../contracts/repository";
import type {
  NotificationCategory,
  PlatformNotification,
} from "../domain/notification";
import { InMemoryNotificationRepository } from "../repositories/in-memory.repository";
const category = (module: string): NotificationCategory =>
  [
    "workflow",
    "crm",
    "deals",
    "properties",
    "calendar",
    "communications",
    "analytics",
    "integrations",
    "platform",
  ].includes(module)
    ? (module as NotificationCategory)
    : module === "workforce"
      ? "ai-workforce"
      : "platform";
export class NotificationService {
  constructor(
    private repository: NotificationRepository = new InMemoryNotificationRepository(),
  ) {}
  inbox(recipientId: string) {
    return this.repository.list(recipientId);
  }
  preferences(recipientId: string) {
    return this.repository.preferences(recipientId);
  }
  fromEvent(event: DomainEvent, recipientId: string): PlatformNotification {
    return Object.freeze({
      notificationId: `notification-${event.eventId}`,
      title: event.eventType.replace(/([A-Z])/g, " $1").trim(),
      body: `Event from ${event.sourceModule}. Review the linked evidence.`,
      category: category(event.sourceModule),
      priority:
        event.severity === "critical"
          ? "critical"
          : event.severity === "warning"
            ? "high"
            : "normal",
      status: "active",
      recipientId,
      module: event.sourceModule,
      relatedRoute: undefined,
      timestamp: event.timestamp,
      read: false,
      dismissed: false,
      eventId: event.eventId,
    });
  }
}
export const notificationDeliveryPolicy = {
  readOnly: true,
  deterministic: true,
  push: false,
  email: false,
  sms: false,
  whatsapp: false,
  browserPush: false,
  externalProviders: false,
} as const;
