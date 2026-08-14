import type { CalendarAttendee, CalendarDescriptor, CalendarEventInput, CalendarWorkspaceEvent, EventPage } from "@/features/platform/calendar";

export type GoogleCalendarConnection = "connected" | "disconnected" | "authorization_required" | "unavailable";
export interface GoogleCalendarHealth { readonly state:"healthy"|"needs_attention"|"authorization_required"|"unavailable"; readonly connection:GoogleCalendarConnection; readonly latencyMs:number|null; readonly quota:"available"|"limited"|"unknown"; readonly syncStatus:"live"|"not_connected"|"unavailable"; readonly lastSync:string|null; readonly lastRefresh:string|null; readonly version:string; readonly reason?:string }
export interface CalendarQuery { readonly calendarIds:readonly string[]; readonly timeMin:string; readonly timeMax:string; readonly query?:string; readonly pageToken?:string }
export interface FreeBusyQuery { readonly calendarIds:readonly string[]; readonly timeMin:string; readonly timeMax:string; readonly timeZone:string }
export interface WatchRequest { readonly calendarId:string; readonly channelId:string; readonly callbackUrl:string; readonly token?:string; readonly expiresAt?:string }
export interface WatchChannel { readonly id:string; readonly resourceId:string; readonly resourceUri:string; readonly expiresAt:string|null }
export type CrmReferenceType="lead"|"customer"|"property"|"deal"|"meeting"|"site_visit"|"timeline";
export interface CrmReference { readonly type:CrmReferenceType; readonly id:string; readonly label:string; readonly source:"authoritative" }
export interface MeetingLink { readonly calendarId:string; readonly eventId:string; readonly reference:CrmReference; readonly linkedAt:string }
export interface CalendarIntelligence { readonly state:"unavailable"; readonly summary:null; readonly suggestedAttendees:readonly never[]; readonly conflicts:readonly never[]; readonly suggestedTime:null; readonly followUp:null; readonly priority:null; readonly recommendations:readonly never[]; readonly reason:string }
export type { CalendarAttendee, CalendarDescriptor, CalendarEventInput, CalendarWorkspaceEvent, EventPage };
