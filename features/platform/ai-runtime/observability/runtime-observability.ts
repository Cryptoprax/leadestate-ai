import type { RuntimeObservability } from "../contracts/ports";
import type { AIRuntimeResponse, AIRuntimeTrace } from "../domain/contracts";
export class InMemoryRuntimeObservability implements RuntimeObservability { private values: AIRuntimeTrace[] = []; record(response: AIRuntimeResponse) { this.values = [...this.values, response.trace] } traces(requestId?: string) { return requestId ? this.values.filter(item => item.requestId === requestId) : [...this.values] } }

