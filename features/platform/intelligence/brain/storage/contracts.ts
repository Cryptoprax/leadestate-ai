import type { BrainResponse, BrainSession, BrainTrace } from "../domain/contracts";
export interface BrainSessionStore { save(session: BrainSession): Promise<void>; get(id: string): Promise<BrainSession | undefined> }
export interface BrainTraceStore { append(trace: BrainTrace): Promise<void>; list(correlationId?: string): Promise<readonly BrainTrace[]> }
export interface BrainResponseStore { save(response: BrainResponse): Promise<void>; getResponse(requestId: string): Promise<BrainResponse | undefined> }
