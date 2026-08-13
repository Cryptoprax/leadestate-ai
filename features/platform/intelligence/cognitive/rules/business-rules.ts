import type { BrainContext } from "../../brain/domain/contracts";
import type { BusinessRule } from "../domain/contracts";
import type { BusinessRuleResolver } from "../contracts/ports";
export class StaticBusinessRuleResolver implements BusinessRuleResolver { constructor(private readonly rules: readonly BusinessRule[] = []) {} async resolve(context: BrainContext) { const { organizationId, workspaceId } = context.identity; return this.rules.filter(rule => rule.active && (rule.scope === "organization" ? rule.scopeId === organizationId : rule.scopeId === workspaceId)).sort((a, b) => b.priority - a.priority) } }

