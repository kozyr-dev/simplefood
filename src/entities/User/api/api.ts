import type { DataResponse, User } from "@/shared/api";
import { authFetch } from "@/shared/session";

/** What PATCH /users/me takes: only the fields sent change; `null` clears phone or address. */
export interface ProfileChanges {
  name?: string;
  email?: string;
  phone?: string | null;
  address?: string | null;
  /** Needed to change the email. */
  currentPassword?: string;
}

export const userApi = {
  me: async (): Promise<User> => (await authFetch<DataResponse<User>>("/users/me")).data,

  update: async (changes: ProfileChanges): Promise<User> =>
    (await authFetch<DataResponse<User>>("/users/me", { method: "PATCH", body: changes })).data,
};
