"use client";

import { ImagePlus, Trash2, UploadCloud } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ValidationMessage } from "./ValidationMessage";

const maxSize=5*1024*1024;

export function LogoUploader({storageAvailable=false}:{storageAvailable?:boolean}){
  const input=useRef<HTMLInputElement>(null),[preview,setPreview]=useState<string>(),[error,setError]=useState<string>(),[progress,setProgress]=useState(0),[dragging,setDragging]=useState(false);
  useEffect(()=>()=>{if(preview)URL.revokeObjectURL(preview)},[preview]);
  function select(file?:File){if(!file)return;if(!["image/jpeg","image/png","image/webp"].includes(file.type)){setError("Use a PNG, JPEG, or WebP image.");return}if(file.size>maxSize){setError("Logo must be smaller than 5 MB.");return}if(preview)URL.revokeObjectURL(preview);setError(undefined);setProgress(0);const reader=new FileReader();reader.onprogress=(event)=>{if(event.lengthComputable)setProgress(Math.round(event.loaded/event.total*100))};reader.onloadend=()=>setProgress(100);reader.readAsArrayBuffer(file);setPreview(URL.createObjectURL(file))}
  function remove(){if(preview)URL.revokeObjectURL(preview);setPreview(undefined);setProgress(0);setError(undefined);if(input.current)input.current.value=""}
  return <div><div className="mb-2 flex items-center justify-between"><label className="text-sm font-medium text-slate-200">Organization logo <span className="text-xs font-normal text-slate-600">Optional</span></label>{!storageAvailable&&<span className="rounded-full border border-amber-300/15 bg-amber-300/[0.07] px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-amber-200">Preview only</span>}</div>
    <div onDragOver={(event)=>{event.preventDefault();setDragging(true)}} onDragLeave={()=>setDragging(false)} onDrop={(event)=>{event.preventDefault();setDragging(false);select(event.dataTransfer.files[0])}} className={`relative flex min-h-32 items-center gap-5 rounded-2xl border border-dashed p-4 transition ${dragging?"border-cyan-300 bg-cyan-300/[0.06]":"border-white/15 bg-white/[0.025] hover:border-white/25"}`}>
      {preview?<div className="relative size-20 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-white/5"><Image src={preview} alt="Organization logo preview" fill unoptimized className="object-cover"/></div>:<span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-cyan-300/[0.08] text-cyan-200"><ImagePlus className="size-6"/></span>}
      <div className="min-w-0 flex-1"><p className="text-sm font-medium text-slate-200">{preview?"Logo ready to preview":"Drop your logo here"}</p><p className="mt-1 text-xs leading-5 text-slate-500">PNG, JPEG or WebP · up to 5 MB. Upload activates after workspace storage is provisioned.</p><div className="mt-3 flex flex-wrap gap-2"><button type="button" onClick={()=>input.current?.click()} className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs font-medium text-slate-300 hover:bg-white/[0.06]"><UploadCloud className="size-3.5"/>{preview?"Replace":"Choose image"}</button>{preview&&<button type="button" onClick={remove} className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-rose-300 hover:bg-rose-300/[0.06]"><Trash2 className="size-3.5"/>Remove</button>}</div></div>
      <input ref={input} type="file" accept="image/png,image/jpeg,image/webp" className="sr-only" onChange={(event)=>select(event.target.files?.[0])}/>
    </div>{progress>0&&progress<100&&<div className="mt-2 h-1 overflow-hidden rounded-full bg-white/5"><div className="h-full bg-cyan-300 transition-[width]" style={{width:`${progress}%`}}/></div>}<ValidationMessage message={error}/>
  </div>;
}
