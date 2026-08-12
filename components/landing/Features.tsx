const features = [
  {
    title: "AI Lead Qualification",
    description:
      "Identify intent, budget, timeline and preferences in every conversation.",
    icon: "◎",
  },
  {
    title: "Property Matching",
    description:
      "Recommend the right listings instantly based on each buyer's needs.",
    icon: "⌂",
  },
  {
    title: "WhatsApp Automation",
    description:
      "Engage new enquiries naturally on the channel your prospects already use.",
    icon: "◌",
  },
  {
    title: "Calendar Booking",
    description:
      "Convert interest into confirmed viewings without scheduling back-and-forth.",
    icon: "□",
  },
  {
    title: "CRM",
    description:
      "Keep every conversation, preference and next action organized in one place.",
    icon: "◇",
  },
  {
    title: "Analytics",
    description:
      "See response times, qualified leads and booking performance at a glance.",
    icon: "↗",
  },
];

export function Features() {
  return (
    <section id="features" className="px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
            One intelligent workflow
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            Every tool your sales team needs to move faster.
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-400">
            Turn every enquiry into a structured, personalized sales journey
            without adding repetitive work to your team.
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="group rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.025] p-7 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/30"
            >
              <div className="flex size-11 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10 text-xl text-cyan-300">
                {feature.icon}
              </div>
              <h3 className="mt-6 text-xl font-semibold">{feature.title}</h3>
              <p className="mt-3 leading-7 text-slate-400">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
