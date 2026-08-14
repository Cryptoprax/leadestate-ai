import type { NotificationRepository } from "../contracts/repository";
import type {
  NotificationPreference,
  PlatformNotification,
} from "../domain/notification";
const categories = [
  "workflow",
  "crm",
  "deals",
  "properties",
  "calendar",
  "communications",
  "ai-workforce",
  "analytics",
  "integrations",
  "platform",
] as const;
export class InMemoryNotificationRepository implements NotificationRepository {
  constructor(
    private readonly notifications: readonly PlatformNotification[] = [],
  ) {}
  async list(recipientId: string) {
    return Object.freeze(
      this.notifications.filter((x) => x.recipientId === recipientId),
    );
  }
  async preferences(): Promise<readonly NotificationPreference[]> {
    return categories.map((category) => ({
      category,
      inAppEnabled: true,
      pushEnabled: false,
      emailEnabled: false,
      smsEnabled: false,
      whatsappEnabled: false,
      readOnly: true,
    }));
  }
}
