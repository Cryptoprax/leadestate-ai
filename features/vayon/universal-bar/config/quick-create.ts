import type { UniversalBarResult } from "../domain/contracts";
export const quickCreateActions: readonly UniversalBarResult[] = [
  { id: "create-lead", label: "New Lead", description: "Open the existing lead capture workflow.", href: "/vayon/leads/new", scope: "leads", kind: "quick-create", keywords: ["create", "new", "lead"] },
  { id: "create-deal", label: "New Deal", description: "Open the existing deal workflow.", href: "/vayon/deals/new", scope: "deals", kind: "quick-create", keywords: ["create", "new", "deal"] },
  { id: "create-property", label: "New Property", description: "Open the existing property workflow.", href: "/vayon/properties/new", scope: "properties", kind: "quick-create", keywords: ["create", "new", "property"] },
  { id: "create-campaign", label: "New Campaign", description: "Open the Growth campaign workspace.", href: "/vayon/growth", scope: "campaigns", kind: "quick-create", keywords: ["create", "new", "campaign"] },
  { id: "create-meeting", label: "New Meeting", description: "Open the existing meeting workflow.", href: "/vayon/meetings", scope: "meetings", kind: "quick-create", keywords: ["create", "schedule", "meeting"] },
  { id: "create-task", label: "New Task", description: "Open the existing task workflow.", href: "/vayon/tasks", scope: "tasks", kind: "quick-create", keywords: ["create", "new", "task"] },
  { id: "create-contact", label: "New Contact", description: "Open the Universal Objects workspace.", href: "/vayon/objects", scope: "contacts", kind: "quick-create", keywords: ["create", "new", "contact"] },
  { id: "create-company", label: "New Company", description: "Open the Universal Objects workspace.", href: "/vayon/objects", scope: "companies", kind: "quick-create", keywords: ["create", "new", "company"] },
  { id: "create-document", label: "New Document", description: "Open the existing document storage workflow.", href: "/vayon/storage", scope: "documents", kind: "quick-create", keywords: ["create", "new", "upload", "document"] },
];
