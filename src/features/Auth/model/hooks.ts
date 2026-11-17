import { useResetUser, useSetUser, userApi, type ProfileChanges, type User } from "@/entities/User";
import { ApiError } from "@/shared/api";
import { refreshAccessToken, useSessionStore, type SessionResponse } from "@/shared/session";
import authApi, { type SignUpData } from "../api/api";

/** Stores what a sign-in, sign-up or password change returned; the user. */
function useStartSession() {
  const setUser = useSetUser();
  return ({ data }: SessionResponse<User>): User => {
    useSessionStore.getState().setAccessToken(data.accessToken);
    if (data.user) setUser(data.user);
    return data.user as User;
  };
}

export function useSignIn() {
  const start = useStartSession();
  return async ({ email, password }: { email: string; password: string }): Promise<User> =>
    start(await authApi.signIn(email, password));
}

export function useSignUp() {
  const start = useStartSession();
  return async (data: SignUpData): Promise<User> => start(await authApi.signUp(data));
}

export function useSignOut() {
  const resetUser = useResetUser();
  return async (): Promise<void> => {
    try {
      await authApi.signOut();
    } finally {
      useSessionStore.getState().clear();
      resetUser();
    }
  };
}

/**
 * Changes the password; every other session ends, this one continues. An
 * expired access token is refreshed once first.
 */
export function useChangePassword() {
  const start = useStartSession();
  return async ({ currentPassword, newPassword }: { currentPassword: string; newPassword: string }) => {
    try {
      start(await authApi.changePassword(useSessionStore.getState().accessToken, currentPassword, newPassword));
    } catch (error) {
      if (!(error instanceof ApiError) || error.status !== 401) throw error;
      const token = await refreshAccessToken();
      if (!token) throw error;
      start(await authApi.changePassword(token, currentPassword, newPassword));
    }
  };
}

export function useUpdateProfile() {
  const setUser = useSetUser();
  return async (changes: ProfileChanges): Promise<User> => {
    const user = await userApi.update(changes);
    setUser(user);
    return user;
  };
}

export function useResendVerification() {
  return (): Promise<void> => authApi.resendVerification();
}

export const forgotPassword = authApi.forgotPassword;
export const resetPassword = authApi.resetPassword;
export const verifyEmail = authApi.verifyEmail;
