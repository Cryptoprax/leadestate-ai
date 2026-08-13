import type { RuntimeAuthorizer } from "../contracts/ports";
import type { ExecutionContext } from "../domain/contracts";
import type { WorkspaceFeatureFlagProvider } from "@/lib/infrastructure/feature-flags";

export class PermissionRuntimeAuthorizer implements RuntimeAuthorizer {
  async authorize(context: ExecutionContext, permission: string) {
    return Boolean(
      context.workspaceId &&
      context.organizationId &&
      context.actorId &&
      context.permissions.includes(permission),
    );
  }
}

export class GovernedRuntimeAuthorizer implements RuntimeAuthorizer {
  constructor(
    private readonly flags: WorkspaceFeatureFlagProvider,
    private readonly permissions = new PermissionRuntimeAuthorizer(),
  ) {}

  async authorize(context: ExecutionContext, permission: string) {
    const flag = await this.flags.evaluate(context.workspaceId, "workflow_runtime");
    return flag.enabled && this.permissions.authorize(context, permission);
  }
}
