import type { ExecutionPlan, WorkflowDefinition } from "../domain/contracts";
export interface WorkflowValidatorPort { validate(workflow: WorkflowDefinition): import("../domain/contracts").WorkflowValidationResult }
export interface ExecutionPlannerPort { plan(workflow: WorkflowDefinition): ExecutionPlan }
export interface WorkflowStorePort { list(): readonly WorkflowDefinition[]; get(id: string): WorkflowDefinition | undefined; saveDraft(workflow: WorkflowDefinition): WorkflowDefinition }
export interface ActionProposal { readonly workflowId: string; readonly nodeId: string; readonly action: string; readonly payload: Readonly<Record<string, unknown>>; readonly status: "proposed"; readonly executable: false }
