import { apiFetch, errorFromResponse, type User } from "@/shared/api";
import { authFetch, type SessionResponse } from "@/shared/session";

/**
 * The site's own /api/auth routes (app/api/auth): they keep the refresh
 * token in an HttpOnly cookie and return the rest. Throws ApiError.
 */
async function sessionCall(path: string, body?: unknown, token?: string | null): Promise<SessionResponse<User>> {
  const response = await fetch(`/api/auth/${path}`, {
    method: "POST",
    headers: {
      ...(body === undefined ? {} : { "Content-Type": "application/json" }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  if (!response.ok) throw await errorFromResponse(response);
  return (await response.json()) as SessionResponse<User>;
}

export interface SignUpData {
  name: string;
  email: string;
  phone: string;
  password: string;
}

const authApi = {
  signIn: (email: string, password: string) => sessionCall("login", { email, password }),

  signUp: (data: SignUpData) => sessionCall("register", data),

  /** Ends the session on the server too; the cookie is cleared either way. */
  signOut: async (): Promise<void> => {
    await fetch("/api/auth/logout", { method: "POST" });
  },

  /** Ends every other session; this one continues with a new token (the route stores the cookie). */
  changePassword: (token: string | null, currentPassword: string, newPassword: string) =>
    sessionCall("change-password", { currentPassword, newPassword }, token),

  /** Always succeeds (204) whether or not an account has the email. */
  forgotPassword: (email: string) =>
    apiFetch<void>("/auth/forgot-password", { method: "POST", body: { email } }),

  /** Doesn't sign in: every session ends. */
  resetPassword: (token: string, newPassword: string) =>
    apiFetch<void>("/auth/reset-password", { method: "POST", body: { token, newPassword } }),

  verifyEmail: (token: string) => apiFetch<void>("/auth/verify-email", { method: "POST", body: { token } }),

  resendVerification: () => authFetch<void>("/auth/resend-verification", { method: "POST" }),
};

export default authApi;
