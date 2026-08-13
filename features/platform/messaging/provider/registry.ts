import type{MailProvider,MailProviderCode}from"../domain/contracts";
export class MessagingProviderRegistry{private providers=new Map<MailProviderCode,()=>MailProvider>();register(code:MailProviderCode,factory:()=>MailProvider){this.providers.set(code,factory)}resolve(code:MailProviderCode){const factory=this.providers.get(code);if(!factory)throw new Error(`Messaging provider '${code}' is not active.`);return factory()}available(){return[...this.providers.keys()]}}
export const futureMailProviders=Object.freeze(["outlook","exchange","imap","shared_inbox","enterprise"]as const);
