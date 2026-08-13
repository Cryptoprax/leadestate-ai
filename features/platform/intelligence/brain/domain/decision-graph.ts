import type { BrainConfidence, BrainDecision, BrainObservation, BrainReason, BrainReference } from "./contracts";

export type DecisionNodeType = "decision" | "dependency" | "observation" | "reason" | "evidence" | "reference" | "approval";
export interface DecisionGraphNode { id: string; type: DecisionNodeType; label: string; status: "available" | "missing" | "placeholder" }
export interface DecisionGraphEdge { id: string; source: string; target: string; relationship: "depends-on" | "supports" | "references" | "requires-approval" }
export interface DecisionGraph { nodes: readonly DecisionGraphNode[]; edges: readonly DecisionGraphEdge[]; confidence: BrainConfidence }
export function buildDecisionGraph(decision: BrainDecision, observations: readonly BrainObservation[], references: readonly BrainReference[]): DecisionGraph {
  const nodes: DecisionGraphNode[] = [{ id: decision.id, type: "decision", label: decision.outcome, status: "placeholder" }];
  const edges: DecisionGraphEdge[] = [];
  const connect = (items: readonly (BrainObservation | BrainReason | BrainReference)[], type: DecisionNodeType, relationship: DecisionGraphEdge["relationship"]) => items.forEach(item => { nodes.push({ id: item.id, type, label: "statement" in item ? item.statement : item.label, status: "available" }); edges.push({ id: `${item.id}:${decision.id}`, source: item.id, target: decision.id, relationship }); });
  connect(observations, "observation", "supports"); connect(decision.reasons, "reason", "supports"); connect(references, "reference", "references");
  if (decision.requiresHumanApproval) { nodes.push({ id: `${decision.id}:approval`, type: "approval", label: "Human approval", status: "placeholder" }); edges.push({ id: `${decision.id}:requires-approval`, source: decision.id, target: `${decision.id}:approval`, relationship: "requires-approval" }); }
  return { nodes, edges, confidence: decision.confidence };
}

