import type { ReactNode } from "react";

export interface SectionHeaderProps {
  title: string;
  description?: string;
  count?: number;
  actions?: ReactNode;
}

export function SectionHeader({
  title,
  description,
  count,
  actions,
}: SectionHeaderProps) {
  return (
    <header className="flex items-start justify-between gap-4">
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-semibold text-vds-secondary">{title}</h2>
          {count !== undefined ? (
            <span className="rounded-full bg-vds-surface/[0.05] px-2 py-0.5 text-[9px] text-vds-subtle">
              {count}
            </span>
          ) : null}
        </div>
        {description ? (
          <p className="mt-1 text-xs leading-5 text-vds-subtle">{description}</p>
        ) : null}
      </div>
      {actions}
    </header>
  );
}
