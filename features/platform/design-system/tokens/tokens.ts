export const vdsTokens = Object.freeze({
  colors: { background: "var(--vds-color-background)", surface: "var(--vds-color-surface)", elevated: "var(--vds-color-elevated)", foreground: "var(--vds-color-foreground)", muted: "var(--vds-color-muted)", subtle: "var(--vds-color-subtle)", primary: "var(--vds-color-primary)", onAccent: "var(--vds-color-on-accent)", accent: "var(--vds-color-accent)", success: "var(--vds-color-success)", warning: "var(--vds-color-warning)", danger: "var(--vds-color-danger)", info: "var(--vds-color-info)" },
  typography: { families: { sans: "var(--font-geist-sans)", mono: "var(--font-geist-mono)" }, sizes: { xs: "0.75rem", sm: "0.875rem", md: "1rem", lg: "1.125rem", xl: "1.25rem", display: "3rem" }, weights: { regular: 400, medium: 500, semibold: 600, bold: 700 }, lineHeights: { tight: 1.2, normal: 1.5, relaxed: 1.7 } },
  spacing: { 0: "0", 1: "0.25rem", 2: "0.5rem", 3: "0.75rem", 4: "1rem", 5: "1.25rem", 6: "1.5rem", 8: "2rem", 10: "2.5rem", 12: "3rem", 16: "4rem", 20: "5rem", 24: "6rem", 32: "8rem" },
  sizing: { controlSm: "2.25rem", controlMd: "2.75rem", controlLg: "3.25rem", contentSm: "40rem", contentMd: "64rem", contentLg: "100rem" },
  radius: { sm: "0.5rem", md: "0.75rem", lg: "1rem", xl: "1.5rem", xxl: "2rem", full: "9999px" },
  elevation: { base: 0, raised: 1, overlay: 2, modal: 3 },
  shadows: { sm: "0 6px 18px var(--vds-shadow-color)", md: "0 18px 45px var(--vds-shadow-color)", lg: "0 35px 100px var(--vds-shadow-color)", focus: "0 0 0 3px var(--vds-color-focus)" },
  opacity: { disabled: 0.5, muted: 0.68, overlay: 0.72, subtle: 0.08 },
  borders: { subtle: "1px solid var(--vds-color-border)", strong: "1px solid var(--vds-color-border-strong)", focus: "2px solid var(--vds-color-focus)" },
  motion: { durations: { instant: "0ms", fast: "120ms", normal: "180ms", slow: "280ms", deliberate: "420ms" }, easing: { standard: "cubic-bezier(.2,.8,.2,1)", enter: "cubic-bezier(.16,1,.3,1)", exit: "cubic-bezier(.4,0,1,1)" } },
  breakpoints: { sm: "40rem", md: "48rem", lg: "64rem", xl: "80rem", xxl: "96rem" },
  zIndex: { base: 0, sticky: 40, dropdown: 50, overlay: 70, modal: 80, toast: 90, tooltip: 100 },
} as const);
export type VdsTokens = typeof vdsTokens;
