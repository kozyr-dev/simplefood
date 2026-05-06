import { User } from "@/entities/User";
import { useSetToken, useResetToken } from "@/features/Auth";
import authApi from "../api/api";

export function useSignUp() {
  const setToken = useSetToken();
  return async ({
    username,
    email,
    phone,
    password,
  }: {
    username: string;
    email: string;
    phone: string;
    password: string;
  }): Promise<User> => {
    const response = await authApi.signUp(username, email, phone, password);
    setToken(response.jwt);
    return response.user;
  };
}

export function useSignIn() {
  const setToken = useSetToken();
  return async ({ identifier, password }: { identifier: string; password: string }): Promise<User> => {
    const response = await authApi.signIn(identifier, password);
    setToken(response.jwt);
    return response.user;
  };
}

export function useSignOut() {
  const resetToken = useResetToken();
  return async (): Promise<void> => {
    await authApi.signOut();
    resetToken();
  };
}

export function useFetchLoggedInUserInfo() {
  return (): Promise<User> => authApi.fetchLoggedInUserInfo();
}

export function useUpdateLoggedInUserInfo() {
  return ({ userId, data }: { userId: number; data: Record<string, unknown> }): Promise<User> =>
    authApi.updateLoggedInUserInfo(userId, data);
}

export function useResetPassword() {
  return ({ password, passwordConfirmation }: { password: string; passwordConfirmation: string }): Promise<object> =>
    authApi.resetPassword(password, passwordConfirmation);
}
