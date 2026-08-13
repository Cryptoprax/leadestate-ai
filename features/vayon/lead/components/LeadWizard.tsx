"use client";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/features/platform/design-system";
import { Input } from "@/components/ui/Input";
import { CurrencySelect, LanguageSelect, PhoneCodeSelect } from "@/features/location/components";
import { leadPriorities, leadSources, leadStatuses } from "../config/catalogs";
import type { LeadRecord } from "../types";

function Submit({ edit }: { edit: boolean }) { const { pending } = useFormStatus(); return <Button type="submit" disabled={pending}>{pending ? "Saving…" : edit ? "Save changes" : "Create lead"}</Button>; }
export function LeadWizard({ action, lead, error }: { action: (form: FormData) => void | Promise<void>; lead?: LeadRecord; error?: string }) {
  const [step, setStep] = useState(1);
  return <form action={action} className="rounded-3xl border border-vds-border/[0.08] bg-[var(--vds-color-surface)] p-6 sm:p-8">
    {lead && <input type="hidden" name="version" value={lead.version} />}
    <p className="text-xs uppercase tracking-widest text-vds-primary">Step {step} of 6</p>
    {error && <p role="alert" className="mt-4 rounded-xl bg-vds-danger-soft p-3 text-sm text-vds-danger">{error}</p>}
    <div className={step === 1 ? "mt-7 grid gap-4 sm:grid-cols-2" : "hidden"}>
      <Input id="name" name="name" label="Name" defaultValue={lead?.name} required />
      <PhoneCodeSelect defaultValue="+1" required />
      <Input id="phone" name="phone" label="Phone number" defaultValue={lead?.phone} required />
      <Input id="email" name="email" type="email" label="Email" defaultValue={lead?.email} />
      <Input id="whatsapp" name="whatsapp" label="WhatsApp number" defaultValue={lead?.whatsapp} />
      <LanguageSelect name="preferredLanguage" label="Preferred language" defaultValue={lead?.preferredLanguage ?? "en"} />
    </div>
    <div className={step === 2 ? "mt-7" : "hidden"}><Select name="source" label="Lead source" items={leadSources} value={lead?.source ?? "manual"} /></div>
    <div className={step === 3 ? "mt-7 grid gap-4 sm:grid-cols-2" : "hidden"}>
      <Input id="budget" name="budget" type="number" label="Budget" defaultValue={lead?.budgetAmount?.amount} />
      <CurrencySelect defaultValue={lead?.budgetAmount?.currency ?? "USD"} required />
      <Input id="buyingPurpose" name="buyingPurpose" label="Buying purpose" defaultValue={lead?.buyingPurpose} />
      <Input id="propertyType" name="propertyType" label="Property type" defaultValue={lead?.propertyType} />
      <Input id="preferredLocations" name="preferredLocations" label="Preferred locations" defaultValue={lead?.preferredLocations.join(", ")} hint="Comma-separated locations; structured coverage follows property geography." />
      <Input id="bedrooms" name="bedrooms" type="number" label="Bedrooms" defaultValue={lead?.bedrooms} />
      <Input id="timeline" name="timeline" label="Timeline" defaultValue={lead?.timeline} />
      <Input id="financing" name="financing" label="Financing" defaultValue={lead?.financing} />
    </div>
    <div className={step === 4 ? "mt-7" : "hidden"}><div className="rounded-2xl border border-dashed border-vds-border p-10 text-center text-sm text-vds-muted">Existing property selector · ready for AI matching<input type="hidden" name="propertyInterestIds" value="" /></div></div>
    <div className={step === 5 ? "mt-7 grid gap-4 sm:grid-cols-2" : "hidden"}><Input id="assignedAgentId" name="assignedAgentId" label="Assigned agent ID" /><Select name="priority" label="Priority" items={leadPriorities} value={lead?.priority ?? "medium"} /><Input id="tags" name="tags" label="Tags" defaultValue={lead?.tags.join(", ")} hint="Comma-separated" /><Select name="status" label="Status" items={leadStatuses} value={lead?.status ?? "new"} /><Input id="expectedClosing" name="expectedClosing" type="date" label="Expected closing" defaultValue={lead?.expectedClosing} /></div>
    <div className={step === 6 ? "mt-7" : "hidden"}><h2 className="text-2xl font-semibold">Review lead</h2><p className="mt-2 text-sm text-vds-muted">Review the information before creating this intelligent lead workspace.</p></div>
    <div className="mt-8 flex justify-between border-t border-vds-border/[0.07] pt-5"><Button type="button" variant="ghost" disabled={step === 1} onClick={() => setStep((current) => Math.max(1, current - 1))}>Back</Button>{step < 6 ? <Button type="button" onClick={() => setStep((current) => Math.min(6, current + 1))}>Continue</Button> : <Submit edit={Boolean(lead)} />}</div>
  </form>;
}
function Select({ name, label, items, value }: { name: string; label: string; items: readonly { code: string; label: { default: string } }[]; value: string }) { return <label className="text-sm">{label}<select name={name} defaultValue={value} className="mt-2 h-11 w-full rounded-xl border border-vds-border bg-[var(--vds-color-surface)] px-3">{items.map((item) => <option key={item.code} value={item.code}>{item.label.default}</option>)}</select></label>; }
