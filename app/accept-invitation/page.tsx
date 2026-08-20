import { Button } from "@/features/platform/design-system";
import { acceptInvitationAction } from "@/features/platform/organization/actions/organization.actions";
export default function Page(){return <main className="mx-auto max-w-xl px-5 py-20"><h1 className="text-3xl font-semibold">Accept organization invitation</h1><p className="mt-3 text-sm text-vds-muted">Sign in using the invited email address, then confirm membership.</p><form action={acceptInvitationAction} className="mt-7"><Button>Accept invitation</Button></form></main>}
