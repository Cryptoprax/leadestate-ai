export type NotificationCategory =
  | "workflow"
  | "crm"
  | "deals"
  | "properties"
  | "calendar"
  | "communications"
  | "ai-workforce"
  | "analytics"
  | "integrations"
  | "platform";
export interface PlatformNotification {
  readonly notificationId: string;
  readonly title: string;
  readonly body: string;
  readonly category: NotificationCategory;
  readonly priority: "low" | "normal" | "high" | "critical";
  readonly status: "active" | "archived";
  readonly recipientId: string;
  readonly module: string;
  readonly relatedEntity?: Readonly<{ type: string; id: string }>;
  readonly relatedRoute?: string;
  readonly timestamp: string;
  readonly read: boolean;
  readonly dismissed: boolean;
  readonly eventId: string;
}
export interface NotificationPreference {
  readonly category: NotificationCategory;
  readonly inAppEnabled: boolean;
  readonly pushEnabled: false;
  readonly emailEnabled: false;
  readonly smsEnabled: false;
  readonly whatsappEnabled: false;
  readonly readOnly: true;
}
