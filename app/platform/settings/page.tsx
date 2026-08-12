import { PageLayout } from "@/features/platform/core/components/PageLayout";
import { SettingsPlatform } from "@/features/platform/core/settings/components/SettingsPlatform";

export default function SettingsPage() {
  return (
    <PageLayout
      eyebrow="AtlasOS Core Service"
      title="Platform Settings"
      description="Configuration architecture for global defaults, brand, localization, regions, communications, security, AI, billing, developers, and the marketplace."
    >
      <SettingsPlatform />
    </PageLayout>
  );
}
