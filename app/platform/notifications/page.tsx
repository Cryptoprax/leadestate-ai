import { PageLayout } from "@/features/platform/core/components/PageLayout";
import { NotificationPlatform } from "@/features/platform/core/notifications/components/NotificationPlatform";

export default function NotificationsPage() {
  return (
    <PageLayout
      eyebrow="AtlasOS Core Service"
      title="Notification Platform"
      description="A unified, tenant-aware presentation layer for platform, application, organization, security, billing, AI, marketing, and support attention."
    >
      <NotificationPlatform />
    </PageLayout>
  );
}
