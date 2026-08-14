import { ButtonLink } from "@/features/platform/design-system";
import { CrmDashboard } from "@/features/vayon/crm-engine/components/CrmDashboard";
import { CrmShell } from "@/features/vayon/crm-engine/components/CrmShell";
import { CrmService } from "@/features/vayon/crm-engine/services/crm.service";
export default async function Page() {
  const model = await (await CrmService.production()).dashboard();
  return (
    <CrmShell
      title="CRM Command Center"
      description="A tenant-safe view of leads, customers, companies, and relationship activity."
      actions={<ButtonLink href="/vayon/leads/new">Add lead</ButtonLink>}
    >
      <CrmDashboard model={model} />
    </CrmShell>
  );
}
