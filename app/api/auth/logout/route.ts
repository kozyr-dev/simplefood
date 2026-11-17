import { NextRequest, NextResponse } from "next/server";
import { callApi, endSession, REFRESH_COOKIE } from "../_lib/session";

/** Ends the session on the API too (its refresh token is revoked), then clears the cookie. */
export async function POST(request: NextRequest) {
  const refreshToken = request.cookies.get(REFRESH_COOKIE)?.value;
  if (refreshToken) {
    try {
      await callApi(request, "logout", { refreshToken });
    } catch {
      // The API is down: the cookie still goes; the token expires by itself (7 days idle).
    }
  }
  return endSession(new NextResponse(null, { status: 204, headers: { "Cache-Control": "no-store" } }));
}
