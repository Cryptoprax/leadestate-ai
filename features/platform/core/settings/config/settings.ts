import type { SettingsCategory } from "../types/settings";

export const settingsCategories: SettingsCategory[] = [
  {
    id: "general",
    name: "General",
    description: "Platform identity and operating defaults.",
    iconName: "general",
    options: [
      { id: "platform-name", label: "Platform name", description: "Primary platform display name.", value: "AtlasOS" },
    ],
  },
  {
    id: "branding",
    name: "Branding",
    description: "Logos, themes, and visual identity.",
    iconName: "branding",
    options: [
      { id: "default-theme", label: "Default theme", description: "Theme applied to new workspaces.", value: "Atlas Dark" },
    ],
  },
  {
    id: "localization",
    name: "Localization",
    description: "Shared locale and content behavior.",
    iconName: "localization",
    options: [
      { id: "fallback-locale", label: "Fallback locale", description: "Locale used when a translation is unavailable.", value: "English (US)" },
    ],
  },
  {
    id: "regions",
    name: "Regions",
    description: "Deployment and data residency regions.",
    iconName: "regions",
    options: [
      { id: "primary-region", label: "Primary region", description: "Default platform operating region.", value: "Asia Pacific" },
    ],
  },
  {
    id: "countries",
    name: "Countries",
    description: "Approved countries and market availability.",
    iconName: "countries",
    options: [
      { id: "country-policy", label: "Country policy", description: "Availability for organization provisioning.", value: "Configured" },
    ],
  },
  {
    id: "currencies",
    name: "Currencies",
    description: "Commercial and reporting currencies.",
    iconName: "currencies",
    options: [
      { id: "base-currency", label: "Base currency", description: "Default reporting currency.", value: "USD" },
    ],
  },
  {
    id: "languages",
    name: "Languages",
    description: "Supported product and content languages.",
    iconName: "languages",
    options: [
      { id: "primary-language", label: "Primary language", description: "Default interface language.", value: "English" },
    ],
  },
  {
    id: "date-formats",
    name: "Date Formats",
    description: "Regional date and time presentation.",
    iconName: "date",
    options: [
      { id: "date-format", label: "Default date format", description: "Used when no locale override exists.", value: "DD MMM YYYY" },
    ],
  },
  {
    id: "time-zones",
    name: "Time Zones",
    description: "Platform and workspace time behavior.",
    iconName: "time",
    options: [
      { id: "platform-timezone", label: "Platform timezone", description: "Reference timezone for operations.", value: "UTC" },
    ],
  },
  {
    id: "email",
    name: "Email",
    description: "Sending identities and delivery policy.",
    iconName: "email",
    options: [
      { id: "sender-domain", label: "Sender domain", description: "Default operational email domain.", value: "atlasos.com" },
    ],
  },
  {
    id: "security",
    name: "Security",
    description: "Platform-wide security defaults.",
    iconName: "security",
    options: [
      { id: "session-policy", label: "Session policy", description: "Default privileged session profile.", value: "Enterprise" },
    ],
  },
  {
    id: "ai",
    name: "AI",
    description: "AI governance, limits, and provider policy.",
    iconName: "ai",
    options: [
      { id: "ai-policy", label: "AI policy", description: "Default AI employee governance profile.", value: "Governed" },
    ],
  },
  {
    id: "notifications",
    name: "Notifications",
    description: "Delivery, routing, and urgency defaults.",
    iconName: "notifications",
    options: [
      { id: "notification-policy", label: "Notification policy", description: "Default platform routing profile.", value: "Standard" },
    ],
  },
  {
    id: "billing",
    name: "Billing",
    description: "Catalog, metering, and invoice defaults.",
    iconName: "billing",
    options: [
      { id: "billing-cycle", label: "Billing cycle", description: "Default subscription billing interval.", value: "Monthly" },
    ],
  },
  {
    id: "developer",
    name: "Developer",
    description: "Client, webhook, and sandbox policy.",
    iconName: "developer",
    options: [
      { id: "api-policy", label: "API policy", description: "Default client access profile.", value: "Restricted" },
    ],
  },
  {
    id: "marketplace",
    name: "Marketplace",
    description: "Publisher and installation governance.",
    iconName: "marketplace",
    options: [
      { id: "installation-policy", label: "Installation policy", description: "Default module approval requirement.", value: "Admin approval" },
    ],
  },
];
