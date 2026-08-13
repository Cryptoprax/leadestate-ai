const steps = [
  {
    number: "01",
    title: "Capture Leads",
    description:
      "Connect your lead sources and respond to every new enquiry in seconds.",
  },
  {
    number: "02",
    title: "AI Qualification",
    description:
      "Understand the prospect's budget, preferences, urgency and readiness.",
  },
  {
    number: "03",
    title: "Property Recommendation",
    description:
      "Present relevant listings with the context needed to inspire action.",
  },
  {
    number: "04",
    title: "Automatic Follow-up",
    description:
      "Nurture interest, handle objections and convert prospects into viewings.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative border-y border-vds-border bg-vds-surface/[0.025] px-6 py-24 sm:py-32 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-vds-primary">
            How it works
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            From first message to booked viewing.
          </h2>
        </div>

        <ol className="relative mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div
            className="absolute left-[12%] right-[12%] top-7 hidden h-px bg-gradient-to-r from-transparent via-vds-primary-soft to-transparent lg:block"
            aria-hidden="true"
          />
          {steps.map((step) => (
            <li key={step.number} className="relative">
              <div className="mb-6 flex size-14 items-center justify-center rounded-full border border-vds-accent-border bg-[var(--vds-color-surface)] text-sm font-bold text-vds-primary shadow-[0_0_24px_var(--vds-color-primary-soft)]">
                {step.number}
              </div>
              <div className="rounded-3xl border border-vds-border bg-vds-surface p-6">
                <p className="text-xs font-medium uppercase tracking-widest text-vds-muted">
                  Step {Number(step.number)}
                </p>
                <h3 className="mt-3 text-xl font-semibold">{step.title}</h3>
                <p className="mt-3 leading-7 text-vds-muted">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
