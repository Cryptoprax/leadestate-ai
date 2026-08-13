export type VdsThemeMode = "dark" | "light" | "system" | "custom";
export const VDS_THEME_STORAGE_KEY = "vayon.appearance.theme.v1";
export type VdsResolvedTheme = "dark" | "light";
export interface VdsCustomTheme { readonly id: string; readonly name: string; readonly base: VdsResolvedTheme; readonly variables: Readonly<Record<`--vds-${string}`, string>> }
export interface VdsThemeContextValue { readonly mode: VdsThemeMode; readonly resolved: VdsResolvedTheme; readonly custom?: VdsCustomTheme; readonly setMode: (mode: VdsThemeMode) => void; readonly setCustomTheme: (theme?: VdsCustomTheme) => void }
