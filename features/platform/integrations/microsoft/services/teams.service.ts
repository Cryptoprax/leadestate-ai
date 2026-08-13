import "server-only";
import { MicrosoftGraphGatewayService } from "./graph-gateway.service";
import { MicrosoftOAuthService } from "./microsoft-oauth.service";
import { microsoftCapabilityStatus } from "./provider-status";
export interface TeamsChannel {
  readonly id: string;
  readonly teamId: string;
  readonly name: string;
  readonly description: string;
}
export interface TeamsChat {
  readonly id: string;
  readonly topic: string | null;
  readonly chatType: string;
}
export interface TeamsMessage {
  readonly id: string;
  readonly createdAt: string;
  readonly sender: string;
  readonly bodyPreview: string;
  readonly webUrl: string | null;
}
export interface TeamsMeeting {
  readonly id: string;
  readonly subject: string;
  readonly start: string;
  readonly end: string;
  readonly joinUrl: string | null;
}
export interface TeamsFileReference {
  readonly id: string;
  readonly name: string;
  readonly webUrl: string | null;
}
export interface TeamsPresence {
  readonly availability: string;
  readonly activity: string;
}
export class MicrosoftTeamsService {
  private graph = new MicrosoftGraphGatewayService(() =>
    new MicrosoftOAuthService().accessToken(),
  );
  status() {
    return microsoftCapabilityStatus("teams");
  }
  async channels(teamId: string) {
    const response = await this.graph.request<{
      value: { id: string; displayName?: string; description?: string }[];
    }>({
      path: `/teams/${encodeURIComponent(teamId)}/channels`,
      requiredCapability: "teams",
    });
    return response.value.map((item) => ({
      id: item.id,
      teamId,
      name: item.displayName ?? "Unnamed channel",
      description: item.description ?? "",
    }));
  }
  async chats() {
    const response = await this.graph.request<{
      value: { id: string; topic?: string; chatType?: string }[];
    }>({ path: "/me/chats?$top=50", requiredCapability: "teams" });
    return response.value.map((item) => ({
      id: item.id,
      topic: item.topic ?? null,
      chatType: item.chatType ?? "unknown",
    }));
  }
  async messages(chatId: string, query?: string) {
    const response = await this.graph.request<{
      value: {
        id: string;
        createdDateTime?: string;
        from?: { user?: { displayName?: string } };
        body?: { content?: string };
        webUrl?: string;
      }[];
    }>({
      path: `/chats/${encodeURIComponent(chatId)}/messages?$top=50`,
      requiredCapability: "teams",
    });
    return response.value
      .map((item) => ({
        id: item.id,
        createdAt: item.createdDateTime ?? "",
        sender: item.from?.user?.displayName ?? "Unknown",
        bodyPreview: (item.body?.content ?? "")
          .replace(/<[^>]+>/g, "")
          .slice(0, 180),
        webUrl: item.webUrl ?? null,
      }))
      .filter(
        (item) =>
          !query ||
          `${item.sender} ${item.bodyPreview}`
            .toLowerCase()
            .includes(query.toLowerCase()),
      );
  }
  async meetings() {
    const response = await this.graph.request<{
      value: {
        id: string;
        subject?: string;
        start?: { dateTime?: string };
        end?: { dateTime?: string };
        onlineMeeting?: { joinUrl?: string };
      }[];
    }>({ path: "/me/events?$filter=isOnlineMeeting eq true&$top=50&$orderby=start/dateTime", requiredCapability: "teams" });
    return response.value.map((item) => ({
      id: item.id,
      subject: item.subject ?? "Meeting",
      start: item.start?.dateTime ?? "",
      end: item.end?.dateTime ?? "",
      joinUrl: item.onlineMeeting?.joinUrl ?? null,
    }));
  }
  async files(teamId: string, channelId: string) {
    const folder = await this.graph.request<{ id: string; parentReference?: { driveId?: string } }>({
        path: `/teams/${encodeURIComponent(teamId)}/channels/${encodeURIComponent(channelId)}/filesFolder`,
        requiredCapability: "teams",
      }),
      response = await this.graph.request<{
        value: { id: string; name: string; webUrl?: string }[];
      }>({
        path: `/drives/${encodeURIComponent(folder.parentReference?.driveId ?? "")}/items/${encodeURIComponent(folder.id)}/children`,
        requiredCapability: "teams",
      });
    return response.value.map((item) => ({
      id: item.id,
      name: item.name,
      webUrl: item.webUrl ?? null,
    }));
  }
  presence() {
    return this.graph.request<TeamsPresence>({
      path: "/me/presence",
      requiredCapability: "teams",
    });
  }
}
