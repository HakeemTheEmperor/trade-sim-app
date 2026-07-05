import { apiFetch } from "./apiClient";
import { clearSession, setSession } from "./authToken";

export async function handleSignUp(credentials: {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  username: string;
}) {
  const response = await apiFetch(`/auth/signup`, {
    method: "POST",
    auth: false,
    body: JSON.stringify(credentials),
  });

  const data = await response.json();
  if (!response.ok) {
    throw data;
  }

  setSession(data.token, data.user);

  return data;
}

export async function handleLogin(credentials: {
  email: string;
  password: string;
}) {
  const response = await apiFetch(`/auth/signin`, {
    method: "POST",
    auth: false,
    body: JSON.stringify(credentials),
  });

  const data = await response.json();
  if (!response.ok) {
    throw data;
  }

  setSession(data.token, data.user);

  return data;
}

export async function logout() {
  const response = await apiFetch(`/auth/logout`, { method: "POST" });
  const result = await response.json();
  if (response.ok) {
    clearSession();
    window.location.href = "/welcome";
  } else {
    throw result;
  }
}

export async function handlePasswordChange(credentials: {
  old_password: string;
  new_password: string;
}) {
  const response = await apiFetch(`/auth/reset-password`, {
    method: "POST",
    body: JSON.stringify(credentials),
  });
  const result = await response.json();
  if (response.ok) {
    clearSession();
    window.location.href = "/welcome";
    alert("Password changed successfully");
  } else {
    throw result;
  }
}
