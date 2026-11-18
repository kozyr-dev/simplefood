"use client";

import { useEffect } from "react";
import { userApi, useUserStore } from "@/entities/User";
import { refreshAccessToken, useSessionStore } from "@/shared/session";

/** localStorage keys of the Strapi site's token and profile (neither is stored any more). */
const LEGACY_KEYS = ["token-storage", "user-storage"];

let restoring: Promise<void> | null = null;

/**
 * After a page load: a new access token from the refresh cookie, then the
 * profile. Leaves the session `anonymous` when there's no cookie.
 */
export function restoreSession(): Promise<void> {
  restoring ??= (async () => {
    try {
      LEGACY_KEYS.forEach((key) => localStorage.removeItem(key));
    } catch {
      // Storage blocked (private mode): nothing was stored either.
    }
    if (!(await refreshAccessToken())) {
      // Unreachable server: show the signed-out state rather than wait forever.
      if (useSessionStore.getState().status === "unknown") useSessionStore.getState().clear();
      return;
    }
    try {
      useUserStore.getState().setUser(await userApi.me());
    } catch {
      useSessionStore.getState().clear();
    }
  })();
  return restoring;
}

/** Restores the session once per page load. */
export function useSessionBootstrap(): void {
  useEffect(() => {
    void restoreSession();
  }, []);
}
