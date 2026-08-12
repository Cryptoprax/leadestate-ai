const navigation = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Customers", href: "#testimonials" },
];

export function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
        <a
          href="#"
          className="flex items-center gap-3"
          aria-label="LeadEstate AI home"
        >
          <span className="flex size-9 items-center justify-center rounded-xl bg-cyan-400 text-[#041018] shadow-[0_0_32px_rgba(34,211,238,0.28)]">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="size-5"
              aria-hidden="true"
            >
              <path
                d="M4 18V9.5L12 4l8 5.5V18a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
              <path
                d="m9 14 2-2 2 2 3-3"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="text-lg font-semibold tracking-tight">
            LeadEstate <span className="text-cyan-300">AI</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {navigation.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm text-slate-300 transition-colors hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#book-demo"
          className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-5 py-2.5 text-sm font-semibold text-cyan-100 transition hover:border-cyan-300/60 hover:bg-cyan-300/15"
        >
          Book a Demo
        </a>
      </div>
    </header>
  );
}
