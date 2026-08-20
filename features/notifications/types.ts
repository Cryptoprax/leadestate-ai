export const notificationCategories = ["system","ai_recommendation","workflow","crm","lead","deal","whatsapp","gmail","calendar","billing","security","organization","user_invitation","approval","marketing"] as const;
export const notificationChannels = ["in_app","email","browser_push","whatsapp","webhook"] as const;
export const notificationPriorities = ["low","normal","high","urgent"] as const;
export const reminderKinds = ["meeting","task","lead_follow_up","deal_deadline","subscription_renewal","trial_ending","workflow_approval","ai_recommendation","custom"] as const;
export type NotificationCategory=typeof notificationCategories[number];
export type NotificationChannel=typeof notificationChannels[number];
export type NotificationPriority=typeof notificationPriorities[number];
export type ReminderKind=typeof reminderKinds[number];
export type NotificationView="all"|"unread"|"read"|"archived"|"snoozed"|"starred"|"mentioned"|"high_priority";
export interface NotificationRecord{id:string;category:NotificationCategory;title:string;body:string;priority:NotificationPriority;sourceType?:string;sourceId?:string;readAt?:string;archivedAt?:string;snoozedUntil?:string;starred:boolean;mentioned:boolean;createdAt:string;channels:NotificationChannel[]}
export interface NotificationQuery{view?:NotificationView;category?:NotificationCategory;search?:string;page?:number;pageSize?:number}
export interface NotificationPage{items:NotificationRecord[];page:number;pageSize:number;hasMore:boolean;unreadCount:number}
export interface NotificationPreference{email:boolean;inApp:boolean;browserPush:boolean;whatsapp:boolean;webhook:boolean;muted:boolean;quietHoursStart?:string;quietHoursEnd?:string;digestFrequency:"instant"|"daily"|"weekly"|"off";categories:Partial<Record<NotificationCategory,boolean>>}
export interface NotificationObservability{unreadCount:number;queued:number;delivered:number;failed:number;averageLatencyMs:number|null;byChannel:Partial<Record<NotificationChannel,number>>;byCategory:Partial<Record<NotificationCategory,number>>}
export interface ReminderRecord{id:string;kind:ReminderKind;title:string;remindAt:string;status:"scheduled"|"sent"|"cancelled";sourceType?:string;sourceId?:string}
export interface DeliveryResult{channel:NotificationChannel;state:"queued"|"recommendation_only"|"future_ready"|"disabled";reason?:string}
