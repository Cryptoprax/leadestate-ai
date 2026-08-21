import { ArrowRight, Menu } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { BrandLogo } from "@/components/brand";
import { ButtonLink } from "@/features/platform/design-system";

const navigation = [
  { label: "Product", href: "/product" }, { label: "AI Employees", href: "/ai-workforce" }, { label: "Solutions", href: "/solutions" }, { label: "Industries", href: "/industries" }, { label: "Customers", href: "/customers" }, { label: "Pricing", href: "/pricing" }, { label: "Resources", href: "/resources" }, { label: "Enterprise", href: "/enterprise" }, { label: "Developers", href: "/developers" },
] as const;

export function MarketingShell({ children }: { readonly children: ReactNode }) {
  return <div className="min-h-screen bg-vds-background text-vds-foreground">
    <a href="#marketing-content" className="vds-focus sr-only z-50 rounded-lg bg-vds-surface px-4 py-3 focus:not-sr-only focus:fixed focus:left-4 focus:top-4">Skip to content</a>
    <header className="sticky top-0 z-40 border-b border-vds-border bg-vds-background/85 backdrop-blur-2xl">
      <div className="mx-auto flex h-18 max-w-[90rem] items-center gap-5 px-5 sm:px-8"><Link href="/" aria-label="Vayon home" className="vds-focus flex shrink-0 items-center rounded-lg"><BrandLogo size="sm" priority/></Link><nav aria-label="Primary" className="hidden flex-1 items-center justify-center gap-0.5 xl:flex">{navigation.map(item => <Link key={item.href} href={item.href} className="vds-focus rounded-lg px-2.5 py-2 text-sm text-vds-muted hover:bg-vds-hover hover:text-vds-foreground">{item.label}</Link>)}</nav><div className="ml-auto hidden items-center gap-2 sm:flex"><Link href="/login" className="vds-focus rounded-xl px-4 py-2 text-sm font-medium text-vds-muted hover:text-vds-foreground">Login</Link><ButtonLink href="/signup" size="sm">Get started <ArrowRight className="size-4" aria-hidden="true"/></ButtonLink></div><details className="relative ml-auto xl:hidden"><summary aria-label="Open navigation" className="vds-focus grid size-11 list-none place-items-center rounded-xl border border-vds-border"><Menu className="size-5" aria-hidden="true"/></summary><nav aria-label="Mobile" className="absolute right-0 top-13 grid max-h-[75vh] w-72 gap-1 overflow-y-auto rounded-2xl border border-vds-border bg-vds-surface p-3 shadow-xl">{navigation.map(item => <Link key={item.href} href={item.href} className="vds-focus rounded-lg px-3 py-2.5 text-sm hover:bg-vds-hover">{item.label}</Link>)}<Link href="/login" className="vds-focus rounded-lg px-3 py-2.5 text-sm">Login</Link><ButtonLink href="/signup" size="sm" fullWidth>Get started</ButtonLink></nav></details></div>
    </header><div id="marketing-content">{children}</div><MarketingFooter/>
  </div>;
}

function MarketingFooter() {
  const groups = [
    ["Platform", [["Features", "/features"], ["AI Workforce", "/ai-workforce"], ["CRM", "/crm"], ["Workflows", "/workflows"], ["Integrations", "/integrations"]]],
    ["Resources", [["Documentation", "/docs"], ["Blog", "/blog"], ["ROI Calculator", "/roi-calculator"], ["Demo Workspace", "/demo"], ["Customers", "/customers"], ["Status", "/trust-center"]]],
    ["Developers", [["Developer Portal", "/developers"], ["API Reference", "/docs/api-reference"], ["Architecture", "/docs/architecture-overview"], ["Release Notes", "/docs/release-notes"]]],
    ["Enterprise", [["Security", "/security"], ["Trust Center", "/trust-center"], ["Pricing", "/pricing"], ["Contact Sales", "/contact"]]],
    ["Company", [["About", "/about"], ["Careers", "/careers"], ["Media Kit", "/media-kit"], ["Investors", "/investors"]]],
    ["Legal", [["Privacy", "/privacy"], ["Terms", "/terms"]]],
  ] as const;
  return <footer className="border-t border-vds-border bg-vds-surface/30"><div className="mx-auto grid max-w-[90rem] gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.2fr_3fr]"><div><BrandLogo size="md"/><p className="mt-4 max-w-xs text-sm leading-6 text-vds-muted">The operating system for AI-powered businesses.</p><p className="mt-6 text-xs text-vds-subtle">Built with governance at the core.</p></div><div className="grid grid-cols-2 gap-8 sm:grid-cols-3 xl:grid-cols-6">{groups.map(([title, links]) => <nav key={title} aria-label={title}><h2 className="text-sm font-semibold">{title}</h2><ul className="mt-4 space-y-3">{links.map(([label, href]) => <li key={href}><Link href={href} className="vds-focus rounded text-sm text-vds-muted hover:text-vds-foreground">{label}</Link></li>)}</ul></nav>)}</div></div><div className="border-t border-vds-border px-5 py-5 text-center text-xs text-vds-subtle">© {new Date().getUTCFullYear()} Vayon. Enterprise AI, under human control.</div></footer>;
}
