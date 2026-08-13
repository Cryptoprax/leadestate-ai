import { useId } from "react";

export function Sparkline({values,label}:{values:number[];label:string}){
  const id=useId(),safe=values.length>1?values:[values[0]??0,values[0]??0],max=Math.max(...safe,1),min=Math.min(...safe),range=Math.max(max-min,1),points=safe.map((value,index)=>`${index/(safe.length-1)*100},${28-((value-min)/range)*24}`).join(" ");
  return <svg viewBox="0 0 100 32" className="h-9 w-24 overflow-visible" role="img" aria-label={label} preserveAspectRatio="none"><defs><linearGradient id={id} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="var(--vds-color-primary)" stopOpacity=".26"/><stop offset="1" stopColor="var(--vds-color-primary)" stopOpacity="0"/></linearGradient></defs><polygon points={`0,32 ${points} 100,32`} fill={`url(#${id})`}/><polyline points={points} fill="none" stroke="var(--vds-color-primary)" strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}
