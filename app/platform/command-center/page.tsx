import { CommandCenter } from "@/features/platform/core/command-center/components/CommandCenter";
import { PageLayout } from "@/features/platform/core/components/PageLayout";

export default function CommandCenterPage() {
  return (
    <PageLayout
      eyebrow="AtlasOS Core Service"
      title="Command Center"
      description="A keyboard-first operating surface for recent work, suggested commands, quick actions, organizations, applications, and users."
    >
      <CommandCenter />
    </PageLayout>
  );
}
