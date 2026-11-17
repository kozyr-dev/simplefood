import { apiError, fakeResponse } from "@/shared/lib/testing/fakeResponse";
import { useSessionStore } from "@/shared/session";
import authApi from "./api";

const mockFetch = jest.fn();
global.fetch = mockFetch;

const body = (call = 0) => JSON.parse(mockFetch.mock.calls[call][1].body as string);

describe("authApi", () => {
  beforeEach(() => {
    mockFetch.mockReset();
    process.env.NEXT_PUBLIC_API_URL = "http://api.test";
  });

  it("signs in through the site's route with the email", async () => {
    mockFetch.mockResolvedValue(fakeResponse(200, { data: { accessToken: "a", expiresIn: 900 } }));

    await authApi.signIn("olena@example.com", "secret");

    expect(mockFetch.mock.calls[0][0]).toBe("/api/auth/login");
    expect(body()).toEqual({ email: "olena@example.com", password: "secret" });
  });

  it("signs up with name, email, phone and password", async () => {
    mockFetch.mockResolvedValue(fakeResponse(201, { data: { accessToken: "a", expiresIn: 900 } }));
    const data = { name: "Олена", email: "o@example.com", phone: "+380671234567", password: "long enough" };

    await authApi.signUp(data);

    expect(mockFetch.mock.calls[0][0]).toBe("/api/auth/register");
    expect(body()).toEqual(data);
  });

  it("throws the API's error, e.g. INVALID_CREDENTIALS", async () => {
    mockFetch.mockResolvedValue(fakeResponse(401, apiError(401, "INVALID_CREDENTIALS")));

    await expect(authApi.signIn("o@example.com", "wrong")).rejects.toMatchObject({
      status: 401,
      code: "INVALID_CREDENTIALS",
    });
  });

  it("changes the password through the route, with the access token", async () => {
    mockFetch.mockResolvedValue(fakeResponse(200, { data: { accessToken: "b", expiresIn: 900 } }));

    await authApi.changePassword("a", "old secret", "new secret");

    expect(mockFetch.mock.calls[0][0]).toBe("/api/auth/change-password");
    expect(mockFetch.mock.calls[0][1].headers).toMatchObject({ Authorization: "Bearer a" });
    expect(body()).toEqual({ currentPassword: "old secret", newPassword: "new secret" });
  });

  it("asks the API directly for reset links, resets and verification", async () => {
    mockFetch.mockResolvedValue(fakeResponse(204));

    await authApi.forgotPassword("o@example.com");
    await authApi.resetPassword("tok", "new secret");
    await authApi.verifyEmail("tok2");

    expect(mockFetch.mock.calls.map(([url]) => url)).toEqual([
      "http://api.test/api/auth/forgot-password",
      "http://api.test/api/auth/reset-password",
      "http://api.test/api/auth/verify-email",
    ]);
    expect([body(0), body(1), body(2)]).toEqual([
      { email: "o@example.com" },
      { token: "tok", newPassword: "new secret" },
      { token: "tok2" },
    ]);
  });

  it("resends the verification link as the signed-in user", async () => {
    useSessionStore.setState({ accessToken: "a", status: "authenticated" });
    mockFetch.mockResolvedValue(fakeResponse(204));

    await authApi.resendVerification();

    expect(mockFetch.mock.calls[0][1].headers).toMatchObject({ Authorization: "Bearer a" });
  });
});
