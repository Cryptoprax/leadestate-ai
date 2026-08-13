const testimonials = [
  {
    quote:
      "Vayon OS responds while our agents are still in viewings. We are qualifying more serious buyers without increasing headcount.",
    name: "Maya Chen",
    role: "Sales Director, Northline Properties",
    initials: "MC",
  },
  {
    quote:
      "The quality of the property recommendations surprised us. Prospects arrive at viewings better informed and much closer to a decision.",
    name: "Omar Rahman",
    role: "Founder, Avenue & Key Realty",
    initials: "OR",
  },
  {
    quote:
      "Our follow-up used to depend on who had time. Now every lead gets a consistent, personal experience from the first message onward.",
    name: "Sofia Martinez",
    role: "VP of Growth, Meridian Estates",
    initials: "SM",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-vds-primary">
            Built for modern teams
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            More conversations. Better opportunities.
          </h2>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <figure
              key={testimonial.name}
              className="flex h-full flex-col rounded-3xl border border-vds-border bg-gradient-to-br from-vds-surface to-transparent p-7"
            >
              <div className="flex gap-1 text-vds-primary" aria-label="5 out of 5 stars">
                {"★★★★★"}
              </div>
              <blockquote className="mt-6 flex-1 text-lg leading-8 text-vds-secondary">
                “{testimonial.quote}”
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4 border-t border-vds-border pt-6">
                <span className="flex size-11 items-center justify-center rounded-full bg-vds-primary-soft text-sm font-semibold text-vds-primary">
                  {testimonial.initials}
                </span>
                <span>
                  <span className="block text-sm font-semibold text-vds-foreground">
                    {testimonial.name}
                  </span>
                  <span className="mt-1 block text-xs text-vds-muted">
                    {testimonial.role}
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
