import "server-only";
import { operationsContext } from "@/features/vayon/operations/services/context";
import type { DealRoomRepository } from "../contracts/repository";
import type { DealGuidance, DealRoomSnapshot } from "../domain/models";
import { AuroraDealRoomRepository } from "../repositories/aurora.repository";
import { SupabaseDealRoomRepository } from "../repositories/supabase.repository";
export const dealRoomGovernance = {
  paymentExecution: false,
  legalExecution: false,
  externalSignatures: false,
  autonomousActions: false,
  readOnly: true,
} as const;
export class DealRoomService {
  constructor(private r: DealRoomRepository) {}
  static async production() {
    const c = await operationsContext();
    return new DealRoomService(
      new SupabaseDealRoomRepository(c.client, c.organizationId, c.workspaceId),
    );
  }
  static demo() {
    return new DealRoomService(new AuroraDealRoomRepository());
  }
  async snapshot(): Promise<DealRoomSnapshot> {
    const [deals, offers, contracts, checklists, connections] =
      await Promise.all([
        this.r.deals(),
        this.r.offers(),
        this.r.contracts(),
        this.r.checklists(),
        this.r.connections(),
      ]);
    return {
      deals,
      offers,
      contracts,
      checklists,
      connections,
      source: this.r.provider,
    };
  }
  guidance(s: DealRoomSnapshot, id: string): readonly DealGuidance[] {
    const d = s.deals.find((x) => x.id === id),
      c = s.connections.find((x) => x.dealId === id),
      k = s.checklists.find((x) => x.dealId === id);
    if (!d) return [];
    return [
      {
        kind: "summary",
        value: `${d.title} is at ${d.currentStage}.`,
        rationale: "Uses the recorded deal stage only.",
        deterministic: true,
        executionAllowed: false,
      },
      {
        kind: "negotiation",
        value:
          d.currentStage === "negotiation"
            ? "Human negotiation review is active."
            : "No negotiation state detected.",
        rationale: "Stage rule only.",
        deterministic: true,
        executionAllowed: false,
      },
      {
        kind: "risk",
        value:
          d.priority === "critical"
            ? "Critical priority requires review."
            : "No deterministic critical-priority risk.",
        rationale: "Priority rule only.",
        deterministic: true,
        executionAllowed: false,
      },
      {
        kind: "missing-documents",
        value:
          k && k.completionPercentage < 100
            ? "Checklist is incomplete."
            : "No missing document inference available.",
        rationale: "Checklist completion only.",
        deterministic: true,
        executionAllowed: false,
      },
      {
        kind: "next-action",
        value: c?.pendingApprovals.length
          ? "Review pending approvals."
          : "Review the deal workspace.",
        rationale: "No action is executed.",
        deterministic: true,
        executionAllowed: false,
      },
      {
        kind: "probability",
        value: `Recorded probability is ${d.probability}%.`,
        rationale: "Explains the stored value; no prediction is calculated.",
        deterministic: true,
        executionAllowed: false,
      },
    ];
  }
}
