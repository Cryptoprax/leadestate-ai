"use client";
import { Button } from "@/features/platform/design-system";

import { Check, ChevronDown, Search } from "lucide-react";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { ValidationMessage } from "./ValidationMessage";

export type SelectOption = { value: string; label: string; detail?: string };

export function SearchableSelect({
  name, label, value, options, onChange, placeholder, required, error, loading,
}: {
  name: string; label: string; value: string; options: readonly SelectOption[];
  onChange: (value: string) => void; placeholder: string; required?: boolean;
  error?: string; loading?: boolean;
}) {
  const id = useId(), root = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false), [query, setQuery] = useState(""), [active, setActive] = useState(0);
  const selected = options.find((option) => option.value === value);
  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return normalized ? options.filter((option) => `${option.label} ${option.detail ?? ""} ${option.value}`.toLowerCase().includes(normalized)) : options;
  }, [options, query]);

  useEffect(() => {
    const close = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, []);

  function choose(option: SelectOption) {
    onChange(option.value); setQuery(""); setOpen(false);
  }

  return <div ref={root} className="relative">
    <label id={`${id}-label`} className="mb-2 block text-sm font-medium text-vds-secondary">{label}{required&&<span className="ml-1 text-vds-primary" aria-hidden="true">*</span>}</label>
    <input type="hidden" name={name} value={value}/>
    <Button variant="control" type="button" aria-labelledby={`${id}-label`} aria-haspopup="listbox" aria-expanded={open} onClick={()=>setOpen((current)=>!current)} onKeyDown={(event)=>{if(event.key==="ArrowDown"){event.preventDefault();setOpen(true);setActive((current)=>Math.min(current+1,filtered.length-1))}if(event.key==="ArrowUp"){event.preventDefault();setOpen(true);setActive((current)=>Math.max(current-1,0))}if(event.key==="Enter"&&open&&filtered[active]){event.preventDefault();choose(filtered[active])}if(event.key==="Escape")setOpen(false)}} className={`flex h-12 w-full items-center justify-between rounded-xl border bg-vds-surface/[0.045] px-3.5 text-left text-sm outline-none hover:border-vds-border-strong focus-visible:border-vds-accent-border focus-visible:ring-2 focus-visible:ring-vds-focus ${error?"border-vds-danger":"border-vds-border"}`}>
      <span className={selected?"text-vds-foreground":"text-vds-muted"}>{loading?"Loading options…":selected?.label??placeholder}</span><ChevronDown className={`size-4 text-vds-muted transition ${open?"rotate-180":""}`}/>
    </Button>
    {open&&<div className="absolute z-40 mt-2 w-full overflow-hidden rounded-2xl border border-vds-border bg-[var(--vds-color-elevated)] p-2 shadow-2xl shadow-vds-shadow">
      <div className="relative"><Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-vds-muted"/><input autoFocus value={query} onChange={(event)=>{setQuery(event.target.value);setActive(0)}} onKeyDown={(event)=>{if(event.key==="ArrowDown"){event.preventDefault();setActive((current)=>Math.min(current+1,filtered.length-1))}if(event.key==="ArrowUp"){event.preventDefault();setActive((current)=>Math.max(current-1,0))}if(event.key==="Enter"&&filtered[active]){event.preventDefault();choose(filtered[active])}if(event.key==="Escape")setOpen(false)}} placeholder={`Search ${label.toLowerCase()}`} className="h-10 w-full rounded-xl border border-vds-border bg-vds-input pl-9 pr-3 text-sm outline-none focus:border-vds-accent-border"/></div>
      <div role="listbox" aria-labelledby={`${id}-label`} className="mt-2 max-h-60 overflow-y-auto overscroll-contain">
        {filtered.map((option,index)=><Button variant="control" type="button" role="option" aria-selected={option.value===value} key={option.value} onMouseEnter={()=>setActive(index)} onClick={()=>choose(option)} className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm ${active===index?"bg-vds-surface/[0.08]":"hover:bg-vds-surface/[0.05]"}`}><span><span className="text-vds-foreground">{option.label}</span>{option.detail&&<span className="ml-2 text-xs text-vds-muted">{option.detail}</span>}</span>{option.value===value&&<Check className="size-4 text-vds-primary"/>}</Button>)}
        {!filtered.length&&<p className="px-3 py-8 text-center text-sm text-vds-muted">No matching options</p>}
      </div>
    </div>}
    <ValidationMessage message={error}/>
  </div>;
}
