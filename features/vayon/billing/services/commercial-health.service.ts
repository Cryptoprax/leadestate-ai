import "server-only";
import { billingContext } from "./billing-context";
type State = "healthy" | "warning" | "offline";
export class CommercialHealthService {
  async snapshot() {
    const c = await billingContext(),
      { data, error } = await c.client
        .from("integration_health")
        .select("provider_id,status,latency_ms,checked_at,last_failure_at")
        .eq("organization_id", c.organizationId)
        .eq("workspace_id", c.workspaceId)
        .in("provider_id", [
          "whatsapp",
          "stripe",
          "razorpay",
          "openai",
          "gmail",
          "outlook",
          "google_calendar",
          "microsoft_365",
          "storage",
          "database",
        ]);
    if (error) throw error;
    const indexed = new Map(
      (data ?? []).map((row) => [String(row.provider_id), row]),
    );
    return [
      "whatsapp",
      "stripe",
      "razorpay",
      "openai",
      "gmail",
      "outlook",
      "google_calendar",
      "microsoft_365",
      "storage",
      "database",
    ].map((provider) => {
      const row = indexed.get(provider),
        status = String(row?.status ?? "offline");
      return {
        provider,
        state: (status === "healthy"
          ? "healthy"
          : status === "offline" || status === "unavailable"
            ? "offline"
            : "warning") as State,
        latencyMs:
          row?.latency_ms === null || row?.latency_ms === undefined
            ? null
            : Number(row.latency_ms),
        lastCheckedAt: row?.checked_at ? String(row.checked_at) : null,
        diagnostic: row?.last_failure_at
          ? "Recent provider failure recorded"
          : "Health check unavailable",
      };
    });
  }
}
