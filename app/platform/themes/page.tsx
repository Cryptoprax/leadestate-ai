import { PageLayout } from "@/features/platform/core/components/PageLayout";
import { ThemeManager } from "@/features/platform/core/themes/components/ThemeManager";

export default function ThemesPage() {
  return (
    <PageLayout
      eyebrow="AtlasOS Core Service"
      title="Theme Manager"
      description="Govern typography, color systems, radius, accessibility, and brand presentation across every AtlasOS application."
    >
      <ThemeManager />
    </PageLayout>
  );
}
