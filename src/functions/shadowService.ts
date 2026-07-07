import { apiFetch } from "./apiClient";

export interface ShadowLink {
  id: number;
  subject_id: number;
  shadow_id: number;
  status: string;
  initiated_by: string;
  created_at: string;
  responded_at: string | null;
  user?: { id: number; username: string };
}

async function readJson(response: Response) {
  const result = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(result.message || "Something went wrong. Please try again.");
  }
  return result;
}

// Subject invites another user (by username or email) to shadow them.
export const sendShadowInvite = async (identifier: {
  invitee_username?: string;
  invitee_email?: string;
}) => {
  const response = await apiFetch(`/shadow/invite`, {
    method: "POST",
    body: JSON.stringify(identifier),
  });
  return readJson(response);
};

export const acceptShadowInvite = async (linkId: number) => {
  const response = await apiFetch(`/shadow/invite/${linkId}/accept`, { method: "POST" });
  return readJson(response);
};

export const declineShadowInvite = async (linkId: number) => {
  const response = await apiFetch(`/shadow/invite/${linkId}/decline`, { method: "POST" });
  return readJson(response);
};

export const fetchIncomingInvites = async (): Promise<ShadowLink[]> => {
  const response = await apiFetch(`/shadow/invites`, { method: "GET" });
  const result = await readJson(response);
  return result.invites ?? [];
};

// My shadows — people who follow my trades.
export const fetchMyShadows = async (): Promise<ShadowLink[]> => {
  const response = await apiFetch(`/shadow/shadows`, { method: "GET" });
  const result = await readJson(response);
  return result.shadows ?? [];
};

export const removeShadow = async (linkId: number) => {
  const response = await apiFetch(`/shadow/shadows/${linkId}`, { method: "DELETE" });
  return readJson(response);
};

// Following — people whose trades I shadow.
export const fetchFollowing = async (): Promise<ShadowLink[]> => {
  const response = await apiFetch(`/shadow/following`, { method: "GET" });
  const result = await readJson(response);
  return result.following ?? [];
};

export const stopFollowing = async (linkId: number) => {
  const response = await apiFetch(`/shadow/following/${linkId}`, { method: "DELETE" });
  return readJson(response);
};
