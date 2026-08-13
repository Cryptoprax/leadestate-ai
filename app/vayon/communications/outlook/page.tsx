import Link from "next/link";
import { Button } from "@/features/platform/design-system";
import { MicrosoftCapabilityShell } from "@/features/platform/integrations/microsoft/components/MicrosoftCapabilityShell";
import { composeOutlookAction } from "@/features/platform/integrations/microsoft/business-actions";
import { OutlookMailService } from "@/features/platform/integrations/microsoft/services/outlook.service";
import type { MailboxFolder } from "@/features/platform/messaging/domain/contracts";
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    folder?: MailboxFolder;
    q?: string;
    message?: string;
    error?: string;
    success?: string;
  }>;
}) {
  const query = await searchParams,
    service = new OutlookMailService(),
    status = await service.status();
  let page = null,
    thread = null;
  if (status === "connected")
    try {
      page = await service.list(query.folder ?? "inbox", query.q);
      if (query.message) {
        const message = await service.message(query.message);
        thread = await service.thread(message.threadId);
      }
    } catch {}
  return (
    <MicrosoftCapabilityShell
      title="Outlook Mail"
      capability="outlook_mail"
      status={status}
      description="Live Microsoft Graph mailbox. Timeline integration creates proposals only."
    >
      <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_22rem]">
        <section>
          <nav className="flex flex-wrap gap-2">
            {(["inbox", "sent", "drafts", "archive"] as const).map((folder) => (
              <Link
                key={folder}
                href={`/vayon/communications/outlook?folder=${folder}`}
                className="rounded-xl border border-vds-border px-3 py-2 text-sm capitalize"
              >
                {folder}
              </Link>
            ))}
          </nav>
          <form className="mt-4 flex gap-2">
            <input
              name="q"
              defaultValue={query.q}
              aria-label="Search Outlook"
              placeholder="Search Outlook"
              className="h-11 flex-1 rounded-xl border border-vds-border bg-vds-input px-4"
            />
            <Button>Search</Button>
          </form>
          {query.error && (
            <p role="alert" className="mt-3 text-vds-danger">
              {query.error}
            </p>
          )}
          {query.success && (
            <p role="status" className="mt-3 text-vds-success">
              {query.success}
            </p>
          )}
          <div className="mt-4 space-y-2">
            {page?.messages.map((message) => (
              <Link
                key={message.id}
                href={`/vayon/communications/outlook?folder=${query.folder ?? "inbox"}&message=${message.id}`}
                className="block rounded-xl border border-vds-border bg-vds-surface p-4"
              >
                <strong>{message.subject}</strong>
                <p className="mt-1 text-sm text-vds-muted">
                  {message.sender.name || message.sender.email} ·{" "}
                  {message.snippet}
                </p>
                <span className="mt-2 block text-xs text-vds-subtle">
                  {message.labels.join(", ") || "No categories"}
                  {message.attachments.length ? " · Attachments" : ""}
                </span>
              </Link>
            ))}
            {!page && (
              <p className="rounded-xl border border-vds-border p-6 text-vds-muted">
                Outlook data is temporarily unavailable.
              </p>
            )}
          </div>
          {thread && (
            <section className="mt-5 rounded-2xl border border-vds-border p-5">
              <h2 className="font-semibold">Thread view</h2>
              {thread.messages.map((message) => (
                <article
                  key={message.id}
                  className="mt-3 border-t border-vds-border pt-3"
                >
                  <strong>{message.sender.name || message.sender.email}</strong>
                  <p className="mt-2 whitespace-pre-wrap text-sm text-vds-muted">
                    {message.plainText || message.snippet || "HTML message content is available in Outlook."}
                  </p>
                </article>
              ))}
            </section>
          )}
        </section>
        <aside className="rounded-2xl border border-vds-border bg-vds-surface p-5">
          <h2 className="font-semibold">Compose</h2>
          <form action={composeOutlookAction} className="mt-4 space-y-3">
            <input
              name="to"
              required
              placeholder="Recipients"
              className="h-11 w-full rounded-xl border border-vds-border bg-vds-input px-3"
            />
            <input
              name="subject"
              required
              placeholder="Subject"
              className="h-11 w-full rounded-xl border border-vds-border bg-vds-input px-3"
            />
            <textarea
              name="body"
              placeholder="Message"
              className="min-h-32 w-full rounded-xl border border-vds-border bg-vds-input p-3"
            />
            <div className="flex gap-2">
              <Button name="mode" value="send">
                Send
              </Button>
              <Button name="mode" value="draft" variant="outline">
                Save draft
              </Button>
            </div>
          </form>
          <p className="mt-4 text-xs text-vds-subtle">
            Reply, reply all, and forward are supported by the provider service
            and remain user-initiated operations.
          </p>
        </aside>
      </div>
    </MicrosoftCapabilityShell>
  );
}
