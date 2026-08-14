import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { DealRoomRepository } from "../contracts/repository";
import type {
  DealChecklist,
  DealConnections,
  DealContract,
  DealOffer,
  DealRoomDeal,
  DealRoomStage,
} from "../domain/models";
const stage = (value: string): DealRoomStage =>
  (({
    new_lead: "new",
    qualified: "qualified",
    site_visit_completed: "site-visit-completed",
    proposal_sent: "offer-submitted",
    negotiation: "negotiation",
    agreement: "documentation",
    completed: "closed-won",
    lost: "closed-lost",
  })[value] ?? "new") as DealRoomStage;
export class SupabaseDealRoomRepository implements DealRoomRepository {
  readonly provider = "supabase" as const;
  constructor(
    private c: SupabaseClient,
    private o: string,
    private w: string,
  ) {}
  async deals() {
    const { data, error } = await this.c
      .from("deals")
      .select("*")
      .eq("organization_id", this.o)
      .eq("workspace_id", this.w)
      .is("deleted_at", null)
      .order("updated_at", { ascending: false });
    if (error) throw error;
    return (data ?? []).map((r): DealRoomDeal => ({
      id: r.id,
      referenceNumber: r.reference,
      title: r.name,
      customer: r.lead_name ?? undefined,
      lead: r.lead_id ?? undefined,
      property: r.property_id,
      assignedAgent: r.assigned_agent_id ?? undefined,
      value: r.value === null ? undefined : Number(r.value),
      currency: r.currency ?? "INR",
      probability: Number(r.probability ?? 0),
      currentStage: stage(r.stage_id),
      expectedCloseDate: r.expected_closing ?? undefined,
      source: r.source ?? "CRM",
      priority: r.priority ?? "medium",
      workflow: r.workflow_id ?? undefined,
      approvals: [],
      timeline: r.id,
      createdAt: r.created_at,
      updatedAt: r.updated_at,
    }));
  }
  async offers() {
    const { data, error } = await this.c
      .from("deal_offers")
      .select("id,deal_id,offer_number,amount,currency,status,created_at")
      .eq("organization_id", this.o)
      .eq("workspace_id", this.w)
      .order("created_at", { ascending: false });
    if (error) throw error;
    return (data ?? []).map((r): DealOffer => ({
      id: r.id,
      dealId: r.deal_id,
      offerNumber: r.offer_number,
      amount: Number(r.amount),
      currency: r.currency,
      offerDate: r.created_at,
      status: ["approved", "rejected", "expired"].includes(r.status)
        ? r.status
        : "pending-approval",
      approval: r.status,
      revisionHistory: [],
      readOnly: true,
    }));
  }
  async contracts(): Promise<readonly DealContract[]> {
    return [];
  }
  async checklists(): Promise<readonly DealChecklist[]> {
    return [];
  }
  async connections(): Promise<readonly DealConnections[]> {
    return [];
  }
}
