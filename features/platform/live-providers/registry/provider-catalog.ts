import type {
  LiveProviderCapability,
  LiveProviderDefinition,
  LiveProviderId,
} from "../domain/contracts";

const disabled = (
  id: string,
  label: string,
  access: LiveProviderCapability["access"],
): LiveProviderCapability =>
  Object.freeze({
    id,
    label,
    access,
    enabled: false,
    reason: "Business operations are disabled in the Live Provider Foundation.",
  });

export const liveProviderCatalog: readonly LiveProviderDefinition[] =
  Object.freeze([
    {
      id: "whatsapp-cloud",
      name: "WhatsApp Cloud",
      family: "meta",
      authorization: "oauth2",
      requiredScopes: ["whatsapp_business_management"],
      capabilities: [
        disabled("account.metadata", "Account metadata", "metadata"),
        disabled("message.send", "Send messages", "write"),
      ],
      version: "1.0.0",
    },
    {
      id: "google-calendar",
      name: "Google Calendar",
      family: "google",
      authorization: "oauth2",
      requiredScopes: ["openid", "email", "calendar.readonly"],
      capabilities: [
        disabled("calendar.metadata", "Calendar metadata", "metadata"),
        disabled("meeting.create", "Create meetings", "write"),
      ],
      version: "1.0.0",
    },
    {
      id: "gmail",
      name: "Gmail",
      family: "google",
      authorization: "oauth2",
      requiredScopes: ["openid", "email", "gmail.metadata"],
      capabilities: [
        disabled("mail.metadata", "Mailbox metadata", "metadata"),
        disabled("mail.read", "Read mail", "read"),
        disabled("mail.send", "Send email", "write"),
      ],
      version: "1.0.0",
    },
    {
      id: "microsoft-outlook",
      name: "Microsoft Outlook",
      family: "microsoft",
      authorization: "oauth2",
      requiredScopes: ["openid", "email", "offline_access", "Mail.ReadBasic"],
      capabilities: [
        disabled("mail.metadata", "Mailbox metadata", "metadata"),
        disabled("mail.read", "Read mail", "read"),
        disabled("mail.send", "Send email", "write"),
      ],
      version: "1.0.0",
    },
    {
      id: "microsoft-365",
      name: "Microsoft 365",
      family: "microsoft",
      authorization: "oauth2",
      requiredScopes: ["openid", "email", "offline_access", "User.Read"],
      capabilities: [
        disabled("tenant.metadata", "Tenant metadata", "metadata"),
        disabled("calendar.write", "Modify calendars", "write"),
      ],
      version: "1.0.0",
    },
  ] satisfies readonly LiveProviderDefinition[]);

export function liveProviderDefinition(id: string) {
  return liveProviderCatalog.find((provider) => provider.id === id) ?? null;
}

export function isLiveProviderId(id: string): id is LiveProviderId {
  return liveProviderDefinition(id) !== null;
}
