import { apiFetch } from "./apiClient";

export interface AppNotification {
  id: number;
  type: "SHADOW_INVITE" | "SHADOW_TRADE" | "SHADOW_ACCEPTED";
  payload: {
    actor_id?: number;
    actor_name?: string;
    action?: "BUY" | "SELL";
    symbol?: string;
    link_id?: number;
  };
  is_read: boolean;
  created_at: string;
}

export const fetchNotifications = async (
  page = 1,
  rows = 20
): Promise<AppNotification[]> => {
  const response = await apiFetch(`/notifications/?page=${page}&rows=${rows}`, {
    method: "GET",
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) return [];
  return result.notifications ?? [];
};

export const fetchUnreadCount = async (): Promise<number> => {
  const response = await apiFetch(`/notifications/unread-count`, { method: "GET" });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) return 0;
  return result.unread_count ?? 0;
};

export const markNotificationRead = async (id: number) => {
  const response = await apiFetch(`/notifications/${id}/read`, { method: "POST" });
  return response.ok;
};

export const markAllNotificationsRead = async () => {
  const response = await apiFetch(`/notifications/read-all`, { method: "POST" });
  return response.ok;
};
