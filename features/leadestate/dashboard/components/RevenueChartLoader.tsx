"use client";
import dynamic from "next/dynamic";
import type { ChartPoint } from "../types";
const RevenueChart=dynamic(()=>import("./RevenueChart"),{loading:()=> <div className="skeleton h-[25rem] rounded-3xl border border-white/[0.07]" aria-label="Loading revenue analytics" role="status"/>});
export function RevenueChartLoader({data,currency}:{data:ChartPoint[];currency:string}){return <RevenueChart data={data} currency={currency}/>}
