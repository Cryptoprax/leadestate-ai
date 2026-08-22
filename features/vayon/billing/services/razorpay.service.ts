import "server-only";
import { createSupabaseServiceClient } from "@/lib/supabase/service";
import { RazorpayBillingProvider } from "../providers/razorpay.provider";

type Entity = Record<string, unknown>;
type Webhook = {
  event?: unknown;
  payload?: {
    subscription?: { entity?: Entity };
    payment?: { entity?: Entity };
    invoice?: { entity?: Entity };
  };
};

export class RazorpayService {
  constructor(private provider = new RazorpayBillingProvider()) {}
  async webhook(payload: string, signature: string, eventId: string) {
    if (!/^[A-Za-z0-9_-]{6,200}$/.test(eventId)) throw new Error("Invalid Razorpay event identifier.");
    const event = this.provider.verifyWebhook(payload, signature) as Webhook;
    const type = String(event.event ?? "unknown");
    const entity = event.payload?.subscription?.entity ?? event.payload?.payment?.entity ?? event.payload?.invoice?.entity ?? {};
    const notes = entity.notes && typeof entity.notes === "object" ? entity.notes as Record<string, unknown> : {};
    const workspaceId = typeof notes.workspace_id === "string" ? notes.workspace_id : null;
    const client = createSupabaseServiceClient();
    const { error } = await client.rpc("record_commercial_webhook", { p_provider: "razorpay", p_event_id: eventId, p_event_type: type, p_payload: event, p_workspace_id: workspaceId });
    if (error) throw error;
    return { eventId, type };
  }
}
