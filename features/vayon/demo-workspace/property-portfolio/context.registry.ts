import type { ContextObjectIdentity } from "@/features/platform/context-engine/domain/contracts";
import { auroraProperties } from "./properties";
export class AuroraPropertyContextRegistry {readonly identities:readonly ContextObjectIdentity[]=Object.freeze(auroraProperties.map(property=>property.identity.context));identity(id:string){return this.identities.find(item=>item.id===id)}}
export const auroraPropertyContextRegistry=new AuroraPropertyContextRegistry();
