# Sprint 23 Milestone 1 — Premium onboarding

Sprint 23 upgrades the existing four-step onboarding presentation without changing its authentication, routing, Supabase, or atomic provisioning architecture. The final form still submits to `completeOnboardingAction`, validates with `onboardingSchema`, and invokes `complete_organization_onboarding` with the existing field names and value formats.

## Components

- `CountrySelect` lazily imports the country catalog, supports search and keyboard selection, renders Unicode flags, stores ISO 3166-1 alpha-2 codes, and updates the recommended currency.
- `CurrencySelect` presents supported ISO 4217 codes with familiar symbols and allows an explicit override after country selection.
- `TimezoneSelect` uses browser-supported IANA zones when available, falls back to a curated baseline, and renders current friendly UTC offsets.
- `LanguageSelect` stores the existing short language-code format and provides searchable language names.
- `SearchableSelect` is the shared accessible listbox control with type-to-filter, arrow-key navigation, Enter selection, Escape dismissal, outside-click dismissal, and selected-state semantics.
- `ProgressStepper` renders the four stages, animated progress, active state, and completed checkmarks.
- `LogoUploader` validates PNG/JPEG/WebP images up to 5 MB, supports drag and drop, local preview, read progress, replacement, and removal.
- `ValidationMessage` provides consistent accessible inline success and error feedback.
- `PasswordField` adds a live password-strength indicator to signup and reset flows while preserving the existing server-side password schema.

## Architecture and data flow

The onboarding page remains protected by the existing authentication check and redirects users with an organization to `/vayon`. Client components manage progressive disclosure, browser-derived defaults, inline validation, and previews. All organization, workspace, locale, and invitation controls retain the existing form names. Native form submission calls the existing server action, which reparses all data with Zod before the existing service invokes the atomic Supabase RPC.

No organization, billing, AI workforce, integration, invitation, or workspace provisioning logic moved into the browser. Pending submission state is read from React form status to disable duplicate submissions.

## Validation

Organization and workspace names validate while typing and on blur. Required selections surface inline messages before users can advance. Invitation email fields retain native email validation, while the server action continues to enforce the complete authoritative Zod schema, invitation limits, and duplicate normalization. Signup/reset password strength is advisory; the existing server-side length and confirmation validation remains authoritative.

## Browser auto-detection

- Country uses `Intl.Locale(navigator.language).region` and falls back to `US`.
- Currency follows the selected country’s ISO currency and remains overridable.
- Timezone uses `Intl.DateTimeFormat().resolvedOptions().timeZone`.
- Language uses the primary `navigator.language` subtag and falls back to English when the language is outside the supported catalog.

Browser defaults are applied only to client state. The submitted formats remain the existing two-character country code, three-character currency code, IANA timezone, and short language code.

## Logo storage behavior

The current private storage policy requires an organization/workspace-scoped path, but neither identifier exists until the atomic onboarding RPC completes. To avoid weakening storage security or changing provisioning behavior, Sprint 23 provides a fully validated local logo preview and clearly labels it “Preview only.” Persistence can be enabled after a dedicated post-provisioning upload contract exists.

## Performance and accessibility

The country catalog is loaded with a dynamic import. Filtered option lists, timezone labels, currency options, language options, and workspace slug previews are memoized. Components use semantic labels, listbox/option roles, live validation announcements, visible focus rings, reduced-motion support, responsive layouts, and touch-friendly targets.

## Future enhancements

- Add a post-provisioning logo upload RPC or signed upload flow and persist `organizations.logo_path`.
- Connect office autocomplete to an approved geocoding provider.
- Source country/language catalogs from an internally versioned localization package.
- Add invitation resend/revoke operations after delivery infrastructure is available.
- Persist interrupted onboarding drafts for cross-device continuation.
