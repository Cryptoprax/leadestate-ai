import type { PlatformNotification } from "../domain/notification";
export function notificationSummary(items: readonly PlatformNotification[]) {
  return {
    total: items.length,
    unread: items.filter((x) => !x.read).length,
    dismissed: items.filter((x) => x.dismissed).length,
    critical: items.filter((x) => x.priority === "critical").length,
  };
}
