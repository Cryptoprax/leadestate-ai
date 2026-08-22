"use client";
import { useActionState } from "react";
import { Button } from "@/features/platform/design-system";
import type { InventoryProject } from "@/features/vayon/property-platform/inventory/domain";
import { growthCampaignChatAction } from "../actions";
import { growthLanguages } from "../domain";

const examples = [
  "Launch Aurora Heights.",
  "Create a Diwali campaign.",
  "Create a luxury NRI campaign.",
  "Promote Tower B.",
  "Generate weekend open house campaign.",
];
export function GrowthCampaignChat({
  projects,
}: {
  projects: readonly InventoryProject[];
}) {
  const [state, action, pending] = useActionState(growthCampaignChatAction, {
    message: "Tell the AI Marketing Manager what campaign you need.",
    campaignId: null,
  });
  return (
    <section className="rounded-2xl border border-vds-border bg-vds-surface p-5">
      <div
        aria-live="polite"
        className="rounded-xl bg-vds-elevated p-4 text-sm"
      >
        <p className="text-xs font-semibold uppercase tracking-wide text-vds-primary">
          AI Marketing Manager · recommendation only
        </p>
        <p className="mt-2 text-vds-muted">{state.message}</p>
      </div>
      <form action={action} className="mt-4 grid gap-3 md:grid-cols-2">
        <select
          required
          name="projectId"
          className="vds-focus h-11 rounded-xl border border-vds-border bg-vds-elevated px-3"
        >
          <option value="">Choose project</option>
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>
        <select
          name="language"
          className="vds-focus h-11 rounded-xl border border-vds-border bg-vds-elevated px-3"
        >
          {growthLanguages.map((language) => (
            <option key={language}>{language}</option>
          ))}
        </select>
        <textarea
          required
          maxLength={2000}
          name="prompt"
          placeholder="Describe the campaign"
          className="vds-focus min-h-28 rounded-xl border border-vds-border bg-vds-elevated p-3 md:col-span-2"
        />
        <Button disabled={pending} type="submit" className="md:col-span-2">
          {pending ? "Planning campaign…" : "Create governed campaign pack"}
        </Button>
      </form>
      <div className="mt-4 flex flex-wrap gap-2">
        {examples.map((example) => (
          <span
            key={example}
            className="rounded-full bg-vds-elevated px-3 py-1.5 text-xs text-vds-muted"
          >
            {example}
          </span>
        ))}
      </div>
    </section>
  );
}
