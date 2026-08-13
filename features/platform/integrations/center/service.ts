import "server-only";
import {
  EnvironmentFeatureFlagProvider,
  productionFeatureKeys,
} from "@/lib/infrastructure/feature-flags";
import { integrationContext } from "@/features/platform/integrations/services/integration-context";
import { GoogleRepository } from "@/features/platform/integrations/google/repositories/google.repository";
import { MicrosoftCookieCredentialVault } from "@/features/platform/integrations/microsoft/storage/cookie-credential.vault";
import { integrationCenterRegistry } from "./registry";
import type {
  IntegrationCenterItem,
  IntegrationCenterModel,
} from "./contracts";
export class IntegrationCenterService {
  async model(): Promise<IntegrationCenterModel> {
    const ctx = await integrationContext(),
      flagProvider = new EnvironmentFeatureFlagProvider(),
      [google, microsoft, whatsapp, ...featureFlags] = await Promise.all([
        new GoogleRepository(
          ctx.client,
          ctx.organizationId,
          ctx.workspaceId,
        ).credential(),
        new MicrosoftCookieCredentialVault().load(ctx.workspaceId),
        ctx.client
          .from("whatsapp_connections")
          .select("id,status")
          .eq("workspace_id", ctx.workspaceId)
          .eq("status", "connected")
          .is("deleted_at", null)
          .maybeSingle(),
        ...productionFeatureKeys.map((key) =>
          flagProvider.evaluate(ctx.workspaceId, key),
        ),
      ]);
    const items = integrationCenterRegistry.map((definition) => {
      const feature = definition.featureFlag
          ? featureFlags.find((flag) => flag.key === definition.featureFlag)
          : null,
        featureEnabled = feature?.enabled ?? false,
        isGoogle =
          definition.code.startsWith("google_") || definition.code === "gmail",
        isMicrosoft = ["microsoft_identity", "outlook", "microsoft_calendar", "onedrive", "microsoft_people", "teams"].includes(definition.code),
        granted = isGoogle
          ? (google?.scopes ?? [])
          : isMicrosoft
            ? (microsoft?.scopes ?? [])
            : [],
        connected =
          definition.code === "google_identity"
            ? !!google
            : definition.code === "microsoft_identity"
              ? !!microsoft
              : definition.code === "whatsapp_business"
                ? !!whatsapp.data
                : isGoogle || isMicrosoft
                  ? definition.requiredScopes.length > 0 &&
                    definition.requiredScopes.every((scope) =>
                      granted.includes(scope),
                    )
                  : false,
        missing = definition.requiredScopes.filter(
          (scope) => !granted.includes(scope),
        ),
        expiresAt = isMicrosoft ? microsoft?.expiresAt : google?.expiresAt,
        expired = !!expiresAt && new Date(expiresAt).getTime() <= Date.now(),
        health: IntegrationCenterItem["health"] = !definition.available
          ? "unavailable"
          : !featureEnabled && definition.featureFlag
            ? "disabled"
            : connected && expired
              ? "needs_attention"
              : connected
                ? "healthy"
                : definition.requiredScopes.length &&
                    (isGoogle ? !!google : isMicrosoft ? !!microsoft : false)
                  ? "authorization_required"
                  : "unknown";
      return {
        definition,
        connected,
        featureEnabled,
        workspaceEnabled: featureEnabled,
        grantedScopes: definition.requiredScopes.filter((scope) =>
          granted.includes(scope),
        ),
        missingScopes: missing,
        health,
        lastValidation: isMicrosoft ? (microsoft?.validatedAt ?? null) : null,
        lastSync: null,
        diagnostics: {
          lastError: null,
          retryCount: null,
          quotaStatus: null,
          rateLimit: null,
          tokenExpiresAt: expiresAt ?? null,
        },
      };
    });
    return Object.freeze({
      workspaceId: ctx.workspaceId,
      providers: Object.freeze(items),
      featureFlags: Object.freeze(featureFlags),
      lifecycleEvents: Object.freeze([]),
    });
  }
}
