export const colors = {
  background: {
    canvas: "var(--vds-color-background)",
    elevated: "var(--vds-color-surface)",
    subtle: "var(--vds-color-input)",
    overlay: "var(--vds-color-skeleton)",
  },
  foreground: {
    strong: "var(--vds-color-foreground)",
    default: "var(--vds-color-secondary)",
    muted: "var(--vds-color-muted)",
    subtle: "var(--vds-color-subtle)",
  },
  accent: {
    soft: "var(--vds-color-primary)",
    default: "var(--vds-color-primary)",
    strong: "var(--vds-color-primary)",
  },
  border: {
    subtle: "var(--vds-color-border)",
    default: "var(--vds-color-border)",
    strong: "var(--vds-color-border-strong)",
    accent: "var(--vds-color-accent-border)",
  },
  status: {
    success: "var(--vds-color-success)",
    warning: "var(--vds-color-warning)",
    danger: "var(--vds-color-danger)",
    info: "var(--vds-color-info)",
  },
} as const;

export type DesignColors = typeof colors;
