"use client";
import type { ReactNode } from "react";
const tabs=["pipelines","fields","forms","workflows","permissions","preferences"] as const;
export type ConfigurationTab=typeof tabs[number];
export function ConfigurationShell({active,onChange,children}:{active:ConfigurationTab;onChange:(tab:ConfigurationTab)=>void;children:ReactNode}){return <div><nav aria-label="Configuration sections" className="flex gap-2 overflow-x-auto rounded-2xl border border-white/[.07] bg-white/[.025] p-2">{tabs.map(tab=><button key={tab} type="button" onClick={()=>onChange(tab)} aria-current={active===tab?"page":undefined} className={`focus-ring whitespace-nowrap rounded-xl px-4 py-2.5 text-sm capitalize ${active===tab?"bg-cyan-300 text-slate-950":"text-slate-400 hover:bg-white/[.05]"}`}>{tab}</button>)}</nav><div className="mt-6">{children}</div></div>}
