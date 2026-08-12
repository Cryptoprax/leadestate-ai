import { Command, Search } from "lucide-react";

import { searchCategories, searchResults } from "../config/search";
import { SearchGroup } from "./SearchGroup";

export function UniversalSearch() {
  return (
    <section>
      <label className="relative block">
        <span className="sr-only">Search AtlasOS</span>
        <Search
          className="absolute left-5 top-1/2 size-5 -translate-y-1/2 text-slate-600"
          aria-hidden="true"
        />
        <input
          type="search"
          placeholder="Search applications, organizations, users, pages, commands..."
          className="h-16 w-full rounded-2xl border border-white/[0.09] bg-white/[0.035] pl-14 pr-24 text-base text-white outline-none transition placeholder:text-slate-700 focus:border-cyan-300/40 focus:ring-2 focus:ring-cyan-300/10"
        />
        <span className="absolute right-4 top-1/2 flex -translate-y-1/2 items-center gap-1 rounded-lg border border-white/[0.08] bg-black/20 px-2 py-1 text-[10px] text-slate-600">
          <Command className="size-3" aria-hidden="true" />K
        </span>
      </label>
      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        {searchCategories.map((category) => (
          <SearchGroup
            key={category}
            category={category}
            results={searchResults.filter(
              (result) => result.category === category,
            )}
          />
        ))}
      </div>
    </section>
  );
}
