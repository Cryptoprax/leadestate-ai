import type { BrainContext, BrainReference } from "../../brain/domain/contracts";
import type { ContextGraph, ContextGraphEdge, ContextGraphNode, ContextGraphQuery, ContextGraphTraversal, ContextNodeType } from "../domain/contracts";
import type { ContextGraphBuilder, ContextGraphTraverser } from "../contracts/ports";

const objectType = (type: string): ContextNodeType => type === "calendar" ? "calendar-event" : type as ContextNodeType;
export class BrainContextGraphBuilder implements ContextGraphBuilder {
  constructor(private readonly now: () => Date = () => new Date(), private readonly id: () => string = () => crypto.randomUUID()) {}
  build(context: BrainContext): ContextGraph {
    const nodes: ContextGraphNode[] = context.objects.map(item => ({ id: `object:${item.type}:${item.id}`, type: objectType(item.type), label: item.label, reference: item, metadata: {} }));
    if (context.identity.organizationId) nodes.push({ id: `organization:${context.identity.organizationId}`, type: "organization", label: "Current organization", metadata: {} });
    if (context.identity.workspaceId) nodes.push({ id: `workspace:${context.identity.workspaceId}`, type: "workspace", label: "Current workspace", metadata: {} });
    if (context.identity.userId) nodes.push({ id: `user:${context.identity.userId}`, type: "user", label: "Current user", metadata: {} });
    const source = context.identity.workspaceId ? `workspace:${context.identity.workspaceId}` : nodes[0]?.id;
    const edges: ContextGraphEdge[] = source ? nodes.filter(node => node.id !== source).map(node => ({ id: `${source}->${node.id}`, sourceId: source, targetId: node.id, relationship: "context-contains", direction: "directed", weight: 1, confidence: { score: 1, level: "high", rationale: "Explicit BrainContext membership." }, evidence: [] as BrainReference[] })) : [];
    return { id: this.id(), nodes, edges, version: 1, generatedAt: this.now().toISOString() };
  }
}
export class InMemoryContextGraphTraverser implements ContextGraphTraverser {
  traverse(graph: ContextGraph, query: ContextGraphQuery): ContextGraphTraversal {
    const maxDepth = Math.max(0, query.maxDepth ?? 3), seen = new Set(query.startNodeIds), frontier = query.startNodeIds.map(id => ({ id, path: [id], depth: 0 })), edgeIds = new Set<string>(), paths: string[][] = [];
    while (frontier.length) { const current = frontier.shift(); if (!current || current.depth >= maxDepth) continue; for (const edge of graph.edges) { if (query.relationshipTypes?.length && !query.relationshipTypes.includes(edge.relationship)) continue; if (edge.confidence.score < (query.minimumConfidence ?? 0)) continue; const outgoing = edge.sourceId === current.id, incoming = edge.targetId === current.id; const allowed = query.direction === "incoming" ? incoming : query.direction === "outgoing" ? outgoing : outgoing || incoming; if (!allowed) continue; const next = outgoing ? edge.targetId : edge.sourceId; edgeIds.add(edge.id); const path = [...current.path, next]; paths.push(path); if (!seen.has(next)) { seen.add(next); frontier.push({ id: next, path, depth: current.depth + 1 }); } } }
    return { visitedNodes: graph.nodes.filter(node => seen.has(node.id)), traversedEdges: graph.edges.filter(edge => edgeIds.has(edge.id)), paths };
  }
}

