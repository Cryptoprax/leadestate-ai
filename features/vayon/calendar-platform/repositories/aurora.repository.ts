import "server-only";
import {
  auroraDeals,
  auroraLeads,
  auroraMeetings,
  auroraTasks,
} from "@/features/vayon/demo-workspace/sales-operations/records";
import { auroraProperties } from "@/features/vayon/demo-workspace/property-portfolio/properties";
import type { CalendarRepository } from "../contracts/repository";
import type {
  ScheduleConflict,
  ScheduleEvent,
  ScheduleReminder,
} from "../domain/models";

const plusMinutes = (value: string, minutes: number) =>
  new Date(Date.parse(value) + minutes * 60_000).toISOString();

export class AuroraCalendarRepository implements CalendarRepository {
  readonly provider = "aurora" as const;
  async events(): Promise<readonly ScheduleEvent[]> {
    const meetings = auroraMeetings
      .slice(0, 150)
      .map((item): ScheduleEvent => ({
        id: item.id,
        title: item.title,
        type: "meeting",
        status: "scheduled",
        priority: "medium",
        startsAt: item.startsAt,
        endsAt: item.endsAt,
        durationMinutes: 60,
        location: item.location,
        customer: item.contactId,
        property: item.propertyId,
        deal: item.dealId,
        assignedHuman: item.employeeId,
        assignedAI: "AI Workforce available after human assignment",
        workflow: `workflow-${item.id}`,
        approval: "required",
        timeline: item.identity.context.timelineRef?.objectId,
        conversation: `conversation-${item.contactId}`,
        notification: `notification-${item.id}`,
        createdAt: item.startsAt,
        updatedAt: item.startsAt,
      }));
    const visits = Array.from({ length: 90 }, (_, index): ScheduleEvent => {
      const property = auroraProperties[index % auroraProperties.length]!,
        lead = auroraLeads[index % auroraLeads.length]!,
        deal = auroraDeals[index % auroraDeals.length]!,
        startsAt = auroraMeetings[index]!.startsAt;
      return {
        id: `aurora-site-visit-${index + 1}`,
        title: `Site visit — ${property.name}`,
        description: "Deterministic Aurora site visit record.",
        type: "site-visit",
        status: index % 7 === 0 ? "completed" : "scheduled",
        priority: index % 5 === 0 ? "high" : "medium",
        startsAt,
        endsAt: plusMinutes(startsAt, 90),
        durationMinutes: 90,
        location: `${property.locality}, ${property.city}`,
        customer: lead.contactId,
        property: property.id,
        deal: deal.id,
        assignedHuman: property.assignedSalesAgentId,
        assignedAI: "AI Workforce available after human assignment",
        workflow: `workflow-visit-${index + 1}`,
        approval: "required",
        timeline: `timeline-visit-${index + 1}`,
        conversation: `conversation-${lead.contactId}`,
        notification: `notification-visit-${index + 1}`,
        createdAt: startsAt,
        updatedAt: startsAt,
      };
    });
    const tasks = auroraTasks.slice(0, 200).map((item): ScheduleEvent => ({
      id: item.id,
      title: item.title,
      type: item.kind === "follow-up" ? "follow-up" : "internal-task",
      status: item.status === "completed" ? "completed" : "pending",
      priority:
        item.priority === "urgent"
          ? "critical"
          : item.priority === "normal"
            ? "medium"
            : item.priority,
      startsAt: item.dueAt,
      endsAt: plusMinutes(item.dueAt, 30),
      durationMinutes: 30,
      customer: item.leadId,
      deal: item.dealId,
      assignedHuman: item.employeeId,
      workflow: `workflow-${item.id}`,
      approval: "required",
      timeline: item.identity.context.timelineRef?.objectId,
      createdAt: item.dueAt,
      updatedAt: item.dueAt,
    }));
    return [...meetings, ...visits, ...tasks].sort((a, b) =>
      a.startsAt.localeCompare(b.startsAt),
    );
  }
  async reminders(): Promise<readonly ScheduleReminder[]> {
    return Array.from({ length: 180 }, (_, index) => {
      const event = auroraMeetings[index % 150]!;
      return {
        id: `aurora-reminder-${index + 1}`,
        eventId: event.id,
        kind:
          index % 3 === 0 ? "meeting" : index % 3 === 1 ? "task" : "follow-up",
        dueAt: new Date(Date.parse(event.startsAt) - 30 * 60_000).toISOString(),
        status: "queued",
        title: `Reminder — ${event.title}`,
      } as const;
    });
  }
  async conflicts(
    events: readonly ScheduleEvent[],
  ): Promise<readonly ScheduleConflict[]> {
    return Array.from({ length: 30 }, (_, index) => ({
      id: `aurora-conflict-${index + 1}`,
      firstEventId: events[index]!.id,
      secondEventId: events[index + 1]!.id,
      reason: "Deterministic Aurora schedule overlap for review.",
      severity: index % 6 === 0 ? "critical" : "warning",
    }));
  }
}
