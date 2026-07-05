// The JWT now lives in an HttpOnly cookie the browser sends automatically, so
// JS can no longer read or decode it. This module only handles the bits the
// client still needs: the CSRF token (a readable cookie) and the cached user
// profile used for UI (non-sensitive).

const USER_KEY = "user";
const LEGACY_TOKEN_KEY = "token";
const CSRF_COOKIE = "csrf_access_token";

// Read the double-submit CSRF token that flask-jwt-extended sets as a readable
// cookie. It must be echoed as the X-CSRF-TOKEN header on state-changing requests.
export function getCsrfToken(): string | null {
  const match = document.cookie.match(
    new RegExp(`(?:^|;\\s*)${CSRF_COOKIE}=([^;]+)`)
  );
  return match ? decodeURIComponent(match[1]) : null;
}

export function getStoredUser<T = unknown>(): T | null {
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function setStoredUser(user: unknown): void {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearSession(): void {
  localStorage.removeItem(USER_KEY);
  // Clean up any token left in storage by the pre-cookie version of the app.
  localStorage.removeItem(LEGACY_TOKEN_KEY);
}
