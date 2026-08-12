import type { PlatformApplication } from "../types/application";

export const applications: PlatformApplication[] = [
  {
    id: "leadestate-ai",
    name: "LeadEstate AI",
    slug: "leadestate-ai",
    logo: "LE",
    description:
      "AI-native real estate operations for lead qualification, property matching, messaging, and viewings.",
    status: "operational",
    installed: true,
    version: "1.0.0",
    category: "Product",
    permissions: [
      "applications.leadestate.launch",
      "applications.leadestate.configure",
    ],
    navigation: [
      {
        id: "leadestate-overview",
        title: "Overview",
        route: "/platform/applications/leadestate-ai",
        iconName: "overview",
      },
      {
        id: "leadestate-workspace",
        title: "Workspace",
        route: "/platform/applications/leadestate-ai/workspace",
        iconName: "workspace",
      },
    ],
    theme: {
      accent: "text-cyan-200",
      gradient: "from-cyan-300 via-cyan-400 to-blue-500",
      glow: "shadow-cyan-500/20",
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
      accent: "text-fuchsia-200",
      gradient: "from-fuchsia-300 via-pink-400 to-rose-500",
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
      accent: "text-violet-200",
      gradient: "from-violet-300 via-purple-400 to-indigo-500",
      glow: "shadow-violet-500/20",
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
      accent: "text-emerald-200",
      gradient: "from-emerald-300 via-teal-400 to-cyan-500",
      glow: "shadow-emerald-500/20",
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
      accent: "text-amber-200",
      gradient: "from-amber-300 via-orange-400 to-red-500",
      glow: "shadow-amber-500/20",
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
      accent: "text-blue-200",
      gradient: "from-blue-300 via-sky-400 to-cyan-500",
      glow: "shadow-blue-500/20",
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
      accent: "text-slate-100",
      gradient: "from-slate-200 via-slate-400 to-slate-600",
      glow: "shadow-slate-400/20",
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
      gradient: "from-lime-300 via-green-400 to-emerald-500",
      glow: "shadow-lime-500/20",
    },
  },
];
