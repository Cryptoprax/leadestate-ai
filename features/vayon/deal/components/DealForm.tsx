import { Button } from "@/features/platform/design-system";
import { Input } from "@/components/ui/Input";
import { CurrencySelect } from "@/features/location/components";
import { pipelineStages } from "../config/pipeline";
import type { DealRecord } from "../types";

export function DealForm({ action, deal, error }: { action: (form: FormData) => void | Promise<void>; deal?: DealRecord; error?: string }) {
  return <form action={action} className="grid gap-4 rounded-3xl border border-vds-border/[0.08] bg-[var(--vds-color-surface)] p-6 sm:grid-cols-2">
    {deal && <input type="hidden" name="version" value={deal.version} />}
    {error && <p role="alert" className="text-vds-danger sm:col-span-2">{error}</p>}
    <Input id="name" name="name" label="Deal name" defaultValue={deal?.name} required />
    <Input id="reference" name="reference" label="Deal code" defaultValue={deal?.reference} required />
    <Input id="leadId" name="leadId" label="Connected lead ID" defaultValue={deal?.leadId} />
    <Input id="propertyId" name="propertyId" label="Property ID" defaultValue={deal?.propertyId} required />
    <Input id="value" name="value" type="number" label="Deal value" defaultValue={deal?.value?.amount} required />
    <CurrencySelect defaultValue={deal?.value?.currency ?? "USD"} required />
    <Input id="expectedClosing" name="expectedClosing" type="date" label="Expected closing" defaultValue={deal?.closingDate} />
    <Input id="probability" name="probability" type="number" label="Probability %" defaultValue={deal?.probability ?? 10} required />
    <label className="text-sm">Stage<select name="stageId" defaultValue={deal?.stageId ?? "new_lead"} className="mt-2 h-11 w-full rounded-xl border border-vds-border bg-[var(--vds-color-surface)] px-3">{pipelineStages.map((stage) => <option key={stage.id} value={stage.id}>{stage.name}</option>)}</select></label>
    <Input id="assignedAgentId" name="assignedAgentId" label="Assigned agent ID" defaultValue={deal?.assignedAgentId} />
    <div className="sm:col-span-2"><Button type="submit">{deal ? "Save deal" : "Create deal"}</Button></div>
  </form>;
}
