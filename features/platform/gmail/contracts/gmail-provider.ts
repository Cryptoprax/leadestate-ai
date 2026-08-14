import type { ComposeMail } from "@/features/platform/messaging";
import type { GmailDraft, GmailHealth, GmailLabel, GmailPage, GmailSearch, MailMessage, MailThread, MailboxFolder } from "../domain/models";

export interface GmailProviderContract {
  readonly id:"gmail"; readonly name:"Gmail"; readonly version:string;
  connect():Promise<never>; disconnect():Promise<void>; health():Promise<GmailHealth>; validate():Promise<boolean>;
  listMessages(folder:MailboxFolder,search?:GmailSearch,pageToken?:string):Promise<GmailPage>;
  getMessage(id:string):Promise<MailMessage>; searchMessages(search:GmailSearch,pageToken?:string):Promise<GmailPage>;
  listThreads(search?:GmailSearch,pageToken?:string):Promise<readonly MailThread[]>; getThread(id:string):Promise<MailThread>;
  sendMessage(input:ComposeMail):Promise<{id:string;threadId:string}>; createDraft(input:ComposeMail):Promise<{id:string}>;
  updateDraft(id:string,input:ComposeMail):Promise<GmailDraft>; deleteDraft(id:string):Promise<void>;
  listLabels():Promise<readonly GmailLabel[]>; refreshToken():Promise<void>;
}
