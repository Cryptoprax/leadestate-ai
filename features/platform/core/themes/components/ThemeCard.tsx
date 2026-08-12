import { Check, Palette } from "lucide-react";

import { StatusBadge } from "../../../identity/components/StatusBadge";
import type { Theme } from "../types/theme";

export function ThemeCard({ theme }: { theme: Theme }) {
  return (
    <article className="overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.025] transition duration-300 hover:-translate-y-0.5 hover:border-white/[0.14]">
      <div
        className={`relative h-36 overflow-hidden bg-gradient-to-br ${theme.previewClass}`}
        aria-label={`${theme.name} preview`}
      >
        <div className="absolute inset-5 rounded-2xl border border-white/10 bg-white/[0.05] p-3 backdrop-blur-xl">
          <div className="h-2 w-16 rounded-full bg-white/20" />
          <div className="mt-4 grid grid-cols-3 gap-2">
            <div className="col-span-2 h-14 rounded-xl bg-white/10" />
            <div className="h-14 rounded-xl bg-white/10" />
          </div>
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-sm font-semibold text-white">{theme.name}</h2>
            <p className="mt-1 text-xs leading-5 text-slate-600">
              {theme.description}
            </p>
          </div>
          <StatusBadge
            label={theme.isDefault ? "Default" : theme.status}
            tone={theme.isDefault ? "positive" : "neutral"}
          />
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3 border-y border-white/[0.06] py-4 text-[10px]">
          <div>
            <p className="text-slate-700">Typography</p>
            <p className="mt-1 text-slate-400">{theme.typography}</p>
          </div>
          <div>
            <p className="text-slate-700">Border radius</p>
            <p className="mt-1 text-slate-400">{theme.borderRadius}</p>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex -space-x-1">
            {theme.colors.map((color) => (
              <span
                key={color}
                className="size-5 rounded-full border-2 border-[#0a1018]"
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
          <button
            type="button"
            className="inline-flex h-9 items-center gap-2 rounded-xl border border-white/[0.08] px-3 text-xs font-medium text-slate-400 transition hover:bg-white/[0.05] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70"
          >
            {theme.isDefault ? (
              <Check className="size-3.5" aria-hidden="true" />
            ) : (
              <Palette className="size-3.5" aria-hidden="true" />
            )}
            {theme.isDefault ? "Applied" : "Apply"}
          </button>
        </div>
      </div>
    </article>
  );
}
