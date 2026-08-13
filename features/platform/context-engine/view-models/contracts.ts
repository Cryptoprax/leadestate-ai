import type { ContextAvailability, ContextObjectIdentity, ContextSectionId, ContextTabId } from "../domain/contracts";
export interface ContextItemViewModel { readonly id: string; readonly label: string; readonly meta: string; readonly occurredAt?: string }
export interface ContextSectionViewModel { readonly id: ContextSectionId; readonly title: string; readonly state: ContextAvailability; readonly message: string; readonly items: readonly ContextItemViewModel[] }
export interface ContextTabViewModel { readonly id: ContextTabId; readonly label: string; readonly sections: readonly ContextSectionId[] }
export interface UnifiedContextViewModel { readonly target?: ContextObjectIdentity; readonly title: string; readonly subtitle: string; readonly state: ContextAvailability; readonly tabs: readonly ContextTabViewModel[]; readonly sections: readonly ContextSectionViewModel[] }
