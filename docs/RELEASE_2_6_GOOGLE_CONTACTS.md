# Release 2.6 — Google Contacts Workspace

## Architecture

Google Contacts is the first active adapter behind provider-neutral external-contact contracts. Microsoft People, Exchange Contacts, Apple Contacts, CardDAV, and future enterprise providers are extension targets only. Provider contacts remain external identities; the CRM contact model is unchanged.

Contacts activation uses the existing encrypted Google credential with separate incremental read-only consent. Gmail, Calendar, and Drive permissions are not requested by the Contacts action.

## Workspace

`/vayon/contacts/google` supports All Contacts, Other Contacts, directory contacts where the Google Workspace account permits them, Recent, future-ready Favorites, People API search, sorting, group filters, and pagination contracts. Cards expose name, primary/additional email, phones, company, title, address, organization, websites, notes availability metadata, birthday, photo reference, and groups.

## Matching and duplicates

`ContactMatcher` accepts explicit CRM identity candidates and applies normalized exact email, exact phone, exact organization, and exact name rules. It returns deterministic scored candidates with evidence. Duplicate suggestions cover provider email, provider phone, and explicit CRM candidate matches. Every result has `automaticMerge: false`; no provider or CRM record is modified.

Linking returns a proposed reference between provider contact ID and an existing Contact, Company, Lead, Deal, Communication, Meeting, Timeline identity, or Context identity. No link is persisted without a later schema-authorized implementation.

## Platform integration

Timeline helpers propose imported, updated, linked, unlinked, and duplicate-detected events without appending. Context slices expose proposed links only. Universal Bar search maps live provider name, email, phone, and organization metadata to contact results. Executive Home displays live recent-page and deterministic-review counts only. Integration Center derives connection health and permissions from existing scopes and flags.

## Security

The adapter requests read-only contacts and directory scopes. Credentials remain encrypted and refresh server-side. Workspace authorization remains mandatory. Logs contain view, result count, query presence, and pagination state only; contact names, emails, phone numbers, addresses, notes, and organizations are excluded.

## Known limitations

No contact import, write-back, automatic merge, CRM mutation, persisted link, background sync, People API sync tokens, Timeline append, Favorites inference, AI enrichment, or Microsoft/Exchange/CardDAV adapter is included. Directory access depends on Google Workspace administrator policy. Live synchronization is not claimed without authorized credentials.
