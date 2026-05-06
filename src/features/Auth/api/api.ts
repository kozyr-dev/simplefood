import { User } from "@/entities/User";
import { fetchAPI } from "@/shared/utils/helpers/api";
import { fetchWithAuth } from "./authenticatedFetch";
import { SignInResponse, SignUpResponse } from "../model/types";

const authApi = {
  signIn: (identifier: string, password: string): Promise<SignInResponse> =>
    fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifier, password }),
    }).then(async (res) => {
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error?.message ?? "Sign in failed");
      return data;
    }),

  signUp: (username: string, email: string, phone: string, password: string): Promise<SignUpResponse> =>
    fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, phone, password }),
    }).then(async (res) => {
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error?.message ?? "Sign up failed");
      return data;
    }),

  signOut: (): Promise<void> =>
    fetch("/api/auth/logout", { method: "POST" }).then(() => undefined),

  fetchLoggedInUserInfo: (): Promise<User> =>
    fetchWithAuth("/users/me") as Promise<User>,

  updateLoggedInUserInfo: (userId: number, data: Record<string, unknown>): Promise<User> => {
    const payload = { ...data };
    if (payload["password"] === "") {
      delete payload["password"];
      delete payload["passwordConfirmation"];
    }
    return fetchWithAuth(`/users/${userId}`, {}, {
      method: "PUT",
      body: JSON.stringify(payload),
    }) as Promise<User>;
  },

  resetPassword: (password: string, passwordConfirmation: string): Promise<object> =>
    fetchAPI("/auth/reset-password", {}, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, passwordConfirmation }),
    }),
};

export default authApi;
