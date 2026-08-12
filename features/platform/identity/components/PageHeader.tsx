import type { ReactNode } from "react";

export interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description: string;
  actions?: ReactNode;
}

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: PageHeaderProps) {
  return (
    <header className="flex flex-col gap-6 border-b border-white/[0.07] pb-7 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <div className="flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-cyan-300 shadow-[0_0_9px_rgba(103,232,249,0.7)]" />
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-300/80">
            {eyebrow}
          </p>
        </div>
        <h1 className="mt-3 text-3xl font-semibold tracking-[-0.035em] text-white sm:text-4xl">
          {title}
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
          {description}
        </p>
      </div>
      {actions ? <div className="shrink-0">{actions}</div> : null}
    </header>
  );
}
