import { AtSign, Building2, MapPin, Phone } from "lucide-react";
import type { UniversalCompany, UniversalContact } from "../domain/models";
import { EntityBadge } from "./EntityBadge";
export function UniversalProfileCard({ object }: { object: UniversalContact | UniversalCompany }) {
  return <article className="rounded-3xl border border-vds-border/[.08] bg-vds-surface/[.025] p-5">
    <div className="flex items-center justify-between"><EntityBadge type={object.type} /><span className="text-xs text-vds-success">{object.status}</span></div>
    <h2 className="mt-4 text-xl font-semibold">{object.displayName}</h2>
    <div className="mt-4 space-y-2 text-sm text-vds-muted">
      {object.type === "contact" ? <><p className="flex gap-2"><AtSign className="size-4" />{object.email || "No email"}</p><p className="flex gap-2"><Phone className="size-4" />{object.phone || "No phone"}</p><p className="flex gap-2"><MapPin className="size-4" />{object.address ? [object.address.city, object.address.countryCode].filter(Boolean).join(", ") : "No address"}</p></> : <><p className="flex gap-2"><Building2 className="size-4" />{object.industry || "Industry not set"}</p><p>{object.organizationType}</p><p>{object.website || "No website"}</p></>}
    </div>
    <div className="mt-4 flex flex-wrap gap-1.5">{object.tags.map((tag) => <span key={tag} className="rounded-full bg-vds-surface/[.06] px-2 py-1 text-[10px] text-vds-muted">{tag}</span>)}</div>
    <div className="mt-5 rounded-2xl border border-dashed border-vds-accent bg-vds-accent/[.03] p-4 text-xs text-vds-muted">AI summary, recommendations, confidence, insights, and inferred relationships are ready for a future governed provider.</div>
  </article>;
}
