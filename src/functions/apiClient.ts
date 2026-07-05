import { clearSession, getCsrfToken } from "./authToken";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const LOGIN_REDIRECT = "/welcome";
// Methods that flask-jwt-extended requires a CSRF token for.
const CSRF_METHODS = new Set(["POST", "PUT", "PATCH", "DELETE"]);

type ApiFetchOptions = RequestInit & {
  // When true (default) a 401 is treated as an expired/invalid session: the
  // cached user is cleared and the user is redirected to the landing page. Set
  // false for endpoints where a 401 is expected/handled by the caller (signin,
  // signup, and the /auth/me session probe).
  auth?: boolean;
};

// Single choke point for backend calls. The JWT rides along automatically in an
// HttpOnly cookie (credentials: "include"); for state-changing requests we echo
// the readable CSRF cookie as a header (double-submit protection).
export async function apiFetch(
  path: string,
  options: ApiFetchOptions = {}
): Promise<Response> {
  const { auth = true, headers, method = "GET", ...rest } = options;

  const finalHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    ...(headers as Record<string, string> | undefined),
  };

  if (CSRF_METHODS.has(method.toUpperCase())) {
    const csrf = getCsrfToken();
    if (csrf) finalHeaders["X-CSRF-TOKEN"] = csrf;
  }

  const response = await fetch(`${BASE_URL}${path}`, {
    ...rest,
    method,
    credentials: "include",
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
