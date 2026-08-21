import Link from "next/link";
import type { CrmDashboardModel, CrmSalesDashboard } from "../domain/contracts";
const card = "rounded-2xl border border-vds-border bg-vds-surface p-5";
export function CrmDashboard({ model }: { model: CrmDashboardModel }) {
  return (
    <div className="space-y-6">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-7">
        {model.stats.map((stat) => (
          <article key={stat.label} className={card}>
            <p className="text-xs text-vds-muted">{stat.label}</p>
            <p
              className={`mt-3 text-xl font-semibold ${stat.state === "unavailable" ? "text-vds-muted" : ""}`}
            >
              {stat.value}
            </p>
          </article>
        ))}
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.3fr_.7fr]">
        <section className={card}>
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Recent leads</h2>
            <Link className="text-sm text-vds-primary" href="/vayon/crm/leads">
              View all
            </Link>
          </div>
          <div className="mt-4 divide-y divide-vds-border">
            {model.recentLeads.length ? (
              model.recentLeads.map((lead) => (
                <Link
                  key={lead.id}
                  href={`/vayon/crm/leads/${lead.id}`}
                  className="flex items-center justify-between gap-4 py-3 hover:bg-vds-hover"
                >
                  <span>
                    <strong className="block text-sm">{lead.name}</strong>
                    <span className="text-xs text-vds-muted">
                      {lead.propertyInterest}
                    </span>
                  </span>
                  <span className="rounded-full bg-vds-primary-soft px-2.5 py-1 text-xs text-vds-primary">
                    {lead.status}
                  </span>
                </Link>
              ))
            ) : (
              <p className="py-8 text-sm text-vds-muted">
                No lead data is available for this workspace.
              </p>
            )}
          </div>
        </section>
        <section className={card}>
          <h2 className="font-semibold">Activity stream</h2>
          <div className="mt-4 space-y-4">
            {model.recentActivity.length ? (
              model.recentActivity.map((item) => (
                <article
                  key={item.id}
                  className="border-l border-vds-border pl-4"
                >
                  <p className="text-sm font-medium">{item.title}</p>
                  <p className="mt-1 text-xs text-vds-muted">
                    {item.detail ?? item.kind} ·{" "}
                    {new Date(item.occurredAt).toLocaleString()}
                  </p>
                </article>
              ))
            ) : (
              <p className="py-8 text-sm text-vds-muted">
                Activity will appear as workspace records are updated.
              </p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
export function SalesCommandCenter({model}:{model:CrmSalesDashboard}) { const money=(value:number)=>new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:0}).format(value); const metrics=[["Revenue",money(model.revenue)],["Forecast",money(model.forecast)],["Conversion",`${model.conversion.toFixed(1)}%`],["Meetings",model.meetings],["Open tasks",model.tasks],["Pipeline",money(model.pipeline)]]; return <section className="space-y-5" aria-labelledby="sales-command-title"><div className="flex flex-wrap items-end justify-between gap-3"><div><p className="text-xs font-semibold uppercase tracking-[.18em] text-vds-primary">Sales operating system</p><h2 id="sales-command-title" className="mt-2 text-2xl font-semibold">Sales command center</h2></div><div className="flex gap-2"><Link className="text-sm text-vds-primary" href="/vayon/deals/pipeline">Open pipeline</Link><Link className="text-sm text-vds-primary" href="/vayon/analytics/sales">View reports</Link></div></div><div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-6">{metrics.map(([label,value])=><article className={card} key={label}><p className="text-xs text-vds-muted">{label}</p><p className="mt-3 text-xl font-semibold">{value}</p></article>)}</div><div className="grid gap-5 lg:grid-cols-2"><Rank title="Lead sources" items={model.leadSources}/><Rank title="Top salespeople" items={model.topSalespeople}/></div></section> }
function Rank({title,items}:{title:string;items:CrmSalesDashboard["leadSources"]}) { return <section className={card}><h3 className="font-semibold">{title}</h3><div className="mt-4 space-y-3">{items.map((item,index)=><div className="flex items-center gap-3" key={item.label}><span className="w-5 text-xs text-vds-subtle">0{index+1}</span><span className="min-w-0 flex-1 truncate text-sm">{item.label}</span><span className="text-sm font-semibold">{item.count}</span></div>)}{!items.length&&<p className="py-6 text-sm text-vds-muted">No authoritative data is available yet.</p>}</div></section> }
