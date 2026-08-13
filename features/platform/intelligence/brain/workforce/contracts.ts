import type { BrainContext, BrainRequest, BrainResponse } from "../domain/contracts";
export type DigitalWorkforceRole = "ceo" | "sales-director" | "sales-executive" | "receptionist" | "operations" | "finance" | "legal" | "marketing" | "customer-success" | "property-advisor" | "recruiter" | "support";
export interface DigitalWorkforceEmployee { readonly role: DigitalWorkforceRole; readonly capabilities: readonly string[]; createRequest(input: string, context: Partial<BrainContext>): BrainRequest; consume(response: BrainResponse): Promise<void>; execute?: never }

