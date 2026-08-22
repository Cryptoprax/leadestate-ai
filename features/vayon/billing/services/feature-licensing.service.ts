import "server-only";
import { billingContext } from "./billing-context";
import type { LicensedFeature } from "../config/commercial-plans";
export class FeatureLicensingService {
  async licensed(feature: LicensedFeature) {
    const c = await billingContext(),
      { data, error } = await c.client.rpc("workspace_feature_licensed", {
        p_workspace_id: c.workspaceId,
        p_feature: feature,
      });
    if (error) throw error;
    return data === true;
  }
  async snapshot() {
    const c = await billingContext(),
      { data, error } = await c.client
        .from("workspace_feature_licenses")
        .select("feature,enabled,source,starts_at,ends_at")
        .eq("organization_id", c.organizationId)
        .eq("workspace_id", c.workspaceId)
        .order("feature");
    if (error) throw error;
    return (data ?? []).map((item) => ({
      feature: String(item.feature),
      enabled: Boolean(item.enabled),
      source: String(item.source),
      startsAt: String(item.starts_at),
      endsAt: item.ends_at ? String(item.ends_at) : null,
    }));
  }
}
