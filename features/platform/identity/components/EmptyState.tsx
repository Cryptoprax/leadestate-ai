import { Inbox } from "lucide-react";

export interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
}

export function EmptyState({
  title,
  description,
  actionLabel,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center px-6 py-16 text-center">
      <span className="flex size-11 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.03] text-slate-600">
        <Inbox className="size-5" aria-hidden="true" />
      </span>
      <h3 className="mt-4 text-sm font-semibold text-slate-300">{title}</h3>
      <p className="mt-1.5 max-w-sm text-xs leading-5 text-slate-600">
        {description}
      </p>
      {actionLabel ? (
        <button
          type="button"
          className="mt-5 rounded-xl border border-white/[0.08] px-4 py-2 text-xs font-medium text-slate-400 transition hover:bg-white/[0.05] hover:text-white"
        >
          {actionLabel}
        </button>
      ) : null}
    </div>
  );
}
