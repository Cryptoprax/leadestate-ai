import { FilterBar } from "../../../identity/components/FilterBar";
import { SearchInput } from "../../../identity/components/SearchInput";
import { activityEvents, activityFilters } from "../config/activity";
import { TimelineItem } from "./TimelineItem";

export function Timeline() {
  return (
    <section className="overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.02]">
      <div className="flex flex-col gap-3 border-b border-white/[0.07] p-4 sm:flex-row sm:items-center">
        <SearchInput
          label="Search activity"
          placeholder="Search activity..."
          className="w-full sm:w-80"
        />
        <FilterBar filters={activityFilters} />
      </div>
      <ol className="p-5 sm:p-7">
        {activityEvents.map((event) => (
          <TimelineItem key={event.id} event={event} />
        ))}
      </ol>
    </section>
  );
}
