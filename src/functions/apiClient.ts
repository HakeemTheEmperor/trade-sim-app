import { clearSession, getToken } from "./authToken";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
// NOTE: this key is bundled into the client and is therefore public. It is a
// coarse gate enforced by the backend, not a secret (see README / .env.example).
const API_KEY = import.meta.env.VITE_API_KEY;

const LOGIN_REDIRECT = "/welcome";

type ApiFetchOptions = RequestInit & {
  // When true (default) the request carries the bearer token and a 401 response
  // is treated as an expired/invalid session: the session is cleared and the
  // user is redirected to the landing page. Set false for auth endpoints
  // (signin/signup) where a 401 is a normal "bad credentials" response.
  auth?: boolean;
};

// Single choke point for all backend calls: builds the base URL, injects the
// shared headers + bearer token, and handles session expiry globally so an
// expired token mid-session no longer fails silently on every screen.
export async function apiFetch(
  path: string,
  options: ApiFetchOptions = {}
): Promise<Response> {
  const { auth = true, headers, ...rest } = options;

  const finalHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    "x-api-key": API_KEY,
    ...(headers as Record<string, string> | undefined),
  };

  if (auth) {
    const token = getToken();
    if (token) finalHeaders["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${path}`, {
    ...rest,
    headers: finalHeaders,
  });

  if (auth && response.status === 401) {
    clearSession();
    if (window.location.pathname !== LOGIN_REDIRECT) {
      window.location.href = LOGIN_REDIRECT;
    }
  }

  return response;
}
