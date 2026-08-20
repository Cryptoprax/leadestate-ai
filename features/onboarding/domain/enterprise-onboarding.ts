export const onboardingSteps = [
  "Welcome",
  "Create Organization",
  "Configure Branding",
  "Invite Team Members",
  "Connect Gmail",
  "Connect Google Calendar",
  "Connect WhatsApp",
  "Configure AI Workforce",
  "Import CRM Data",
  "Import Properties",
  "Select Workflow Templates",
  "Configure Notifications",
  "Configure Email Provider",
  "Choose Subscription",
  "Launch Workspace",
] as const;

export const productTour = [
  ["Dashboard", "/vayon/home"],
  ["CRM", "/vayon/crm"],
  ["Sales AI", "/vayon/ai/employees/sales-ai"],
  ["CRM AI", "/vayon/ai/employees/crm-ai"],
  ["WhatsApp AI", "/vayon/ai/employees/whatsapp-ai"],
  ["Marketing AI", "/vayon/ai/employees/marketing-ai"],
  ["Executive AI", "/vayon/ai/employees/executive-ai"],
  ["Workflow Builder", "/vayon/workflows"],
  ["Billing", "/vayon/settings/billing"],
  ["Settings", "/vayon/settings/organization"],
] as const;

export const successResources = [
  ["Quick Start", "/docs"],
  ["Documentation", "/docs"],
  ["Video guides", "/resources"],
  ["FAQ", "/resources"],
  ["Support", "/contact"],
  ["Book Demo", "/contact"],
] as const;

export type ImportKind = "contacts" | "companies" | "leads" | "deals" | "properties";
export type ImportPreview = {
  kind: ImportKind;
  headers: readonly string[];
  rows: readonly Readonly<Record<string, string>>[];
  duplicates: number;
  errors: readonly string[];
};
