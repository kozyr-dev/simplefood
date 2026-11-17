import { NextRequest } from "next/server";
import { callApi, endSession, errorResponse, passError, REFRESH_COOKIE, startSession } from "../_lib/session";

/**
 * A new access token for the session in the cookie, which is replaced: the
 * API uses up the token sent. Without a cookie a 401 at once (no API call):
 * every page load of a signed-out visitor asks.
 */
export async function POST(request: NextRequest) {
  const refreshToken = request.cookies.get(REFRESH_COOKIE)?.value;
  if (!refreshToken) {
    return endSession(errorResponse(401, "NO_SESSION", "Not signed in"));
  }

  const apiResponse = await callApi(request, "refresh", { refreshToken });
  if (apiResponse.ok) return startSession(apiResponse);
  // A used-up, expired or revoked token: the session is over. Anything else
  // (a 429, the API down) keeps the cookie for the next try.
  const response = await passError(apiResponse);
  return apiResponse.status === 401 ? endSession(response) : response;
}
