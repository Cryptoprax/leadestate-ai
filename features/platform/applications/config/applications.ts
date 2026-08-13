import type { PlatformApplication } from "../types/application";

export const applications: PlatformApplication[] = [
  {
    id: "vayon",
    name: "Vayon OS",
    slug: "vayon",
    logo: "LE",
    description:
      "AI-native real estate operations for lead qualification, property matching, messaging, and viewings.",
    status: "operational",
    installed: true,
    version: "1.0.0",
    category: "Product",
    permissions: [
      "applications.vayon.launch",
      "applications.vayon.configure",
    ],
    navigation: [
      {
        id: "vayon-overview",
        title: "Overview",
        route: "/platform/applications/vayon",
        iconName: "overview",
      },
      {
        id: "vayon-workspace",
        title: "Workspace",
        route: "/platform/applications/vayon/workspace",
        iconName: "workspace",
      },
    ],
    theme: {
      accent: "text-vds-primary",
      gradient: "from-vds-primary via-vds-primary to-vds-info",
      glow: "shadow-vds-shadow",
    },
  },
  {
    id: "marketing-studio",
    name: "Marketing Studio",
    slug: "marketing-studio",
    logo: "MS",
    description:
      "Create, govern, and publish campaigns, content, websites, and customer journeys across the portfolio.",
    status: "operational",
    installed: true,
    version: "0.9.4",
    category: "Operations",
    permissions: [
      "applications.marketing.launch",
      "applications.marketing.publish",
    ],
    navigation: [
      {
        id: "marketing-content",
        title: "Content",
        route: "/platform/applications/marketing-studio/content",
        iconName: "content",
      },
      {
        id: "marketing-campaigns",
        title: "Campaigns",
        route: "/platform/applications/marketing-studio/campaigns",
        iconName: "campaigns",
      },
    ],
    theme: {
      accent: "text-vds-accent",
      gradient: "from-vds-accent via-vds-accent to-vds-danger",
      glow: "shadow-fuchsia-500/20",
    },
  },
  {
    id: "ai-studio",
    name: "AI Studio",
    slug: "ai-studio",
    logo: "AI",
    description:
      "Design and govern AI employees, knowledge, tools, evaluations, models, and operating policies.",
    status: "beta",
    installed: true,
    version: "0.7.0",
    category: "Intelligence",
    permissions: ["applications.ai.launch", "applications.ai.manage"],
    navigation: [
      {
        id: "ai-employees",
        title: "AI Employees",
        route: "/platform/applications/ai-studio/employees",
        iconName: "employees",
      },
      {
        id: "ai-evaluations",
        title: "Evaluations",
        route: "/platform/applications/ai-studio/evaluations",
        iconName: "evaluations",
      },
    ],
    theme: {
      accent: "text-vds-accent",
      gradient: "from-vds-accent via-vds-accent to-vds-accent",
      glow: "shadow-vds-shadow",
    },
  },
  {
    id: "support-desk",
    name: "Support Desk",
    slug: "support-desk",
    logo: "SD",
    description:
      "Coordinate customer support, shared inboxes, service workflows, knowledge, and human handoffs.",
    status: "operational",
    installed: true,
    version: "0.8.2",
    category: "Operations",
    permissions: ["applications.support.launch", "applications.support.manage"],
    navigation: [
      {
        id: "support-inbox",
        title: "Inbox",
        route: "/platform/applications/support-desk/inbox",
        iconName: "inbox",
      },
      {
        id: "support-knowledge",
        title: "Knowledge",
        route: "/platform/applications/support-desk/knowledge",
        iconName: "knowledge",
      },
    ],
    theme: {
      accent: "text-vds-success",
      gradient: "from-vds-success via-teal-400 to-vds-primary",
      glow: "shadow-vds-shadow",
    },
  },
  {
    id: "builder-studio",
    name: "Builder Studio",
    slug: "builder-studio",
    logo: "BS",
    description:
      "Compose navigation, dashboards, pages, modules, workflows, forms, reports, and themes.",
    status: "preview",
    installed: true,
    version: "0.5.0",
    category: "Platform",
    permissions: ["applications.builder.launch", "applications.builder.publish"],
    navigation: [
      {
        id: "builder-projects",
        title: "Projects",
        route: "/platform/applications/builder-studio/projects",
        iconName: "projects",
      },
      {
        id: "builder-releases",
        title: "Releases",
        route: "/platform/applications/builder-studio/releases",
        iconName: "releases",
      },
    ],
    theme: {
      accent: "text-vds-warning",
      gradient: "from-vds-warning via-vds-warning to-vds-danger",
      glow: "shadow-vds-shadow",
    },
  },
  {
    id: "analytics",
    name: "Analytics",
    slug: "analytics",
    logo: "AN",
    description:
      "Explore governed platform, product, customer, commercial, and AI intelligence from one workspace.",
    status: "operational",
    installed: true,
    version: "0.9.1",
    category: "Intelligence",
    permissions: [
      "applications.analytics.launch",
      "applications.analytics.export",
    ],
    navigation: [
      {
        id: "analytics-explore",
        title: "Explore",
        route: "/platform/applications/analytics/explore",
        iconName: "explore",
      },
      {
        id: "analytics-reports",
        title: "Reports",
        route: "/platform/applications/analytics/reports",
        iconName: "reports",
      },
    ],
    theme: {
      accent: "text-vds-info",
      gradient: "from-vds-primary via-sky-400 to-vds-primary",
      glow: "shadow-vds-shadow",
    },
  },
  {
    id: "developer-center",
    name: "Developer Center",
    slug: "developer-center",
    logo: "DC",
    description:
      "Manage applications, API clients, events, webhooks, schemas, environments, and developer operations.",
    status: "beta",
    installed: true,
    version: "0.6.3",
    category: "Platform",
    permissions: [
      "applications.developer.launch",
      "applications.developer.manage",
    ],
    navigation: [
      {
        id: "developer-projects",
        title: "Projects",
        route: "/platform/applications/developer-center/projects",
        iconName: "projects",
      },
      {
        id: "developer-events",
        title: "Events",
        route: "/platform/applications/developer-center/events",
        iconName: "events",
      },
    ],
    theme: {
      accent: "text-vds-foreground",
      gradient: "from-vds-secondary via-vds-muted to-vds-subtle",
      glow: "shadow-vds-shadow",
    },
  },
  {
    id: "marketplace",
    name: "Marketplace",
    slug: "marketplace",
    logo: "MP",
    description:
      "Discover and govern first-party and partner modules, integrations, workflows, and AI tools.",
    status: "preview",
    installed: false,
    version: "0.3.0",
    category: "Ecosystem",
    permissions: [
      "applications.marketplace.view",
      "applications.marketplace.install",
    ],
    navigation: [
      {
        id: "marketplace-discover",
        title: "Discover",
        route: "/platform/applications/marketplace/discover",
        iconName: "discover",
      },
      {
        id: "marketplace-installed",
        title: "Installed",
        route: "/platform/applications/marketplace/installed",
        iconName: "installed",
      },
    ],
    theme: {
      accent: "text-lime-200",
      gradient: "from-vds-success via-vds-success to-vds-success",
      glow: "shadow-lime-500/20",
    },
  },
];
