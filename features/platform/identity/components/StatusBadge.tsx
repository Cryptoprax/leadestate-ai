export type StatusTone =
  | "positive"
  | "neutral"
  | "warning"
  | "negative"
  | "info";

export interface StatusBadgeProps {
  label: string;
  tone?: StatusTone;
}

const toneStyles: Record<StatusTone, string> = {
  positive:
    "border-vds-success bg-vds-success/[0.08] text-vds-success",
  neutral: "border-vds-border/[0.08] bg-vds-surface/[0.04] text-vds-muted",
  warning: "border-vds-warning bg-vds-warning/[0.08] text-vds-warning",
  negative: "border-vds-danger bg-vds-danger/[0.08] text-vds-danger",
  info: "border-vds-accent-border bg-vds-primary/[0.08] text-vds-primary",
};

export function StatusBadge({
  label,
  tone = "neutral",
}: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold ${toneStyles[tone]}`}
    >
      <span className="size-1.5 rounded-full bg-current opacity-70" />
      {label}
    </span>
  );
}
