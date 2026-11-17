import { ApiError, apiFetch, apiUrl } from "./client";
import { apiError, fakeResponse } from "@/shared/lib/testing/fakeResponse";

const mockFetch = jest.fn();
global.fetch = mockFetch;

describe("apiUrl", () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_API_URL = "http://api.test";
  });

  it("joins the base, /api and the path", () => {
    expect(apiUrl("/settings")).toBe("http://api.test/api/settings");
  });

  it("encodes the query and leaves out null and undefined values", () => {
    expect(apiUrl("/blog-posts", { category: "news & offers", page: 2, pageSize: undefined, featured: null })).toBe(
      "http://api.test/api/blog-posts?category=news+%26+offers&page=2",
    );
  });
});

describe("apiFetch", () => {
  beforeEach(() => {
    mockFetch.mockReset();
    process.env.NEXT_PUBLIC_API_URL = "http://api.test";
  });

  it("returns the parsed body", async () => {
    mockFetch.mockResolvedValue(fakeResponse(200, { data: { siteName: "Simple Food" } }));

    await expect(apiFetch("/settings")).resolves.toEqual({ data: { siteName: "Simple Food" } });
  });

  it("returns undefined for a 204 without reading a body", async () => {
    mockFetch.mockResolvedValue(fakeResponse(204));

    await expect(apiFetch("/contact", { method: "POST", body: {} })).resolves.toBeUndefined();
  });

  it("sends a body as JSON, a token as a bearer header", async () => {
    mockFetch.mockResolvedValue(fakeResponse(204));

    await apiFetch("/orders", { method: "POST", body: { a: 1 }, token: "t0k3n" });

    const [url, init] = mockFetch.mock.calls[0];
    expect(url).toBe("http://api.test/api/orders");
    expect(init.body).toBe('{"a":1}');
    expect(init.headers).toMatchObject({ "Content-Type": "application/json", Authorization: "Bearer t0k3n" });
  });

  it("sends neither a Content-Type nor an Authorization header when there is nothing to send", async () => {
    mockFetch.mockResolvedValue(fakeResponse(200, { data: 1 }));

    await apiFetch("/settings");

    expect(mockFetch.mock.calls[0][1].headers).toEqual({ Accept: "application/json" });
  });

  it("throws an ApiError from the error envelope, with details and Retry-After", async () => {
    const details = [{ field: "items.1.productId", messages: ["unavailable"] }];
    mockFetch.mockResolvedValue(
      fakeResponse(409, apiError(409, "PRODUCTS_UNAVAILABLE", details), { "Retry-After": "120" }),
    );

    const error = (await apiFetch("/orders").catch((e) => e)) as ApiError;

    expect(error).toBeInstanceOf(ApiError);
    expect(error).toMatchObject({ status: 409, code: "PRODUCTS_UNAVAILABLE", details, retryAfter: 120 });
  });

  it("names a non-JSON error by its status", async () => {
    mockFetch.mockResolvedValue(fakeResponse(502));

    await expect(apiFetch("/settings")).rejects.toMatchObject({ status: 502, code: "HTTP_502", details: [] });
  });

  it("turns a network failure into ApiError status 0", async () => {
    mockFetch.mockRejectedValue(new TypeError("Failed to fetch"));

    await expect(apiFetch("/settings")).rejects.toMatchObject({ status: 0, code: "NETWORK_ERROR" });
  });
});
