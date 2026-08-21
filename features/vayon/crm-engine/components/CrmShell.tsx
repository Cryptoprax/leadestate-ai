import Link from "next/link";
import type { ReactNode } from "react";
const tabs = [
  ["Overview", "/vayon/crm"],
  ["Organizations", "/vayon/settings/organization"],
  ["Leads", "/vayon/crm/leads"],
  ["Customers", "/vayon/crm/customers"],
  ["Companies", "/vayon/crm/companies"],
  ["Contacts", "/vayon/crm/contacts"],
  ["Opportunities", "/vayon/deals/pipeline"],
  ["Activities", "/vayon/crm/activities"],
  ["Tasks", "/vayon/tasks"],
  ["Meetings", "/vayon/meetings"],
  ["Files", "/vayon/storage"],
  ["Reports", "/vayon/analytics/sales"],
] as const;
export function CrmShell({
  title,
  description,
  actions,
  children,
}: {
  title: string;
  description: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <main className="mx-auto max-w-[96rem] px-4 py-6 sm:px-6 lg:px-8">
      <header className="flex flex-col gap-5 border-b border-vds-border pb-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[.2em] text-vds-primary">
            Vayon CRM
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            {title}
          </h1>
          <p className="mt-2 max-w-3xl text-sm text-vds-muted">{description}</p>
        </div>
        {actions}
      </header>
      <nav
        aria-label="CRM sections"
        className="flex gap-1 overflow-x-auto border-b border-vds-border py-3"
      >
        {tabs.map(([label, href]) => (
          <Link
            key={href}
            href={href}
            className="vds-focus shrink-0 rounded-lg px-3 py-2 text-sm text-vds-muted hover:bg-vds-hover hover:text-vds-foreground"
          >
            {label}
          </Link>
        ))}
      </nav>
      <div className="py-6">{children}</div>
    </main>
  );
}
