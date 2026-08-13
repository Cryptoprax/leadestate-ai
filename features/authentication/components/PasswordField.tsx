"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/Input";

export function PasswordField({label="Password",id="password",name="password"}:{label?:string;id?:string;name?:string}){
  const[value,setValue]=useState("");
  const strength=useMemo(()=>[value.length>=8,/[a-z]/.test(value)&&/[A-Z]/.test(value),/\d/.test(value),/[^A-Za-z0-9]/.test(value)].filter(Boolean).length,[value]);
  const labels=["Use at least 8 characters","Weak","Fair","Strong","Excellent"];
  return <div><Input id={id} name={name} type="password" label={label} autoComplete="new-password" required minLength={8} value={value} onChange={(event)=>setValue(event.target.value)} aria-describedby={`${id}-strength`}/><div className="mt-2 grid grid-cols-4 gap-1" aria-hidden="true">{[1,2,3,4].map((level)=><span key={level} className={`h-1 rounded-full ${level<=strength?strength<3?"bg-amber-300":"bg-emerald-300":"bg-white/[0.07]"}`}/>)}</div><p id={`${id}-strength`} className="mt-2 text-xs text-slate-500" aria-live="polite">{labels[strength]}</p></div>;
}
