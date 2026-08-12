import { SlidersHorizontal } from "lucide-react";

export interface FilterOption {
  label: string;
  value: string;
}

export interface ToolbarFilter {
  id: string;
  label: string;
  options: FilterOption[];
}

export interface FilterBarProps {
  filters: ToolbarFilter[];
}

export function FilterBar({ filters }: FilterBarProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto [scrollbar-width:none]">
      <SlidersHorizontal
        className="size-3.5 shrink-0 text-slate-700"
        aria-hidden="true"
      />
      {filters.map((filter) => (
        <label key={filter.id} className="shrink-0">
          <span className="sr-only">{filter.label}</span>
          <select
            defaultValue=""
            className="h-9 appearance-none rounded-xl border border-white/[0.07] bg-[#0a1018] px-3 text-xs text-slate-500 outline-none transition hover:border-white/[0.13] focus:border-cyan-300/40 focus:ring-2 focus:ring-cyan-300/10"
            aria-label={filter.label}
          >
            <option value="">{filter.label}</option>
            {filter.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      ))}
    </div>
  );
}
