import { CompanyDirectory } from "@/features/vayon/crm-engine/components/CrmDirectory";
import { CrmShell } from "@/features/vayon/crm-engine/components/CrmShell";
import { CrmService } from "@/features/vayon/crm-engine/services/crm.service";
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const raw = await searchParams;
  const items = await (await CrmService.production()).companies(raw.search);
  return (
    <CrmShell
      title="Companies"
      description="Workspace company relationships with honest unavailable states when no compatible company source exists."
    >
      <form className="mb-5">
        <input
          name="search"
          defaultValue={raw.search}
          placeholder="Search companies"
          aria-label="Search companies"
          className="vds-focus h-11 w-full max-w-md rounded-xl border border-vds-border bg-vds-surface px-3 text-sm"
        />
      </form>
      <CompanyDirectory items={items} />
    </CrmShell>
  );
}
