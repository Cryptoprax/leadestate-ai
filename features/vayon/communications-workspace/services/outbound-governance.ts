import "server-only";
import type { Channel } from "../domain/models";
export interface OutboundCommunicationProposal {
  readonly conversationId: string;
  readonly channel: Channel;
  readonly body: string;
  readonly state: "draft";
  readonly approvalRequired: true;
  readonly executionRequested: false;
}
export class OutboundCommunicationGovernance {
  draft(
    conversationId: string,
    channel: Channel,
    body: string,
  ): OutboundCommunicationProposal {
    if (!body.trim()) throw new Error("Draft body is required.");
    return {
      conversationId,
      channel,
      body,
      state: "draft",
      approvalRequired: true,
      executionRequested: false,
    };
  }
  workflow() {
    return Object.freeze([
      "Draft",
      "Approval Engine",
      "Execution Request",
      "Integration Platform",
      "Deterministic Provider",
      "Conversation Timeline",
    ] as const);
  }
}
