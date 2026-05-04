import { fetchAPI } from "@/shared/utils/helpers/api";
import { User } from "@/entities/User";
import { SignInResponse, SignUpResponse } from "../model/types";

const authApi = {
  signUp: (username: string, email: string, phone: string, password: string): Promise<SignUpResponse> =>
    fetchAPI(
      "/auth/local/register",
      {},
      {
        method: "POST",
        body: JSON.stringify({
          username,
          email,
          phone,
          password,
        }),
      },
    ),
  signIn: (identifier: string, password: string): Promise<SignInResponse> =>
    fetchAPI(
      "/auth/local",
      {},
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier,
          password,
        }),
      },
    ),
  fetchLoggedInUserInfo: (token: string): Promise<User> =>
    fetchAPI(
      "/users/me",
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    ),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateLoggedInUserInfo: (userId: number, token: string, data: object | any): Promise<User> => {
    if (data["password"] === "") {
      delete data["password"];
      delete data["passwordConfirmation"];
    }

    const jsonData = JSON.stringify(data);

    return fetchAPI(
      `/users/${userId}`,
      {},
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: jsonData,
      },
    );
  },
  resetPassword: (password: string, passwordConfirmation: string): Promise<object> =>
    fetchAPI(
      "/auth/reset-password",
      {},
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password,
          passwordConfirmation,
        }),
      },
    ),
};

export default authApi;
