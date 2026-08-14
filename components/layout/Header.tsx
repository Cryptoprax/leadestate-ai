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
          aria-label="Vayon OS home"
        >
          <BrandLogo size="md" priority />
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {navigation.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm text-vds-secondary transition-colors hover:text-vds-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#book-demo"
          className="rounded-full border border-vds-accent-border bg-vds-primary-soft px-5 py-2.5 text-sm font-semibold text-vds-primary transition hover:border-vds-accent-border hover:bg-vds-primary-soft"
        >
          Book a Demo
        </a>
      </div>
    </header>
  );
}
import { BrandLogo } from "@/components/brand";
