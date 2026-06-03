import authApi from "./api";
import { fetchWithAuth } from "./authenticatedFetch";
import { fetchAPI } from "@/shared/utils/helpers/api";
import type { User } from "@/entities/User";

jest.mock("./authenticatedFetch", () => ({ fetchWithAuth: jest.fn() }));
jest.mock("@/shared/utils/helpers/api", () => ({ fetchAPI: jest.fn() }));

const mockedFetchWithAuth = fetchWithAuth as jest.MockedFunction<typeof fetchWithAuth>;
const mockedFetchAPI = fetchAPI as jest.MockedFunction<typeof fetchAPI>;
const mockFetch = jest.fn();
global.fetch = mockFetch;

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

const ok = (data: unknown) => ({ ok: true, json: async () => data });
const fail = (data: unknown) => ({ ok: false, json: async () => data });

describe("authApi", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("signIn", () => {
    it("POSTs to /api/auth/login", async () => {
      mockFetch.mockResolvedValue(ok({ jwt: "token", user: mockUser }));
      await authApi.signIn("user@example.com", "pass");
      expect(mockFetch).toHaveBeenCalledWith(
        "/api/auth/login",
        expect.objectContaining({ method: "POST" }),
      );
    });

    it("sends identifier and password as JSON", async () => {
      mockFetch.mockResolvedValue(ok({ jwt: "token", user: mockUser }));
      await authApi.signIn("user@example.com", "pass");
      const [, options] = mockFetch.mock.calls[0];
      expect(JSON.parse(options.body)).toEqual({
        identifier: "user@example.com",
        password: "pass",
      });
    });

    it("returns jwt and user on success", async () => {
      mockFetch.mockResolvedValue(ok({ jwt: "tok123", user: mockUser }));
      const result = await authApi.signIn("user", "pass");
      expect(result).toEqual({ jwt: "tok123", user: mockUser });
    });

    it("throws with the server error message on failure", async () => {
      mockFetch.mockResolvedValue(fail({ error: { message: "Invalid credentials" } }));
      await expect(authApi.signIn("user", "wrong")).rejects.toThrow("Invalid credentials");
    });

    it("throws a fallback message when server provides no error detail", async () => {
      mockFetch.mockResolvedValue(fail({}));
      await expect(authApi.signIn("user", "wrong")).rejects.toThrow("Sign in failed");
    });
  });

  describe("signUp", () => {
    it("POSTs to /api/auth/register", async () => {
      mockFetch.mockResolvedValue(ok({ jwt: "token", user: mockUser }));
      await authApi.signUp("user", "user@example.com", "+123", "pass");
      expect(mockFetch).toHaveBeenCalledWith(
        "/api/auth/register",
        expect.objectContaining({ method: "POST" }),
      );
    });

    it("sends all registration fields as JSON", async () => {
      mockFetch.mockResolvedValue(ok({ jwt: "token", user: mockUser }));
      await authApi.signUp("testuser", "user@example.com", "+123", "pass");
      const [, options] = mockFetch.mock.calls[0];
      expect(JSON.parse(options.body)).toEqual({
        username: "testuser",
        email: "user@example.com",
        phone: "+123",
        password: "pass",
      });
    });

    it("returns jwt and user on success", async () => {
      mockFetch.mockResolvedValue(ok({ jwt: "tok456", user: mockUser }));
      const result = await authApi.signUp("user", "user@example.com", "+123", "pass");
      expect(result).toEqual({ jwt: "tok456", user: mockUser });
    });

    it("throws with the server error message on failure", async () => {
      mockFetch.mockResolvedValue(fail({ error: { message: "Email already taken" } }));
      await expect(
        authApi.signUp("user", "taken@example.com", "+123", "pass"),
      ).rejects.toThrow("Email already taken");
    });
  });

  describe("signOut", () => {
    it("POSTs to /api/auth/logout", async () => {
      mockFetch.mockResolvedValue({ ok: true });
      await authApi.signOut();
      expect(mockFetch).toHaveBeenCalledWith("/api/auth/logout", { method: "POST" });
    });

    it("returns void", async () => {
      mockFetch.mockResolvedValue({ ok: true });
      const result = await authApi.signOut();
      expect(result).toBeUndefined();
    });
  });

  describe("fetchLoggedInUserInfo", () => {
    it("calls fetchWithAuth with /users/me", async () => {
      mockedFetchWithAuth.mockResolvedValue(mockUser);
      await authApi.fetchLoggedInUserInfo();
      expect(mockedFetchWithAuth).toHaveBeenCalledWith("/users/me");
    });

    it("returns the user data", async () => {
      mockedFetchWithAuth.mockResolvedValue(mockUser);
      const result = await authApi.fetchLoggedInUserInfo();
      expect(result).toBe(mockUser);
    });
  });

  describe("updateLoggedInUserInfo", () => {
    it("calls fetchWithAuth with PUT to /users/:id", async () => {
      mockedFetchWithAuth.mockResolvedValue(mockUser);
      await authApi.updateLoggedInUserInfo(1, { username: "newname" });
      expect(mockedFetchWithAuth).toHaveBeenCalledWith(
        "/users/1",
        {},
        expect.objectContaining({ method: "PUT" }),
      );
    });

    it("includes the data in the request body", async () => {
      mockedFetchWithAuth.mockResolvedValue(mockUser);
      await authApi.updateLoggedInUserInfo(1, { username: "newname" });
      const [, , options] = mockedFetchWithAuth.mock.calls[0];
      expect(JSON.parse(options!.body as string)).toMatchObject({ username: "newname" });
    });

    it("strips password and passwordConfirmation when password is an empty string", async () => {
      mockedFetchWithAuth.mockResolvedValue(mockUser);
      await authApi.updateLoggedInUserInfo(1, {
        username: "newname",
        password: "",
        passwordConfirmation: "anything",
      });
      const [, , options] = mockedFetchWithAuth.mock.calls[0];
      const body = JSON.parse(options!.body as string);
      expect(body).not.toHaveProperty("password");
      expect(body).not.toHaveProperty("passwordConfirmation");
    });

    it("keeps password when it is non-empty", async () => {
      mockedFetchWithAuth.mockResolvedValue(mockUser);
      await authApi.updateLoggedInUserInfo(1, {
        password: "newpass",
        passwordConfirmation: "newpass",
      });
      const [, , options] = mockedFetchWithAuth.mock.calls[0];
      const body = JSON.parse(options!.body as string);
      expect(body.password).toBe("newpass");
      expect(body.passwordConfirmation).toBe("newpass");
    });
  });

  describe("resetPassword", () => {
    it("calls fetchAPI with the reset-password endpoint", async () => {
      mockedFetchAPI.mockResolvedValue({});
      await authApi.resetPassword("newpass", "newpass");
      expect(mockedFetchAPI).toHaveBeenCalledWith(
        "/auth/reset-password",
        {},
        expect.objectContaining({ method: "POST" }),
      );
    });

    it("sends password and passwordConfirmation in the body", async () => {
      mockedFetchAPI.mockResolvedValue({});
      await authApi.resetPassword("newpass", "newpass");
      const [, , options] = mockedFetchAPI.mock.calls[0];
      expect(JSON.parse(options!.body as string)).toEqual({
        password: "newpass",
        passwordConfirmation: "newpass",
      });
    });
  });
});
