import { act, renderHook } from "@testing-library/react";
import { useUserStore, type User } from "@/entities/User";
import { ApiError } from "@/shared/api";
import { useSessionStore } from "@/shared/session";
import authApi from "../api/api";
import { useChangePassword, useSignIn, useSignOut } from "./hooks";

jest.mock("../api/api", () => ({
  __esModule: true,
  default: { signIn: jest.fn(), signUp: jest.fn(), signOut: jest.fn(), changePassword: jest.fn() },
}));
jest.mock("@/shared/session/refresh", () => ({ refreshAccessToken: jest.fn() }));

import { refreshAccessToken } from "@/shared/session/refresh";

const api = authApi as jest.Mocked<typeof authApi>;
const refresh = refreshAccessToken as jest.MockedFunction<typeof refreshAccessToken>;

const user: User = {
  id: "u1",
  name: "Олена",
  email: "o@example.com",
  emailVerified: false,
  phone: null,
  address: null,
  role: "customer",
  createdAt: "2026-11-16T10:00:00.000Z",
};

describe("auth hooks", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useSessionStore.setState({ accessToken: null, status: "anonymous" });
    useUserStore.setState({ user: null });
  });

  it("signing in keeps the token and the profile in memory only", async () => {
    api.signIn.mockResolvedValue({ data: { accessToken: "a", expiresIn: 900, user } });
    const { result } = renderHook(() => useSignIn());

    await act(() => result.current({ email: "o@example.com", password: "secret" }));

    expect(useSessionStore.getState()).toMatchObject({ accessToken: "a", status: "authenticated" });
    expect(useUserStore.getState().user).toEqual(user);
    expect(localStorage.length).toBe(0);
  });

  it("signing out clears the session even when the server can't be reached", async () => {
    useSessionStore.setState({ accessToken: "a", status: "authenticated" });
    useUserStore.setState({ user });
    api.signOut.mockRejectedValue(new Error("offline"));
    const { result } = renderHook(() => useSignOut());

    await act(() => expect(result.current()).rejects.toThrow("offline"));

    expect(useSessionStore.getState()).toMatchObject({ accessToken: null, status: "anonymous" });
    expect(useUserStore.getState().user).toBeNull();
  });

  it("changing the password refreshes an expired token once, then keeps the new session", async () => {
    useSessionStore.setState({ accessToken: "expired", status: "authenticated" });
    api.changePassword
      .mockRejectedValueOnce(new ApiError(401, "UNAUTHORIZED", "x"))
      .mockResolvedValueOnce({ data: { accessToken: "after", expiresIn: 900 } });
    refresh.mockResolvedValue("fresh");
    const { result } = renderHook(() => useChangePassword());

    await act(() => result.current({ currentPassword: "old secret", newPassword: "new secret" }));

    expect(api.changePassword).toHaveBeenLastCalledWith("fresh", "old secret", "new secret");
    expect(useSessionStore.getState().accessToken).toBe("after");
  });

  it("a wrong current password is not retried", async () => {
    useSessionStore.setState({ accessToken: "a", status: "authenticated" });
    api.changePassword.mockRejectedValue(new ApiError(400, "WRONG_PASSWORD", "x"));
    const { result } = renderHook(() => useChangePassword());

    await act(() =>
      expect(result.current({ currentPassword: "wrong", newPassword: "new secret" })).rejects.toMatchObject({
        code: "WRONG_PASSWORD",
      }),
    );
    expect(api.changePassword).toHaveBeenCalledTimes(1);
    expect(refresh).not.toHaveBeenCalled();
  });
});
