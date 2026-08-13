import "server-only";
import type { UniversalBarResult } from "@/features/vayon/universal-bar/domain/contracts";
import { OutlookMailService } from "../services/outlook.service";
import { OutlookCalendarService } from "../services/outlook-calendar.service";
import { OneDriveService } from "../services/onedrive.service";
import { MicrosoftPeopleService } from "../services/people.service";
export class MicrosoftUniversalSearchProvider {
  readonly id = "microsoft-live";
  async search(
    query: string,
    limit = 12,
  ): Promise<readonly UniversalBarResult[]> {
    if (!query.trim()) return [];
    const results: UniversalBarResult[] = [];
    const providers = [
      async () => {
        if ((await new OutlookMailService().status()) !== "connected") return;
        const page = await new OutlookMailService().list("inbox", query);
        results.push(
          ...page.messages.map((item) => ({
            id: `outlook-${item.id}`,
            label: item.subject,
            description: item.snippet,
            href: `/vayon/communications/outlook?message=${item.id}`,
            scope: "communications" as const,
            kind: "record" as const,
            keywords: [item.sender.email],
          })),
        );
      },
      async () => {
        if ((await new OneDriveService().status()) !== "connected") return;
        const page = await new OneDriveService().list({
          view: "my_drive",
          query,
        });
        results.push(
          ...page.files.map((item) => ({
            id: `onedrive-${item.id}`,
            label: item.name,
            description: item.mimeType,
            href: "/vayon/documents/onedrive",
            scope: "documents" as const,
            kind: "record" as const,
            keywords: [item.mimeType],
          })),
        );
      },
      async () => {
        if ((await new MicrosoftPeopleService().status()) !== "connected")
          return;
        const page = await new MicrosoftPeopleService().list({
          view: "all",
          query,
        });
        results.push(
          ...page.contacts.map((item) => ({
            id: `ms-contact-${item.id}`,
            label: item.name,
            description: item.primaryEmail ?? "Microsoft contact",
            href: "/vayon/contacts/microsoft",
            scope: "contacts" as const,
            kind: "record" as const,
            keywords: [...item.emails, ...item.phones],
          })),
        );
      },
      async () => {
        if ((await new OutlookCalendarService().status()) !== "connected")
          return;
        const start = new Date(),
          end = new Date(start);
        end.setMonth(end.getMonth() + 1);
        const page = await new OutlookCalendarService().events({
          calendarIds: ["primary"],
          timeMin: start.toISOString(),
          timeMax: end.toISOString(),
          query,
        });
        results.push(
          ...page.events.map((item) => ({
            id: `ms-event-${item.id}`,
            label: item.title,
            description: item.start,
            href: "/vayon/calendar/outlook",
            scope: "meetings" as const,
            kind: "record" as const,
            keywords: [item.location],
          })),
        );
      },
    ];
    await Promise.all(
      providers.map((provider) => provider().catch(() => undefined)),
    );
    return results.slice(0, limit);
  }
}
