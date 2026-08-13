"use client";
import { Button } from "@/features/platform/design-system";

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
  return <div><div className="mb-2 flex items-center justify-between"><label className="text-sm font-medium text-vds-secondary">Organization logo <span className="text-xs font-normal text-vds-subtle">Optional</span></label>{!storageAvailable&&<span className="rounded-full border border-vds-warning bg-vds-warning/[0.07] px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-vds-warning">Preview only</span>}</div>
    <div onDragOver={(event)=>{event.preventDefault();setDragging(true)}} onDragLeave={()=>setDragging(false)} onDrop={(event)=>{event.preventDefault();setDragging(false);select(event.dataTransfer.files[0])}} className={`relative flex min-h-32 items-center gap-5 rounded-2xl border border-dashed p-4 transition ${dragging?"border-vds-primary bg-vds-primary/[0.06]":"border-vds-border-strong bg-vds-surface/[0.025] hover:border-vds-border/25"}`}>
      {preview?<div className="relative size-20 shrink-0 overflow-hidden rounded-2xl border border-vds-border bg-vds-elevated"><Image src={preview} alt="Organization logo preview" fill unoptimized className="object-cover"/></div>:<span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-vds-primary/[0.08] text-vds-primary"><ImagePlus className="size-6"/></span>}
      <div className="min-w-0 flex-1"><p className="text-sm font-medium text-vds-secondary">{preview?"Logo ready to preview":"Drop your logo here"}</p><p className="mt-1 text-xs leading-5 text-vds-muted">PNG, JPEG or WebP · up to 5 MB. Upload activates after workspace storage is provisioned.</p><div className="mt-3 flex flex-wrap gap-2"><Button variant="control" type="button" onClick={()=>input.current?.click()} className="inline-flex items-center gap-2 rounded-lg border border-vds-border px-3 py-2 text-xs font-medium text-vds-secondary hover:bg-vds-surface/[0.06]"><UploadCloud className="size-3.5"/>{preview?"Replace":"Choose image"}</Button>{preview&&<Button variant="control" type="button" onClick={remove} className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-vds-danger hover:bg-vds-danger/[0.06]"><Trash2 className="size-3.5"/>Remove</Button>}</div></div>
      <input ref={input} type="file" accept="image/png,image/jpeg,image/webp" className="sr-only" onChange={(event)=>select(event.target.files?.[0])}/>
    </div>{progress>0&&progress<100&&<div className="mt-2 h-1 overflow-hidden rounded-full bg-vds-elevated"><div className="h-full bg-vds-primary transition-[width]" style={{width:`${progress}%`}}/></div>}<ValidationMessage message={error}/>
  </div>;
}
