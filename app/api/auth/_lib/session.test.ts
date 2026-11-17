/**
 * @jest-environment node
 */
import { NextRequest } from "next/server";
import { POST as login } from "../login/route";
import { POST as logout } from "../logout/route";
import { POST as refresh } from "../refresh/route";

const mockFetch = jest.fn();
global.fetch = mockFetch;

const EXPIRES = "2026-11-23T10:00:00.000Z";
const apiSession = (refreshToken: string) =>
  Response.json({
    data: { accessToken: "access", expiresIn: 900, refreshToken, refreshTokenExpiresAt: EXPIRES, user: { id: "u1" } },
  });

function request(path: string, init: { body?: unknown; cookie?: string; forwardedFor?: string } = {}) {
  const headers: Record<string, string> = { "content-type": "application/json" };
  if (init.cookie) headers.cookie = init.cookie;
  if (init.forwardedFor) headers["x-forwarded-for"] = init.forwardedFor;
  return new NextRequest(`http://localhost:3000/api/auth/${path}`, {
    method: "POST",
    headers,
    body: init.body === undefined ? undefined : JSON.stringify(init.body),
  });
}

const setCookies = (response: Response) => response.headers.getSetCookie();
const sessionCookie = (response: Response) => setCookies(response).find((c) => c.startsWith("sf_refresh="));

describe("the site's session routes", () => {
  beforeEach(() => {
    mockFetch.mockReset();
    process.env.API_URL = "http://api.internal:1339";
  });

  describe("login", () => {
    it("moves the refresh token into an HttpOnly cookie: never in the body", async () => {
      mockFetch.mockResolvedValue(apiSession("refresh-1"));

      const response = await login(request("login", { body: { email: "o@example.com", password: "secret" } }));

      expect(response.status).toBe(200);
      const body = await response.json();
      expect(body).toEqual({ data: { accessToken: "access", expiresIn: 900, user: { id: "u1" } } });
      expect(JSON.stringify(body)).not.toContain("refresh-1");
      const cookie = sessionCookie(response) ?? "";
      expect(cookie).toMatch(/^sf_refresh=refresh-1;/);
      expect(cookie).toMatch(/HttpOnly/i);
      expect(cookie).toMatch(/SameSite=strict/i);
      expect(cookie).toMatch(/Path=\/api\/auth/);
      expect(cookie).toContain("Expires=Mon, 23 Nov 2026 10:00:00 GMT");
      expect(cookie).not.toMatch(/Secure/i); // NODE_ENV is "test"
      expect(response.headers.get("cache-control")).toBe("no-store");
    });

    it("deletes the Strapi site's cookie", async () => {
      mockFetch.mockResolvedValue(apiSession("refresh-1"));

      const response = await login(request("login", { body: {} }));

      expect(setCookies(response).find((c) => c.startsWith("refresh_token="))).toMatch(/Path=\//);
    });

    it("passes the body and the client's X-Forwarded-For to the API", async () => {
      mockFetch.mockResolvedValue(apiSession("r"));

      await login(request("login", { body: { email: "o@example.com", password: "x" }, forwardedFor: "203.0.113.7" }));

      const [url, init] = mockFetch.mock.calls[0];
      expect(url).toBe("http://api.internal:1339/api/auth/login");
      expect(JSON.parse(init.body)).toEqual({ email: "o@example.com", password: "x" });
      expect(init.headers["X-Forwarded-For"]).toBe("203.0.113.7");
    });

    it("passes the API's error on as it is, and sets no cookie", async () => {
      mockFetch.mockResolvedValue(
        Response.json({ error: { status: 429, code: "TOO_MANY_REQUESTS" } }, { status: 429, headers: { "Retry-After": "300" } }),
      );

      const response = await login(request("login", { body: {} }));

      expect(response.status).toBe(429);
      expect(response.headers.get("retry-after")).toBe("300");
      expect((await response.json()).error.code).toBe("TOO_MANY_REQUESTS");
      expect(sessionCookie(response)).toBeUndefined();
    });

    it("refuses a body that isn't JSON without calling the API", async () => {
      const bad = new NextRequest("http://localhost:3000/api/auth/login", { method: "POST", body: "{nope" });

      const response = await login(bad);

      expect(response.status).toBe(400);
      expect(mockFetch).not.toHaveBeenCalled();
    });
  });

  describe("refresh", () => {
    it("answers 401 at once without a cookie (no API call)", async () => {
      const response = await refresh(request("refresh"));

      expect(response.status).toBe(401);
      expect(mockFetch).not.toHaveBeenCalled();
    });

    it("sends the cookie's token and stores the new one: the old one is used up", async () => {
      mockFetch.mockResolvedValue(apiSession("refresh-2"));

      const response = await refresh(request("refresh", { cookie: "sf_refresh=refresh-1" }));

      expect(JSON.parse(mockFetch.mock.calls[0][1].body)).toEqual({ refreshToken: "refresh-1" });
      expect(sessionCookie(response)).toMatch(/^sf_refresh=refresh-2;/);
      expect(JSON.stringify(await response.json())).not.toContain("refresh-2");
    });

    it("clears the cookie when the API says the session is over (401)", async () => {
      mockFetch.mockResolvedValue(Response.json({ error: { status: 401 } }, { status: 401 }));

      const response = await refresh(request("refresh", { cookie: "sf_refresh=used" }));

      expect(response.status).toBe(401);
      expect(sessionCookie(response)).toMatch(/^sf_refresh=;/);
    });

    it("keeps the cookie for a 429 or an API failure: the session may still be fine", async () => {
      mockFetch.mockResolvedValue(Response.json({ error: { status: 503 } }, { status: 503 }));

      const response = await refresh(request("refresh", { cookie: "sf_refresh=ok" }));

      expect(response.status).toBe(503);
      expect(sessionCookie(response)).toBeUndefined();
    });
  });

  describe("logout", () => {
    it("ends the session on the API, then clears the cookies", async () => {
      mockFetch.mockResolvedValue(new Response(null, { status: 204 }));

      const response = await logout(request("logout", { cookie: "sf_refresh=refresh-1" }));

      expect(mockFetch.mock.calls[0][0]).toBe("http://api.internal:1339/api/auth/logout");
      expect(JSON.parse(mockFetch.mock.calls[0][1].body)).toEqual({ refreshToken: "refresh-1" });
      expect(response.status).toBe(204);
      expect(sessionCookie(response)).toMatch(/^sf_refresh=;/);
    });

    it("clears the cookies even when the API can't be reached", async () => {
      mockFetch.mockRejectedValue(new TypeError("fetch failed"));

      const response = await logout(request("logout", { cookie: "sf_refresh=refresh-1" }));

      expect(response.status).toBe(204);
      expect(sessionCookie(response)).toMatch(/^sf_refresh=;/);
    });
  });
});
