export function CTA() {
  return (
    <section id="book-demo" className="px-6 pb-24 sm:pb-32 lg:px-8">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-cyan-300/20 bg-gradient-to-br from-cyan-400/15 via-[#0a1924] to-blue-500/10 px-6 py-16 text-center shadow-2xl shadow-cyan-950/30 sm:px-12 sm:py-20">
        <div
          className="absolute left-1/2 top-0 h-56 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300/20 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
            Your next best sales hire
          </p>
          <h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-6xl">
            Turn more real estate leads into booked viewings.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            See how LeadEstate AI can qualify, recommend and follow up with
            every prospect—at any hour.
          </p>
          <a
            href="mailto:hello@leadestate.ai?subject=LeadEstate%20AI%20Demo"
            className="mt-9 inline-flex items-center justify-center rounded-full bg-cyan-400 px-8 py-4 text-sm font-bold text-[#031016] shadow-[0_0_36px_rgba(34,211,238,0.25)] transition hover:bg-cyan-300"
          >
            Book Your Demo
            <span className="ml-2" aria-hidden="true">
              →
            </span>
          </a>
          <p className="mt-4 text-xs text-slate-500">
            A focused 20-minute walkthrough tailored to your sales workflow.
          </p>
        </div>
      </div>
    </section>
  );
}
