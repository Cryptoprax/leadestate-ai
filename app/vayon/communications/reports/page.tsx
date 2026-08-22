import { CommunicationsShell } from "@/features/vayon/communications-workspace/components/CommunicationsShell";
import { CommunicationsWorkspaceService } from "@/features/vayon/communications-workspace/services/communications.service";
export default async function Page() {
  const { reports } = await (await CommunicationsWorkspaceService.production()).snapshot();
  return <CommunicationsShell title="Communication Reports" description="Measured workspace communication activity. Unavailable provider metrics remain explicitly labeled."><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{reports.map((item) => <article key={item.label} className="rounded-2xl border border-vds-border bg-vds-surface p-5"><p className="text-xs text-vds-muted">{item.label}</p><p className="mt-3 text-lg font-semibold">{item.value}</p></article>)}</div></CommunicationsShell>;
}
