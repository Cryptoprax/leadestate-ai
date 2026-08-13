# Sprint 23 — Property Intelligence

## Architecture

The Properties route remains the canonical inventory route and keeps the existing server actions, `PropertyService`, repository, authorization checks, and Supabase RPC write path. The milestone adds an independent intelligence layer under `features/leadestate/property-intelligence`:

- `PropertyIntelligenceService` performs tenant-scoped, read-only dashboard aggregation.
- `PropertyImportService` coordinates previews without writing to Supabase.
- `ImporterRegistry` resolves an import provider by source type.
- `ImportProvider` is the stable interface for future official providers.
- `MockImportProvider` provides deterministic browser-side CSV preview and safe placeholders for sources that need approved integrations.
- OCR and Vision pipeline interfaces report explicit unavailable states until approved services are configured.

No website scraping, schema changes, or alternate property write path were introduced.

## Import flow

1. The user selects manual entry, CSV, Excel, PDF brochure, images, URL, voice note, or CRM export.
2. The wizard validates the selected source and requests a preview from the registered provider.
3. CSV files are parsed locally, headers receive suggested mappings and confidence scores, rows are validated, and duplicate references are highlighted.
4. Other formats expose their intended preview/extraction stage without fabricating extracted values.
5. Preview state can be discarded with Undo. No data is persisted by the mock provider.
6. Manual creation continues through the existing governed server action and RPC.

URL import accepts a URL only as provider input. The current provider never fetches or scrapes it. A future provider must use an official API or an integration for which the workspace has authorization.

## Components

- `PropertyDashboard`, `PropertyStats`, and `MapPreview`: portfolio KPIs, distributions, quick filters, recent records, and map/clustering extension points.
- `ImportCenter`, `ImportCard`, `ImportWizard`, and `ImportProgress`: source selection, upload/URL controls, mapping preview, validation, duplicate reporting, and undo state.
- `PropertyForm`: stable wrapper over the existing property wizard.
- `MediaManager`: local preview gallery, primary-image selection, removal, and reorder-ready controls.
- `PropertyInsights`: duplicate, pricing, market, description, SEO, tags, amenities, and valuation readiness widgets.

## Manual form and drafts

The form covers Basic, Location, Pricing, Amenities, Media, Ownership, Availability, Legal, SEO, and Internal Notes. Core Sprint 22 fields submit through the existing mutation contract. Fields not represented in the production schema are identified as local draft fields and are not sent through a new backend path. Draft input is debounced into browser local storage; media previews stay local.

## Future AI and extraction

OCR, Vision, brochure parsing, voice transcription, valuation, duplicate scoring, descriptions, SEO, tag inference, and amenity extraction are typed extension points. Implementations should return provenance, confidence, validation errors, and an explicit user-review stage before persistence. Extraction output must never silently become a listing.

## Provider extension points

To add an approved source:

1. Implement `ImportProvider` and declare the source types it supports.
2. Validate credentials and terms in the provider boundary.
3. Return `ImportPreview` data with warnings, row errors, mappings, and duplicate evidence.
4. Register it in `ImporterRegistry` without changing the wizard.
5. Route approved writes through the existing authorization and property mutation workflow.

Future map, geocoding, schools, hospitals, metro, video, 360-tour, virtual-tour, and CRM connectors should follow the same adapter boundary. Widget cards remain independent so later dashboard composition or drag-and-drop can be added without coupling data access to layout.
