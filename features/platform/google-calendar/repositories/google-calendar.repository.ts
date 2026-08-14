import "server-only";
import { GoogleCalendarService } from "@/features/platform/integrations/google/services/calendar.service";
import { GoogleApiService } from "@/features/platform/integrations/google/services/google-api.service";
import { GoogleOAuthService } from "@/features/platform/integrations/google/services/google-oauth.service";
import type { GoogleCalendarRepositoryContract } from "../contracts/repository";
import type { CalendarEventInput,CalendarWorkspaceEvent,CrmReference,MeetingLink,WatchChannel,WatchRequest } from "../domain/models";

const base="https://www.googleapis.com/calendar/v3";
type ApiEvent={id:string;summary?:string;description?:string;location?:string;start:{dateTime?:string;date?:string;timeZone?:string};end:{dateTime?:string;date?:string;timeZone?:string};attendees?:{email:string;displayName?:string;responseStatus?:"needsAction"|"declined"|"tentative"|"accepted";organizer?:boolean;optional?:boolean}[];organizer?:{email?:string};conferenceData?:{conferenceId?:string;conferenceSolution?:{name?:string};entryPoints?:{entryPointType:string;uri:string}[]};reminders?:{overrides?:{method:"email"|"popup";minutes:number}[]};transparency?:"opaque"|"transparent";colorId?:string;status?:"confirmed"|"tentative"|"cancelled";htmlLink?:string;recurringEventId?:string;recurrence?:string[]};
function eventModel(value:ApiEvent,calendarId:string):CalendarWorkspaceEvent{return{id:value.id,calendarId,title:value.summary??"Untitled",description:value.description??"",location:value.location??"",start:value.start.dateTime??value.start.date??"",end:value.end.dateTime??value.end.date??"",allDay:!!value.start.date,timeZone:value.start.timeZone??null,recurringEventId:value.recurringEventId??null,recurrence:value.recurrence??[],attendees:(value.attendees??[]).map(a=>({email:a.email,displayName:a.displayName??null,responseStatus:a.responseStatus??"needsAction",organizer:a.organizer??false,optional:a.optional??false})),organizer:value.organizer?.email??null,conferenceUrl:value.conferenceData?.entryPoints?.find(x=>x.entryPointType==="video")?.uri??null,reminders:value.reminders?.overrides??[],transparency:value.transparency??"opaque",colorId:value.colorId??null,status:value.status??"confirmed",htmlLink:value.htmlLink??null}}

export class GoogleCalendarRepository implements GoogleCalendarRepositoryContract {
  constructor(private readonly calendarApi=new GoogleCalendarService(),private readonly api=new GoogleApiService(),private readonly oauth=new GoogleOAuthService()){}
  async status(){try{return await this.calendarApi.status()}catch{return "unavailable" as const}}
  calendars(){return this.calendarApi.calendars()}
  async calendar(id:string){const found=(await this.calendars()).find(item=>item.id===id);if(!found)throw new Error("Calendar was not found or is not accessible.");return found}
  events(query:Parameters<GoogleCalendarService["events"]>[0]){return this.calendarApi.events(query)}
  async event(calendarId:string,eventId:string){const response=await this.api.request<ApiEvent>(`${base}/calendars/${encodeURIComponent(calendarId)}/events/${encodeURIComponent(eventId)}`);return eventModel(response,calendarId)}
  create(input:CalendarEventInput){return this.calendarApi.create(input)} update(eventId:string,input:CalendarEventInput){return this.calendarApi.update(eventId,input)} remove(calendarId:string,eventId:string){return this.calendarApi.remove(calendarId,eventId)}
  async move(calendarId:string,eventId:string,destinationCalendarId:string){const query=new URLSearchParams({destination:destinationCalendarId,sendUpdates:"all"}),response=await this.api.request<ApiEvent>(`${base}/calendars/${encodeURIComponent(calendarId)}/events/${encodeURIComponent(eventId)}/move?${query}`,{method:"POST"});return eventModel(response,destinationCalendarId)}
  // Delegates to the existing Google Calendar freeBusy adapter.
  availability(query:Parameters<GoogleCalendarService["availability"]>[0]){return this.calendarApi.availability(query)}
  async watch(input:WatchRequest):Promise<WatchChannel>{const response=await this.api.request<{id:string;resourceId:string;resourceUri:string;expiration?:string}>(`${base}/calendars/${encodeURIComponent(input.calendarId)}/events/watch`,{method:"POST",body:JSON.stringify({id:input.channelId,type:"web_hook",address:input.callbackUrl,token:input.token,expiration:input.expiresAt?new Date(input.expiresAt).getTime():undefined})});return{id:response.id,resourceId:response.resourceId,resourceUri:response.resourceUri,expiresAt:response.expiration?new Date(Number(response.expiration)).toISOString():null}}
  stopWatching(channelId:string,resourceId:string){return this.api.request<void>(`${base}/channels/stop`,{method:"POST",body:JSON.stringify({id:channelId,resourceId})})}
  async refresh(){await this.oauth.accessToken(true)}
  async link(calendarId:string,eventId:string,reference:CrmReference):Promise<MeetingLink>{void calendarId;void eventId;void reference;throw new Error("CRM event linking storage is unavailable. No relationship was created.")}
}
