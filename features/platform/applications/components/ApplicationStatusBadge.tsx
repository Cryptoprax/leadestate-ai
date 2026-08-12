import type { ApplicationStatus } from "../types/application";

const statusStyles: Record<ApplicationStatus, string> = {
  operational:
    "border-emerald-300/15 bg-emerald-300/[0.08] text-emerald-300",
  beta: "border-violet-300/15 bg-violet-300/[0.08] text-violet-300",
  preview: "border-amber-300/15 bg-amber-300/[0.08] text-amber-300",
  maintenance: "border-rose-300/15 bg-rose-300/[0.08] text-rose-300",
};

const statusLabels: Record<ApplicationStatus, string> = {
  operational: "Operational",
  beta: "Beta",
  preview: "Preview",
  maintenance: "Maintenance",
};

export interface ApplicationStatusBadgeProps {
  status: ApplicationStatus;
}

export function ApplicationStatusBadge({
  status,
}: ApplicationStatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold ${statusStyles[status]}`}
    >
      <span className="size-1.5 rounded-full bg-current opacity-80" />
      {statusLabels[status]}
    </span>
  );
}
