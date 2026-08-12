import { Activity, Box, Cloud, GitBranch } from "lucide-react";

const statusItems = [
  { label: "Version", value: "AtlasOS 0.1.0", icon: GitBranch },
  { label: "Environment", value: "Production", icon: Cloud },
  { label: "Health", value: "Operational", icon: Activity, healthy: true },
  { label: "Workspace", value: "AtlasOS", icon: Box },
];

export function StatusBar() {
  return (
    <footer className="flex h-8 shrink-0 items-center justify-between border-t border-white/[0.07] bg-[#070b11]/90 px-3 text-[10px] text-slate-500 backdrop-blur-xl sm:px-5">
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
                <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              ) : (
                <Icon className="size-3" aria-hidden="true" />
              )}
              <span className="hidden text-slate-600 md:inline">{item.label}</span>
              <span className={item.healthy ? "text-emerald-400" : "text-slate-400"}>
                {item.value}
              </span>
            </div>
          );
        })}
      </div>
      <div className="ml-4 flex shrink-0 items-center gap-1.5">
        <span className="size-1.5 rounded-full bg-cyan-300" />
        <span className="hidden sm:inline">Secure session</span>
      </div>
    </footer>
  );
}
