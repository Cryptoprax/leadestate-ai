import type { GmailSearch, MailboxFolder } from "../domain/models";
export const gmailFolders=Object.freeze(["inbox","sent","drafts","archive","spam","trash"] as const satisfies readonly MailboxFolder[]);
export function mailboxHref(folder:MailboxFolder,search?:GmailSearch,page?:string){const params=new URLSearchParams();if(search?.text)params.set("q",search.text);if(page)params.set("page",page);const query=params.size?`?${params}`:"";return `/vayon/email/${folder}${query}`}
