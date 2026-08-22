import Link from "next/link";
import { notFound } from "next/navigation";
import { CreativeAssistant } from "@/features/vayon/creative-studio/components/CreativeAssistant";
import { StudioShell } from "@/features/vayon/creative-studio/components/StudioViews";
import { CreativeGenerationService } from "@/features/vayon/creative-studio/generation.service";
import { CreativeStudioService } from "@/features/vayon/creative-studio/service";

export default async function Page() {
  const studio = await CreativeStudioService.production();
  if (!studio) notFound();
  const [{ inventory }, jobs] = await Promise.all([
    studio.projectContext(),
    new CreativeGenerationService().jobs(),
  ]);
  return (
    <StudioShell
      title="AI Creative Assistant"
      description="Describe the real estate campaign you need. The assistant resolves project context and queues a real, privately stored marketing image for human review."
    >
      <CreativeAssistant projects={inventory.projects} />
      <section className="mt-6">
        <div className="flex items-center justify-between"><h2 className="text-lg font-semibold">Generation jobs</h2><Link href="/vayon/creative-studio/assets" className="text-sm text-vds-primary">Asset library</Link></div>
        <div className="mt-3 space-y-3">{jobs.map((job)=><article className="rounded-2xl border border-vds-border bg-vds-surface p-4" key={job.id}><div className="flex flex-wrap items-center justify-between gap-3"><div><p className="font-medium">{job.format} · {job.layoutStyle}</p><p className="mt-1 line-clamp-1 text-xs text-vds-muted">{job.prompt}</p></div><span className="text-xs font-medium uppercase text-vds-primary">{job.status}</span></div><div className="mt-3 h-1.5 overflow-hidden rounded-full bg-vds-elevated"><div className="h-full rounded-full bg-vds-primary transition-all" style={{width:`${job.progress}%`}}/></div><p className="mt-2 text-xs text-vds-muted">Attempt {job.attempts}/{job.maxAttempts}{job.diagnostic?` · ${job.diagnostic}`:""}{job.assetId&&<> · <Link className="text-vds-primary" href={`/vayon/creative-studio/editor/${job.assetId}`}>Open editor</Link></>}</p></article>)}{!jobs.length&&<p className="rounded-2xl border border-dashed border-vds-border p-10 text-center text-sm text-vds-muted">No generation jobs yet.</p>}</div>
      </section>
    </StudioShell>
  );
}
