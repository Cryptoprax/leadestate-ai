"use client";
import { Input } from "@/components/ui/Input";
export function AddressAutocomplete(props:React.ComponentProps<typeof Input>){return <Input {...props} autoComplete={props.autoComplete??"street-address"} hint={props.hint??"Address suggestions will use an approved Places provider when configured."}/>}
