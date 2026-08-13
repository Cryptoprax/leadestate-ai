export function Hero() {
  return (
    <section className="relative isolate px-6 pb-24 pt-40 sm:pb-32 sm:pt-48 lg:px-8">
      <div
        className="absolute inset-x-0 top-0 -z-10 h-[720px] bg-[radial-gradient(circle_at_50%_15%,var(--vds-color-primary-soft),transparent_42%)]"
        aria-hidden="true"
      />
      <div
        className="absolute left-1/2 top-44 -z-10 h-64 w-64 -translate-x-1/2 rounded-full bg-vds-primary/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-5xl text-center">
        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-vds-accent-border bg-vds-primary-soft px-4 py-2 text-xs font-medium text-vds-primary">
          <span className="size-1.5 rounded-full bg-vds-primary shadow-[0_0_10px_var(--vds-color-primary)]" />
          AI built exclusively for real estate sales
        </div>
        <h1 className="text-balance text-5xl font-semibold tracking-[-0.045em] text-vds-foreground sm:text-7xl lg:text-8xl">
          The AI Sales Employee{" "}
          <span className="bg-gradient-to-r from-vds-primary via-vds-primary to-vds-info bg-clip-text text-transparent">
            for Real Estate
          </span>
        </h1>
        <p className="mx-auto mt-7 max-w-2xl text-pretty text-lg leading-8 text-vds-secondary sm:text-xl">
          Qualify leads, recommend properties, book viewings and follow up
          automatically — 24/7.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#book-demo"
            className="inline-flex w-full items-center justify-center rounded-full bg-vds-primary px-7 py-3.5 text-sm font-bold text-[var(--vds-color-background)] shadow-[0_0_36px_var(--vds-color-accent-border)] transition hover:bg-vds-primary sm:w-auto"
          >
            Book a Demo
            <span className="ml-2" aria-hidden="true">
              →
            </span>
          </a>
          <a
            href="#how-it-works"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-vds-border-strong bg-vds-elevated px-7 py-3.5 text-sm font-semibold text-vds-foreground transition hover:bg-vds-hover sm:w-auto"
          >
            <span className="flex size-5 items-center justify-center rounded-full border border-vds-border/40 text-[8px]">
              ▶
            </span>
            Watch Demo
          </a>
        </div>

        <div className="relative mx-auto mt-16 max-w-4xl rounded-[2rem] border border-vds-border bg-vds-surface/[0.04] p-2 shadow-2xl shadow-vds-shadow">
          <div className="rounded-[1.6rem] border border-vds-border bg-[var(--vds-color-surface)] p-5 sm:p-7">
            <div className="flex items-center justify-between border-b border-vds-border pb-5">
              <div className="flex items-center gap-3 text-left">
                <span className="flex size-10 items-center justify-center rounded-full bg-vds-primary-soft text-vds-primary">
                  AI
                </span>
                <div>
                  <p className="text-sm font-semibold">Vayon Assistant</p>
                  <p className="text-xs text-vds-success">Online · responding now</p>
                </div>
              </div>
              <span className="hidden rounded-full bg-vds-elevated px-3 py-1 text-xs text-vds-muted sm:block">
                WhatsApp
              </span>
            </div>
            <div className="grid gap-4 pt-5 text-left md:grid-cols-3">
              {[
                ["Lead qualified", "High intent buyer", "98%"],
                ["Best property match", "Marina Residence", "94%"],
                ["Viewing booked", "Tomorrow, 3:30 PM", "Done"],
              ].map(([label, value, score]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-vds-border bg-vds-surface/[0.035] p-4"
                >
                  <p className="text-xs text-vds-muted">{label}</p>
                  <p className="mt-2 text-sm font-medium text-vds-foreground">{value}</p>
                  <p className="mt-4 text-xs font-semibold text-vds-primary">{score}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
