import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex min-w-0 items-center gap-1.5 text-sm">
        <li className="flex shrink-0 items-center text-vds-muted">
          <Home className="size-3.5" aria-hidden="true" />
          <span className="sr-only">Home</span>
        </li>
        {items.map((item, index) => {
          const isCurrent = index === items.length - 1;

          return (
            <li key={`${item.label}-${index}`} className="flex min-w-0 items-center gap-1.5">
              <ChevronRight
                className="size-3.5 shrink-0 text-vds-subtle"
                aria-hidden="true"
              />
              {item.href && !isCurrent ? (
                <a
                  href={item.href}
                  className="truncate text-vds-muted transition hover:text-vds-secondary"
                >
                  {item.label}
                </a>
              ) : (
                <span
                  className="truncate font-medium text-vds-secondary"
                  aria-current={isCurrent ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
