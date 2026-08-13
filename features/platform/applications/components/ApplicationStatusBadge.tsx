import type { ApplicationStatus } from "../types/application";

const statusStyles: Record<ApplicationStatus, string> = {
  operational:
    "border-vds-success bg-vds-success/[0.08] text-vds-success",
  beta: "border-vds-accent bg-vds-accent/[0.08] text-vds-accent",
  preview: "border-vds-warning bg-vds-warning/[0.08] text-vds-warning",
  maintenance: "border-vds-danger bg-vds-danger/[0.08] text-vds-danger",
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
