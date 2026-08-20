import type{DeliveryResult,NotificationChannel,NotificationCategory,NotificationPriority}from"../types";
export interface NotificationEnvelope{organizationId:string;workspaceId:string;userId?:string;category:NotificationCategory;title:string;body:string;priority?:NotificationPriority;channels?:NotificationChannel[];dedupeKey:string;sourceType?:string;sourceId?:string;mentioned?:boolean}
export interface NotificationProvider{readonly id:string;readonly version:string;deliver(input:NotificationEnvelope):Promise<{id:string;deliveries:DeliveryResult[]}>}
