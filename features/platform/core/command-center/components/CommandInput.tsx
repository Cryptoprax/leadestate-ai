import { Command, Search } from "lucide-react";
import type { InputHTMLAttributes } from "react";

export function CommandInput(
  props: Omit<InputHTMLAttributes<HTMLInputElement>, "type">,
) {
  return (
    <label className="relative block">
      <span className="sr-only">Search AtlasOS commands</span>
      <Search
        className="absolute left-5 top-1/2 size-5 -translate-y-1/2 text-vds-subtle"
        aria-hidden="true"
      />
      <input
        type="search"
        placeholder="Search AtlasOS..."
        className="h-16 w-full bg-transparent pl-14 pr-24 text-base text-vds-foreground outline-none placeholder:text-vds-subtle"
        {...props}
      />
      <kbd className="absolute right-5 top-1/2 flex -translate-y-1/2 items-center gap-1 rounded-lg border border-vds-border/[0.08] bg-vds-surface/[0.03] px-2 py-1 font-sans text-[10px] text-vds-subtle">
        <Command className="size-3" aria-hidden="true" />K
      </kbd>
    </label>
  );
}
