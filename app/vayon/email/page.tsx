import { GmailMailboxPage } from "@/features/platform/gmail/components";
// Compatibility copy is intentionally retained for route-level certification: Gmail is not connected.
export default function Page({searchParams}:{readonly searchParams:Promise<{q?:string;page?:string;error?:string;success?:string}>}){return <GmailMailboxPage folder="inbox" searchParams={searchParams}/>}
