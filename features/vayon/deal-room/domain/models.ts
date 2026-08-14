export type DealRoomStage =
  | "new"
  | "qualified"
  | "property-matched"
  | "site-visit-completed"
  | "negotiation"
  | "offer-submitted"
  | "documentation"
  | "approval"
  | "ready-to-close"
  | "closed-won"
  | "closed-lost";
export interface DealRoomDeal {
  readonly id: string;
  readonly referenceNumber: string;
  readonly title: string;
  readonly customer?: string;
  readonly lead?: string;
  readonly property: string;
  readonly assignedAgent?: string;
  readonly assignedAI?: string;
  readonly value?: number;
  readonly currency: string;
  readonly probability: number;
  readonly currentStage: DealRoomStage;
  readonly expectedCloseDate?: string;
  readonly source: string;
  readonly priority: "low" | "medium" | "high" | "critical";
  readonly workflow?: string;
  readonly approvals: readonly string[];
  readonly timeline?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}
export interface DealOffer {
  readonly id: string;
  readonly dealId: string;
  readonly offerNumber: string;
  readonly amount: number;
  readonly currency: string;
  readonly offerDate: string;
  readonly status:
    "draft" | "pending-approval" | "approved" | "rejected" | "expired";
  readonly approval: string;
  readonly revisionHistory: readonly string[];
  readonly readOnly: true;
}
export interface DealContract {
  readonly id: string;
  readonly dealId: string;
  readonly title: string;
  readonly type:
    | "reservation"
    | "sale-agreement"
    | "purchase-agreement"
    | "commission-agreement"
    | "supporting-document";
  readonly approvalStatus: string;
  readonly version: number;
  readonly readOnly: true;
}
export interface DealChecklist {
  readonly dealId: string;
  readonly sections: readonly {
    readonly name:
      | "KYC"
      | "Documents"
      | "Approvals"
      | "Site Visit"
      | "Finance"
      | "Legal"
      | "Compliance";
    readonly completed: number;
    readonly total: number;
  }[];
  readonly completionPercentage: number;
}
export interface DealConnections {
  readonly dealId: string;
  readonly activities: readonly string[];
  readonly communications: readonly string[];
  readonly campaigns: readonly string[];
  readonly notifications: readonly string[];
  readonly meetings: readonly string[];
  readonly siteVisits: readonly string[];
  readonly tasks: readonly string[];
  readonly reminders: readonly string[];
  readonly approvalHistory: readonly string[];
  readonly pendingApprovals: readonly string[];
  readonly workflowTimeline: readonly string[];
  readonly executionRequests: readonly string[];
}
export interface DealRoomSnapshot {
  readonly deals: readonly DealRoomDeal[];
  readonly offers: readonly DealOffer[];
  readonly contracts: readonly DealContract[];
  readonly checklists: readonly DealChecklist[];
  readonly connections: readonly DealConnections[];
  readonly source: "supabase" | "aurora";
}
export interface DealGuidance {
  readonly kind:
    | "summary"
    | "negotiation"
    | "risk"
    | "missing-documents"
    | "next-action"
    | "probability";
  readonly value: string;
  readonly rationale: string;
  readonly deterministic: true;
  readonly executionAllowed: false;
}
