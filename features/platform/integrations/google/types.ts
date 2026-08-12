export type GoogleProduct="gmail"|"calendar";
export interface GoogleConnection{id:string;email:string;scopes:string[];expiresAt:string;connectedAt:string}
export interface GmailMessage{id:string;threadId:string;snippet:string;subject:string;from:string;to:string;date:string;labels:string[]}
export interface CalendarEvent{id:string;summary:string;description?:string;start:string;end:string;location?:string;attendees:string[];htmlLink?:string}
