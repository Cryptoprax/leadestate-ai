import type { LucideIcon } from "lucide-react";

export interface StatCardProps {
  title: string;
  description: string;
  value: string;
  icon: LucideIcon;
  tone: string;
  status?: string;
}

export function StatCard({
  title,
  description,
  value,
  icon: Icon,
  tone,
  status,
}: StatCardProps) {
  return (
    <article className="group relative min-h-52 overflow-hidden rounded-3xl border border-vds-border/[0.08] bg-vds-surface/[0.025] p-6 transition duration-300 hover:-translate-y-0.5 hover:border-vds-border/[0.14] hover:bg-vds-surface/[0.04]">
      <div
        className={`absolute -right-12 -top-12 size-36 rounded-full ${tone} opacity-[0.07] blur-3xl transition group-hover:opacity-[0.12]`}
        aria-hidden="true"
      />
      <div className="relative flex items-start justify-between">
        <span
          className={`flex size-10 items-center justify-center rounded-xl ${tone} bg-opacity-10`}
        >
          <Icon className="size-4 text-vds-secondary" aria-hidden="true" />
        </span>
        {status ? (
          <span className="rounded-full border border-vds-border/[0.08] px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-vds-subtle">
            {status}
          </span>
        ) : null}
      </div>
      <p className="relative mt-7 text-2xl font-semibold tracking-[-0.03em] text-vds-foreground">
        {value}
      </p>
      <h2 className="relative mt-2 text-sm font-semibold text-vds-secondary">
        {title}
      </h2>
      <p className="relative mt-1.5 text-xs leading-5 text-vds-subtle">
        {description}
      </p>
    </article>
  );
}
