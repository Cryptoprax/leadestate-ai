import type { AdvisorDependencies, AdvisorRegistry, WorkforceAdvisor } from "../contracts/ports";
import type { AdvisorType } from "../domain/contracts";
import { advisorDefinitions, ContractWorkforceAdvisor } from "./advisor.service";
export class VayonAdvisorRegistry implements AdvisorRegistry {
  private readonly advisors: readonly WorkforceAdvisor[];
  constructor(dependencies: AdvisorDependencies) { this.advisors = advisorDefinitions.map(definition => new ContractWorkforceAdvisor(definition, dependencies)) }
  resolve(type: AdvisorType) { const advisor = this.advisors.find(item => item.type === type); if (!advisor) throw new Error(`Advisor not registered: ${type}`); return advisor }
  list() { return this.advisors }
}

