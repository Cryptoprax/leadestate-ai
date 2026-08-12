import { Timeline } from "@/features/platform/core/activity/components/Timeline";
import { PageLayout } from "@/features/platform/core/components/PageLayout";

export default function ActivityPage() {
  return (
    <PageLayout
      eyebrow="AtlasOS Core Service"
      title="Live Activity"
      description="A shared operational timeline for significant activity across identities, organizations, applications, workflows, AI, and platform configuration."
    >
      <Timeline />
    </PageLayout>
  );
}
