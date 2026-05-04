import { User } from "@/entities/User";
import { useSetToken } from "@/features/Auth";
import authApi from "../api/api";

export function useSignUp() {
  const setToken = useSetToken();
  const signUp = async ({
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

  return signUp;
}

export function useSignIn() {
  const setToken = useSetToken();
  return async ({ identifier, password }: { identifier: string; password: string }): Promise<User> => {
    const response = await authApi.signIn(identifier, password);
    setToken(response.jwt);
    return response.user;
  };
}

export function useFetchLoggedInUserInfo() {
  const fetchLoggedInUserInfo = async (token: string): Promise<User> => {
    return await authApi.fetchLoggedInUserInfo(token);
  };

  return fetchLoggedInUserInfo;
}

export function useUpdateLoggedInUserInfo() {
  const updateLoggedInUserInfo = async ({
    userId,
    token,
    data,
  }: {
    userId: number;
    token: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: object | any;
  }): Promise<User> => {
    return await authApi.updateLoggedInUserInfo(userId, token, data);
  };

  return updateLoggedInUserInfo;
}

export function useResetPassword() {
  const resetPassword = async ({
    password,
    passwordConfirmation,
  }: {
    password: string;
    passwordConfirmation: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }): Promise<object | any> => {
    return await authApi.resetPassword(password, passwordConfirmation);
  };

  return resetPassword;
}
