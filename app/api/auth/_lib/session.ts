import { NextRequest, NextResponse } from "next/server";

/*
 * The site's session routes (login, register, refresh, logout,
 * change-password) between the browser and the API: the refresh token
 * lives in an HttpOnly cookie that only these routes read, so page scripts
 * never see it. Everything else the browser asks the API
 * directly.
 */

/** HttpOnly, SameSite=Strict, sent only to /api/auth/*. */
export const REFRESH_COOKIE = "sf_refresh";
/** The Strapi site's cookie (path `/`): deleted wherever a session starts or ends. */
const LEGACY_COOKIE = "refresh_token";
const COOKIE_PATH = "/api/auth";

/** What the API's auth routes return; the token pair and maybe the user. */
interface ApiSession {
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
  refreshTokenExpiresAt: string;
  user?: unknown;
}

/**
 * POSTs to the API's `/api/auth/<path>`. Passes on the client's
 * X-Forwarded-For (set by nginx), or the API would count every visitor as
 * this server for its per-IP limits; it trusts the hops TRUST_PROXY_HOPS says.
 */
export function callApi(request: NextRequest, path: string, body?: unknown): Promise<Response> {
  const headers: Record<string, string> = { Accept: "application/json" };
  if (body !== undefined) headers["Content-Type"] = "application/json";
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) headers["X-Forwarded-For"] = forwardedFor;
  const authorization = request.headers.get("authorization");
  if (authorization) headers.Authorization = authorization;
  return fetch(`${process.env.API_URL}/api/auth/${path}`, {
    method: "POST",
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
    cache: "no-store",
  });
}

/** The request's JSON body, or a 400 response when it isn't JSON. */
export async function readBody(request: NextRequest): Promise<unknown | NextResponse> {
  try {
    return await request.json();
  } catch {
    return errorResponse(400, "BAD_REQUEST", "Invalid request body");
  }
}

/** An error in the API's shape, from this route itself. */
export function errorResponse(status: number, code: string, message: string): NextResponse {
  return NextResponse.json({ error: { status, code, message } }, { status, headers: noStore() });
}

/** The API's error answer as it is (status, body, Retry-After). */
export async function passError(apiResponse: Response): Promise<NextResponse> {
  const body = await apiResponse.text();
  const headers = new Headers(noStore());
  headers.set("Content-Type", apiResponse.headers.get("Content-Type") ?? "application/json");
  const retryAfter = apiResponse.headers.get("Retry-After");
  if (retryAfter) headers.set("Retry-After", retryAfter);
  return new NextResponse(body, { status: apiResponse.status, headers });
}

/**
 * The API's answer with the refresh token moved into the cookie: the body
 * keeps `{data: {accessToken, expiresIn, user?}}`.
 */
export async function startSession(apiResponse: Response, status = 200): Promise<NextResponse> {
  const { data } = (await apiResponse.json()) as { data: ApiSession };
  const { refreshToken, refreshTokenExpiresAt, ...rest } = data;
  const response = NextResponse.json({ data: rest }, { status, headers: noStore() });
  response.cookies.set(REFRESH_COOKIE, refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: COOKIE_PATH,
    expires: new Date(refreshTokenExpiresAt),
  });
  response.cookies.delete({ name: LEGACY_COOKIE, path: "/" });
  return response;
}

/** Removes the session cookie (and the Strapi site's one) from the browser. */
export function endSession(response: NextResponse): NextResponse {
  response.cookies.delete({ name: REFRESH_COOKIE, path: COOKIE_PATH });
  response.cookies.delete({ name: LEGACY_COOKIE, path: "/" });
  return response;
}

/** Tokens and profiles must never be cached. */
function noStore(): Record<string, string> {
  return { "Cache-Control": "no-store" };
}
