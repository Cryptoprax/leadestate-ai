import { notFound } from "next/navigation";
import { CrmLeadProfileView } from "@/features/vayon/crm-engine/components/CrmLeadProfile";
import { CrmShell } from "@/features/vayon/crm-engine/components/CrmShell";
import { CrmService } from "@/features/vayon/crm-engine/services/crm.service";
export default async function Page({
  params,
}: {
  params: Promise<{ leadId: string }>;
}) {
  const { leadId } = await params;
  const profile = await (await CrmService.production()).lead(leadId);
  if (!profile) notFound();
  return (
    <CrmShell
      title="Customer 360"
      description="Unified lead qualification, relationship history, related work, and deterministic intelligence."
    >
      <CrmLeadProfileView profile={profile} />
    </CrmShell>
  );
}
