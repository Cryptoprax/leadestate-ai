"use client";

import { ArrowLeft, ArrowRight, Building2, Check, LoaderCircle, Plus, Sparkles, Trash2, Users } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { CountrySelect, CurrencySelect, LanguageSelect, TimezoneSelect } from "@/features/location/components";
import { locationData } from "@/features/location/services/location-data.service";
import { systemRoles } from "@/features/platform/roles/config/system-roles";
import { completeOnboardingAction } from "../actions/onboarding.actions";
import { LogoUploader } from "./LogoUploader";
import { ProgressStepper } from "./ProgressStepper";
import { ValidationMessage } from "./ValidationMessage";

type Invite = { id: number; name: string; email: string; role: string };
type Errors = Partial<Record<"organizationName"|"country"|"currency"|"timezone"|"language"|"workspaceName",string>>;
const officeSuggestions=["Head Office","Regional Office","Sales Office","Remote Office","Corporate Office"];
const branchSuggestions=["Central","Downtown","North","South","East","West","Primary"];

function slugify(value:string){return value.toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"").slice(0,48)}
function fieldError(value:string,label:string,min=2){if(!value.trim())return `${label} is required.`;if(value.trim().length<min)return `${label} must be at least ${min} characters.`}

function SubmitButton(){
  const{pending}=useFormStatus();
  return <Button type="submit" size="lg" disabled={pending} aria-disabled={pending}>{pending?<><LoaderCircle className="size-4 animate-spin"/>Creating your workspace…</>:<><Sparkles className="size-4"/>Launch LeadEstate AI</>}</Button>;
}

export function OnboardingWizard({error}:{error?:string}){
  const[step,setStep]=useState(1),[direction,setDirection]=useState<"forward"|"back">("forward"),[organizationName,setOrganizationName]=useState(""),[workspaceName,setWorkspaceName]=useState(""),[office,setOffice]=useState(""),[branch,setBranch]=useState(""),[country,setCountry]=useState("US"),[currency,setCurrency]=useState("USD"),[timezone,setTimezone]=useState("UTC"),[language,setLanguage]=useState("en"),[errors,setErrors]=useState<Errors>({}),[invites,setInvites]=useState<Invite[]>([{id:0,name:"",email:"",role:"agent"}]);
  const slug=useMemo(()=>slugify(workspaceName||organizationName)||"your-workspace",[workspaceName,organizationName]);

  useEffect(()=>{
    let active=true;
    queueMicrotask(()=>{if(!active)return;const locale=navigator.language||"en-US",region=new Intl.Locale(locale).region;if(region)setCountry(region);const detectedLanguage=locale.split("-")[0]?.toLowerCase()||"en";setLanguage(["en","hi","ar","fr","es","de","it","pt","nl","pl","tr","zh","ja","ko","id"].includes(detectedLanguage)?detectedLanguage:"en");setTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone||"UTC")});
    return()=>{active=false};
  },[]);

  function validate(current=step){
    const next:Errors={};
    if(current===1){next.organizationName=fieldError(organizationName,"Organization name");if(!country)next.country="Select your country.";if(!currency)next.currency="Select your currency.";if(!timezone)next.timezone="Select your timezone.";if(!language)next.language="Select your language."}
    if(current===2)next.workspaceName=fieldError(workspaceName,"Workspace name");
    setErrors(next);return !Object.values(next).some(Boolean);
  }
  function move(next:number){if(next>step&&!validate())return;setDirection(next>step?"forward":"back");setStep(Math.max(1,Math.min(4,next)))}
  function updateInvite(id:number,key:keyof Omit<Invite,"id">,value:string){setInvites((current)=>current.map((invite)=>invite.id===id?{...invite,[key]:value}:invite))}

  return <form action={completeOnboardingAction} onSubmit={(event)=>{const organizationValid=validate(1);if(!organizationValid||!workspaceName.trim()){event.preventDefault();move(organizationValid?2:1)}}} className="w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#09121b]/95 shadow-[0_30px_100px_rgba(0,0,0,.48)] backdrop-blur-xl">
    <div className="grid lg:grid-cols-[18rem_1fr]">
      <aside className="relative overflow-hidden border-b border-white/[0.07] bg-gradient-to-br from-cyan-300/[0.09] via-transparent to-violet-400/[0.08] p-6 lg:min-h-[42rem] lg:border-b-0 lg:border-r lg:p-8">
        <div className="absolute -left-20 top-40 size-52 rounded-full bg-cyan-300/[0.06] blur-3xl"/>
        <p className="relative text-sm font-semibold text-cyan-300">LeadEstate AI</p><h1 className="relative mt-8 text-3xl font-semibold tracking-tight">Your command center starts here.</h1><p className="relative mt-3 text-sm leading-6 text-slate-400">A secure workspace configured around your market, team, and operating model.</p>
        <div className="relative mt-10 hidden space-y-5 text-sm lg:block">{[{icon:Building2,text:"Organization and workspace provisioning"},{icon:Users,text:"Role-based team access"},{icon:Check,text:"Billing and AI workforce ready"}].map(({icon:Icon,text})=><div key={text} className="flex items-center gap-3 text-slate-300"><span className="grid size-9 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-cyan-200"><Icon className="size-4"/></span>{text}</div>)}</div>
      </aside>
      <section className="p-5 sm:p-8 lg:p-10">
        <div className="flex items-center justify-between"><p className="text-xs font-semibold uppercase tracking-[.2em] text-cyan-300">Step {step} of 4</p><p className="text-xs text-slate-600">About 2 minutes</p></div><div className="mt-5"><ProgressStepper current={step}/></div>
        {error&&<p role="alert" className="mt-6 rounded-2xl border border-rose-300/15 bg-rose-300/[0.07] p-4 text-sm text-rose-200">{error}</p>}
        <div key={step} className={`mt-8 min-h-[25rem] ${direction==="forward"?"animate-[onboarding-in_.28s_ease-out]":"animate-[onboarding-back_.28s_ease-out]"}`}>
          <section hidden={step!==1} aria-labelledby="organization-title"><h2 id="organization-title" className="text-2xl font-semibold tracking-tight">Tell us about your organization</h2><p className="mt-2 text-sm text-slate-500">We’ll tailor currency, timezone, and language defaults for your market.</p><div className="mt-7 space-y-5"><div><Input id="organizationName" name="organizationName" label="Organization name *" autoComplete="organization" value={organizationName} onChange={(event)=>{setOrganizationName(event.target.value);if(errors.organizationName)setErrors((current)=>({...current,organizationName:fieldError(event.target.value,"Organization name")}))}} onBlur={()=>setErrors((current)=>({...current,organizationName:fieldError(organizationName,"Organization name")}))} error={errors.organizationName}/></div><LogoUploader/><div className="grid gap-5 sm:grid-cols-2"><CountrySelect value={country} error={errors.country} required onChange={(code)=>{setCountry(code);setCurrency(locationData.country(code)?.currency??currency);setErrors((current)=>({...current,country:undefined,currency:undefined}))}}/><CurrencySelect value={currency} onChange={setCurrency} error={errors.currency} required/><TimezoneSelect value={timezone} onChange={setTimezone} error={errors.timezone} required/><LanguageSelect value={language} onChange={setLanguage} error={errors.language} required/></div></div></section>
          <section hidden={step!==2} aria-labelledby="workspace-title"><h2 id="workspace-title" className="text-2xl font-semibold tracking-tight">Create your first workspace</h2><p className="mt-2 text-sm text-slate-500">Set up the operating hub your team will use every day.</p><div className="mt-7 space-y-5"><Input id="workspaceName" name="workspaceName" label="Workspace name *" autoComplete="organization" value={workspaceName} onChange={(event)=>{setWorkspaceName(event.target.value);if(errors.workspaceName)setErrors((current)=>({...current,workspaceName:fieldError(event.target.value,"Workspace name")}))}} onBlur={()=>setErrors((current)=>({...current,workspaceName:fieldError(workspaceName,"Workspace name")}))} error={errors.workspaceName}/><div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] px-4 py-3"><p className="text-xs uppercase tracking-wider text-slate-600">Workspace URL preview</p><p className="mt-1 truncate font-mono text-sm text-cyan-200">app.leadestate.ai/{slug}</p></div><div className="grid gap-5 sm:grid-cols-2"><Input id="office" name="office" label="Office location" autoComplete="street-address" list="office-suggestions" value={office} onChange={(event)=>setOffice(event.target.value)} hint="Start typing or choose a common office type."/><datalist id="office-suggestions">{officeSuggestions.map((item)=><option value={item} key={item}/>)}</datalist><Input id="branch" name="branch" label="Branch" list="branch-suggestions" value={branch} onChange={(event)=>setBranch(event.target.value)} hint="Optional branch or territory label."/><datalist id="branch-suggestions">{branchSuggestions.map((item)=><option value={item} key={item}/>)}</datalist></div></div></section>
          <section hidden={step!==3} aria-labelledby="team-title"><div className="flex items-start justify-between gap-4"><div><h2 id="team-title" className="text-2xl font-semibold tracking-tight">Bring your team</h2><p className="mt-2 text-sm text-slate-500">Optional. Invitations are securely recorded for delivery.</p></div><Button variant="outline" size="sm" onClick={()=>setInvites((current)=>[...current,{id:Math.max(...current.map((item)=>item.id),0)+1,name:"",email:"",role:"agent"}])}><Plus className="size-4"/>Add</Button></div><div className="mt-6 max-h-[25rem] space-y-4 overflow-y-auto pr-1">{invites.map((invite,index)=><fieldset key={invite.id} className="relative grid gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 sm:grid-cols-2"><legend className="px-1 text-xs font-medium text-slate-500">Invitation {index+1}</legend><Input id={`inviteName-${invite.id}`} name="inviteName" label="Name" value={invite.name} onChange={(event)=>updateInvite(invite.id,"name",event.target.value)}/><Input id={`inviteEmail-${invite.id}`} name="inviteEmail" label="Email" type="email" value={invite.email} onChange={(event)=>updateInvite(invite.id,"email",event.target.value)}/><label className="text-sm font-medium text-slate-200">Role<select name="inviteRole" value={invite.role} onChange={(event)=>updateInvite(invite.id,"role",event.target.value)} className="mt-2 h-11 w-full rounded-xl border border-white/10 bg-[#0a131d] px-3 text-sm text-white outline-none focus:border-cyan-300/60">{systemRoles.filter((role)=>role.code!=="super_admin"&&role.code!=="organization_owner").map((role)=><option key={role.code} value={role.code}>{role.name}</option>)}</select></label>{invites.length>1&&<button type="button" aria-label={`Remove invitation ${index+1}`} onClick={()=>setInvites((current)=>current.filter((item)=>item.id!==invite.id))} className="absolute right-3 top-2 rounded-lg p-2 text-slate-600 hover:bg-rose-300/[0.06] hover:text-rose-300"><Trash2 className="size-4"/></button>}</fieldset>)}</div></section>
          <section hidden={step!==4} aria-labelledby="review-title"><div className="mx-auto max-w-lg text-center"><span className="mx-auto grid size-16 place-items-center rounded-3xl border border-cyan-300/20 bg-cyan-300/[0.08] text-cyan-200 shadow-[0_0_40px_rgba(34,211,238,.12)]"><Sparkles className="size-7"/></span><h2 id="review-title" className="mt-6 text-2xl font-semibold tracking-tight">Ready to launch</h2><p className="mt-2 text-sm leading-6 text-slate-500">LeadEstate will atomically create your organization, workspace, owner access, billing foundation, AI workforce, and {invites.filter((invite)=>invite.email).length} team invitation{invites.filter((invite)=>invite.email).length===1?"":"s"}.</p></div><div className="mt-8 grid gap-3 sm:grid-cols-2"><Review label="Organization" value={organizationName}/><Review label="Workspace" value={workspaceName}/><Review label="Market" value={`${country} · ${currency}`}/><Review label="Locale" value={`${language.toUpperCase()} · ${timezone}`}/></div><ValidationMessage valid message="All required information is complete."/></section>
        </div>
        <div className="mt-8 flex items-center justify-between border-t border-white/[0.07] pt-6"><Button variant="ghost" onClick={()=>move(step-1)} disabled={step===1}><ArrowLeft className="size-4"/>Back</Button>{step<4?<Button size="lg" onClick={()=>move(step+1)}>Continue<ArrowRight className="size-4"/></Button>:<SubmitButton/>}</div>
      </section>
    </div>
  </form>;
}

function Review({label,value}:{label:string;value:string}){return <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4"><p className="text-xs uppercase tracking-wider text-slate-600">{label}</p><p className="mt-1 truncate text-sm font-medium text-slate-200">{value}</p></div>}
