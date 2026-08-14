import type { CalendarDescriptor,CalendarEventInput,GoogleCalendarHealth,CalendarQuery,CalendarWorkspaceEvent,FreeBusyQuery,MeetingLink,WatchChannel,WatchRequest,CrmReference } from "../domain/models";

export interface GoogleCalendarProviderContract {
  readonly id:"google_calendar"; readonly name:"Google Calendar"; readonly version:string;
  connect():Promise<never>; disconnect():Promise<void>; health():Promise<GoogleCalendarHealth>; validate():Promise<boolean>;
  listCalendars():Promise<readonly CalendarDescriptor[]>; getCalendar(id:string):Promise<CalendarDescriptor>;
  listEvents(query:CalendarQuery):Promise<import("../domain/models").EventPage>; getEvent(calendarId:string,eventId:string):Promise<CalendarWorkspaceEvent>;
  createEvent(input:CalendarEventInput):Promise<CalendarWorkspaceEvent>; updateEvent(eventId:string,input:CalendarEventInput):Promise<CalendarWorkspaceEvent>;
  deleteEvent(calendarId:string,eventId:string):Promise<void>; moveEvent(calendarId:string,eventId:string,destinationCalendarId:string):Promise<CalendarWorkspaceEvent>;
  listAttendees(calendarId:string,eventId:string):Promise<CalendarWorkspaceEvent["attendees"]>; freeBusy(query:FreeBusyQuery):Promise<Readonly<Record<string,readonly {start:string;end:string}[]>>>;
  watch(input:WatchRequest):Promise<WatchChannel>; stopWatching(channelId:string,resourceId:string):Promise<void>; refreshToken():Promise<void>;
  linkEvent(calendarId:string,eventId:string,reference:CrmReference):Promise<MeetingLink>;
}
