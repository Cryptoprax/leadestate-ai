import { AuditTable } from "@/features/platform/core/audit/components/AuditTable";
import { PageLayout } from "@/features/platform/core/components/PageLayout";

export default function AuditPage() {
  return (
    <PageLayout
      eyebrow="AtlasOS Core Service"
      title="Audit Platform"
      description="Enterprise-grade visibility into significant actions, identities, tenant context, applications, devices, targets, and outcomes."
    >
      <AuditTable />
    </PageLayout>
  );
}
