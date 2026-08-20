import { DeveloperPortal } from "@/features/platform/knowledge/components/DeveloperPortal";
import { DocumentationService } from "@/features/platform/knowledge/services/documentation.service";

export const knowledgeDeveloperSections = [
  "REST API reference",
  "Authentication",
  "Webhooks",
  "SDK examples",
  "Error codes",
  "Rate limits",
  "Changelog",
] as const;

export default function Page() {
  return <DeveloperPortal resources={new DocumentationService().api()} />;
}
