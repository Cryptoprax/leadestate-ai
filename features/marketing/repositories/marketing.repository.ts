import type { BlogArticle, PublicPage, PublicPageId } from "../contracts";
const pages: Record<PublicPageId, PublicPage> = {
  features: {
    slug: "features",
    eyebrow: "Connected platform",
    title: "Everything your real estate business needs to move as one.",
    description:
      "CRM, AI Workforce, communications, automation, analytics, billing, and governance share a single operating model.",
    sections: [
      {
        title: "Customer intelligence",
        description:
          "Connect leads, relationships, properties, deals, and timelines.",
      },
      {
        title: "AI Workforce",
        description:
          "Eight specialist advisors work through one governed runtime.",
      },
      {
        title: "Workflow automation",
        description:
          "Coordinate triggers, approvals, recommendations, and accountable action.",
      },
    ],
  },
  solutions: {
    slug: "solutions",
    eyebrow: "Real Estate Solutions",
    title: "One AI operating system for every real estate sales model.",
    description:
      "Connect enquiries, properties, conversations, visits, deals, teams, and revenue without splitting real estate context.",
    sections: [
      {
        title: "Residential Sales",
        description: "Manage listings, buyer requirements, visits, and closures.",
      },
      {
        title: "Commercial Real Estate",
        description: "Coordinate mandates, occupiers, owners, and complex deals.",
      },
      {
        title: "Property Developers",
        description: "Connect project inventory, campaigns, partners, and buyers.",
      },
      { title: "Real Estate Brokerages", description: "Give every broker shared pipeline, property, and relationship context." },
      { title: "Luxury Real Estate", description: "Deliver discreet, high-context service for premium properties." },
      { title: "Property Management", description: "Align properties, owners, tenants, communications, and tasks." },
      { title: "Channel Partners", description: "Distribute inventory and track every partner-led opportunity." },
      { title: "Builder Sales", description: "Move project enquiries from first response to booking." },
      { title: "Pre-Sales Teams", description: "Qualify demand, answer questions, and book site visits faster." },
      { title: "CRM Automation", description: "Keep real estate relationships and follow-ups complete." },
      { title: "AI Employees", description: "Equip property teams with governed specialist advisors." },
      { title: "Lead Qualification", description: "Score intent, budget, urgency, and property fit." },
      { title: "Property Intelligence", description: "Match demand to inventory with explained alternatives." },
    ],
  },
  industries: {
    slug: "industries",
    eyebrow: "Real Estate Solutions",
    title: "Purpose-built for every real estate business model.",
    description:
      "Serve residential, commercial, developer, brokerage, property-management, and investment operations.",
    sections: [
      {
        title: "Brokerages",
        description:
          "Coordinate agents, leads, inventory, viewings, and transactions.",
      },
      {
        title: "Developers",
        description:
          "Connect project inventory, campaigns, channel partners, and buyers.",
      },
      {
        title: "Property managers",
        description:
          "Keep customers, assets, communications, and operations aligned.",
      },
    ],
  },
  privacy: {
    slug: "privacy",
    eyebrow: "Legal",
    title: "Privacy Policy",
    description:
      "How Vayon handles account, organization, product, support, and service data.",
    sections: [
      {
        title: "Data use",
        description:
          "Data is processed to provide, secure, support, and improve contracted services.",
      },
      {
        title: "Tenant boundaries",
        description:
          "Organization and workspace controls isolate customer data.",
      },
      {
        title: "Your choices",
        description:
          "Authorized administrators can manage access, retention, export, and deletion requests.",
      },
    ],
  },
  terms: {
    slug: "terms",
    eyebrow: "Legal",
    title: "Terms of Service",
    description: "The terms governing access to and use of Vayon services.",
    sections: [
      {
        title: "Authorized use",
        description:
          "Customers remain responsible for users, data, approvals, and lawful platform use.",
      },
      {
        title: "Service boundaries",
        description:
          "AI output is recommendation-only and requires appropriate human review.",
      },
      {
        title: "Commercial terms",
        description:
          "Subscriptions, renewals, usage, and cancellation follow the accepted order and plan.",
      },
    ],
  },
  "trust-center": {
    slug: "trust-center",
    eyebrow: "Trust Center",
    title: "Transparent controls for an accountable enterprise platform.",
    description:
      "Review security, privacy, availability, governance, and operational assurance in one place.",
    sections: [
      {
        title: "Security",
        description:
          "RBAC, RLS, MFA, audit events, encrypted secrets, and governed execution.",
      },
      {
        title: "Privacy",
        description:
          "Tenant isolation, workspace attribution, least privilege, and controlled retention.",
      },
      {
        title: "Availability",
        description:
          "Deployment health, provider diagnostics, performance budgets, and operational runbooks.",
      },
    ],
  },
};
const articles: readonly BlogArticle[] = [
  {
    slug: "governed-ai-workforce",
    title: "Why an AI workforce needs governance",
    excerpt:
      "Recommendation-only AI can accelerate teams without hiding accountability.",
    category: "AI governance",
    author: "Vayon Research",
    tags: ["AI", "Approvals", "Security"],
    publishedAt: "2026-08-21",
    body: [
      "AI becomes useful in enterprise work when evidence, confidence, and boundaries remain visible.",
      "Vayon separates recommendations from execution. Authorized people retain control over consequential actions.",
    ],
  },
  {
    slug: "connected-real-estate-operations",
    title: "The case for connected real estate operations",
    excerpt:
      "Shared context reduces the coordination tax across customer and transaction work.",
    category: "Operations",
    author: "Vayon Editorial",
    tags: ["CRM", "Workflow", "Operations"],
    publishedAt: "2026-08-14",
    body: [
      "Real estate work crosses customers, properties, deals, meetings, messages, and approvals.",
      "A connected operating model preserves context as work moves between teams.",
    ],
  },
  {
    slug: "enterprise-crm-quality",
    title: "CRM quality is an operating discipline",
    excerpt:
      "Healthy customer data depends on workflows, ownership, and visible remediation.",
    category: "CRM",
    author: "Vayon Editorial",
    tags: ["CRM", "Data quality"],
    publishedAt: "2026-08-07",
    body: [
      "Duplicate and incomplete records are symptoms of fragmented operating practices.",
      "Governed recommendations help teams improve quality without autonomous editing.",
    ],
  },
];
export class MarketingRepository {
  page(id: PublicPageId) {
    return pages[id];
  }
  articles(query = "") {
    const term = query.trim().toLowerCase();
    return term
      ? articles.filter((x) =>
          [x.title, x.excerpt, x.category, x.author, ...x.tags].some((v) =>
            v.toLowerCase().includes(term),
          ),
        )
      : articles;
  }
  article(slug: string) {
    return articles.find((x) => x.slug === slug) ?? null;
  }
  related(article: BlogArticle) {
    return articles
      .filter(
        (x) =>
          x.slug !== article.slug &&
          (x.category === article.category ||
            x.tags.some((tag) => article.tags.includes(tag))),
      )
      .slice(0, 3);
  }
}
