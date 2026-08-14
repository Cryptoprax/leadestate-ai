import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { BillingEventRecord, PaymentMethodRecord } from "../types";

export class CommercialBillingRepository {
  constructor(private client: SupabaseClient, private organizationId: string, private workspaceId: string) {}
  async paymentMethods(): Promise<PaymentMethodRecord[]> {
    const { data, error } = await this.client.from("payment_methods").select("id,type,brand,last4,expiry_month,expiry_year,is_default,created_at").eq("organization_id", this.organizationId).eq("workspace_id", this.workspaceId).is("detached_at", null).order("is_default", { ascending: false });
    if (error) throw error;
    return (data ?? []).map((row) => ({ id: row.id, type: row.type, brand: row.brand ?? undefined, last4: row.last4 ?? undefined, expiry: row.expiry_month && row.expiry_year ? `${row.expiry_month}/${row.expiry_year}` : undefined, isDefault: row.is_default, createdAt: row.created_at }));
  }
  async events(): Promise<BillingEventRecord[]> {
    const { data, error } = await this.client.from("billing_events").select("id,event_type,status,created_at").eq("organization_id", this.organizationId).eq("workspace_id", this.workspaceId).order("created_at", { ascending: false }).limit(50);
    if (error) throw error;
    return (data ?? []).map((row) => ({ id: row.id, type: row.event_type, status: row.status, createdAt: row.created_at }));
  }
}
