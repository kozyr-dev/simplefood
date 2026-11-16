import { fetchWithAuth } from "./authenticatedFetch";
import { useAuthStore } from "../model/store";

jest.mock("@/shared/utils/helpers/api", () => ({
  getStrapiURL: (path: string) => `http://localhost:1337${path}`,
}));

const mockFetch = jest.fn();
global.fetch = mockFetch;

const ok = (data: unknown) => ({ ok: true, status: 200, json: async () => data });
const unauthorized = () => ({ ok: false, status: 401, json: async () => ({}) });
const serverError = () => ({ ok: false, status: 500, json: async () => ({}) });

describe("fetchWithAuth", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useAuthStore.setState({ token: null });
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("calls fetch with the full Strapi URL", async () => {
    mockFetch.mockResolvedValue(ok({}));
    await fetchWithAuth("/products");
    expect(mockFetch).toHaveBeenCalledWith(
      "http://localhost:1337/api/products",
      expect.any(Object),
    );
  });

  it("appends query string to the URL when urlParamsObject is provided", async () => {
    mockFetch.mockResolvedValue(ok({}));
    await fetchWithAuth("/products", { page: 1 });
    const [url] = mockFetch.mock.calls[0];
    expect(url).toContain("page=1");
  });

  it("includes Authorization header when token is set", async () => {
    useAuthStore.setState({ token: "my-jwt-token" });
    mockFetch.mockResolvedValue(ok({}));
    await fetchWithAuth("/products");
    const [, options] = mockFetch.mock.calls[0];
    expect(options.headers).toMatchObject({ Authorization: "Bearer my-jwt-token" });
  });

  it("omits Authorization header when token is null", async () => {
    mockFetch.mockResolvedValue(ok({}));
    await fetchWithAuth("/products");
    const [, options] = mockFetch.mock.calls[0];
    expect((options.headers as Record<string, string>)["Authorization"]).toBeUndefined();
  });

  it("passes through request options to fetch", async () => {
    mockFetch.mockResolvedValue(ok({}));
    await fetchWithAuth("/orders", {}, { method: "POST", body: '{"data":{}}' });
    const [, options] = mockFetch.mock.calls[0];
    expect(options.method).toBe("POST");
    expect(options.body).toBe('{"data":{}}');
  });

  it("returns parsed JSON on a successful response", async () => {
    mockFetch.mockResolvedValue(ok({ name: "Pizza" }));
    const result = await fetchWithAuth("/dishes");
    expect(result).toEqual({ name: "Pizza" });
  });

  it("throws on a non-ok response", async () => {
    mockFetch.mockResolvedValue(serverError());
    await expect(fetchWithAuth("/dishes")).rejects.toThrow(
      "An error occurred please try again",
    );
  });

  it("refreshes the token and retries on 401 when a token is present", async () => {
    useAuthStore.setState({ token: "old-token" });
    mockFetch
      .mockResolvedValueOnce(unauthorized())
      .mockResolvedValueOnce({ ok: true, json: async () => ({ jwt: "new-token" }) })
      .mockResolvedValueOnce(ok({ name: "Pizza" }));

    const result = await fetchWithAuth("/dishes");

    expect(useAuthStore.getState().token).toBe("new-token");
    expect(result).toEqual({ name: "Pizza" });
  });

  it("makes exactly 3 fetch calls during a successful token refresh", async () => {
    useAuthStore.setState({ token: "old-token" });
    mockFetch
      .mockResolvedValueOnce(unauthorized())
      .mockResolvedValueOnce({ ok: true, json: async () => ({ jwt: "new-token" }) })
      .mockResolvedValueOnce(ok({}));

    await fetchWithAuth("/dishes");

    expect(mockFetch).toHaveBeenCalledTimes(3);
    expect(mockFetch).toHaveBeenNthCalledWith(2, "/api/auth/refresh", { method: "POST" });
  });

  it("retries the original request with the new token", async () => {
    useAuthStore.setState({ token: "old-token" });
    mockFetch
      .mockResolvedValueOnce(unauthorized())
      .mockResolvedValueOnce({ ok: true, json: async () => ({ jwt: "new-token" }) })
      .mockResolvedValueOnce(ok({}));

    await fetchWithAuth("/dishes");

    const [, retryOptions] = mockFetch.mock.calls[2];
    expect(retryOptions.headers).toMatchObject({ Authorization: "Bearer new-token" });
  });

  it("resets token and throws 'Session expired' when refresh fails", async () => {
    useAuthStore.setState({ token: "old-token" });
    mockFetch
      .mockResolvedValueOnce(unauthorized())
      .mockResolvedValueOnce({ ok: false });

    await expect(fetchWithAuth("/dishes")).rejects.toThrow(
      "Session expired. Please sign in again.",
    );
    expect(useAuthStore.getState().token).toBeNull();
  });

  it("does not attempt to refresh when 401 occurs without a token", async () => {
    mockFetch.mockResolvedValue(unauthorized());
    await expect(fetchWithAuth("/dishes")).rejects.toThrow(
      "An error occurred please try again",
    );
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });
});
