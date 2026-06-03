import {
  useSignIn,
  useSignOut,
  useSignUp,
  useFetchLoggedInUserInfo,
  useUpdateLoggedInUserInfo,
  useResetPassword,
} from "./hooks";
import authApi from "../api/api";
import { useSetToken, useResetToken } from "@/features/Auth";
import type { User } from "@/entities/User";

jest.mock("../api/api", () => ({
  __esModule: true,
  default: {
    signIn: jest.fn(),
    signUp: jest.fn(),
    signOut: jest.fn(),
    fetchLoggedInUserInfo: jest.fn(),
    updateLoggedInUserInfo: jest.fn(),
    resetPassword: jest.fn(),
  },
}));

jest.mock("@/features/Auth", () => ({
  useSetToken: jest.fn(),
  useResetToken: jest.fn(),
}));

const mockedAuthApi = authApi as jest.Mocked<typeof authApi>;
const mockedUseSetToken = useSetToken as jest.MockedFunction<typeof useSetToken>;
const mockedUseResetToken = useResetToken as jest.MockedFunction<typeof useResetToken>;

const mockUser: User = {
  id: 1,
  username: "testuser",
  email: "test@example.com",
  phone: "+1234567890",
  address: null,
  confirmed: true,
  blocked: false,
  provider: "local",
  createdAt: "2024-01-01T00:00:00.000Z",
  updatedAt: "2024-01-01T00:00:00.000Z",
};

describe("Auth hooks", () => {
  let mockSetToken: jest.Mock;
  let mockResetToken: jest.Mock;

  beforeEach(() => {
    mockSetToken = jest.fn();
    mockResetToken = jest.fn();
    jest.clearAllMocks();
    mockedUseSetToken.mockReturnValue(mockSetToken);
    mockedUseResetToken.mockReturnValue(mockResetToken);
  });

  describe("useSignIn", () => {
    it("calls authApi.signIn with the provided credentials", async () => {
      mockedAuthApi.signIn.mockResolvedValue({ jwt: "token", user: mockUser });
      const signIn = useSignIn();
      await signIn({ identifier: "user@example.com", password: "pass" });
      expect(mockedAuthApi.signIn).toHaveBeenCalledWith("user@example.com", "pass");
    });

    it("stores the jwt returned by the server", async () => {
      mockedAuthApi.signIn.mockResolvedValue({ jwt: "my-jwt", user: mockUser });
      const signIn = useSignIn();
      await signIn({ identifier: "user", password: "pass" });
      expect(mockSetToken).toHaveBeenCalledWith("my-jwt");
    });

    it("returns the user", async () => {
      mockedAuthApi.signIn.mockResolvedValue({ jwt: "token", user: mockUser });
      const signIn = useSignIn();
      const result = await signIn({ identifier: "user", password: "pass" });
      expect(result).toBe(mockUser);
    });

    it("propagates errors from authApi.signIn", async () => {
      mockedAuthApi.signIn.mockRejectedValue(new Error("Invalid credentials"));
      const signIn = useSignIn();
      await expect(signIn({ identifier: "user", password: "wrong" })).rejects.toThrow(
        "Invalid credentials",
      );
    });
  });

  describe("useSignUp", () => {
    it("calls authApi.signUp with all registration fields", async () => {
      mockedAuthApi.signUp.mockResolvedValue({ jwt: "token", user: mockUser });
      const signUp = useSignUp();
      await signUp({ username: "user", email: "user@example.com", phone: "+123", password: "pass" });
      expect(mockedAuthApi.signUp).toHaveBeenCalledWith("user", "user@example.com", "+123", "pass");
    });

    it("stores the jwt returned by the server", async () => {
      mockedAuthApi.signUp.mockResolvedValue({ jwt: "new-jwt", user: mockUser });
      const signUp = useSignUp();
      await signUp({ username: "user", email: "user@example.com", phone: "+123", password: "pass" });
      expect(mockSetToken).toHaveBeenCalledWith("new-jwt");
    });

    it("returns the user", async () => {
      mockedAuthApi.signUp.mockResolvedValue({ jwt: "token", user: mockUser });
      const signUp = useSignUp();
      const result = await signUp({
        username: "user",
        email: "user@example.com",
        phone: "+123",
        password: "pass",
      });
      expect(result).toBe(mockUser);
    });
  });

  describe("useSignOut", () => {
    it("calls authApi.signOut", async () => {
      mockedAuthApi.signOut.mockResolvedValue(undefined);
      const signOut = useSignOut();
      await signOut();
      expect(mockedAuthApi.signOut).toHaveBeenCalled();
    });

    it("resets the token after signing out", async () => {
      mockedAuthApi.signOut.mockResolvedValue(undefined);
      const signOut = useSignOut();
      await signOut();
      expect(mockResetToken).toHaveBeenCalled();
    });
  });

  describe("useFetchLoggedInUserInfo", () => {
    it("returns a function that calls authApi.fetchLoggedInUserInfo", async () => {
      mockedAuthApi.fetchLoggedInUserInfo.mockResolvedValue(mockUser);
      const fetchInfo = useFetchLoggedInUserInfo();
      await fetchInfo();
      expect(mockedAuthApi.fetchLoggedInUserInfo).toHaveBeenCalled();
    });

    it("returns the user data", async () => {
      mockedAuthApi.fetchLoggedInUserInfo.mockResolvedValue(mockUser);
      const fetchInfo = useFetchLoggedInUserInfo();
      const result = await fetchInfo();
      expect(result).toBe(mockUser);
    });
  });

  describe("useUpdateLoggedInUserInfo", () => {
    it("calls authApi.updateLoggedInUserInfo with userId and data", async () => {
      mockedAuthApi.updateLoggedInUserInfo.mockResolvedValue(mockUser);
      const update = useUpdateLoggedInUserInfo();
      await update({ userId: 1, data: { username: "newname" } });
      expect(mockedAuthApi.updateLoggedInUserInfo).toHaveBeenCalledWith(1, { username: "newname" });
    });

    it("returns the updated user", async () => {
      mockedAuthApi.updateLoggedInUserInfo.mockResolvedValue(mockUser);
      const update = useUpdateLoggedInUserInfo();
      const result = await update({ userId: 1, data: { username: "newname" } });
      expect(result).toBe(mockUser);
    });
  });

  describe("useResetPassword", () => {
    it("calls authApi.resetPassword with password and confirmation", async () => {
      mockedAuthApi.resetPassword.mockResolvedValue({});
      const resetPw = useResetPassword();
      await resetPw({ password: "newpass", passwordConfirmation: "newpass" });
      expect(mockedAuthApi.resetPassword).toHaveBeenCalledWith("newpass", "newpass");
    });
  });
});
