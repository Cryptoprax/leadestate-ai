# Sprint 23 — Global Location and Regional Standard

## Architecture

The reusable location system lives in `features/location`. It is presentation and application-service code only: it does not change authentication, billing, routing, server actions, or the database schema. Existing field names and stored formats remain stable (ISO country code, existing region/city strings, ISO currency code, IANA timezone, and language code).

`LocationDataService` is the single read boundary for country, region, city, currency, language, timezone, and telephone-code catalogs. Static catalogs are module-cached by the JavaScript runtime. Select options and dependent result sets are memoized by their React consumers, avoiding repeat filtering and rerenders. The component boundary is compatible with replacing the bundled regional data with a lazily loaded official dataset later.

## Reusable components

- `CountrySelect`: searchable flags, names, ISO codes, keyboard navigation, and browser-region detection.
- `StateSelect`: searchable options filtered by ISO country code.
- `CitySelect`: searchable cities filtered by country and state; provider-ready.
- `CurrencySelect`: ISO currency selection with country-derived default and manual override.
- `TimezoneSelect`: browser IANA timezone detection, UTC-offset labels, and override.
- `LanguageSelect`: browser-language detection and override.
- `PhoneCodeSelect`: searchable flag, dial code, and country labels with country-derived default.
- `AddressAutocomplete`: accessible address input boundary with native address autofill and an explicit provider extension point.

All searchable controls use the shared accessible listbox implementation, including arrow-key navigation, Enter selection, Escape dismissal, search filtering, focus treatment, labels, and hidden form values.

## Data flow

Country selection emits an ISO code. Consumers reset dependent state and city values, derive currency and telephone-code defaults through `LocationDataService`, and continue posting the original server-action field names. State selections store the existing region-name format, while cities store the existing city-name format. Users can override currency, timezone, and language without changing country.

The global controls are applied to organization onboarding, property location/pricing, lead language/telephone/currency, deal currency, and Google Calendar timezone forms. Team, billing, and current customer-management screens contain no editable regional fields; their existing read-only displays are unchanged.

## Future integrations

### Google Places and address autocomplete

`AddressAutocomplete` is the provider boundary for a future approved Google Places integration. A provider should load only after focus, debounce requests, scope results by selected country, preserve session tokens, expose attribution, and require explicit user selection. Until configured, it performs no external request and preserves browser address autofill.

### Maps

Future Maps support can consume the normalized country/state/city/address result and attach coordinates through an existing authorized mutation path. Map loading should remain lazy and must not become required to complete a form.

### Regional catalog expansion

The bundled catalog covers currently supported operating markets, with representative subdivisions and cities. A future official ISO subdivision/city package can be dynamically imported behind `LocationDataService` without changing component contracts or persisted values. Unknown or unsupported geography is never fabricated.
