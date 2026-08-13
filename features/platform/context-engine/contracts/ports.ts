import type { ContextAssemblySnapshot, ContextObjectIdentity, ContextSource, UnifiedBusinessContext } from "../domain/contracts";
export interface ContextAssemblyRequest { readonly organizationId: string; readonly workspaceId: string; readonly target: ContextObjectIdentity }
export interface ContextSnapshotReader { read(request: ContextAssemblyRequest): ContextAssemblySnapshot | undefined }
export interface ContextAssembler { assemble(request: ContextAssemblyRequest, snapshot?: ContextAssemblySnapshot): UnifiedBusinessContext }
export interface ContextSourceReader { readonly source: ContextSource; read(request: ContextAssemblyRequest): readonly import("../domain/contracts").ContextReference[] | undefined }
