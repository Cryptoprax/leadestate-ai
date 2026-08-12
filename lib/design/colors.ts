export const colors = {
  background: {
    canvas: "#050b12",
    elevated: "#0a131d",
    subtle: "#0d1823",
    overlay: "rgba(255, 255, 255, 0.055)",
  },
  foreground: {
    strong: "#ffffff",
    default: "#e2e8f0",
    muted: "#94a3b8",
    subtle: "#64748b",
  },
  accent: {
    soft: "#a5f3fc",
    default: "#22d3ee",
    strong: "#06b6d4",
  },
  border: {
    subtle: "rgba(255, 255, 255, 0.07)",
    default: "rgba(255, 255, 255, 0.1)",
    strong: "rgba(255, 255, 255, 0.2)",
    accent: "rgba(103, 232, 249, 0.3)",
  },
  status: {
    success: "#6ee7b7",
    warning: "#fcd34d",
    danger: "#fca5a5",
    info: "#7dd3fc",
  },
} as const;

export type DesignColors = typeof colors;
