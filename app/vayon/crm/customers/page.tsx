import { CustomerDirectory } from "@/features/vayon/crm-engine/components/CrmDirectory";
import { CrmShell } from "@/features/vayon/crm-engine/components/CrmShell";
import { CrmService } from "@/features/vayon/crm-engine/services/crm.service";
import { toCrmQuery } from "@/features/vayon/crm-engine/view-models/query";
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const data = await (
    await CrmService.production()
  ).customers(toCrmQuery(await searchParams));
  return (
    <CrmShell
      title="Customers"
      description="Relationship-oriented customer views derived from workspace CRM records."
    >
      <CustomerDirectory items={data.items} />
    </CrmShell>
  );
}
