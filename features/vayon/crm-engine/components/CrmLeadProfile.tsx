"use client";
import { useState } from "react";
import { Button, ButtonLink } from "@/features/platform/design-system";
import type { CrmLeadProfile } from "../domain/contracts";
const tabs = [
  "overview",
  "timeline",
  "properties",
  "deals",
  "communications",
  "meetings",
  "tasks",
  "documents",
  "ai insights",
] as const;
export function CrmLeadProfileView({ profile }: { profile: CrmLeadProfile }) {
  const [tab, setTab] = useState<(typeof tabs)[number]>("overview");
  const { lead, insights } = profile;
  const related =
    tab === "properties"
      ? profile.properties
      : tab === "deals"
        ? profile.deals
        : tab === "meetings"
          ? profile.meetings
          : tab === "tasks"
            ? profile.tasks
            : profile.documents;
  return (
    <div className="space-y-5">
      <section className="rounded-2xl border border-vds-border bg-vds-surface p-5">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid size-12 place-items-center rounded-full bg-vds-primary-soft text-lg font-semibold text-vds-primary">
                {lead.name.slice(0, 2).toUpperCase()}
              </span>
              <div>
                <h2 className="text-2xl font-semibold">{lead.name}</h2>
                <p className="text-sm text-vds-muted">
                  {lead.phone} · {lead.email ?? "No email"}
                </p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              <span className="rounded-full bg-vds-primary-soft px-3 py-1 text-vds-primary">
                {lead.status}
              </span>
              <span className="rounded-full border border-vds-border px-3 py-1">
                {lead.priority} priority
              </span>
              <span className="rounded-full border border-vds-border px-3 py-1">
                Score {lead.aiScore ?? "unavailable"}
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <ButtonLink href={`/vayon/communications?lead=${lead.id}`}>
              WhatsApp / Email
            </ButtonLink>
            <ButtonLink variant="outline" href={`/vayon/deals?lead=${lead.id}`}>
              Create deal
            </ButtonLink>
            <Button variant="outline" onClick={() => setTab("timeline")}>
              Add note
            </Button>
          </div>
        </div>
      </section>
      <div className="flex gap-1 overflow-x-auto border-b border-vds-border">
        {tabs.map((x) => (
          <Button
            key={x}
            variant="control"
            onClick={() => setTab(x)}
            className={`vds-focus shrink-0 border-b-2 px-3 py-3 text-sm capitalize ${tab === x ? "border-vds-primary text-vds-primary" : "border-transparent text-vds-muted"}`}
          >
            {x}
          </Button>
        ))}
      </div>
      {tab === "overview" && (
        <div className="grid gap-5 lg:grid-cols-3">
          <Info
            title="Qualification"
            values={[
              ["Budget", lead.budgetLabel],
              ["Purpose", profile.buyingPurpose ?? "Not captured"],
              [
                "Locations",
                profile.preferredLocations.join(", ") || "Not captured",
              ],
              ["Property type", lead.propertyType ?? "Not captured"],
            ]}
          />
          <Info
            title="Ownership"
            values={[
              ["Owner", profile.owner],
              ["Source", lead.source],
              ["Interest", lead.propertyInterest],
              ["Created", new Date(lead.createdAt).toLocaleDateString()],
            ]}
          />
          <Info
            title="Next best action"
            values={[
              ["Recommendation", insights.nextAction],
              ["Risk", insights.risk],
              ["Confidence", insights.budgetConfidence],
            ]}
          />
        </div>
      )}
      {(tab === "timeline" || tab === "communications") && (
        <Timeline
          items={tab === "timeline" ? profile.timeline : profile.communications}
        />
      )}{" "}
      {(tab === "properties" ||
        tab === "deals" ||
        tab === "meetings" ||
        tab === "tasks" ||
        tab === "documents") && (
        <div className="grid gap-3">
          {related.length ? (
            related.map((x) => (
              <article
                key={x.id}
                className="rounded-xl border border-vds-border bg-vds-surface p-4"
              >
                <p className="font-medium">{x.title}</p>
                <p className="mt-1 text-xs text-vds-muted">
                  {x.kind} · {x.status}
                  {x.meta ? ` · ${x.meta}` : ""}
                </p>
              </article>
            ))
          ) : (
            <Empty label={tab} />
          )}
        </div>
      )}
      {tab === "ai insights" && (
        <div className="grid gap-4 md:grid-cols-2">
          <Info
            title="Deterministic intelligence"
            values={[
              ["Summary", insights.summary],
              ["Buying intent", insights.buyingIntent],
              ["Urgency", insights.urgency],
              ["Generated by", insights.generatedBy],
            ]}
          />
          <Info
            title="Suggested outreach"
            values={[
              ["WhatsApp", insights.suggestedWhatsApp],
              ["Email", insights.suggestedEmail],
              ["Call", insights.suggestedCallScript],
            ]}
          />
        </div>
      )}
    </div>
  );
}
function Info({
  title,
  values,
}: {
  title: string;
  values: readonly (readonly [string, string])[];
}) {
  return (
    <section className="rounded-2xl border border-vds-border bg-vds-surface p-5">
      <h3 className="font-semibold">{title}</h3>
      <dl className="mt-4 space-y-3">
        {values.map(([k, v]) => (
          <div key={k}>
            <dt className="text-xs text-vds-muted">{k}</dt>
            <dd className="mt-1 text-sm">{v}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
function Timeline({ items }: { items: CrmLeadProfile["timeline"] }) {
  return (
    <div className="space-y-3">
      {items.length ? (
        items.map((x) => (
          <article
            key={x.id}
            className="rounded-xl border border-vds-border bg-vds-surface p-4"
          >
            <p className="font-medium">{x.title}</p>
            <p className="mt-1 text-xs text-vds-muted">
              {x.kind} · {new Date(x.occurredAt).toLocaleString()}
            </p>
            {x.detail && (
              <p className="mt-2 text-sm text-vds-muted">{x.detail}</p>
            )}
          </article>
        ))
      ) : (
        <Empty label="timeline events" />
      )}
    </div>
  );
}
function Empty({ label }: { label: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-vds-border p-12 text-center text-sm text-vds-muted">
      No {label} are available for this lead yet.
    </div>
  );
}
