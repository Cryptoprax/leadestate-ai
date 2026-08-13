import Link from "next/link";
import { Bot, Building2, CalendarPlus, FileUp, Megaphone, UserPlus, UsersRound } from "lucide-react";
const actions=[
  {label:"New Lead",meta:"Capture opportunity",href:"/vayon/leads/new",icon:UserPlus,color:"text-vds-primary bg-vds-primary/[0.08]"},
  {label:"New Property",meta:"Add inventory",href:"/vayon/properties/new",icon:Building2,color:"text-vds-accent bg-vds-accent/[0.08]"},
  {label:"Schedule Visit",meta:"Book a viewing",href:"/vayon/site-visits",icon:CalendarPlus,color:"text-vds-success bg-vds-success/[0.08]"},
  {label:"Invite Team",meta:"Grow the workspace",href:"/vayon/team",icon:UsersRound,color:"text-vds-warning bg-vds-warning/[0.08]"},
  {label:"Import CSV",meta:"Open lead import",href:"/vayon/leads?import=csv",icon:FileUp,color:"text-vds-info bg-vds-info-soft"},
  {label:"Create Campaign",meta:"Open communications",href:"/vayon/communications",icon:Megaphone,color:"text-vds-danger bg-vds-danger/[0.08]"},
  {label:"Open AI Workforce",meta:"Delegate with approval",href:"/vayon/ai",icon:Bot,color:"text-vds-accent bg-vds-accent-soft"},
]as const;
export function QuickActions(){return <section aria-labelledby="quick-actions-heading"><div className="flex items-end justify-between"><div><p className="text-xs font-medium uppercase tracking-[.18em] text-vds-primary">Move faster</p><h2 id="quick-actions-heading" className="mt-2 text-xl font-semibold">Quick Actions</h2></div><span className="text-xs text-vds-subtle">⌘ shortcuts ready</span></div><div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">{actions.map(({label,meta,href,icon:Icon,color})=><Link key={label} href={href} className="group focus-ring min-h-32 rounded-2xl border border-vds-border/[0.07] bg-vds-surface/[0.025] p-4 hover:-translate-y-1 hover:border-vds-accent-border hover:bg-vds-surface/[0.045]"><span className={`grid size-10 place-items-center rounded-2xl ${color} transition group-hover:scale-110`}><Icon className="size-5"/></span><span className="mt-5 block text-sm font-medium text-vds-secondary group-hover:text-vds-foreground">{label}</span><span className="mt-1 block text-[11px] text-vds-subtle">{meta}</span></Link>)}</div></section>}
