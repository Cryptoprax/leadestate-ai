import { CustomerDirectory } from "@/features/vayon/crm-engine/components/CrmDirectory";
import { CrmShell } from "@/features/vayon/crm-engine/components/CrmShell";
import { CrmService } from "@/features/vayon/crm-engine/services/crm.service";
import { toCrmQuery } from "@/features/vayon/crm-engine/view-models/query";

export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = toCrmQuery(await searchParams);
  const data = await (await CrmService.production()).customers(query);
  return <CrmShell title="Contacts" description="Searchable, paginated people records with owner, source, relationship, and workspace attribution."><CustomerDirectory items={data.items}/></CrmShell>;
}
