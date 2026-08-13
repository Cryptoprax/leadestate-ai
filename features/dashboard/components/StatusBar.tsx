import { Activity, Box, Cloud, GitBranch } from "lucide-react";

const statusItems = [
  { label: "Version", value: "AtlasOS 0.1.0", icon: GitBranch },
  { label: "Environment", value: "Production", icon: Cloud },
  { label: "Health", value: "Operational", icon: Activity, healthy: true },
  { label: "Workspace", value: "AtlasOS", icon: Box },
];

export function StatusBar() {
  return (
    <footer className="flex h-8 shrink-0 items-center justify-between border-t border-vds-border/[0.07] bg-vds-background/90 px-3 text-[10px] text-vds-muted backdrop-blur-xl sm:px-5">
      <div className="flex min-w-0 items-center gap-4 overflow-hidden sm:gap-6">
        {statusItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className={`${index > 1 ? "hidden sm:flex" : "flex"} shrink-0 items-center gap-1.5`}
              title={`${item.label}: ${item.value}`}
            >
              {item.healthy ? (
                <span className="size-1.5 rounded-full bg-vds-success shadow-[0_0_8px_var(--vds-color-success)]" />
              ) : (
                <Icon className="size-3" aria-hidden="true" />
              )}
              <span className="hidden text-vds-subtle md:inline">{item.label}</span>
              <span className={item.healthy ? "text-vds-success" : "text-vds-muted"}>
                {item.value}
              </span>
            </div>
          );
        })}
      </div>
      <div className="ml-4 flex shrink-0 items-center gap-1.5">
        <span className="size-1.5 rounded-full bg-vds-primary" />
        <span className="hidden sm:inline">Secure session</span>
      </div>
    </footer>
  );
}
