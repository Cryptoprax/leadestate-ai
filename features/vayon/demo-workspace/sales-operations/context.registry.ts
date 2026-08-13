import type { ContextObjectIdentity } from "@/features/platform/context-engine/domain/contracts";
import { auroraCalendarEvents,auroraDeals,auroraDocuments,auroraLeads,auroraMeetings,auroraTasks } from "./records";
const objects=[...auroraLeads,...auroraDeals,...auroraTasks,...auroraMeetings,...auroraDocuments,...auroraCalendarEvents];
export class AuroraSalesContextRegistry {readonly identities:readonly ContextObjectIdentity[]=Object.freeze(objects.map(item=>item.identity.context));identity(id:string){return this.identities.find(item=>item.id===id)}}
export const auroraSalesContextRegistry=new AuroraSalesContextRegistry();
