import "server-only";
import type { ComposeMail, MailboxFolder } from "@/features/platform/messaging";
import { GmailService as GoogleGmailService } from "@/features/platform/integrations/google/services/gmail.service";
import { GoogleOAuthService } from "@/features/platform/integrations/google/services/google-oauth.service";
import type { GmailRepository } from "../contracts/repository";
import type { GmailSearch } from "../domain/models";

export function toGmailQuery(search: GmailSearch = {}) {
  return [search.text,search.subject&&`subject:${search.subject}`,search.sender&&`from:${search.sender}`,search.recipient&&`to:${search.recipient}`,...(search.labels??[]).map(x=>`label:${x}`),search.after&&`after:${search.after}`,search.before&&`before:${search.before}`,search.unread===true&&"is:unread",search.unread===false&&"is:read",search.hasAttachments&&"has:attachment"].filter(Boolean).join(" ");
}
export class GoogleGmailRepository implements GmailRepository {
  constructor(private readonly gmail=new GoogleGmailService(),private readonly oauth=new GoogleOAuthService()){}
  status(){return this.gmail.status()} list(folder:MailboxFolder,search?:GmailSearch,pageToken?:string){return this.gmail.list(folder,toGmailQuery(search),pageToken)} message(id:string){return this.gmail.message(id)} thread(id:string){return this.gmail.thread(id)}
  async threads(search?:GmailSearch,pageToken?:string){const page=await this.gmail.list("inbox",toGmailQuery(search),pageToken);const ids=[...new Set(page.messages.map(x=>x.threadId))];return Promise.all(ids.map(id=>this.gmail.thread(id)))}
  send(input:ComposeMail){return this.gmail.send(input)} createDraft(input:ComposeMail){return this.gmail.saveDraft(input)} updateDraft(id:string,input:ComposeMail){return this.gmail.updateDraft(id,input)} deleteDraft(id:string){return this.gmail.deleteDraft(id)} labels(){return this.gmail.labels()} async refresh(){await this.oauth.accessToken(true)}
}
