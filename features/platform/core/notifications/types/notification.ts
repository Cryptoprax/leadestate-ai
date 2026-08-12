export type NotificationPriority = "Critical" | "High" | "Normal" | "Low";
export type NotificationStatus = "Unread" | "Read" | "Resolved";
export type NotificationCategory =
  | "Platform"
  | "Applications"
  | "Organizations"
  | "Security"
  | "Billing"
  | "AI"
  | "Marketing"
  | "Support";

export interface Notification {
  id: string;
  title: string;
  description: string;
  priority: NotificationPriority;
  time: string;
  source: string;
  status: NotificationStatus;
  action: string;
  category: NotificationCategory;
}
