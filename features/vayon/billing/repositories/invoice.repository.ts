import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { InvoiceRecord } from "../types";
export class InvoiceRepository {
  constructor(private client: SupabaseClient, private organizationId: string, private workspaceId: string) {}
  async list(): Promise<InvoiceRecord[]> {
    const { data, error } = await this.client.from("invoices").select("id,invoice_number,status,currency,subtotal,tax,total,issued_at,due_at,paid_at,download_url,provider_invoice_id").eq("organization_id", this.organizationId).eq("workspace_id", this.workspaceId).is("deleted_at", null).order("created_at", { ascending: false });
    if (error) throw error;
    return (data ?? []).map((row) => ({ id: row.id, number: row.invoice_number, status: row.status, currency: row.currency, subtotal: Number(row.subtotal), tax: Number(row.tax), total: Number(row.total), issuedAt: row.issued_at ?? undefined, dueAt: row.due_at ?? undefined, paidAt: row.paid_at ?? undefined, downloadUrl: row.download_url ?? undefined, providerInvoiceId: row.provider_invoice_id ?? undefined }));
  }
  async generateDraft() { const { data, error } = await this.client.rpc("generate_draft_invoice", { p_workspace_id: this.workspaceId }); if (error) throw error; return String(data); }
}
