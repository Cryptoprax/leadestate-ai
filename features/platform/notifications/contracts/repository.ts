import type {
  NotificationPreference,
  PlatformNotification,
} from "../domain/notification";
export interface NotificationRepository {
  list(recipientId: string): Promise<readonly PlatformNotification[]>;
  preferences(recipientId: string): Promise<readonly NotificationPreference[]>;
}
