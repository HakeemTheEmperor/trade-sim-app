import { jwtDecode } from "jwt-decode";

// Shape of the claims our backend puts in the JWT (see AuthService.generate_token).
export type TokenClaims = {
  exp?: number;
  sub?: string;
  role?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
};

const TOKEN_KEY = "token";
const USER_KEY = "user";

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

// Typed, exception-safe decode. Returns null on any malformed token instead of
// throwing (the previous `jwtDecode(token) as any` could throw and leaked types).
export function decodeToken(token: string): TokenClaims | null {
  try {
    return jwtDecode<TokenClaims>(token);
  } catch {
    return null;
  }
}

// A token is valid only if it decodes and its (numeric) exp is in the future.
export function isTokenValid(token: string | null = getToken()): boolean {
  if (!token) return false;
  const claims = decodeToken(token);
  if (!claims || typeof claims.exp !== "number") return false;
  return claims.exp * 1000 > Date.now();
}

export function clearSession(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function setSession(token: string, user: unknown): void {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}
