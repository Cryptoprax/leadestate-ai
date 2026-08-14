import { notFound } from "next/navigation";
import { CommunicationsShell } from "@/features/vayon/communications-workspace/components/CommunicationsShell";
import { ConversationView } from "@/features/vayon/communications-workspace/components/CommunicationViews";
import { CommunicationsWorkspaceService } from "@/features/vayon/communications-workspace/services/communications.service";
export default async function Page({
  params,
}: {
  params: Promise<{ conversationId: string }>;
}) {
  const { conversationId } = await params,
    detail = await (
      await CommunicationsWorkspaceService.production()
    ).conversation(conversationId);
  if (!detail) notFound();
  return (
    <CommunicationsShell
      title="Conversation Workspace"
      description="Chronological communication, CRM context, deterministic assistance, and governed next actions."
    >
      <ConversationView detail={detail} />
    </CommunicationsShell>
  );
}
