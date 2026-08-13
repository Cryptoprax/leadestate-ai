import type { ContextAssembler, ContextAssemblyRequest, ContextSnapshotReader } from "../contracts/ports";
import type { UnifiedBusinessContext } from "../domain/contracts";
export class UnifiedContextEngine { constructor(private readonly assembler: ContextAssembler, private readonly snapshots?: ContextSnapshotReader) {} context(request: ContextAssemblyRequest): UnifiedBusinessContext { return this.assembler.assemble(request, this.snapshots?.read(request)) } }
