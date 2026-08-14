import {
  ProviderInventory,
  ProviderReadinessService,
} from "@/features/platform/live-providers";

export default async function ProvidersPage() {
  const models = await new ProviderReadinessService().inventory();
  return <ProviderInventory models={models} />;
}
