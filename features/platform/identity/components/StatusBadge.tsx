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
    "border-emerald-300/15 bg-emerald-300/[0.08] text-emerald-300",
  neutral: "border-white/[0.08] bg-white/[0.04] text-slate-400",
  warning: "border-amber-300/15 bg-amber-300/[0.08] text-amber-300",
  negative: "border-rose-300/15 bg-rose-300/[0.08] text-rose-300",
  info: "border-cyan-300/15 bg-cyan-300/[0.08] text-cyan-300",
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
