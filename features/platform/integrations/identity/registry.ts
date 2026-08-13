import type { IdentityProviderDescriptor } from "./contracts";

export const identityProviders: readonly IdentityProviderDescriptor[] = Object.freeze([
  { code: "google", label: "Google Workspace", available: true, capabilities: ["identity", "gmail", "calendar", "drive", "meet", "contacts", "tasks"] },
  { code: "microsoft", label: "Microsoft 365", available: true, capabilities: ["identity", "gmail", "calendar", "drive", "meet", "contacts", "tasks"] },
  ...(["apple", "slack", "meta", "stripe", "dropbox", "box", "zoom"] as const).map(code => ({ code, label: code[0].toUpperCase() + code.slice(1), available: false, capabilities: ["identity"] as const })),
]);

export const googleIdentityScopes = Object.freeze(["openid", "email", "profile"] as const);
export const googleGmailScopes = Object.freeze(["https://www.googleapis.com/auth/gmail.modify", "https://www.googleapis.com/auth/gmail.send"] as const);
export const googleCalendarScopes = Object.freeze(["https://www.googleapis.com/auth/calendar.events", "https://www.googleapis.com/auth/calendar.readonly"] as const);
export const googleDriveScopes = Object.freeze(["https://www.googleapis.com/auth/drive"] as const);
export const googleContactsScopes = Object.freeze(["https://www.googleapis.com/auth/contacts.readonly", "https://www.googleapis.com/auth/contacts.other.readonly", "https://www.googleapis.com/auth/directory.readonly"] as const);
export const microsoftIdentityScopes = Object.freeze(["openid", "profile", "email", "offline_access", "User.Read"] as const);
export const futureGoogleScopes = Object.freeze({ gmail: [], calendar: [], drive: [], meet: [], contacts: [], tasks: [] } as const);
