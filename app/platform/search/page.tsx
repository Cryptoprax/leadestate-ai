import { PageLayout } from "@/features/platform/core/components/PageLayout";
import { UniversalSearch } from "@/features/platform/core/search/components/UniversalSearch";

export default function SearchPage() {
  return (
    <PageLayout
      eyebrow="AtlasOS Core Service"
      title="Universal Search"
      description="One premium search surface for applications, organizations, users, records, commands, pages, reports, documents, and settings."
    >
      <UniversalSearch />
    </PageLayout>
  );
}
