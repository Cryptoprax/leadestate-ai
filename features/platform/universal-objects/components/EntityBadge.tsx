import type{UniversalObjectType}from"../domain/models";
export function EntityBadge({type}:{type:UniversalObjectType}){return <span className="rounded-full border border-cyan-300/15 bg-cyan-300/[.06] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-cyan-200">{type.replace("-"," ")}</span>}
