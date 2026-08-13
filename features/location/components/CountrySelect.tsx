"use client";
import { useEffect, useMemo, useState } from "react";
import { locationData } from "../services/location-data.service";
import { RegionalSelect } from "./RegionalSelect";
export function CountrySelect({name="country",label="Country",value,defaultValue,onChange,required,error}:{name?:string;label?:string;value?:string;defaultValue?:string;onChange?:(value:string)=>void;required?:boolean;error?:string}){const[detected,setDetected]=useState("");useEffect(()=>{queueMicrotask(()=>setDetected(new Intl.Locale(navigator.language).region??""))},[]);const options=useMemo(()=>locationData.countries().map(c=>({value:c.code,label:`${c.flag} ${c.name}`,detail:c.code})),[]);return <RegionalSelect name={name} label={label} value={value} defaultValue={defaultValue??detected} onChange={onChange} options={options} placeholder="Select country" required={required} error={error}/>}
