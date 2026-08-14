import type { EmailTimelineProposal } from "@/features/platform/messaging/timeline/email-proposals";
import { proposeEmailEvent } from "@/features/platform/messaging/timeline/email-proposals";
export const gmailEventTypes=Object.freeze(["email.received","email.sent","email.draft.created","email.draft.updated","email.draft.deleted","email.deleted","email.linked"] as const);
export const gmailNotificationKinds=Object.freeze(["mention","important_mail","failed_send","approval_required"] as const);
export interface GovernedEmailExecution {readonly state:"draft"|"approval_required";readonly autonomousExecution:false;readonly provider:"gmail";readonly executionRequestId:null}
export function governedEmailExecution(state:"draft"|"approval_required"="approval_required"):GovernedEmailExecution{return Object.freeze({state,autonomousExecution:false,provider:"gmail",executionRequestId:null})}
export function gmailTimelineProposal(input:EmailTimelineProposal){return proposeEmailEvent(input)}
