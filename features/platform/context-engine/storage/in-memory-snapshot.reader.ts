import type { ContextAssemblyRequest, ContextSnapshotReader } from "../contracts/ports";
import type { ContextAssemblySnapshot } from "../domain/contracts";
export class InMemoryContextSnapshotReader implements ContextSnapshotReader { constructor(private readonly snapshots: Readonly<Record<string, ContextAssemblySnapshot>> = Object.freeze({})) {} read(request: ContextAssemblyRequest) { return this.snapshots[key(request.organizationId, request.workspaceId, request.target.type, request.target.id)] } }
function key(organizationId: string, workspaceId: string, type: string, id: string) { return `${organizationId}:${workspaceId}:${type}:${id}` }
