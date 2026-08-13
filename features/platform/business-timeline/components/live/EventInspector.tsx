import { Button } from "@/features/platform/design-system";
import { Braces, CheckCircle2, Fingerprint, ShieldCheck, X } from "lucide-react";
import type { CanonicalBusinessEvent } from "../../domain/contracts";

export function EventInspector({ event, onClose }: { readonly event?: CanonicalBusinessEvent; readonly onClose: () => void }) {
  return <aside aria-label="Event inspector" className="rounded-3xl border border-vds-border/[.08] bg-[var(--vds-color-surface)] p-5 xl:sticky xl:top-6">
    <div className="flex items-center gap-3"><Braces className="size-5 text-vds-accent" aria-hidden="true"/><div className="mr-auto"><p className="text-xs uppercase tracking-[.17em] text-vds-accent">Inspector</p><h2 className="mt-1 font-semibold">Canonical envelope</h2></div>{event && <Button variant="control" type="button" onClick={onClose} aria-label="Close event inspector" className="rounded-lg p-2 text-vds-muted hover:bg-vds-surface/[.05] hover:text-vds-foreground"><X className="size-4"/></Button>}</div>
    {!event ? <div className="mt-8 rounded-2xl border border-dashed border-vds-border p-6 text-center text-sm leading-6 text-vds-subtle">Select an event to inspect its immutable envelope, references, lineage, classification, integrity, and validation.</div> : <div className="mt-5 space-y-4">
      <InspectorSection title="Envelope" icon={<Fingerprint className="size-4"/>} rows={[["Event ID", event.eventId],["Name", event.eventName],["Version", String(event.eventVersion)],["Sequence", String(event.sequence)]]}/>
      <InspectorSection title="Correlation & causation" icon={<Braces className="size-4"/>} rows={[["Correlation", event.correlationId],["Causation", event.causationId ?? "Origin"],["Trace", event.traceId ?? "Not supplied"]]}/>
      <InspectorSection title="Classification & integrity" icon={<ShieldCheck className="size-4"/>} rows={[["Visibility", event.visibility],["Classification", event.classification],["Retention", event.retentionClass],["Integrity", event.integrity?.algorithm ?? "Not supplied"]]}/>
      <InspectorSection title="Validation" icon={<CheckCircle2 className="size-4 text-vds-success"/>} rows={[["Envelope", "Accepted"],["Tenant scope", "Validated before append"],["Immutability", "Canonical"]]}/>
    </div>}
  </aside>;
}
function InspectorSection({ title, icon, rows }: { title: string; icon: React.ReactNode; rows: readonly (readonly [string, string])[] }) { return <section className="rounded-2xl border border-vds-border/[.07] bg-vds-surface/[.02] p-4"><h3 className="flex items-center gap-2 text-xs font-medium text-vds-secondary">{icon}{title}</h3><dl className="mt-3 space-y-2">{rows.map(([label, value]) => <div key={label} className="grid grid-cols-[6rem_1fr] gap-3 text-[11px]"><dt className="text-vds-subtle">{label}</dt><dd className="break-all text-vds-muted">{value}</dd></div>)}</dl></section> }
