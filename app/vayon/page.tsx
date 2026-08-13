import { redirect } from "next/navigation";
import { OrganizationService } from "@/features/onboarding/services/organization.service";
export default async function Page({ searchParams }: { searchParams: Promise<{ welcome?: string }> }) { if (!await new OrganizationService().current()) redirect("/onboarding"); const query = await searchParams; redirect(query.welcome === "1" ? "/vayon/home?welcome=1" : "/vayon/home") }
