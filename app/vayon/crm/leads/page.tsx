import { Button, ButtonLink } from "@/features/platform/design-system";
import { CrmLeadTable } from "@/features/vayon/crm-engine/components/CrmLeadTable";
import { CrmShell } from "@/features/vayon/crm-engine/components/CrmShell";
import { CrmService } from "@/features/vayon/crm-engine/services/crm.service";
import { toCrmQuery } from "@/features/vayon/crm-engine/view-models/query";
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const raw = await searchParams;
  const data = await (await CrmService.production()).leads(toCrmQuery(raw));
  return (
    <CrmShell
      title="Leads"
      description={`${data.count} lead records in this workspace.`}
      actions={<ButtonLink href="/vayon/leads/new">Add lead</ButtonLink>}
    >
      <form className="mb-5 grid gap-3 rounded-2xl border border-vds-border bg-vds-surface p-4 md:grid-cols-6">
        <input
          name="search"
          defaultValue={typeof raw.search === "string" ? raw.search : ""}
          placeholder="Search name, phone or email"
          aria-label="Search leads"
          className="vds-focus h-11 rounded-xl border border-vds-border bg-vds-elevated px-3 text-sm md:col-span-2"
        />
        <select
          name="status"
          defaultValue={typeof raw.status === "string" ? raw.status : ""}
          aria-label="Filter status"
          className="vds-focus h-11 rounded-xl border border-vds-border bg-vds-elevated px-3 text-sm"
        >
          <option value="">All statuses</option>
          {["new", "contacted", "qualified", "won", "lost"].map((x) => (
            <option key={x}>{x}</option>
          ))}
        </select>
        <select
          name="priority"
          defaultValue={typeof raw.priority === "string" ? raw.priority : ""}
          aria-label="Filter priority"
          className="vds-focus h-11 rounded-xl border border-vds-border bg-vds-elevated px-3 text-sm"
        >
          <option value="">All priorities</option>
          {["normal", "high", "urgent", "vip"].map((x) => (
            <option key={x}>{x}</option>
          ))}
        </select>
        <select
          name="sort"
          defaultValue={typeof raw.sort === "string" ? raw.sort : "updated_at"}
          aria-label="Sort leads"
          className="vds-focus h-11 rounded-xl border border-vds-border bg-vds-elevated px-3 text-sm"
        >
          <option value="updated_at">Recent activity</option>
          <option value="created_at">Created</option>
          <option value="name">Name</option>
          <option value="lead_score">AI score</option>
        </select>
        <Button type="submit">Apply filters</Button>
      </form>
      <CrmLeadTable items={data.items} />
      <footer className="mt-5 flex items-center justify-between text-sm text-vds-muted">
        <span>
          Page {data.page} · {data.count} records
        </span>
        <div className="flex gap-3">
          <a href={`?page=${Math.max(1, data.page - 1)}`}>Previous</a>
          <a href={`?page=${data.page + 1}`}>Next</a>
        </div>
      </footer>
    </CrmShell>
  );
}
