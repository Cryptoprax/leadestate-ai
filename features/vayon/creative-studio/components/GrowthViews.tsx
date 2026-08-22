import type {
  GrowthCampaignPack,
  GrowthPlan,
  GrowthReview,
  GrowthScheduleItem,
} from "../domain";

const card = "rounded-2xl border border-vds-border bg-vds-surface p-5";
export function GrowthOverview({
  packs,
  review,
  plan,
}: {
  packs: readonly GrowthCampaignPack[];
  review: GrowthReview;
  plan: GrowthPlan;
}) {
  return (
    <div className="space-y-5">
      <div className="grid gap-4 md:grid-cols-3">
        <Metric label="Campaign packs" value={String(packs.length)} />
        <Metric
          label="Brand compliance"
          value={`${review.brandComplianceScore}/100`}
        />
        <Metric
          label="Creative quality"
          value={`${review.creativeQualityScore}/100`}
        />
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        <section className={card}>
          <h2 className="font-semibold">AI performance planner</h2>
          <p className="mt-2 text-xs text-vds-warning">
            Planning recommendations · not measured performance
          </p>
          <dl className="mt-4 space-y-3 text-sm">
            <Row
              label="Suggested campaign length"
              value={plan.campaignLength}
            />
            <Row label="Creative mix" value={plan.creativeMix.join(" · ")} />
            <Row
              label="Publishing sequence"
              value={plan.publishingSequence.join(" → ")}
            />
            <Row label="Audience mix" value={plan.audienceMix.join(" · ")} />
          </dl>
        </section>
        <section className={card}>
          <h2 className="font-semibold">Brand Guardian 2.0</h2>
          <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
            {Object.entries(review.checks).map(([label, passed]) => (
              <p key={label} className="rounded-lg bg-vds-elevated p-2">
                <span
                  className={passed ? "text-vds-success" : "text-vds-warning"}
                >
                  {passed ? "Ready" : "Review"}
                </span>{" "}
                · {label}
              </p>
            ))}
          </div>
          <ul className="mt-4 list-disc space-y-1 pl-5 text-xs text-vds-muted">
            {review.suggestions.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      </div>
      <GeneratorCatalog />
    </div>
  );
}
export function CampaignPacks({
  packs,
}: {
  packs: readonly GrowthCampaignPack[];
}) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {packs.map((pack) => (
        <article className={card} key={pack.id}>
          <p className="text-xs uppercase text-vds-primary">
            {pack.language} · {pack.status}
          </p>
          <h2 className="mt-2 font-semibold">{pack.name}</h2>
          <p className="mt-2 text-sm text-vds-muted">
            {pack.formats.length} planned deliverables · {pack.assetCount}{" "}
            generated assets
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {pack.formats.map((format) => (
              <span
                className="rounded-full bg-vds-elevated px-2 py-1 text-[11px]"
                key={format}
              >
                {format}
              </span>
            ))}
          </div>
          <p className="mt-4 text-xs text-vds-warning">
            Campaign Package ZIP becomes available only after approved exports
            are prepared.
          </p>
        </article>
      ))}
      {!packs.length && (
        <Empty text="No campaign packs yet. Ask the AI Marketing Manager to create one." />
      )}
    </div>
  );
}
export function CampaignCalendar({
  schedule,
}: {
  schedule: readonly GrowthScheduleItem[];
}) {
  return (
    <div className="space-y-3">
      {schedule.map((item) => (
        <article className={card} key={item.id}>
          <div className="flex flex-wrap justify-between gap-3">
            <div>
              <p className="font-medium">{item.channel}</p>
              <p className="mt-1 text-xs text-vds-muted">
                {new Date(item.scheduledFor).toLocaleString()}
              </p>
            </div>
            <span className="text-xs uppercase text-vds-warning">
              {item.state}
            </span>
          </div>
          <p className="mt-3 text-xs text-vds-muted">
            Future publishing only · connector execution disabled
          </p>
        </article>
      ))}
      {!schedule.length && (
        <Empty text="No campaign schedule items. Planning remains editable and cannot publish." />
      )}
    </div>
  );
}
export function GeneratorCatalog() {
  const sections = {
    "AI landing pages": [
      "Project Microsite",
      "Coming Soon Page",
      "Offer Page",
      "Booking Page",
      "Campaign Landing Page",
      "Construction Update Page",
    ],
    "AI sales kits": [
      "Sales Brochure",
      "Project Factsheet",
      "Investor Deck",
      "NRI Presentation",
      "Channel Partner Kit",
      "Dealer Kit",
      "Sales Presentation",
      "Pricing Presentation",
    ],
    "AI video projects · Preview": [
      "Scene Timeline",
      "Shot List",
      "Motion Suggestions",
      "Transition Suggestions",
      "Voice-over Script",
      "Captions",
      "Thumbnail",
      "Music Suggestions",
      "MP4 rendering Preview",
    ],
    Exports: [
      "PNG",
      "JPEG",
      "PDF",
      "Print PDF",
      "SVG placeholder",
      "Editable Project",
      "PowerPoint placeholder",
      "Campaign Package ZIP",
    ],
  };
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {Object.entries(sections).map(([title, items]) => (
        <section className={card} key={title}>
          <h2 className="font-semibold">{title}</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {items.map((item) => (
              <span
                key={item}
                className="rounded-full bg-vds-elevated px-3 py-1.5 text-xs"
              >
                {item}
              </span>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
function Metric({ label, value }: { label: string; value: string }) {
  return (
    <article className={card}>
      <p className="text-xs text-vds-muted">{label}</p>
      <p className="mt-2 text-2xl font-semibold">{value}</p>
    </article>
  );
}
function Row({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs text-vds-muted">{label}</dt>
      <dd className="mt-1">{value}</dd>
    </div>
  );
}
function Empty({ text }: { text: string }) {
  return (
    <div className="col-span-full rounded-2xl border border-dashed border-vds-border p-10 text-center text-sm text-vds-muted">
      {text}
    </div>
  );
}
