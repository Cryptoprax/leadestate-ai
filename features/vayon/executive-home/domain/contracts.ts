export type ExecutiveSectionId = "morning-brief" | "executive-narrative" | "business-health" | "priorities" | "opportunities" | "risks" | "timeline" | "calendar" | "workforce" | "growth" | "communication" | "financial";
export type ExecutiveDataState = "available" | "awaiting-data" | "unavailable";

export interface NarrativeSourceBlock { readonly id: string; readonly title: string; readonly content?: string; readonly sourceLabel?: string; readonly state: ExecutiveDataState }
export interface ExecutiveNarrativeBlock { readonly id: string; readonly title: string; readonly body: string; readonly sourceLabel?: string; readonly state: ExecutiveDataState; readonly generatedBy: "structured-rules" }
export interface BusinessHealthModel { readonly score?: number; readonly confidence?: number; readonly state: ExecutiveDataState; readonly calculationStatus: "not-configured" | "ready"; readonly explanation: string }
export interface ExecutiveWidgetModel { readonly id: ExecutiveSectionId; readonly title: string; readonly description: string; readonly state: ExecutiveDataState; readonly value?: string; readonly items: readonly string[] }
export interface ExecutiveHomeViewModel { readonly narrative: readonly ExecutiveNarrativeBlock[]; readonly health: BusinessHealthModel; readonly widgets: readonly ExecutiveWidgetModel[] }
