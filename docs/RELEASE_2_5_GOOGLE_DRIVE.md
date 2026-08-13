# Release 2.5 — Google Drive Workspace

## Architecture

Google Drive is the first active adapter behind Vayon's provider-neutral external-storage contracts. The model supports Google Drive, OneDrive, SharePoint, Dropbox, Box, Amazon S3, Azure Blob, and future enterprise storage without coupling CRM records to provider payloads.

Drive activation reuses the encrypted Google identity credential and requests Drive access through a separate incremental flow. Gmail and Calendar scopes are not requested by the Drive action.

## Workspace and files

`/vayon/documents/drive` supports My Drive, Shared Drives, Recent, Starred, Shared with me, Trash, folder breadcrumbs, search, sort, MIME filtering, pagination contracts, metadata, owners, timestamps, sizes, permission identifiers, starred/folder state, and preview availability. PDF, image, Google Docs, Sheets, and Slides can use provider-controlled preview links. Office and unknown formats remain metadata-only when no preview exists. Vayon does not execute preview scripts.

The adapter supports upload, authenticated download, move, rename, copy, trash, restore, and folder creation. Sharing and permission editing remain placeholders. No file content is copied into Vayon CRM.

## Platform integration

`DocumentReference` links provider IDs to Property, Lead, Deal, Company, Contact, Campaign, Meeting, Task, or Universal Object references. Timeline helpers propose uploaded, updated, moved, deleted, folder-created, and linked events without appending them. Context slices expose references only. Universal Bar search maps live Drive metadata into document results. Executive Home displays page counts from live Recent, Modified, and Shared views only.

## Security

All provider operations use the authenticated workspace's encrypted credential and existing refresh path. Search strings are constrained before Drive query construction. Logs contain view, count, MIME type, size, and structural operation metadata only—never filenames, owners, file content, or credentials.

## Known limitations

No background synchronization, Drive push notifications, offline cache, persisted CRM links, durable Timeline events, content indexing, antivirus service, permission management, share UI, AI document analysis, or non-Google adapter is included. Shared Drive discovery is currently modeled through all-drive file listing rather than a dedicated drive-picker UI. Live synchronization is not claimed without authorized Google credentials.
