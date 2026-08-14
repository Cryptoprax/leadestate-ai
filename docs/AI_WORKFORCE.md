# Vayon Operational AI Workforce

## Architecture

The operational Workforce is an additive server-first module under `features/vayon/operational-workforce`. App Router pages render shared view components using view models returned by `WorkforceService`. The service depends only on the `WorkforceRepository` contract.

```text
Pages → reusable views → view models → WorkforceService → WorkforceRepository
                                                        ↙                 ↘
                                             tenant Supabase       Aurora demo
```

Production access reuses the existing authenticated operations context and scopes reads by organization and workspace. Aurora uses an isolated deterministic repository. Neither adapter writes to the database.

## Employee lifecycle and model

The employee registry defines Sales, CRM, WhatsApp, Voice, Marketing, Operations, Finance, and Legal advisors. A definition that is not provisioned in the existing production tables remains `offline` and `unavailable`; the platform does not invent live activity. Employees expose identity, role, description, status, capabilities, metrics, queue, deterministic memory, activity, permissions, health, and version.

Status progresses conceptually through `offline`, `idle`, `online`, `busy`, and `paused`. This release observes existing state only and introduces no lifecycle mutation.

## Task model

Tasks support pending, running, completed, failed, and cancelled states. Types cover lead qualification, customer summaries, WhatsApp follow-up, meeting scheduling, property recommendations, deal analysis, campaign suggestions, and document review. Ownership, priority, timestamps, duration, and completion are display contracts. Production task content comes exclusively from the existing tenant-scoped `ai_tasks` source.

## Provider interfaces

`AIProvider` is provider-neutral. `DeterministicProvider` is the only executable implementation in this module and returns a rule-based explanation without performing CRM actions. OpenAI, Claude, Gemini, and Azure OpenAI exist only as named future contracts; no SDK, HTTP request, credential, or live inference is present.

## Future AI integration strategy

A future release may register a provider behind policy, approval, safety, and observability boundaries. Provider results must remain proposals until a separately authorized execution layer validates permissions and human approval. Durable memory should use an approved tenant-isolated schema rather than browser storage or implicit CRM writes.

## Performance

Pages perform one snapshot request, and repository reads are concurrent. Server Components keep repository code out of the browser bundle. Task views receive prefiltered immutable arrays; a future virtualized renderer can replace `TaskList` when queues exceed the current bounded server response.

## Safety boundaries

- No external AI providers or API calls.
- No automatic CRM, messaging, calendar, financial, or legal actions.
- No authentication, middleware, OAuth, schema, RLS, shell, dashboard, or CRM changes.
- Memory and unavailable metrics are explicit deterministic states.
