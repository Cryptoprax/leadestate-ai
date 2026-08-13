import { AtSign, Building2, MapPin, Phone } from "lucide-react";
import type { UniversalCompany, UniversalContact } from "../domain/models";
import { EntityBadge } from "./EntityBadge";
export function UniversalProfileCard({ object }: { object: UniversalContact | UniversalCompany }) {
  return <article className="rounded-3xl border border-white/[.08] bg-white/[.025] p-5">
    <div className="flex items-center justify-between"><EntityBadge type={object.type} /><span className="text-xs text-emerald-300">{object.status}</span></div>
    <h2 className="mt-4 text-xl font-semibold">{object.displayName}</h2>
    <div className="mt-4 space-y-2 text-sm text-slate-500">
      {object.type === "contact" ? <><p className="flex gap-2"><AtSign className="size-4" />{object.email || "No email"}</p><p className="flex gap-2"><Phone className="size-4" />{object.phone || "No phone"}</p><p className="flex gap-2"><MapPin className="size-4" />{object.address ? [object.address.city, object.address.countryCode].filter(Boolean).join(", ") : "No address"}</p></> : <><p className="flex gap-2"><Building2 className="size-4" />{object.industry || "Industry not set"}</p><p>{object.organizationType}</p><p>{object.website || "No website"}</p></>}
    </div>
    <div className="mt-4 flex flex-wrap gap-1.5">{object.tags.map((tag) => <span key={tag} className="rounded-full bg-white/[.06] px-2 py-1 text-[10px] text-slate-400">{tag}</span>)}</div>
    <div className="mt-5 rounded-2xl border border-dashed border-violet-300/15 bg-violet-300/[.03] p-4 text-xs text-slate-500">AI summary, recommendations, confidence, insights, and inferred relationships are ready for a future governed provider.</div>
  </article>;
}
