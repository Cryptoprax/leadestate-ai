export type NotificationChannel="in_app"|"email"|"webhook";export interface NotificationRecord{id:string;category:string;title:string;body:string;priority:string;readAt?:string;createdAt:string}
