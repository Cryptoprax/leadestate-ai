const footerLinks = {
  Product: ["Features", "Integrations", "Pricing", "Changelog"],
  Company: ["About", "Careers", "Partners", "Contact"],
  Resources: ["Help center", "Guides", "Customer stories", "API docs"],
  Legal: ["Privacy", "Terms", "Security", "Cookies"],
};

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#03080d]">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_3fr]">
          <div>
            <a
              href="#"
              className="inline-flex items-center gap-3"
              aria-label="LeadEstate AI home"
            >
              <span className="flex size-9 items-center justify-center rounded-xl bg-cyan-400 font-bold text-[#041018]">
                L
              </span>
              <span className="text-lg font-semibold">
                LeadEstate <span className="text-cyan-300">AI</span>
              </span>
            </a>
            <p className="mt-5 max-w-xs text-sm leading-6 text-slate-400">
              The always-on AI sales employee built for modern real estate
              teams.
            </p>
            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Contact
              </p>
              <a
                href="mailto:hello@leadestate.ai"
                className="mt-2 inline-block text-sm text-slate-300 hover:text-cyan-300"
              >
                hello@leadestate.ai
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {Object.entries(footerLinks).map(([group, links]) => (
              <div key={group}>
                <h3 className="text-sm font-semibold text-white">{group}</h3>
                <ul className="mt-4 space-y-3">
                  {links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm text-slate-400 transition-colors hover:text-cyan-300"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 LeadEstate AI. All rights reserved.</p>
          <p>Built for high-performing real estate teams.</p>
        </div>
      </div>
    </footer>
  );
}
