import type { MailAttachment, MailMessage, MailThread, MailboxFolder } from "@/features/platform/messaging";

export type GmailConnectionState = "connected" | "disconnected" | "authorization_required" | "unavailable";
export type GmailHealthState = "healthy" | "needs_attention" | "authorization_required" | "unavailable";
export interface GmailSearch { readonly text?:string; readonly subject?:string; readonly sender?:string; readonly recipient?:string; readonly labels?:readonly string[]; readonly after?:string; readonly before?:string; readonly unread?:boolean; readonly hasAttachments?:boolean }
export interface GmailPage { readonly messages:readonly MailMessage[]; readonly nextPageToken:string|null; readonly resultSizeEstimate:number }
export interface GmailLabel { readonly id:string; readonly name:string; readonly type:"system"|"user"; readonly messageListVisibility?:string }
export interface GmailDraft { readonly id:string; readonly message?:MailMessage }
export interface GmailHealth { readonly state:GmailHealthState; readonly connection:GmailConnectionState; readonly latencyMs:number|null; readonly lastValidation:string|null; readonly lastRefresh:string|null; readonly quotaRemaining:number|null; readonly version:string; readonly reason?:string }
export interface GmailContextReference { readonly type:"lead"|"customer"|"deal"|"property"|"timeline"; readonly id:string; readonly label:string }
export interface GmailIntelligence { readonly state:"unavailable"; readonly summary:null; readonly suggestedReply:null; readonly followUp:null; readonly priority:null; readonly sentiment:null; readonly nextAction:null; readonly reason:"AI provider unavailable." }
export type { MailAttachment, MailMessage, MailThread, MailboxFolder };
