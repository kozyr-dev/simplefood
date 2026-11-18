import { create } from "zustand";

/**
 * - `unknown`: not checked yet (the page just loaded);
 * - `authenticated`: there's an access token;
 * - `anonymous`: no session (never signed in, signed out, or it expired).
 */
export type SessionStatus = "unknown" | "authenticated" | "anonymous";

export interface SessionState {
  /** In memory only: never in localStorage. The refresh token is an HttpOnly cookie. */
  accessToken: string | null;
  status: SessionStatus;
  setAccessToken: (accessToken: string) => void;
  clear: () => void;
}

export const useSessionStore = create<SessionState>((set) => ({
  accessToken: null,
  status: "unknown",
  setAccessToken: (accessToken) => set({ accessToken, status: "authenticated" }),
  clear: () => set({ accessToken: null, status: "anonymous" }),
}));

export const useSessionStatus = () => useSessionStore((state) => state.status);
