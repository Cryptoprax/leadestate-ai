import { SectionHeader } from "../../components/SectionHeader";
import type {
  SearchResult as SearchResultContract,
  SearchResultCategory,
} from "../types/search";
import { SearchResult } from "./SearchResult";

export interface SearchGroupProps {
  category: SearchResultCategory;
  results: SearchResultContract[];
}

export function SearchGroup({ category, results }: SearchGroupProps) {
  return (
    <section className="rounded-2xl border border-vds-border/[0.07] bg-vds-surface/[0.02] p-3">
      <div className="px-2 pb-2">
        <SectionHeader title={category} count={results.length} />
      </div>
      {results.map((result) => (
        <SearchResult key={result.id} result={result} />
      ))}
    </section>
  );
}
