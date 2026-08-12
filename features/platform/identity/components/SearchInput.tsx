import { Search } from "lucide-react";
import type { InputHTMLAttributes } from "react";

export interface SearchInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
}

export function SearchInput({
  label,
  className = "",
  ...props
}: SearchInputProps) {
  return (
    <label className={`relative block min-w-0 ${className}`}>
      <span className="sr-only">{label}</span>
      <Search
        className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-600"
        aria-hidden="true"
      />
      <input
        type="search"
        className="h-10 w-full rounded-xl border border-white/[0.08] bg-white/[0.035] pl-9 pr-3 text-sm text-slate-200 outline-none transition placeholder:text-slate-700 hover:border-white/[0.13] focus:border-cyan-300/40 focus:ring-2 focus:ring-cyan-300/10"
        {...props}
      />
    </label>
  );
}
