import { useSessionStore } from "./store";

/** What the site's /api/auth routes return: never the refresh token (an HttpOnly cookie). */
export interface SessionResponse<U = unknown> {
  data: { accessToken: string; expiresIn: number; user?: U };
}

let refreshing: Promise<string | null> | null = null;

/**
 * Runs `fn` while no other tab of this site does: the browser's Web Locks.
 * A refresh uses up the cookie's token; two tabs refreshing with the same
 * token would get one 401, and that answer clears the cookie the other tab
 * just renewed. Older browsers without locks run it directly.
 */
function exclusively<T>(fn: () => Promise<T>): Promise<T> {
  const locks = typeof navigator === "undefined" ? undefined : navigator.locks;
  return locks ? (locks.request("sf-refresh", fn) as Promise<T>) : fn();
}

/**
 * A new access token from the refresh cookie (through /api/auth/refresh),
 * or null when there's no session; the store follows either way. Calls made
 * while one is running share it: one refresh per tab at a time.
 */
export function refreshAccessToken(): Promise<string | null> {
  refreshing ??= exclusively(async () => {
    try {
      const response = await fetch("/api/auth/refresh", { method: "POST" });
      if (response.status === 401) {
        // No session, or it ended: signed out.
        useSessionStore.getState().clear();
        return null;
      }
      if (!response.ok) {
        // Rate-limited (429) or the API is down: the session may well be
        // fine; this call fails, the next one tries again.
        return null;
      }
      const { data } = (await response.json()) as SessionResponse;
      useSessionStore.getState().setAccessToken(data.accessToken);
      return data.accessToken;
    } catch {
      // Offline: keep whatever state there is; the next call tries again.
      return null;
    }
  }).finally(() => {
    refreshing = null;
  });
  return refreshing;
}
