# Customer onboarding

Supabase Auth owns identity and session lifecycle. The onboarding service invokes one atomic, security-definer RPC that creates the organization, owner membership, first workspace, workspace membership, and optional invitations. Database RLS remains the authorization boundary. SQL is generated for manual review and application only.

