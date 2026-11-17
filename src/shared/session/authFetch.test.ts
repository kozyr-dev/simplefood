import { ApiError } from "@/shared/api";
import { apiError, fakeResponse } from "@/shared/lib/testing/fakeResponse";
import { authFetch } from "./authFetch";
import { useSessionStore } from "./store";

const mockFetch = jest.fn();
global.fetch = mockFetch;

const session = (token: string) => fakeResponse(200, { data: { accessToken: token, expiresIn: 900 } });
const unauthorized = () => fakeResponse(401, apiError(401, "UNAUTHORIZED"));
const urls = () => mockFetch.mock.calls.map(([url]) => url as string);
const authOf = (call: number) => (mockFetch.mock.calls[call][1].headers as Record<string, string>).Authorization;

describe("authFetch", () => {
  beforeEach(() => {
    mockFetch.mockReset();
    process.env.NEXT_PUBLIC_API_URL = "http://api.test";
    useSessionStore.setState({ accessToken: "old", status: "authenticated" });
  });

  it("sends the access token as a bearer token", async () => {
    mockFetch.mockResolvedValue(fakeResponse(200, { data: 1 }));

    await expect(authFetch("/users/me")).resolves.toEqual({ data: 1 });
    expect(authOf(0)).toBe("Bearer old");
  });

  it("refreshes once on a 401 and retries with the new token", async () => {
    mockFetch
      .mockResolvedValueOnce(unauthorized())
      .mockResolvedValueOnce(session("new"))
      .mockResolvedValueOnce(fakeResponse(200, { data: 1 }));

    await expect(authFetch("/users/me")).resolves.toEqual({ data: 1 });
    expect(urls()).toEqual(["http://api.test/api/users/me", "/api/auth/refresh", "http://api.test/api/users/me"]);
    expect(authOf(2)).toBe("Bearer new");
    expect(useSessionStore.getState().accessToken).toBe("new");
  });

  it("shares one refresh between calls that hit a 401 together", async () => {
    let finishRefresh: (r: Response) => void = () => undefined;
    mockFetch.mockImplementation((url: string, init: RequestInit) => {
      if (url === "/api/auth/refresh") return new Promise((resolve) => (finishRefresh = resolve));
      const token = (init.headers as Record<string, string>).Authorization;
      return Promise.resolve(token === "Bearer new" ? fakeResponse(200, { data: url }) : unauthorized());
    });

    const calls = [authFetch("/a"), authFetch("/b"), authFetch("/c")];
    await new Promise((resolve) => setTimeout(resolve, 0));
    finishRefresh(session("new"));

    await expect(Promise.all(calls)).resolves.toHaveLength(3);
    expect(urls().filter((url) => url === "/api/auth/refresh")).toHaveLength(1);
  });

  it("refreshes under the cross-tab lock when the browser has one", async () => {
    const request = jest.fn((_name: string, fn: () => Promise<unknown>) => fn());
    Object.defineProperty(navigator, "locks", { value: { request }, configurable: true });
    mockFetch.mockResolvedValueOnce(unauthorized()).mockResolvedValueOnce(session("new")).mockResolvedValueOnce(fakeResponse(204));

    try {
      await authFetch("/x");
      expect(request).toHaveBeenCalledWith("sf-refresh", expect.any(Function));
    } finally {
      Object.defineProperty(navigator, "locks", { value: undefined, configurable: true });
    }
  });

  it("signs the tab out and throws the 401 when the refresh fails", async () => {
    mockFetch.mockResolvedValueOnce(unauthorized()).mockResolvedValueOnce(fakeResponse(401));

    await expect(authFetch("/users/me")).rejects.toMatchObject({ status: 401 });
    expect(useSessionStore.getState()).toMatchObject({ accessToken: null, status: "anonymous" });
    expect(mockFetch).toHaveBeenCalledTimes(2);
  });

  it("stays signed in when the refresh is only rate-limited (429)", async () => {
    mockFetch.mockResolvedValueOnce(unauthorized()).mockResolvedValueOnce(fakeResponse(429, apiError(429, "TOO_MANY_REQUESTS")));

    await expect(authFetch("/users/me")).rejects.toMatchObject({ status: 401 });
    expect(useSessionStore.getState().status).toBe("authenticated");
  });

  it("throws 401 without calling the API when signed out", async () => {
    useSessionStore.setState({ accessToken: null, status: "anonymous" });

    await expect(authFetch("/users/me")).rejects.toBeInstanceOf(ApiError);
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it("goes ahead without a token when it's optional (a guest's order)", async () => {
    useSessionStore.setState({ accessToken: null, status: "anonymous" });
    mockFetch.mockResolvedValue(fakeResponse(201, { data: { number: 8 } }));

    await authFetch("/orders", { method: "POST", body: {}, optional: true });

    expect(authOf(0)).toBeUndefined();
  });

  it("never retries an optional call without the token once the session is gone", async () => {
    mockFetch.mockResolvedValueOnce(unauthorized()).mockResolvedValueOnce(fakeResponse(401));

    await expect(authFetch("/orders", { method: "POST", body: {}, optional: true })).rejects.toMatchObject({
      status: 401,
    });
    expect(urls()).toEqual(["http://api.test/api/orders", "/api/auth/refresh"]);
  });

  it("restores the session first when the page just loaded", async () => {
    useSessionStore.setState({ accessToken: null, status: "unknown" });
    mockFetch.mockResolvedValueOnce(session("restored")).mockResolvedValueOnce(fakeResponse(200, { data: 1 }));

    await authFetch("/users/me");

    expect(urls()[0]).toBe("/api/auth/refresh");
    expect(authOf(1)).toBe("Bearer restored");
  });
});
