import type { BrainRequest } from "../../brain/domain/contracts";
import type { DigitalWorkforceRole } from "../../brain/workforce/contracts";
import type { ApprovalType, CognitiveGoal, CognitivePlan, CognitivePolicy, CognitiveRequest, CognitiveResponse, LearningRecord, Reflection } from "../domain/contracts";
export interface CognitiveWorkforceEmployee { readonly role: DigitalWorkforceRole; readonly goals: readonly CognitiveGoal[]; readonly policies: readonly CognitivePolicy[]; readonly approvalTypes: readonly ApprovalType[]; createBrainRequest(input: string): BrainRequest; createCognitiveRequest(objective: string): CognitiveRequest; consumePlan(plan: CognitivePlan): Promise<void>; consumeReflection(reflection: Reflection): Promise<void>; consumeLearning(records: readonly LearningRecord[]): Promise<void>; explain(response: CognitiveResponse): string; execute?: never }

