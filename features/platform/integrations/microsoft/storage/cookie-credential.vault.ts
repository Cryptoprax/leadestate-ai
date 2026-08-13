import"server-only";
import{createCipheriv,createDecipheriv,createHash,randomBytes}from"node:crypto";
import{cookies}from"next/headers";
import type{MicrosoftCredentialVault,StoredMicrosoftCredential}from"../contracts";
const prefix="vayon_ms_credential",chunkSize=3000,maxChunks=8;
function key(){const secret=process.env.MICROSOFT_TOKEN_ENCRYPTION_KEY;if(!secret)throw new Error("MICROSOFT_TOKEN_ENCRYPTION_KEY is required.");return createHash("sha256").update(secret).digest()}
function seal(workspaceId:string,value:StoredMicrosoftCredential){const iv=randomBytes(12),cipher=createCipheriv("aes-256-gcm",key(),iv);cipher.setAAD(Buffer.from(workspaceId));const encrypted=Buffer.concat([cipher.update(JSON.stringify(value),"utf8"),cipher.final()]);return Buffer.concat([iv,cipher.getAuthTag(),encrypted]).toString("base64url")}
function open(workspaceId:string,value:string){const packed=Buffer.from(value,"base64url"),iv=packed.subarray(0,12),tag=packed.subarray(12,28),encrypted=packed.subarray(28),decipher=createDecipheriv("aes-256-gcm",key(),iv);decipher.setAAD(Buffer.from(workspaceId));decipher.setAuthTag(tag);return JSON.parse(Buffer.concat([decipher.update(encrypted),decipher.final()]).toString("utf8"))as StoredMicrosoftCredential}
export class MicrosoftCookieCredentialVault implements MicrosoftCredentialVault{
  async load(workspaceId:string){const store=await cookies(),count=Number(store.get(`${prefix}_count`)?.value??0);if(!count||count>maxChunks)return null;const sealed=Array.from({length:count},(_,index)=>store.get(`${prefix}_${index}`)?.value??"").join("");if(!sealed)return null;try{return open(workspaceId,sealed)}catch{return null}}
  async save(workspaceId:string,credential:StoredMicrosoftCredential){const store=await cookies(),sealed=seal(workspaceId,credential),chunks=sealed.match(new RegExp(`.{1,${chunkSize}}`,"g"))??[];if(chunks.length>maxChunks)throw new Error("Microsoft credential exceeds the encrypted session vault capacity.");await this.remove();const options={httpOnly:true,secure:process.env.NODE_ENV==="production",sameSite:"lax"as const,path:"/",maxAge:60*60*24*30};store.set(`${prefix}_count`,String(chunks.length),options);chunks.forEach((chunk,index)=>store.set(`${prefix}_${index}`,chunk,options))}
  async remove(){const store=await cookies();store.delete(`${prefix}_count`);for(let index=0;index<maxChunks;index++)store.delete(`${prefix}_${index}`)}
}
