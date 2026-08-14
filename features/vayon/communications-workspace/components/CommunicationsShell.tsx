import Link from "next/link";
import type { ReactNode } from "react";
const links = [
  ["Overview", "/vayon/communications"],
  ["Inbox", "/vayon/communications/inbox"],
  ["Conversations", "/vayon/communications/conversations"],
  ["Templates", "/vayon/communications/templates"],
  ["Campaigns", "/vayon/communications/campaigns"],
  ["Notifications", "/vayon/communications/notifications"],
] as const;
export function CommunicationsShell({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <main className="mx-auto max-w-[96rem] px-4 py-7 sm:px-6">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[.2em] text-vds-primary">
          Unified communications · deterministic
        </p>
        <h1 className="mt-2 text-3xl font-semibold">{title}</h1>
        <p className="mt-2 max-w-3xl text-sm text-vds-muted">{description}</p>
      </header>
      <nav
        aria-label="Communications Hub"
        className="my-5 flex gap-1 overflow-x-auto border-y border-vds-border py-3"
      >
        {links.map(([label, href]) => (
          <Link
            href={href}
            key={href}
            className="vds-focus shrink-0 rounded-lg px-3 py-2 text-sm text-vds-muted hover:bg-vds-hover"
          >
            {label}
          </Link>
        ))}
      </nav>
      {children}
    </main>
  );
}
