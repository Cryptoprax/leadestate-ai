import type { ReactNode } from "react";
import type { WorkspaceModel } from "../types";
import { WorkspaceRegistryService } from "../services/workspace-registry.service";
import {
  WorkspaceActivity,
  WorkspaceAI,
  WorkspaceCommandBar,
  WorkspaceEmptyState,
  WorkspaceFiles,
  WorkspaceHeader,
  WorkspaceHero,
  WorkspaceInsights,
  WorkspaceLayout,
  WorkspaceNotes,
  WorkspaceOverview,
  WorkspaceRelations,
  WorkspaceRightPanel,
  WorkspaceTabs,
  WorkspaceTasks,
  WorkspaceTimeline,
} from "./WorkspaceEngine";

export function WorkspaceRenderer({
  model,
  activeTab,
  editHref,
  overview,
  panels = {},
}: {
  model: WorkspaceModel;
  activeTab: string;
  editHref: string;
  overview?: ReactNode;
  panels?: Readonly<Record<string, ReactNode>>;
}) {
  const registry = new WorkspaceRegistryService();
  const tabs = registry.visibleTabs(model.definitionId);
  const actions = registry
    .actions(model.definitionId, ["entity.*"])
    .map((action) => (action.id === "edit" ? { ...action, href: editHref } : action));
  const content: Record<string, ReactNode> = {
    overview: overview ?? <WorkspaceOverview widgets={model.widgets} />,
    timeline: <WorkspaceTimeline events={model.events} />,
    activity: <WorkspaceActivity items={model.activities} />,
    notes: <WorkspaceNotes />,
    files: <WorkspaceFiles />,
    tasks: <WorkspaceTasks />,
    messages: <WorkspaceEmptyState title="Messages" description="WhatsApp, email, SMS, notes, and system events connected to this record appear here." />,
    calls: <WorkspaceEmptyState title="Calls" description="Customer call history and outcomes connected to this record appear here." />,
    "follow-ups": <WorkspaceEmptyState title="Follow-ups" description="Open and completed communication commitments appear here." />,
    knowledge: <WorkspaceEmptyState title="Knowledge" description="Trusted organizational knowledge sources assigned to this AI employee appear here." />,
    recommendations: <WorkspaceEmptyState title="Recommendations" description="Governed recommendations appear here after a provider is configured. Inference is inactive." />,
    history: <WorkspaceEmptyState title="History" description="Future executions, decisions, and human review history appear here." />,
    capabilities: <WorkspaceEmptyState title="Capabilities" description="Registered capability contracts and allowed tools appear here. Execution is inactive." />,
    meetings: <WorkspaceEmptyState title="Meetings" description="Meetings connected to this workspace object appear here." />,
    "site-visits": <WorkspaceEmptyState title="Site visits" description="Scheduled and completed property visits appear here." />,
    relations: <WorkspaceRelations relations={model.relations} />,
    analytics: <WorkspaceInsights />,
    "ai-assistant": <WorkspaceAI />,
    settings: (
      <WorkspaceEmptyState
        title="Workspace settings"
        description="Settings are governed by AtlasOS configuration and permissions."
      />
    ),
    ...panels,
  };
  return (
    <WorkspaceLayout
      header={<WorkspaceHeader model={model} actions={actions} />}
      hero={<WorkspaceHero><WorkspaceCommandBar actions={actions} /></WorkspaceHero>}
      tabs={<WorkspaceTabs tabs={tabs} active={activeTab} baseHref={editHref.replace("/edit", "")} />}
      rightPanel={<WorkspaceRightPanel sections={model.sidebar} />}
      timeline={activeTab !== "timeline" ? <WorkspaceTimeline events={model.events.slice(0, 3)} /> : undefined}
    >
      {content[activeTab] ?? content.overview}
    </WorkspaceLayout>
  );
}
