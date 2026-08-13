import type { ReactNode } from "react";

export interface WorkspaceTab { id: string; label: string; icon?: string; order: number; visible: boolean; lazy: boolean; permission?: string }
export interface WorkspaceWidget { id: string; title: string; description?: string; value?: string; content?: ReactNode; order: number; size: "small" | "medium" | "large" }
export interface WorkspaceAction { id: string; label: string; kind: "link" | "command" | "placeholder"; href?: string; permission?: string; destructive?: boolean; mobileSticky?: boolean }
export interface WorkspaceRelation { id: string; type: string; label: string; count?: number; href?: string; description?: string }
export interface WorkspaceMetadata { owner?: string; assignedUser?: string; createdAt: string; updatedAt: string; tags: readonly string[]; favorite?: boolean }
export interface WorkspaceSidebarSection { id: string; title: string; items: readonly { label: string; value: string; href?: string }[] }
export interface WorkspaceDefinition { id: string; entityType: "property" | "lead" | "deal" | "customer" | "agent" | "campaign" | "organization" | "ai-employee"; title: string; icon: string; tabs: readonly WorkspaceTab[]; actions: readonly WorkspaceAction[]; permissions: readonly string[]; widgets: readonly string[]; relationships: readonly string[] }
export interface WorkspaceEvent { id: string; type: string; title: string; description?: string; occurredAt?: string; actor?: string }
export interface WorkspaceActivityItem { id: string; type: string; title: string; description?: string; occurredAt?: string }
export interface WorkspaceModel { id: string; definitionId: string; title: string; subtitle: string; status: string; metadata: WorkspaceMetadata; breadcrumbs: readonly { label: string; href?: string }[]; widgets: readonly WorkspaceWidget[]; relations: readonly WorkspaceRelation[]; events: readonly WorkspaceEvent[]; activities: readonly WorkspaceActivityItem[]; sidebar: readonly WorkspaceSidebarSection[] }
