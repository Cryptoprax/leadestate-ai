import "server-only";

import type { ContactPage, ContactProvider, ContactView, ProviderContact } from "@/features/platform/external-contacts";
import { googleContactsScopes } from "@/features/platform/integrations/identity";
import { operationsContext } from "@/features/vayon/operations/services/context";
import { log } from "@/lib/observability/logger";
import { GoogleRepository } from "../repositories/google.repository";
import { GoogleApiService } from "./google-api.service";

const peopleApi = "https://people.googleapis.com/v1";
const fields = "names,emailAddresses,phoneNumbers,organizations,addresses,urls,birthdays,photos,memberships,metadata,biographies";

type Person = {
  resourceName: string;
  etag?: string;
  names?: { displayName?: string }[];
  emailAddresses?: { value?: string; metadata?: { primary?: boolean } }[];
  phoneNumbers?: { value?: string }[];
  organizations?: { name?: string; title?: string; metadata?: { primary?: boolean } }[];
  addresses?: { formattedValue?: string }[];
  urls?: { value?: string }[];
  birthdays?: { date?: { year?: number; month?: number; day?: number } }[];
  photos?: { url?: string; default?: boolean }[];
  memberships?: { contactGroupMembership?: { contactGroupResourceName?: string } }[];
  metadata?: { sources?: { updateTime?: string }[] };
  biographies?: unknown[];
};

type PeopleResponse = {
  connections?: Person[];
  otherContacts?: Person[];
  people?: Person[];
  results?: { person?: Person }[];
  nextPageToken?: string;
  totalPeople?: number;
  totalSize?: number;
};

function mapPerson(person: Person): ProviderContact {
  const emails = (person.emailAddresses ?? []).map((item) => item.value ?? "").filter(Boolean);
  const primaryEmail = person.emailAddresses?.find((item) => item.metadata?.primary)?.value ?? emails[0] ?? null;
  const organization = person.organizations?.find((item) => item.metadata?.primary) ?? person.organizations?.[0];
  const birthday = person.birthdays?.[0]?.date;
  return {
    id: person.resourceName.split("/").pop() ?? person.resourceName,
    provider: "google_contacts",
    resourceName: person.resourceName,
    etag: person.etag ?? null,
    name: person.names?.[0]?.displayName ?? "Unnamed contact",
    primaryEmail,
    emails,
    phones: (person.phoneNumbers ?? []).map((item) => item.value ?? "").filter(Boolean),
    company: organization?.name ?? null,
    jobTitle: organization?.title ?? null,
    addresses: (person.addresses ?? []).map((item) => item.formattedValue ?? "").filter(Boolean),
    organization: organization?.name ?? null,
    websites: (person.urls ?? []).map((item) => item.value ?? "").filter(Boolean),
    notesAvailable: Boolean(person.biographies?.length),
    birthday: birthday ? `${birthday.year ?? ""}-${String(birthday.month ?? "").padStart(2, "0")}-${String(birthday.day ?? "").padStart(2, "0")}` : null,
    photoUrl: person.photos?.find((item) => !item.default)?.url ?? null,
    groups: (person.memberships ?? []).map((item) => item.contactGroupMembership?.contactGroupResourceName ?? "").filter(Boolean),
    updatedAt: person.metadata?.sources?.map((item) => item.updateTime).filter((value): value is string => Boolean(value)).sort().at(-1) ?? null,
  };
}

export class GoogleContactsService implements ContactProvider {
  readonly code = "google_contacts" as const;

  constructor(private api = new GoogleApiService()) {}

  async status() {
    const context = await operationsContext();
    const credential = await new GoogleRepository(context.client, context.organizationId, context.workspaceId).credential();
    if (!credential) return "not_connected" as const;
    return googleContactsScopes.every((scope) => credential.scopes.includes(scope)) ? "connected" as const : "scope_required" as const;
  }

  async list(input: { view: ContactView; query?: string; sort?: "name" | "updated"; group?: string; pageToken?: string }): Promise<ContactPage> {
    let response: PeopleResponse;
    if (input.query) {
      const params = new URLSearchParams({ query: input.query, readMask: fields, pageSize: "30" });
      response = await this.api.request(`${peopleApi}/people:searchContacts?${params}`);
    } else if (input.view === "other") {
      const params = new URLSearchParams({ readMask: fields, pageSize: "100", ...(input.pageToken && { pageToken: input.pageToken }) });
      response = await this.api.request(`${peopleApi}/otherContacts?${params}`);
    } else if (input.view === "directory") {
      const params = new URLSearchParams({ readMask: fields, pageSize: "100", sources: "DIRECTORY_SOURCE_TYPE_DOMAIN_PROFILE", ...(input.pageToken && { pageToken: input.pageToken }) });
      response = await this.api.request(`${peopleApi}/people:listDirectoryPeople?${params}`);
    } else {
      const params = new URLSearchParams({ personFields: fields, pageSize: "100", sortOrder: input.sort === "updated" ? "LAST_MODIFIED_DESCENDING" : "FIRST_NAME_ASCENDING", ...(input.pageToken && { pageToken: input.pageToken }) });
      response = await this.api.request(`${peopleApi}/people/me/connections?${params}`);
    }

    const searchPeople = response.results?.flatMap((result) => result.person ? [result.person] : []) ?? [];
    let contacts = (response.connections ?? response.otherContacts ?? response.people ?? searchPeople).map(mapPerson);
    if (input.group) contacts = contacts.filter((contact) => contact.groups.includes(input.group!));
    if (input.view === "recent") contacts = contacts.sort((left, right) => (right.updatedAt ?? "").localeCompare(left.updatedAt ?? ""));
    if (input.view === "favorites") contacts = [];
    log("google_contacts.contacts.listed", { view: input.view, resultCount: contacts.length, hasQuery: Boolean(input.query), hasNextPage: Boolean(response.nextPageToken) });
    return { contacts, nextPageToken: response.nextPageToken ?? null, totalItems: response.totalPeople ?? response.totalSize ?? null };
  }

  async contact(resourceName: string) {
    const normalizedResourceName = resourceName.replace(/^\//, "");
    return mapPerson(await this.api.request<Person>(`${peopleApi}/${normalizedResourceName}?personFields=${encodeURIComponent(fields)}`));
  }
}
