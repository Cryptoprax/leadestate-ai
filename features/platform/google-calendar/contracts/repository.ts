import type { CalendarDescriptor,CalendarEventInput,CalendarQuery,CalendarWorkspaceEvent,CrmReference,FreeBusyQuery,MeetingLink,WatchChannel,WatchRequest,EventPage } from "../domain/models";
export interface GoogleCalendarRepositoryContract {
  status():Promise<"connected"|"not_connected"|"scope_required"|"unavailable">; calendars():Promise<readonly CalendarDescriptor[]>; calendar(id:string):Promise<CalendarDescriptor>;
  events(query:CalendarQuery):Promise<EventPage>; event(calendarId:string,eventId:string):Promise<CalendarWorkspaceEvent>; create(input:CalendarEventInput):Promise<CalendarWorkspaceEvent>; update(eventId:string,input:CalendarEventInput):Promise<CalendarWorkspaceEvent>; remove(calendarId:string,eventId:string):Promise<void>; move(calendarId:string,eventId:string,destinationCalendarId:string):Promise<CalendarWorkspaceEvent>;
  availability(query:FreeBusyQuery):Promise<Readonly<Record<string,readonly {start:string;end:string}[]>>>; watch(input:WatchRequest):Promise<WatchChannel>; stopWatching(channelId:string,resourceId:string):Promise<void>; refresh():Promise<void>; link(calendarId:string,eventId:string,reference:CrmReference):Promise<MeetingLink>;
}
