import { ActivityDirectory } from "@/features/vayon/crm-engine/components/CrmDirectory";
import { CrmShell } from "@/features/vayon/crm-engine/components/CrmShell";
import { CrmService } from "@/features/vayon/crm-engine/services/crm.service";
export default async function Page() {
  const items = await (await CrmService.production()).activities(100);
  return (
    <CrmShell
      title="Activities"
      description="A chronological CRM activity view assembled from the workspace-scoped activity source."
    >
      <ActivityDirectory items={items} />
    </CrmShell>
  );
}
