"use client";

import { Check } from "lucide-react";

const steps=["Organization","Workspace","Team","Review"];

export function ProgressStepper({current}:{current:number}){
  return <nav aria-label="Onboarding progress">
    <div className="relative"><div className="absolute left-0 right-0 top-4 h-px bg-white/10"/><div className="absolute left-0 top-4 h-px bg-gradient-to-r from-cyan-300 to-violet-400 transition-[width] duration-500 ease-out" style={{width:`${((current-1)/(steps.length-1))*100}%`}}/>
      <ol className="relative flex justify-between">{steps.map((label,index)=>{const number=index+1,complete=number<current,active=number===current;return <li key={label} className="flex max-w-20 flex-col items-center gap-2 text-center"><span aria-current={active?"step":undefined} className={`grid size-8 place-items-center rounded-full border text-xs font-semibold transition-all duration-300 ${complete?"border-cyan-300 bg-cyan-300 text-slate-950":active?"border-cyan-300 bg-[#0a131d] text-cyan-200 shadow-[0_0_20px_rgba(34,211,238,.28)]":"border-white/10 bg-[#0a131d] text-slate-600"}`}>{complete?<Check className="size-4"/>:number}</span><span className={`hidden text-[11px] font-medium sm:block ${active||complete?"text-slate-200":"text-slate-600"}`}>{label}</span></li>})}</ol>
    </div>
  </nav>;
}
