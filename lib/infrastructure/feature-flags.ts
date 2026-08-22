export const productionFeatureKeys = ["ai", "gmail", "whatsapp", "stripe", "beta", "creative_studio_beta", "google_identity", "google_calendar", "google_drive", "google_contacts", "microsoft_identity", "workflow_runtime"] as const;
export type ProductionFeatureKey = (typeof productionFeatureKeys)[number];

export interface WorkspaceFeatureFlag {
  readonly key: ProductionFeatureKey;
  readonly workspaceId: string;
  readonly enabled: boolean;
  readonly source: "environment" | "workspace-override";
}

export interface WorkspaceFeatureFlagProvider {
  evaluate(workspaceId: string, key: ProductionFeatureKey): Promise<WorkspaceFeatureFlag>;
}

const environmentKeys: Readonly<Record<ProductionFeatureKey, string>> = Object.freeze({
  ai: "FEATURE_AI", gmail: "FEATURE_GMAIL", whatsapp: "FEATURE_WHATSAPP", stripe: "FEATURE_STRIPE", beta: "FEATURE_BETA", creative_studio_beta: "FEATURE_CREATIVE_STUDIO_BETA", google_identity: "FEATURE_GOOGLE_IDENTITY", google_calendar: "FEATURE_GOOGLE_CALENDAR", google_drive: "FEATURE_GOOGLE_DRIVE", google_contacts: "FEATURE_GOOGLE_CONTACTS", microsoft_identity: "FEATURE_MICROSOFT_IDENTITY", workflow_runtime: "FEATURE_WORKFLOW_RUNTIME",
});

export class EnvironmentFeatureFlagProvider implements WorkspaceFeatureFlagProvider {
  async evaluate(workspaceId: string, key: ProductionFeatureKey): Promise<WorkspaceFeatureFlag> {
    if (!workspaceId.trim()) throw new Error("A workspace ID is required for feature evaluation.");
    return Object.freeze({ key, workspaceId, enabled: process.env[environmentKeys[key]] === "true", source: "environment" });
  }
}
