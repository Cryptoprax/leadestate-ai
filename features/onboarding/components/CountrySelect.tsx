"use client";
import { CountrySelect as GlobalCountrySelect } from "@/features/location/components";
import { locationData } from "@/features/location/services/location-data.service";
import type { CountryOption } from "../config/catalogs";
export function CountrySelect({value,onChange,error}:{value:string;onChange:(country:CountryOption)=>void;error?:string}){return <GlobalCountrySelect value={value} error={error} required onChange={(code)=>{const country=locationData.country(code);if(country)onChange(country)}}/>}
