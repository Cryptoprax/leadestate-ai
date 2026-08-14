import "server-only";
import type { ComposeMail } from "@/features/platform/messaging";
import type { GmailRepository } from "../contracts/repository";
import type { GmailContextReference, GmailIntelligence, GmailSearch, MailboxFolder } from "../domain/models";
import { GoogleGmailRepository } from "../repositories/google-gmail.repository";

export class GmailPlatformService {
  constructor(private readonly repository:GmailRepository=new GoogleGmailRepository()){}
  async health(){const started=Date.now();try{const status=await this.repository.status(),connection=status==="connected"?"connected":status==="scope_required"?"authorization_required":"disconnected";return{state:status==="connected"?"healthy":status==="scope_required"?"authorization_required":"needs_attention",connection,latencyMs:Date.now()-started,lastValidation:new Date().toISOString(),lastRefresh:null,quotaRemaining:null,version:"1.0.0",...(status!=="connected"&&{reason:status==="scope_required"?"Gmail scopes must be granted.":"Gmail is not connected."})}as const}catch{return{state:"unavailable",connection:"unavailable",latencyMs:Date.now()-started,lastValidation:new Date().toISOString(),lastRefresh:null,quotaRemaining:null,version:"1.0.0",reason:"Gmail connection could not be validated."}as const}}
  list(folder:MailboxFolder,search?:GmailSearch,pageToken?:string){return this.repository.list(folder,search,pageToken)} message(id:string){return this.repository.message(id)} thread(id:string){return this.repository.thread(id)} threads(search?:GmailSearch,pageToken?:string){return this.repository.threads(search,pageToken)} send(input:ComposeMail){return this.repository.send(input)} createDraft(input:ComposeMail){return this.repository.createDraft(input)} updateDraft(id:string,input:ComposeMail){return this.repository.updateDraft(id,input)} deleteDraft(id:string){return this.repository.deleteDraft(id)} labels(){return this.repository.labels()} refresh(){return this.repository.refresh()}
  references():readonly GmailContextReference[]{return[]} intelligence():GmailIntelligence{return{state:"unavailable",summary:null,suggestedReply:null,followUp:null,priority:null,sentiment:null,nextAction:null,reason:"AI provider unavailable."}}
}
