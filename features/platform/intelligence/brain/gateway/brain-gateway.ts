import type { BrainPipeline, BrainRequest, BrainResponse } from "../domain/contracts";
export interface BrainGateway { ask(request: BrainRequest): Promise<BrainResponse> }
export class VayonBrainGateway implements BrainGateway { constructor(private readonly pipeline: BrainPipeline) {} ask(request: BrainRequest) { return this.pipeline.run(request) } }

