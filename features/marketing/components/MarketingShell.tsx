import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, Menu } from "lucide-react";
import { BrandLogo } from "@/components/brand";

const navigation = [
  { label: "Product", href: "/product" },
  { label: "AI Workforce", href: "/ai-workforce" },
  { label: "Solutions", href: "/enterprise" },
  { label: "Security", href: "/security" },
  { label: "Pricing", href: "/pricing" },
  { label: "Resources", href: "/resources" },
];

export function MarketingShell({ children }: { readonly children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--vds-color-background)] text-vds-foreground">
      <a
        href="#marketing-content"
        className="vds-focus sr-only z-50 rounded-lg bg-vds-surface px-4 py-3 focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <header className="sticky top-0 z-40 border-b border-vds-border bg-vds-background/90 backdrop-blur-xl">
        <div className="mx-auto flex h-18 max-w-[90rem] items-center gap-6 px-5 sm:px-8">
          <Link
            href="/"
            aria-label="Vayon home"
            className="vds-focus flex shrink-0 items-center gap-2 rounded-lg"
          >
            <BrandLogo size="sm" priority />
          </Link>
          <nav
            aria-label="Primary"
            className="hidden flex-1 items-center justify-center gap-1 lg:flex"
          >
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="vds-focus rounded-lg px-3 py-2 text-sm text-vds-muted hover:bg-vds-hover hover:text-vds-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="ml-auto hidden items-center gap-2 sm:flex">
            <Link
              href="/login"
              className="vds-focus rounded-xl px-4 py-2 text-sm font-medium text-vds-muted hover:text-vds-foreground"
            >
              Sign in
            </Link>
            <Link
              href="/contact"
              className="vds-focus inline-flex h-11 items-center gap-2 rounded-xl bg-vds-primary px-4 text-sm font-semibold text-vds-on-accent"
            >
              Talk to sales
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <details className="relative ml-auto lg:hidden">
            <summary
              aria-label="Open navigation"
              className="vds-focus grid size-11 cursor-pointer list-none place-items-center rounded-xl border border-vds-border"
            >
              <Menu className="size-5" aria-hidden="true" />
            </summary>
            <nav
              aria-label="Mobile"
              className="absolute right-0 top-13 grid w-64 gap-1 rounded-2xl border border-vds-border bg-vds-surface p-3 shadow-xl"
            >
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="vds-focus rounded-lg px-3 py-2 text-sm"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/login"
                className="vds-focus rounded-lg px-3 py-2 text-sm"
              >
                Sign in
              </Link>
              <Link
                href="/contact"
                className="vds-focus rounded-lg bg-vds-primary px-3 py-2 text-sm font-semibold text-vds-on-accent"
              >
                Talk to sales
              </Link>
            </nav>
          </details>
        </div>
      </header>
      <div id="marketing-content">{children}</div>
      <MarketingFooter />
    </div>
  );
}

function MarketingFooter() {
  const groups = [
    {
      title: "Platform",
      links: [
        ["Features", "/features"],
        ["AI Workforce", "/ai-workforce"],
        ["CRM", "/crm"],
        ["Integrations", "/integrations"],
      ],
    },
    {
      title: "Company",
      links: [
        ["About", "/about"],
        ["Careers", "/careers"],
        ["Customers", "/customers"],
        ["Contact", "/contact"],
      ],
    },
    {
      title: "Learn",
      links: [
        ["Resources", "/resources"],
        ["Blog", "/blog"],
        ["Documentation", "/docs"],
        ["Security", "/security"],
        ["Trust Center", "/trust-center"],
        ["Privacy", "/privacy"],
        ["Terms", "/terms"],
      ],
    },
  ] as const;
  return (
    <footer className="border-t border-vds-border">
      <div className="mx-auto grid max-w-[90rem] gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.4fr_2fr]">
        <div>
          <BrandLogo size="md" />
          <p className="mt-3 max-w-sm text-sm leading-6 text-vds-muted">
            The intelligence operating system for modern real estate companies.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {groups.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2 className="text-sm font-semibold">{group.title}</h2>
              <ul className="mt-4 space-y-3">
                {group.links.map(([label, href]) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="vds-focus rounded text-sm text-vds-muted hover:text-vds-foreground"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>
      <div className="border-t border-vds-border px-5 py-5 text-center text-xs text-vds-subtle">
        © {new Date().getUTCFullYear()} Vayon. Product capabilities and
        availability may change before commercial launch.
      </div>
    </footer>
  );
}
