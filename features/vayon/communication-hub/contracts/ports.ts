import type { CallRecord, ChannelDescriptor, CommunicationDashboardSnapshot, CommunicationIntelligence, CommunicationTemplate, ComposerDraft, ConversationThread, ConversationTimelineItem, InboxQuery, MeetingRecord } from "../domain/contracts";
export interface ChannelRegistry { register(channel: ChannelDescriptor): void; list(): readonly ChannelDescriptor[] }
export interface UnifiedInbox { search(query: InboxQuery): readonly ConversationThread[]; get(id: string): ConversationThread | undefined }
export interface ConversationTimeline { list(threadId: string): readonly ConversationTimelineItem[] }
export interface ConversationComposer { create(draft: ComposerDraft): ComposerDraft; validate(draft: ComposerDraft): readonly string[]; send(draft: ComposerDraft): never }
export interface MeetingCenter { list(): readonly MeetingRecord[] }
export interface CallCenter { list(): readonly CallRecord[] }
export interface CommunicationIntelligenceService { analyze(thread: ConversationThread): Promise<CommunicationIntelligence> }
export interface TemplateRegistry { register(template: CommunicationTemplate): void; resolve(id: string, locale?: string, version?: number): CommunicationTemplate | undefined; list(): readonly CommunicationTemplate[] }
export interface CommunicationHubStorage { threads(): readonly ConversationThread[]; timeline(): readonly ConversationTimelineItem[]; drafts(): readonly ComposerDraft[]; saveDraft(draft: ComposerDraft): void; meetings(): readonly MeetingRecord[]; calls(): readonly CallRecord[] }
export interface CommunicationDashboardService { snapshot(query?: InboxQuery): Promise<CommunicationDashboardSnapshot> }

