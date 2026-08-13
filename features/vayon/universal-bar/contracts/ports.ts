import type { UniversalBarResult, UniversalHistoryItem, UniversalHistoryKind, UniversalIntent, UniversalSearchScope } from "../domain/contracts";
export interface UniversalSearchRequest { readonly query: string; readonly scopes: readonly UniversalSearchScope[]; readonly limit?: number }
export interface UniversalSearchProvider { readonly id: string; readonly scopes: readonly UniversalSearchScope[]; search(request: UniversalSearchRequest): readonly UniversalBarResult[] }
export interface UniversalSearchEngine { search(request: UniversalSearchRequest): readonly UniversalBarResult[] }
export interface UniversalIntentRouter { resolve(input: string): UniversalIntent }
export interface UniversalHistoryStore { list(kind?: UniversalHistoryKind): readonly UniversalHistoryItem[]; record(item: UniversalHistoryItem): void; toggle(kind: "pinned" | "favorites", item: Omit<UniversalHistoryItem, "kind" | "recordedAt">): void; has(kind: "pinned" | "favorites", id: string): boolean }
