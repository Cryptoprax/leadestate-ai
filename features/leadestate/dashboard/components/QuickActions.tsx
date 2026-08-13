import Link from "next/link";
import { Bot, Building2, CalendarPlus, FileUp, Megaphone, UserPlus, UsersRound } from "lucide-react";
const actions=[
  {label:"New Lead",meta:"Capture opportunity",href:"/leadestate/leads/new",icon:UserPlus,color:"text-cyan-200 bg-cyan-300/[0.08]"},
  {label:"New Property",meta:"Add inventory",href:"/leadestate/properties/new",icon:Building2,color:"text-violet-200 bg-violet-300/[0.08]"},
  {label:"Schedule Visit",meta:"Book a viewing",href:"/leadestate/site-visits",icon:CalendarPlus,color:"text-emerald-200 bg-emerald-300/[0.08]"},
  {label:"Invite Team",meta:"Grow the workspace",href:"/leadestate/team",icon:UsersRound,color:"text-amber-200 bg-amber-300/[0.08]"},
  {label:"Import CSV",meta:"Open lead import",href:"/leadestate/leads?import=csv",icon:FileUp,color:"text-sky-200 bg-sky-300/[0.08]"},
  {label:"Create Campaign",meta:"Open communications",href:"/leadestate/communications",icon:Megaphone,color:"text-rose-200 bg-rose-300/[0.08]"},
  {label:"Open AI Workforce",meta:"Delegate with approval",href:"/leadestate/ai",icon:Bot,color:"text-fuchsia-200 bg-fuchsia-300/[0.08]"},
]as const;
export function QuickActions(){return <section aria-labelledby="quick-actions-heading"><div className="flex items-end justify-between"><div><p className="text-xs font-medium uppercase tracking-[.18em] text-cyan-300">Move faster</p><h2 id="quick-actions-heading" className="mt-2 text-xl font-semibold">Quick Actions</h2></div><span className="text-xs text-slate-600">⌘ shortcuts ready</span></div><div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">{actions.map(({label,meta,href,icon:Icon,color})=><Link key={label} href={href} className="group focus-ring min-h-32 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 hover:-translate-y-1 hover:border-cyan-300/20 hover:bg-white/[0.045]"><span className={`grid size-10 place-items-center rounded-2xl ${color} transition group-hover:scale-110`}><Icon className="size-4.5"/></span><span className="mt-5 block text-sm font-medium text-slate-200 group-hover:text-white">{label}</span><span className="mt-1 block text-[11px] text-slate-600">{meta}</span></Link>)}</div></section>}
