"use client";
import { Plus } from "lucide-react";
import { Fragment, useState } from "react";
import type { UniversalObjectRef, UniversalRelationship } from "../domain/models";
import { EntityBadge } from "./EntityBadge";

export function RelationshipGraph({ relationships, onAdd }: { relationships: readonly UniversalRelationship[]; onAdd?: (relationship: UniversalRelationship) => void }) {
  const [predicate, setPredicate] = useState("owns");
  const nodes = new Map<string, UniversalObjectRef>();
  relationships.forEach((edge) => { nodes.set(edge.source.id, edge.source); nodes.set(edge.target.id, edge.target); });
  return <section className="rounded-3xl border border-white/[.08] bg-white/[.025] p-5">
    <div className="flex justify-between"><div><h2 className="font-semibold">Relationship Graph</h2><p className="mt-1 text-xs text-slate-600">Canonical object links with explicit predicates.</p></div><button type="button" disabled={!onAdd} className="rounded-xl border border-white/10 p-2 text-slate-500"><Plus className="size-4" /></button></div>
    <div className="mt-5 flex min-h-56 flex-wrap items-center justify-center gap-3 rounded-2xl bg-black/10 p-5">
      {[...nodes.values()].map((node, index) => <Fragment key={node.id}><div className="rounded-2xl border border-cyan-300/15 bg-cyan-300/[.04] p-4 text-center"><EntityBadge type={node.type} /><p className="mt-2 max-w-32 truncate text-sm">{node.label}</p></div>{index < nodes.size - 1 && <span className="text-xs text-slate-600">→ {relationships[index]?.predicate ?? predicate} →</span>}</Fragment>)}
      {!nodes.size && <p className="text-sm text-slate-600">No relationships yet.</p>}
    </div>
    <label className="mt-4 block text-xs text-slate-500">Relationship predicate<input value={predicate} onChange={(event) => setPredicate(event.target.value)} className="mt-2 h-10 w-full rounded-xl border border-white/10 bg-black/15 px-3 text-sm text-white" /></label>
  </section>;
}
