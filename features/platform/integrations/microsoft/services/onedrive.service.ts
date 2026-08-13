import "server-only";
import type {
  DriveView,
  ExternalFile,
  ExternalStorageProvider,
  FilePage,
} from "@/features/platform/external-storage/domain/contracts";
import { MicrosoftGraphGatewayService } from "./graph-gateway.service";
import { MicrosoftOAuthService } from "./microsoft-oauth.service";
import { microsoftCapabilityStatus } from "./provider-status";
type Item = {
  id: string;
  name: string;
  file?: { mimeType?: string };
  folder?: unknown;
  createdDateTime?: string;
  lastModifiedDateTime?: string;
  size?: number;
  parentReference?: { id?: string };
  webUrl?: string;
  thumbnails?: { large?: { url?: string } }[];
  shared?: unknown;
};
const map = (item: Item): ExternalFile => ({
  id: item.id,
  provider: "onedrive",
  name: item.name,
  mimeType: item.folder
    ? "application/vnd.microsoft.folder"
    : (item.file?.mimeType ?? "application/octet-stream"),
  owners: [],
  createdAt: item.createdDateTime ?? null,
  modifiedAt: item.lastModifiedDateTime ?? null,
  size: item.size ?? null,
  permissions: item.shared ? ["shared"] : [],
  starred: false,
  folder: !!item.folder,
  parents: item.parentReference?.id ? [item.parentReference.id] : [],
  previewAvailable: !item.folder,
  webViewUrl: item.webUrl ?? null,
  thumbnailUrl: item.thumbnails?.[0]?.large?.url ?? null,
  trashed: false,
});
export class OneDriveService implements ExternalStorageProvider {
  readonly code = "onedrive" as const;
  private graph = new MicrosoftGraphGatewayService(() =>
    new MicrosoftOAuthService().accessToken(),
  );
  status() {
    return microsoftCapabilityStatus("onedrive");
  }
  async list(input: {
    view: DriveView;
    folderId?: string;
    query?: string;
    sort?: string;
    mimeType?: string;
    pageToken?: string;
  }): Promise<FilePage> {
    const base = input.query
        ? `/me/drive/root/search(q='${input.query.replaceAll("'", "''")}')`
        : input.view === "recent"
          ? "/me/drive/recent"
          : input.view === "shared_with_me"
            ? "/me/drive/sharedWithMe"
            : input.folderId
              ? `/me/drive/items/${encodeURIComponent(input.folderId)}/children`
              : "/me/drive/root/children",
      response = await this.graph.request<{
        value: Item[];
        "@odata.nextLink"?: string;
      }>({
        path:
          input.pageToken?.replace("https://graph.microsoft.com/v1.0", "") ??
          `${base}?$top=100`,
        requiredCapability: "onedrive",
      });
    let files = response.value.map(map);
    if (input.mimeType)
      files = files.filter((file) => file.mimeType === input.mimeType);
    return { files, nextPageToken: response["@odata.nextLink"] ?? null };
  }
  async file(id: string) {
    return map(
      await this.graph.request<Item>({
        path: `/me/drive/items/${encodeURIComponent(id)}`,
        requiredCapability: "onedrive",
      }),
    );
  }
  async upload(file: File, parentId = "root") {
    const bytes = new Uint8Array(await file.arrayBuffer());
    return map(
      await this.graph.request<Item>({
        path: `/me/drive/items/${encodeURIComponent(parentId)}:/${encodeURIComponent(file.name)}:/content`,
        method: "PUT",
        requiredCapability: "onedrive",
        body: bytes,
      }),
    );
  }
  async download(id: string) {
    const token = await new MicrosoftOAuthService().accessToken();
    return fetch(
      `https://graph.microsoft.com/v1.0/me/drive/items/${encodeURIComponent(id)}/content`,
      { headers: { authorization: `Bearer ${token}` }, cache: "no-store" },
    );
  }
  async rename(id: string, name: string) {
    return map(
      await this.graph.request<Item>({
        path: `/me/drive/items/${encodeURIComponent(id)}`,
        method: "PATCH",
        requiredCapability: "onedrive",
        body: { name },
      }),
    );
  }
  async move(id: string, parentId: string) {
    return map(
      await this.graph.request<Item>({
        path: `/me/drive/items/${encodeURIComponent(id)}`,
        method: "PATCH",
        requiredCapability: "onedrive",
        body: { parentReference: { id: parentId } },
      }),
    );
  }
  async copy(id: string, name?: string) {
    return map(
      await this.graph.request<Item>({
        path: `/me/drive/items/${encodeURIComponent(id)}/copy`,
        method: "POST",
        requiredCapability: "onedrive",
        body: { name },
      }),
    );
  }
  async trash(id: string) {
    return map(
      await this.graph.request<Item>({
        path: `/me/drive/items/${encodeURIComponent(id)}`,
        method: "PATCH",
        requiredCapability: "onedrive",
        body: { deleted: {} },
      }),
    );
  }
  restore(id: string) {
    return this.file(id);
  }
  async createFolder(name: string, parentId = "root") {
    return map(
      await this.graph.request<Item>({
        path: `/me/drive/items/${encodeURIComponent(parentId)}/children`,
        method: "POST",
        requiredCapability: "onedrive",
        body: {
          name,
          folder: {},
          "@microsoft.graph.conflictBehavior": "rename",
        },
      }),
    );
  }
}
